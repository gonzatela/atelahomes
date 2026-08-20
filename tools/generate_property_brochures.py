from __future__ import annotations

import io
import argparse
import json
import tempfile
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "administracion" / "fichas.json"
DEFAULT_OUTPUT_DIR = ROOT / "assets" / "admin" / "fichas"
SOURCE_LOGO = Path(r"C:\Users\navar\Downloads\ATELA LOGO BLANCO.png")
PAGE_SIZE = (960, 540)

PAPER = HexColor("#F7F3EC")
INK = HexColor("#151A16")
MUTED = HexColor("#6A665F")
LINE = HexColor("#D0C6B8")
OLIVE = HexColor("#3F4A40")


def prepare_logo(source: Path, target: Path, color: tuple[int, int, int], opacity: float = 1.0) -> None:
    logo = Image.open(source).convert("RGBA")
    alpha = logo.getchannel("A").point(lambda value: int(value * opacity))
    colored = Image.new("RGBA", logo.size, (*color, 0))
    colored.putalpha(alpha)
    colored.save(target)


def image_source(value: str, cache_dir: Path) -> Path:
    if value.startswith(("https://", "http://")):
        suffix = Path(value.split("?", 1)[0]).suffix or ".img"
        target = cache_dir / f"remote-{abs(hash(value))}{suffix}"
        if not target.exists():
            request = urllib.request.Request(value, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(request, timeout=30) as response:
                target.write_bytes(response.read())
        return target
    return (MANIFEST_PATH.parent / value).resolve()


def open_image(path: Path) -> Image.Image:
    with Image.open(path) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        image.thumbnail((2200, 1600), Image.Resampling.LANCZOS)
        return image


def image_reader(image: Image.Image, quality: int = 84) -> ImageReader:
    buffer = io.BytesIO()
    image.save(buffer, format="JPEG", quality=quality, optimize=True, progressive=True)
    buffer.seek(0)
    return ImageReader(buffer)


def draw_cover_image(pdf: canvas.Canvas, image: Image.Image, x: float, y: float, width: float, height: float) -> None:
    image_ratio = image.width / image.height
    frame_ratio = width / height
    if image_ratio > frame_ratio:
        crop_width = round(image.height * frame_ratio)
        left = (image.width - crop_width) // 2
        image = image.crop((left, 0, left + crop_width, image.height))
    else:
        crop_height = round(image.width / frame_ratio)
        top = (image.height - crop_height) // 2
        image = image.crop((0, top, image.width, top + crop_height))
    pdf.drawImage(image_reader(image), x, y, width, height, preserveAspectRatio=False, mask="auto")


def draw_contain_image(pdf: canvas.Canvas, image: Image.Image, x: float, y: float, width: float, height: float) -> tuple[float, float, float, float]:
    scale = min(width / image.width, height / image.height)
    draw_width = image.width * scale
    draw_height = image.height * scale
    draw_x = x + (width - draw_width) / 2
    draw_y = y + (height - draw_height) / 2
    pdf.drawImage(image_reader(image, quality=90), draw_x, draw_y, draw_width, draw_height, preserveAspectRatio=True, mask="auto")
    return draw_x, draw_y, draw_width, draw_height


def draw_logo(pdf: canvas.Canvas, logo: Path, x: float, y: float, width: float) -> None:
    height = width * 284 / 590
    pdf.drawImage(str(logo), x, y, width, height, preserveAspectRatio=True, mask="auto")


def draw_watermark(pdf: canvas.Canvas, watermark: Path, frame: tuple[float, float, float, float]) -> None:
    x, y, width, height = frame
    logo_width = min(width * 0.34, 190)
    logo_height = logo_width * 284 / 590
    draw_logo(pdf, watermark, x + (width - logo_width) / 2, y + (height - logo_height) / 2, logo_width)


def draw_standard_footer(pdf: canvas.Canvas, page_number: int, total_pages: int, logo: Path, name: str) -> None:
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.6)
    pdf.line(38, 34, 922, 34)
    draw_logo(pdf, logo, 38, 43, 67)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 7.5)
    pdf.drawString(126, 52, name.upper())
    pdf.drawString(126, 42, "WWW.ATELAHOMES.COM")
    pdf.drawRightString(922, 52, "INFO@ATELAHOMES.COM  ·  +34 650 07 57 47")
    pdf.drawRightString(922, 42, f"{page_number:02d} / {total_pages:02d}")
    pdf.linkURL("https://www.atelahomes.com", (126, 39, 235, 54), relative=0)


