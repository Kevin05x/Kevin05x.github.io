#!/usr/bin/env python3
"""Molde de clínica / medicina estética: arma el index.html de una demo.
Uso: python3 build.py clientes/munnay.py ../../demos/<carpeta>/index.html"""
import sys,os,json,base64,importlib.util
aqui=os.path.dirname(os.path.abspath(__file__))
cli=os.path.abspath(sys.argv[1]); out=os.path.abspath(sys.argv[2])
spec=importlib.util.spec_from_file_location("cliente",cli); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); CFG=m.CFG
cdir=os.path.dirname(cli)
CFG=dict(CFG); CFG["datos"]=json.load(open(os.path.join(cdir,CFG["datos_json"]),encoding="utf-8"))
leg=json.load(open(os.path.join(cdir,CFG["legal_json"]),encoding="utf-8")); CFG["legal"]=leg
IMG={}
imgdir=os.path.join(cdir,CFG["img_dir"])
for f in sorted(os.listdir(imgdir)):
    k,ext=os.path.splitext(f); mime={".webp":"image/webp",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg"}[ext]
    IMG[k]="data:%s;base64,%s"%(mime,base64.b64encode(open(os.path.join(imgdir,f),"rb").read()).decode())
def js(o): return json.dumps(o,ensure_ascii=False,separators=(",",":")).replace("</","<\\/")
css=open(os.path.join(aqui,"estilos.css"),encoding="utf-8").read()
code="".join(open(os.path.join(aqui,f),encoding="utf-8").read()+"\n" for f in ("app_core.js","app_pages.js","app_main.js"))
h=open(os.path.join(aqui,"base.html"),encoding="utf-8").read()
h=h.replace("{{TITULO}}",CFG["titulo"]).replace("{{BANNER}}",CFG["banner"])
h=h.replace("/*__CSS__*/",css).replace("/*__CONFIG__*/",js(CFG)).replace("/*__IMG__*/",js(IMG)).replace("/*__JS__*/",code)
os.makedirs(os.path.dirname(out),exist_ok=True); open(out,"w",encoding="utf-8").write(h)
print(out,round(len(h.encode())/1024),"KB",len(IMG),"imágenes")
