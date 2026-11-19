# Convierte el texto extraído del sitio de Munnay (/tmp/mn) a munnay_datos.json (contenido propio del negocio).
import json,re,sys
SRC=sys.argv[1] if len(sys.argv)>1 else '/tmp/mn'
S=json.load(open(f'{SRC}/treat_struct.json')); P=json.load(open(f'{SRC}/prods2.json'))
GRUPOS=[
 ("Tratamientos Estéticos",[("laser-fotona","Reducción de manchas"),("tatuaje","Eliminación de Tatuajes"),("mesoterapia-facial","Mesoterapia Facial"),("aumento-de-labios-con-acido-hialuronico","Aumento de Labios con Ácido Hialurónico"),("rinomodelacion-con-acido-hialuronico","Rinomodelación con Ácido Hialurónico"),("reduccion-de-ojeras","Reducción de Ojeras")]),
 ("Tratamientos Faciales",[("limpieza-facial","Limpieza Facial"),("hydrafacial-syndeo-cajamarca","Hydrafacial Syndeo"),("tratamiento-de-acne-y-secuelas","Tratamiento de Acné y Secuelas")]),
 ("Tratamientos Corporales",[("depilacion-laser","Depilación Láser"),("onda-coolwaves","Reducción de Grasa"),("enzimas-pb-serum","Enzimas PB Serum")]),
 ("Antienvejecimiento",[("bioestimuladores","Bioestimuladores"),("toxina-botulinica","Toxina Botulínica"),("exion","Exion")]),
]
IMGK={"laser-fotona":"t_fotona","tatuaje":"t_tatu","mesoterapia-facial":"t_meso","aumento-de-labios-con-acido-hialuronico":"t_labios","rinomodelacion-con-acido-hialuronico":"t_rino","reduccion-de-ojeras":"t_ojeras","limpieza-facial":"t_limp","hydrafacial-syndeo-cajamarca":"t_hydra","tratamiento-de-acne-y-secuelas":"t_acne","depilacion-laser":"t_depi","onda-coolwaves":"t_onda","enzimas-pb-serum":"t_enz","bioestimuladores":"t_bio","toxina-botulinica":"t_toxina","exion":"t_exion"}
RES={"laser-fotona":["r_las1","r_las2"],"tatuaje":["r_tat1","r_tat2","r_tat3","r_tat4"],"enzimas-pb-serum":["r_enz1","r_enz2"],"onda-coolwaves":["r_onda1","r_onda2","r_onda3","r_onda4"],"bioestimuladores":["t_bio"]}
PREMIOS={"hydrafacial-syndeo-cajamarca":["r_hy1","r_hy2","r_hy3"]}
MARCAS={"aumento-de-labios-con-acido-hialuronico":["Juvéderm","Skinfill"],"rinomodelacion-con-acido-hialuronico":["Juvéderm","Skinfill"],"depilacion-laser":["Motus AX","Deka"],"laser-fotona":["Fotona StarWalker MaQX"],"tatuaje":["Fotona StarWalker MaQX"],"hydrafacial-syndeo-cajamarca":["HydraFacial Syndeo"],"mesoterapia-facial":["RRS®HA"],"exion":["BTL EXION"],"onda-coolwaves":["Onda Coolwaves"]}
# categorías de producto sugeridas (rutina en casa)
RUT={"laser-fotona":["Protector Solar","Vitamina C"],"tatuaje":["Protector Solar","Piel Sensible"],"mesoterapia-facial":["Serum Hidratante","Crema Hidratante"],"aumento-de-labios-con-acido-hialuronico":["Serum Hidratante"],"rinomodelacion-con-acido-hialuronico":["Protector Solar"],"reduccion-de-ojeras":["Contorno de ojos"],"limpieza-facial":["Limpiadores","Exfoliante Tónico"],"hydrafacial-syndeo-cajamarca":["Serum Hidratante","Protector Solar"],"tratamiento-de-acne-y-secuelas":["Acné y Piel Grasa","Limpiadores"],"depilacion-laser":["Piel Sensible","Protector Solar"],"onda-coolwaves":["Suplementos"],"enzimas-pb-serum":["Suplementos"],"bioestimuladores":["Retinol","Antienvejecimiento"],"toxina-botulinica":["Antienvejecimiento","Protector Solar"],"exion":["Antienvejecimiento","Retinol"]}
def isnum(l): return re.match(r'^\d\.\s*\S',l)
def mkitems(raw,slug):
    out=[];cur=None
    KNOWN=["Duración de la sesión","Tiempo de recuperación","Frecuencia del tratamiento","Frecuencia recomendada","¿Qué tratan los bioestimuladores?","Son seguros y compatibles con otras técnicas","¿Qué trata la toxina botulínica?","Es segura y personalizada"]
    for l in raw:
        if re.search(r'Resultados que hablan|Nuestros Resultados',l): continue
        if re.match(r'^(\d)?\s*(cosas|pasos)|^\d (pasos|cosas)',l,re.I): continue
        m=re.match(r'^\d\.\s*(.+)$',l)
        if m and len(l)<110: cur={'t':m.group(1).strip(),'ps':[],'li':[]}; out.append(cur); continue
        body=re.sub(r'^\d\.\s*','',l); t=next((k for k in KNOWN if body.startswith(k) and len(body)>len(k)+20),None)
        if t: cur={'t':t,'ps':[body[len(t):].strip()],'li':[]}; out.append(cur); continue
        if cur is None: cur={'t':l.rstrip(':'),'ps':[],'li':[]}; out.append(cur); continue
        if l.startswith('¡'): continue
        # bullets: corto y sin punto final
        if len(l)<75 and not l.endswith('.') and not l.endswith(':'): cur['li'].append(l)
        else: cur['ps'].append(l)
    return out
