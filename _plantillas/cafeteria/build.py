#!/usr/bin/env python3
"""Genera la demo de una cafetería a partir del molde.
Uso:  python3 build.py clientes/cafe_jaenitos.py ../../demos/<carpeta>/index.html
El diseño base (CSS compartido) viene del molde de hotel; aquí solo se agrega lo propio de cafetería."""
import sys, json, importlib.util, pathlib
cfg_path, out_path = sys.argv[1], sys.argv[2]
spec = importlib.util.spec_from_file_location("cfg", cfg_path); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
CFG = mod.CFG
here = pathlib.Path(__file__).parent
base = (here.parent / "hotel" / "plantilla.html").read_text(encoding="utf-8")
head = base[: base.index("</style>")]
html = head + (here / "parte.css").read_text(encoding="utf-8") + "</style>" + (here / "cuerpo.html").read_text(encoding="utf-8")
html = html.replace("/*__CONFIG__*/", json.dumps(CFG, ensure_ascii=False))
html = html.replace("{{TITULO}}", f"Boceto {CFG['nombre']} {CFG['ciudad']}")
html = html.replace("{{BANNER}}", CFG["banner"])
pathlib.Path(out_path).parent.mkdir(parents=True, exist_ok=True)
pathlib.Path(out_path).write_text(html, encoding="utf-8")
print("OK", out_path, len(html)//1024, "KB")
