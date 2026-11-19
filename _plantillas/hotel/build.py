#!/usr/bin/env python3
"""Genera la demo de un hotel a partir del molde.
Uso:  python3 build.py clientes/hotel_americano.py  ../../demos/hotel-americano-jaen-4h7/index.html
El config es un archivo .py que define CFG (dict). Ver clientes/hotel_ejemplo.py."""
import sys, json, importlib.util, pathlib
cfg_path, out_path = sys.argv[1], sys.argv[2]
spec = importlib.util.spec_from_file_location("cfg", cfg_path); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
CFG = mod.CFG
here = pathlib.Path(__file__).parent
html = (here / "plantilla.html").read_text(encoding="utf-8")
if "ilustracion" not in CFG:
    CFG["ilustracion"] = (here / "clientes" / "_ilustracion-hotel.svg").read_text(encoding="utf-8")
html = html.replace("/*__CONFIG__*/", json.dumps(CFG, ensure_ascii=False))
html = html.replace("{{TITULO}}", f"Boceto {CFG['nombre']} {CFG['ciudad']}")
html = html.replace("{{BANNER}}", CFG["banner"])
pathlib.Path(out_path).parent.mkdir(parents=True, exist_ok=True)
pathlib.Path(out_path).write_text(html, encoding="utf-8")
print("OK", out_path, len(html)//1024, "KB")