def mkmid(mid):
    bl=[];cur=None
    for l in mid:
        if re.match(r'^\d\.\s',l):
            if cur is None or not cur.get('steps'): cur={'h':'Paso a paso','steps':[]}; bl.append(cur)
            cur['steps'].append({'t':re.sub(r'^\d\.\s*','',l).rstrip(':'),'p':''}); continue
        if cur and cur.get('steps') and cur['steps'][-1]['p']=='' and len(l)>60: cur['steps'][-1]['p']=l; continue
        if len(l)<100 and not l.endswith('.'):
            if cur and re.search(r'Zonas|Tipos',cur.get('h','')) and len(l)<30: cur['chips'].append(l); continue
            cur={'h':l,'ps':[],'chips':[]}; bl.append(cur)
        else:
            if cur is None: cur={'h':'','ps':[],'chips':[]}; bl.append(cur)
            cur.setdefault('ps',[]).append(l)
    return bl
T=[];slugs={}
for gi,(gn,items) in enumerate(GRUPOS):
    for slug,nombre in items:
        d=S[slug]; hero=d['hero']
        # deduplicar títulos repetidos al inicio
        h=[x for i,x in enumerate(hero) if x not in hero[:i]]
        premios_t=''
        for x in list(h):
            if x.isupper(): premios_t=x.capitalize(); h.remove(x)
        k=next((i for i,x in enumerate(h) if len(x)>140),len(h))
        pre=h[:k]; ps=h[k:]
        tag=pre[-1] if pre else ''; kick=pre[0] if len(pre)>1 and pre[0]!=nombre else ''
        if kick and kick==tag: kick=''
        sub=tag
        h=[kick]
        cierre=d['cierre']
        cta_t=cierre[0] if cierre and not cierre[0].startswith(('Agenda','Reserva','Consulta')) else '¿Lista para empezar?'
        T.append(dict(slug=slug,nombre=nombre,grupo=gn,gi=gi,img=IMGK[slug],h=h[0],sub=sub,premios_t=premios_t,intro=ps,
            ben=[{'t':a,'p':b} for a,b in d['ben']],mid=mkmid(d['mid']),cinco_t=d['cinco_t'] or '',items=mkitems(d['items'],slug),
            cta=cta_t,res=RES.get(slug,[]),premios=PREMIOS.get(slug,[]),marcas=MARCAS.get(slug,[]),rutina=RUT.get(slug,[])))
for t in T:
    t['mid']=[b for b in t['mid'] if b.get('ps') or b.get('chips') or b.get('steps')]
    if t['slug']=='laser-fotona':
        t['mid']=[b for b in t['mid'] if not b.get('h','').startswith('Tipos')]+[{'h':'Tipos de manchas que tratamos','ps':[],'chips':['Melasma','Lentigos','Pecas','Lunares']},{'h':'','ps':['Trata tus manchas a tiempo.'],'chips':[]}]
    if t['slug']=='limpieza-facial':
        t['mid']=[b for b in t['mid'] if not b.get('h','').startswith(('Conoce','Paso a paso de'))]
