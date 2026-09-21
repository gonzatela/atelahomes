# Datos de las fichas

Actualización: 21 de septiembre de 2026.

Los campos de dirección, planta y terraza se mantienen en `administracion/fichas.json`.
La dirección se muestra solo en la versión Atela Homes; planta y terraza aparecen
en ambas versiones. Los datos no confirmados se indican expresamente y no deben
interpretarse como ausencia de terraza. El propietario de la web ha confirmado
que enviará los datos restantes más adelante.

Datos proporcionados por el propietario:
- Captura confirmada el 21 de septiembre: Alberto Bosch 14, 1.º exterior y
  1.º interior; Modesto Lafuente 7, 1.º interior. Las fichas usan estos datos.
- Castelló: calle Castelló 98, 6.ª planta.
- García de Paredes: 895.000 €.
- Lombia: 1.295.000 €.
- Menéndez Pelayo: ático. El posible 4.º no está confirmado; se publica última planta.

Fuentes contrastadas para plantas y terrazas:
- Alberto Bosch interior: ficha original `A. Bosch bj.pdf`, referencia EOR47458:
  Alberto Bosch 14, planta 1.ª, puerta 2.
- Modesto Lafuente: ficha original `Ficha ciega M. Lafuente.pdf`, EOR47394, planta 1.ª.
- Menéndez Pelayo: `Perfil-Ciego Atico Mdez. Pelayo.pdf`, última planta y terraza 20 m².
- Serrano: https://www.coldwellbanker.es/madrid/castellana/piso-con-terraza-y-garaje-en-serrano
  (191 m², planta 5.ª exterior, terraza).
- López de Hoyos: https://nolab.es/aws_report.csv/propiedades/lopez-de-hoyos-con-serrano-castellana
  (241 m², planta 3.ª exterior).
- Conde de Peñalver: https://www.aproperties.es/madrid/goya/piso-de-68-m2-en-venta-en-goya-madrid
  (68 m², planta 4.ª interior).
- Lombia: https://www.idealista.com/inmueble/109747747/ (119 m², planta 6.ª exterior)
  y https://www.consultingesquivel.com/es/ref-1279 (terraza de 13 m²).
- García de Paredes: https://srv.mobiliagestion.es/es/venta/ref-1274 (93 m², planta 6.ª interior).
- Castelló: https://nolab.es/propiedades/castello-ix-castellana (balcón; no confirma terraza).

Algunas fuentes publican otras distribuciones de dormitorios/baños o precios.
Se conservan los datos comerciales de Atela Homes salvo los cambios solicitados.
Los números de calle no se deducen de direcciones de agencias ni de mapas aproximados.

Generación: `python tools/generate_property_brochures.py`.
Dependencias: Pillow (con soporte AVIF) y reportlab. Las imágenes remotas requieren red.