def draw_cover(pdf: canvas.Canvas, property_data: dict, cover: Image.Image, logo_white: Path, page_number: int, total_pages: int) -> None:
    width, height = PAGE_SIZE
    panel_width = 374
    pdf.setFillColor(OLIVE)
    pdf.rect(0, 0, panel_width, height, fill=1, stroke=0)
    draw_cover_image(pdf, cover, panel_width, 0, width - panel_width, height)

    draw_logo(pdf, logo_white, 42, 430, 116)
    pdf.setFillColor(PAPER)
    pdf.setFont("Helvetica", 8)
    pdf.drawString(42, 389, property_data["operation"].upper())
    pdf.setFont("Times-Roman", 34)
    title = property_data["name"]
    if len(title) > 24:
        pdf.setFont("Times-Roman", 29)
    pdf.drawString(42, 337, title)
    pdf.setFont("Helvetica", 9)
    pdf.drawString(42, 311, property_data["location"].upper())

    pdf.setStrokeColor(HexColor("#829083"))
    pdf.line(42, 286, 330, 286)
    pdf.setFont("Times-Roman", 24)
    pdf.drawString(42, 247, property_data["price"])

    pdf.setFont("Helvetica", 9)
    fact_y = 212
    for fact in property_data["facts"]:
        pdf.circle(46, fact_y + 2, 1.4, fill=1, stroke=0)
        pdf.drawString(58, fact_y - 1, fact)
        fact_y -= 22

    pdf.setFont("Helvetica", 7.5)
    pdf.drawString(42, 49, "WWW.ATELAHOMES.COM")
    pdf.drawString(42, 37, "INFO@ATELAHOMES.COM  ·  +34 650 07 57 47")
    pdf.drawRightString(330, 37, f"{page_number:02d} / {total_pages:02d}")
    pdf.linkURL("https://www.atelahomes.com", (42, 45, 152, 57), relative=0)


def draw_gallery_page(
    pdf: canvas.Canvas,
    property_data: dict,
    images: list[Image.Image],
    logo_dark: Path,
    watermark: Path,
    page_number: int,
    total_pages: int,
) -> None:
    width, height = PAGE_SIZE
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, width, height, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("Times-Roman", 17)
    pdf.drawRightString(922, 493, property_data["name"])

    if len(images) == 1:
        frame = (38, 82, 884, 380)
        draw_cover_image(pdf, images[0], *frame)
        draw_watermark(pdf, watermark, frame)
    else:
        left_frame = (38, 82, 517, 380)
        right_frame = (571, 82, 351, 380)
        draw_cover_image(pdf, images[0], *left_frame)
        draw_cover_image(pdf, images[1], *right_frame)
        draw_watermark(pdf, watermark, left_frame)
        draw_watermark(pdf, watermark, right_frame)

    draw_standard_footer(pdf, page_number, total_pages, logo_dark, property_data["name"])


def draw_layout_page(
    pdf: canvas.Canvas,
    property_data: dict,
    layout: Image.Image,
    logo_dark: Path,
    page_number: int,
    total_pages: int,
) -> None:
    width, height = PAGE_SIZE
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, width, height, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica", 8)
    pdf.drawString(38, 494, "PROPUESTA DE DISTRIBUCIÓN")
    pdf.setFont("Times-Roman", 24)
    pdf.drawRightString(922, 487, property_data["name"])
    draw_contain_image(pdf, layout, 90, 78, 780, 385)
    draw_standard_footer(pdf, page_number, total_pages, logo_dark, property_data["name"])


def create_brochure(
    property_data: dict,
    output_dir: Path,
    cache_dir: Path,
    logo_white: Path,
    logo_dark: Path,
    watermark: Path,
) -> Path:
    image_paths = [image_source(value, cache_dir) for value in property_data["images"]]
    images = [open_image(path) for path in image_paths]
    layout = open_image(image_source(property_data["layout"], cache_dir)) if property_data.get("layout") else None

    gallery_groups = [images[index:index + 2] for index in range(1, len(images), 2)]
    total_pages = 1 + len(gallery_groups) + (1 if layout else 0)
    output_path = output_dir / property_data["pdf"]
    pdf = canvas.Canvas(str(output_path), pagesize=PAGE_SIZE, pageCompression=1)
    pdf.setTitle(f"{property_data['name']} | Atela Homes")
    pdf.setAuthor("Atela Homes")
    pdf.setSubject("Ficha comercial de propiedad")

    draw_cover(pdf, property_data, images[0], logo_white, 1, total_pages)
    pdf.showPage()
    page_number = 2
    for group in gallery_groups:
        draw_gallery_page(pdf, property_data, group, logo_dark, watermark, page_number, total_pages)
        pdf.showPage()
        page_number += 1
    if layout:
        draw_layout_page(pdf, property_data, layout, logo_dark, page_number, total_pages)
        pdf.showPage()

    pdf.save()
    return output_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Genera las fichas PDF de las propiedades activas.")
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    args = parser.parse_args()

    if not SOURCE_LOGO.exists():
        raise FileNotFoundError(f"No se encontró el logo blanco: {SOURCE_LOGO}")

    properties = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    output_dir = args.output_dir.resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="atela-brochures-") as temp:
        cache_dir = Path(temp)
        logo_white = cache_dir / "logo-white.png"
        logo_dark = cache_dir / "logo-dark.png"
        watermark = cache_dir / "logo-watermark.png"
        prepare_logo(SOURCE_LOGO, logo_white, (255, 255, 255))
        prepare_logo(SOURCE_LOGO, logo_dark, (21, 26, 22))
        prepare_logo(SOURCE_LOGO, watermark, (255, 255, 255), opacity=0.18)

        for property_data in properties:
            output = create_brochure(property_data, output_dir, cache_dir, logo_white, logo_dark, watermark)
            print(output)


if __name__ == "__main__":
    main()
