"""Arma leon_datos.json a partir de los textos descargados de estudioleon.pe (es / en / zh).
Uso: python3 construir_datos_leon.py /tmp/el"""
import re,sys,json,os
from bs4 import BeautifulSoup
src=sys.argv[1]
def B(f):
    t=open(os.path.join(src,f),encoding="utf-8").read(); return [b.strip() for b in re.split(r"\n\s*\n",t) if b.strip()]
L=["es","en","zh"]; F={"es":"","en":"en_","zh":"zh_"}
D={"firma":{},"expertise":{},"equipo_intro":{},"pubs_intro":{},"contacto":{}}
for l in L:
    b=B(F[l]+"firm.txt")
    D["firma"][l]={"sub":b[1],"h_estudio":b[2],"estudio":[b[3],b[4]],"h_nosotros":b[5],"nosotros":b[6:10],"h_historia":b[10],"historia":b[11:16],
        "h_porque":b[16].split("\n")[0],"porque":[[b[16].split("\n")[1],b[17]],[b[18],b[19]]]}
    e=B(F[l]+"expertise.txt")
    areas=[(e[5+2*i],e[6+2*i]) for i in range(5)]
    inv=e[15].split("\n"); items=e[19].split("\n")
    D["expertise"][l]={"sub":e[1],"h_areas":e[2],"intro":[e[3],e[4]],"areas":areas,"h_inv":inv[0],"inv_sub":inv[1],"inv_intro":e[16],"h_inv_serv":e[17],"inv_lead":e[18],"inv_serv":items[:4],"h_sect":items[4],"inv_sect":items[5:9]}
    p=B(F[l]+"professionals.txt")
    i0=[k for k,x in enumerate(p) if "@estudioleon.pe" in x][0]
    D["equipo_intro"][l]={"sub":p[1] if False else None}
    # intro: bloques entre el título y el primer nombre
    t=open(os.path.join(src,F[l]+"professionals.txt"),encoding="utf-8").read()
    body=t.split("\n\n")
    D["equipo_intro"][l]=[x.strip() for x in body if x.strip()][12:17] if False else None
    c=B(F[l]+"contact.txt")
    D["contacto"][l]={"intro":c[1],"h_form":c[2],"form_sub":c[3],"campos":c[4].split("\n")[:6]}
    pb=B(F[l]+"publications.txt")
    D["pubs_intro"][l]={"sub":pb[1],"intro":pb[2]}
# Profesionales (nombre/rol por idioma)
def prof(l):
    t=open(os.path.join(src,F[l]+"professionals.txt"),encoding="utf-8").read()
    lines=[x.strip() for x in t.split("\n") if x.strip()]
    out=[];i=0
    while i<len(lines):
        if "@estudioleon.pe" in lines[i] and i>=2: out.append((lines[i-2],lines[i-1],lines[i])); 
        i+=1
    return out[:13]
P={l:prof(l) for l in L}
assert all(len(P[l])==13 for l in L),[len(P[l]) for l in L]
ids=["ricardo","aurelia","julio","gino","oscar","manuel","rosa","rodrigo","jhamileth","diego","grecia","santos","milenka"]
NOM={"ricardo":"Ricardo Virgilio León Aguilar","aurelia":"Aurelia Teresa Santillán Valqui","julio":"Julio César Alexander Lingán Aguilar","gino":"Franck Gino Cabanillas Correa","oscar":"Oscar Fernando Chuquipoma Ríos","manuel":"CPC Manuel Eduardo Robles Mantilla","rosa":"Rosa Anais Ramírez Torres","rodrigo":"Rodrigo Alejandro Vargas Rojas","jhamileth":"Jhamileth Del Carmen Diaz Araujo","diego":"Diego Enrique Orrego Alvarado","grecia":"Grecia María Arroyo Salazar","santos":"Santos Beder Cotrina Mendoza","milenka":"Milenka Yajhaira Vásquez Ramírez"}
D["equipo"]=[]
for k,pid in enumerate(ids):
    nm=NOM[pid]
    D["equipo"].append({"id":pid,"nombre":nm,"correo":P["es"][k][2],"rol":{l:P[l][k][1].title() if l!="zh" else P[l][k][1] for l in L},"img":"p_"+pid})
# intro del equipo
for l in L:
    t=open(os.path.join(src,F[l]+"professionals.txt"),encoding="utf-8").read()
    bl=[x.strip() for x in re.split(r"\n\s*\n",t) if x.strip()]
    ix=[k for k,x in enumerate(bl) if "@estudioleon.pe" in x or x.split("\n")[0].isupper()]
    # párrafos largos entre título y primer nombre
    D["equipo_intro"][l]=[x for x in bl if len(x)>(60 if l=="zh" else 110) and "@" not in x and "\n" not in x and "©" not in x][:4]
# Publicaciones
AUT=["Ricardo V. León","Ricardo León Aguilar","CPC Manuel Eduardo Robles Mantilla"]
pubs=[("medios_probatorios_de_actuacion_inmediata","2024-01-19",8),("reflexiones_sobre_el_dano_moral_en_personas_juridicas","2024-01-14",10),("es_importante_un_sistema_contable_en_tu_empresa","2023-12-31",8)]
meta={}
for l in L:
    b=B(F[l]+"publications.txt")
    # bloques: 3: cat/fecha/min/titulo ; 4: resumen ; 5: Leer | cat ...
    rows=[]
    txt="\n".join(b[3:])
    for m in re.finditer(r"([^\n]+)\n([^\n]+)\n\s*8 min lectura|([^\n]+)\n([^\n]+)\n\s*10 min lectura",txt): pass
    lines=[x.strip() for x in txt.split("\n") if x.strip()]
    ent=[]
    for i,x in enumerate(lines):
        if "min lectura" in x:
            ent.append((lines[i-2],lines[i+1],lines[i+2]))
    assert len(ent)==3,(l,len(ent))
    meta[l]=ent
D["pubs"]=[]
for k,(slug,fecha,min_) in enumerate(pubs):
    h=open(os.path.join(src,"publications_"+slug+".html"),encoding="utf-8").read()
    s=BeautifulSoup(h,"html.parser"); art=s.select_one(".article-content")
    blocks=[]
    for c in art.find_all(recursive=False):
        if c.name in("hr","h1"): continue
        if c.name in("h2","h3"): blocks.append(["h",c.get_text(" ",strip=True)])
        elif c.name in("ul","ol"): blocks.append(["ul",[li.get_text(" ",strip=True) for li in c.find_all("li")]])
        elif c.name=="p":
            tx=c.get_text(" ",strip=True)
            if tx: blocks.append(["p",tx])
        else:
            tx=c.get_text(" ",strip=True)
            if tx: blocks.append(["p",tx])
    hd=art.find("header"); aut=None
    if hd:
        m=re.search(r"Por ([^\n]+)",hd.get_text("\n",strip=True)); aut=m.group(0) if m else None
    if blocks and blocks[0]==["h","SUMARIO"]: blocks=blocks[2:]
    D["pubs"].append({"slug":slug,"fecha":fecha,"min":min_,"autor":AUT[k],
        "cat":{l:meta[l][k][0] for l in L},"titulo":{l:meta[l][k][1] for l in L},"resumen":{l:meta[l][k][2] for l in L},"cuerpo":blocks})
json.dump(D,open("leon_datos.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
print({k:(len(v) if hasattr(v,'__len__') else v) for k,v in D.items()})
print([ (p["titulo"]["es"][:30],p["autor"],len(p["cuerpo"])) for p in D["pubs"]])
print(D["equipo"][0],D["equipo"][5]["rol"],D["equipo_intro"]["es"][0][:60])
