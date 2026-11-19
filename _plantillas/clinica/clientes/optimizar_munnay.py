# Optimiza las fotos propias de Munnay (descargadas de su sitio) a WebP livianos para incrustar como data URI.
import os,sys,shutil
from PIL import Image
SRC=sys.argv[1] if len(sys.argv)>1 else '/tmp/mn/img'
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'munnay_img'); os.makedirs(OUT,exist_ok=True)
def go(key,f,w,q=70,alpha=False,sq=False,fmt='WEBP'):
    p=os.path.join(SRC,f)
    if not os.path.exists(p): print('falta',f); return
    im=Image.open(p)
    if alpha and im.mode in('RGBA','LA','P'): im=im.convert('RGBA')
    else:
        if im.mode in('RGBA','LA','P'):
            im=im.convert('RGBA'); bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im); im=bg
        im=im.convert('RGB')
    if im.width>w: im=im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
    o=os.path.join(OUT,key+'.webp'); im.save(o,'WEBP',quality=q,method=6)
    return os.path.getsize(o)
tot=0
J=[('hero','hero.webp',1500,62),('hero2','hero2.webp',1500,62),('svc_doc','svc_doc.webp',360,74,True),('asesora','asesora.png',72,78,True),
 ('nos','nos.png',420,72,True),('team0','team0.jpg',760,70)]
for i in range(1,6): J.append((f'team{i}',f'team{i}.png',380,72))
for k,f in [('ic_eval','ic_eval.png'),('ic_medidas','ic_medidas.png'),('ic_faciales','ic_faciales.png'),('ic_depi','ic_depi.png'),('ic_rejuv','ic_rejuv.png'),('ic_manchas','ic_manchas.png')]: J.append((k,f,96,85,True))
for k,f in [('b_tizo','b_tizo.webp'),('b_munnay','b_munnay.webp'),('b_medik8','b_medik8.webp'),('b_isdin','b_isdin.webp')]: J.append((k,f,240,80))
for k in ['t_labios','t_bio','t_depi','t_enz','t_exion','t_hydra','t_fotona','t_limp','t_meso','t_onda','t_ojeras','t_rino','t_tatu','t_toxina','t_acne']:
    ext=[e for e in ('jpg','jpeg','png','webp') if os.path.exists(os.path.join(SRC,f'{k}.{e}'))][0]; J.append((k,f'{k}.{ext}',780,68))
for k in ['r_onda1','r_onda2','r_onda3','r_onda4','r_tat1','r_tat2','r_tat3','r_tat4','r_enz1','r_enz2','r_las1','r_las2']:
    ext=[e for e in ('jpg','jpeg','png','webp') if os.path.exists(os.path.join(SRC,f'{k}.{e}'))][0]; J.append((k,f'{k}.{ext}',640,68))
for k in ['r_hy1','r_hy2','r_hy3']: J.append((k,f'{k}.webp',200,82))
J.append(('blog1','blog1.png',960,68)); J.append(('blog_post','blog_post.webp',900,68))
import json
P=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'munnay_datos.json')))['prods']
for p in P:
    f=[x for x in os.listdir(SRC) if x.startswith(f"p{p['id']}.")][0]; J.append((f"p{p['id']}",f,340,68))
for j in J:
    s=go(*j[:2],*j[2:]); tot+=s or 0
shutil.copy(os.path.join(SRC,'logo.svg'),os.path.join(OUT,'logo.svg'))
print(len(J),'imágenes',round(tot/1024),'KB')
big=sorted([(os.path.getsize(os.path.join(OUT,f)),f) for f in os.listdir(OUT)],reverse=True)[:8]; print([(round(a/1024),b) for a,b in big])
