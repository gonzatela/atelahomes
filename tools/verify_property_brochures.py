"""Check that every admin download exists and matches its commercial data."""
import json
from pathlib import Path
from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
properties = json.loads((root / 'administracion/fichas.json').read_text(encoding='utf-8'))
count = pages = 0
for prop in properties:
    for blind in (False, True):
        name = prop['pdf'].replace('.pdf', '-ciega.pdf') if blind else prop['pdf']
        reader = PdfReader(root / 'assets/admin/fichas' / name)
        text = reader.pages[0].extract_text()
        for key in ('price', 'floor', 'terrace'):
            assert prop[key] in text, (name, key)
        if blind:
            assert 'ATELAHOMES' not in text, name
            assert prop['address'] not in text, name
        else:
            assert prop['address'] in text, name
            assert 'WWW.ATELAHOMES.COM' in text, name
        count += 1
        pages += len(reader.pages)
print(f'{count} PDF downloads verified; {pages} pages.')
