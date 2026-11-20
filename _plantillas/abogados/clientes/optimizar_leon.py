"""Optimiza las imágenes publicadas en estudioleon.pe para la demo (WebP livianas)."""
import os,sys
from PIL import Image,ImageOps
src=sys.argv[1]; dst=os.path.join(os.path.dirname(os.path.abspath(__file__)),"leon_img")
def save(name,out,w,h=None,q=70,focus=(.5,.3)):
    im=Image.open(os.path.join(src,name)).convert("RGB")
    if h:
        im=ImageOps.fit(im,(w,h),Image.LANCZOS,centering=focus)
    else:
        im.thumbnail((w,w*3),Image.LANCZOS)
    im.save(os.path.join(dst,out+".webp"),"WEBP",quality=q,method=6)
    print(out,os.path.getsize(os.path.join(dst,out+".webp"))//1024,"KB",im.size)
save("fondo2.webp","hero",1700,1100,52,(.5,.5))
save("fondo3.webp","sala",1400,900,50,(.5,.5))
save("NosotrosEL.webp","equipo",1000,760,62,(.5,.5))
save("Historia.webp","historia",720,960,60,(.5,.4))
for n,o in [("DerechoAdministrativo","a_admin"),("DerechoCivil","a_civil"),("DerechoCorporativoEmpresarial","a_corp"),("DerechoProcesalLitigios","a_proc"),("TecnologiaInteligenciaArtificial","a_tec")]:
    save(n+".webp",o,900,640,60,(.5,.5))
P=[("RicardoLeon","ricardo",(.5,.28)),("TeresaSantillan","aurelia",(.5,.28)),("JulioLingan","julio",(.5,.28)),("GinoCabanillas","gino",(.5,.28)),("OscarChuquipoma","oscar",(.5,.25)),("ManuelRobles","manuel",(.5,.28)),("RosaRamirez","rosa",(.5,.28)),("RodrigoAlejandro VargasRojas","rodrigo",(.5,.28)),("Jhami","jhamileth",(.5,.28)),("DiegoOrregoAlvarado","diego",(.5,.28)),("GreciaArroyo","grecia",(.5,.28)),("SantosCotrina","santos",(.5,.28)),("MilenkaVasquez","milenka",(.5,.28))]
for n,o,f in P: save(n+".webp","p_"+o,480,600,70,f)
# logos con transparencia
for n,o in [("logo_el.webp","logo"),("logo_el_b.webp","logo_b")]:
    im=Image.open(os.path.join(src,n)).convert("RGBA"); bbox=im.getbbox() ; im=im.crop(bbox) if bbox else im
    im.thumbnail((520,520),Image.LANCZOS); im.save(os.path.join(dst,o+".webp"),"WEBP",quality=85,method=6); print(o,im.size,os.path.getsize(os.path.join(dst,o+".webp"))//1024,"KB")