# Exion: ficha técnica "Etiqueta: valor"
for t in T:
    if t['slug']=='exion':
        fac=[]
        for it in t['items']:
            pass
        raw=S['exion']['items']; t['ficha']=[tuple(x.split(':',1)) for x in raw if ':' in x and not x.startswith('Información')]
        t['ficha']=[[a.strip(),b.strip()] for a,b in t['ficha']]; t['items']=[]; t['cinco_t']='Información técnica del tratamiento'
        t['mid'].append({'h':'','ps':[S['exion']['cierre'][0]],'chips':[]}) if S['exion']['cierre'] and not S['exion']['cierre'][0].startswith('Agenda') else None
# hydrafacial: los "3 pasos" son imagen; el primer item es el título de las 5 cosas
for t in T:
    if t['slug']=='hydrafacial-syndeo-cajamarca': t['items']=[i for i in t['items'] if i['t'] and not i['t'].startswith('5 cosas')]
# productos
cats=sorted(set(c for p in P for c in p['cats']))
def marca(n):
    for m in ['MEDIK8','TIZO','ISDIN','MUNNAY']:
        if n.upper().startswith(m): return m.capitalize() if m!='MEDIK8' else 'Medik8'
    return 'Munnay' if 'colageno' in n.lower() or 'moringa' in n.lower() else ''
prods=[dict(id=int(p['id']),n=re.sub(r'\s+',' ',p['n']).strip(),p=p['p'],c=p['cats'],m=marca(p['n']),sku=p['sku'],st=p['stock'],ag=bool(p['agotado']),img='p'+p['id']) for p in P]
nos=dict(
 titulo="Transformando la belleza en bienestar",desde=2021,
 intro="Desde el 2021 somos pioneros en tratamientos médicos estéticos en Cajamarca, ofreciendo tecnología de última generación y un equipo altamente calificado para cuidar tu piel y realzar tu mejor versión.",
 equipo_t="Un equipo apasionado",equipo_p="Contamos con un equipo multidisciplinario de profesionales altamente capacitados en medicina estética, dermatología y cuidado integral de la piel.",
 equipo=[dict(n="Dra. Sofía Terrones",r="Méd. Cirujano",img="team1"),dict(n="Dr. Carlos Martínez",r="Méd. Especialista Cirujano",img="team5"),dict(n="Belén García",r="Tec. Enfermera",img="team2"),dict(n="Pilar Chávez",r="Tec. en Fisioterapia",img="team4"),dict(n="Dra. Mónica Castillo",r="Méd. Cirujano",img="team3")],
 mision="Proporcionar servicios estéticos de alta calidad y tecnología avanzada, enfocados en realzar la belleza y confianza de nuestros clientes. Ofrecemos atención personalizada y segura, garantizada por un equipo de expertos comprometidos con la excelencia. Nos dedicamos a crear un entorno de trabajo enriquecedor, siempre poniendo las necesidades y deseos de nuestros clientes como nuestra máxima prioridad.",
 vision="En los próximos 5 años, nos consolidaremos como líderes indiscutibles en la industria de la estética en el norte del Perú, ofreciendo servicios personalizados y seguros que transformen la experiencia estética de nuestros clientes. Nos esforzamos porque nuestra marca, Munnay, sea reconocida como un símbolo de confianza, empoderamiento y autoestima, ayudando a cada individuo a alcanzar una verdadera autoconfianza y autenticidad.")
def limpia(o):
    if isinstance(o,str):
        o=re.sub(r' ([,.;:!?])',r'\1',o)
        for a,b in [(' e s la',' es la'),('t ipo','tipo'),('e n profundidad','en profundidad'),('e nrojecimiento','enrojecimiento'),(' n profundidad',' en profundidad')]: o=o.replace(a,b)
        return re.sub(r'\s+',' ',o).strip()
    if isinstance(o,list): return [limpia(x) for x in o]
    if isinstance(o,dict): return {k:limpia(v) for k,v in o.items()}
    return o
json.dump(limpia(dict(grupos=[dict(n=g,items=[dict(slug=s,n=n) for s,n in it]) for g,it in GRUPOS],trat=T,prods=prods,cats=cats,nos=nos)),open('munnay_datos.json','w'),ensure_ascii=False,indent=1)
print(len(T),len(prods),cats)
for t in T:
    print(t['slug'][:22],'| sub:',t['sub'][:30],'| intro',len(t['intro']),'| mid',[(b.get('h','')[:25],len(b.get('ps',[])),len(b.get('chips',[])),len(b.get('steps',[]))) for b in t['mid']],'| items',[(i['t'][:18],len(i['ps']),len(i['li'])) for i in t['items']][:6])
