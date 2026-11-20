/* ---------- páginas ---------- */
var P={},FIND=-1,TEAMF="todos",PUBF="todos";
var FOPTS=[["f1","admin"],["f2","admin"],["f3","civil"],["f4","corp"],["f5","corp"],["f6","proc"],["f7","tec"],["f8","inv"]];
var GRUPOS={socios:["ricardo","aurelia","julio","gino"],abogados:["oscar","rosa"],contab:["manuel"],asist:["rodrigo","jhamileth","diego","grecia","santos","milenka"]};
function areaRows(){return AREAS.map(function(a,k){return'<a class="arow rv" style="--d:'+k+'" href="#/area/'+a.id+'" data-ai="'+k+'"><span class="n">0'+(k+1)+'</span><div><h3>'+esc(aT(a))+'</h3><p>'+esc(aD(a))+'</p></div>'+I.arrow+'</a>'}).join("")}
function mem(m,k){return'<button class="mem rv" style="--d:'+(k%4)+'" type="button" data-person="'+m.id+'"><div class="ph"><img src="'+im(m.img)+'" alt="'+esc(m.nombre)+'" loading="lazy"></div><h3>'+esc(m.nombre)+'</h3><small>'+esc(pick(m.rol))+'</small></button>'}
function pubCard(p,k){return'<a class="pub rv" style="--d:'+k+'" href="#/publicacion/'+p.slug+'"><div class="m">'+esc(pick(p.cat))+'</div><h3>'+esc(pick(p.titulo))+'</h3><p>'+esc(pick(p.resumen))+'</p><div class="d">'+fecha(p.fecha)+' · '+p.min+' '+t("min")+'</div></a>'}
function findHTML(){
 var opts=FOPTS.map(function(o,i){return'<button class="opt" type="button" data-find="'+i+'" aria-pressed="'+(FIND===i)+'"><i></i><span>'+t(o[0])+'</span></button>'}).join("");
 return'<div class="find"><div><div class="opts">'+opts+'</div></div><div class="res" id="fres" aria-live="polite">'+findRes()+'</div></div>'}
function findRes(){
 if(FIND<0)return'<div class="k">'+t("orienta")+'</div><h3>'+t("f_pick")+'</h3><p class="mut">'+t("f_pick_p")+'</p><p class="nota">'+t("f_nota")+'</p>';
 var id=FOPTS[FIND][1];
 if(id==="inv"){var e=D.expertise[LANG];return'<div class="k">'+t("orienta")+'</div><h3>'+esc(e.h_inv)+'</h3><p class="mut">'+esc(e.inv_sub)+'</p><div class="chips">'+e.inv_serv.map(function(x){return'<span class="chip">'+esc(x.replace(/[.。]$/,""))+'</span>'}).join("")+'</div><p class="nota">'+t("f_nota")+'</p><a class="btn" href="#/expertise/inversion">'+t("ver_inv")+'</a> <a class="btn ghost" href="#/consulta">'+t("solicitar")+'</a>'}
 var a=aById(id);
 return'<div class="k">'+t("orienta")+'</div><h3>'+esc(aT(a))+'</h3><p class="mut">'+esc(aD(a))+'</p><div class="chips">'+t("tm_"+id).map(function(x){return'<span class="chip">'+esc(x)+'</span>'}).join("")+'</div><p class="nota">'+t("f_nota")+'</p><a class="btn" href="#/area/'+id+'">'+t("ver_area")+'</a> <a class="btn ghost" href="#/consulta">'+t("solicitar")+'</a>'}
function invBlock(full){
 var e=D.expertise[LANG];
 return'<section class="inv sec" id="inversion"><div class="bg" style="background-image:url('+im("sala")+')"></div><div class="wrap"><div class="eyebrow rv">'+esc(e.h_inv)+'</div><h2 class="rv" style="max-width:20ch">'+esc(e.inv_sub)+'</h2><p class="lead rv" style="margin-top:1rem">'+esc(e.inv_intro)+'</p>'+
 '<div class="cols2" style="margin-top:2.4rem"><div class="rv"><h3>'+esc(e.h_inv_serv)+'</h3><ul class="list">'+e.inv_serv.map(function(x){return'<li>'+esc(x)+'</li>'}).join("")+'</ul></div><div class="rv"><h3>'+esc(e.h_sect)+'</h3><ul class="list">'+e.inv_sect.map(function(x){return'<li>'+esc(x)+'</li>'}).join("")+'</ul></div></div>'+
 (full?'<div class="pas rv" style="margin-top:2.6rem">'+e.inv_serv.map(function(x){return'<div style="color:#fff">'+esc(x)+'</div>'}).join("")+'</div><p class="nota" style="color:rgba(255,255,255,.75)">'+t("inv_nota")+'</p>':"")+
 '<div style="margin-top:2rem;display:flex;gap:.8rem;flex-wrap:wrap">'+(full?'<a class="btn light" href="#/consulta">'+t("solicitar")+'</a>':'<a class="btn light" href="#/expertise/inversion">'+t("ver_inv")+'</a>')+'<span class="ej" style="color:#d8bd86;border-color:#d8bd86;align-self:center">ES · EN · 中文</span></div></div></section>'}

P.home=function(){
 var F=D.firma[LANG],e=D.expertise[LANG];
 var hero='<section class="hero"><div class="bg" style="background-image:url('+im("hero")+')"></div><div class="wrap grid"><div class="tags rv"><span>'+t("h_tag1")+'</span><span>'+t("h_tag2")+'</span></div><div><h1 class="rv" style="--d:1">León, Santillán<br>y Bustamante</h1><div class="ab rv" style="--d:2">'+t("abogados")+'</div><p class="rv" style="--d:3;max-width:52ch;opacity:.9;font-size:1.1rem;margin-bottom:2rem">'+esc(F.sub)+'.</p><div class="cta rv" style="--d:4"><a class="btn" href="#/consulta">'+t("solicitar")+'</a><a class="btn light" href="#/expertise">'+t("ver_areas")+'</a></div></div></div>'+
 '<div class="hstats"><div class="wrap"><div><b>14</b><span>'+t("st_anios")+'</span></div><div><b>13</b><span>'+t("st_prof")+'</span></div><div><b>2</b><span>'+t("st_sedes")+'</span></div><div><b>'+CFG.google.nota+' ★</b><span>'+t("st_google").replace("{n}",CFG.google.n)+'</span></div></div></div></section>';
 var areas='<section class="sec"><div class="wrap">'+sh(t("n_exp"),esc(e.sub),esc(e.intro[0]))+'<div class="areas"><div>'+areaRows()+'</div><div class="aimg" aria-hidden="true">'+AREAS.map(function(a,k){return'<img src="'+im(a.img)+'" alt=""'+(k===0?' class="on"':"")+' data-ai="'+k+'">'}).join("")+'</div></div></div></section>';
 var find='<section class="sec alt"><div class="wrap">'+sh(t("orienta"),t("f_h"),t("f_lead"))+findHTML()+'</div></section>';
 var estudio='<section class="sec"><div class="wrap split"><div><div class="eyebrow rv">'+t("n_estudio")+'</div><h2 class="rv">'+esc(F.h_estudio)+'</h2><p class="rv" style="margin-top:1.4rem">'+esc(F.estudio[0])+'</p><p class="rv">'+esc(F.estudio[1])+'</p><a class="link rv" href="#/firma">'+t("conocer")+'</a></div><div class="im rvi"><img src="'+im("equipo")+'" alt="'+esc(CFG.nombre_largo)+'" loading="lazy"></div></div></section>';
 var team='<section class="sec alt"><div class="wrap"><div class="sh"><div><div class="eyebrow rv">'+t("n_prof")+'</div><h2 class="rv">'+t("socios_h")+'</h2></div><a class="link" href="#/profesionales">'+t("ver_todos")+'</a></div><div class="team">'+D.equipo.slice(0,4).map(mem).join("")+'</div></div></section>';
 var pubs='<section class="sec"><div class="wrap"><div class="sh"><div><div class="eyebrow rv">'+t("n_pub")+'</div><h2 class="rv">'+esc(D.pubs_intro[LANG].sub)+'</h2></div><a class="link" href="#/publicaciones">'+t("ver_todos")+'</a></div><div class="pubs">'+D.pubs.map(pubCard).join("")+'</div></div></section>';
 return hero+areas+find+invBlock(false)+estudio+team+pubs+cta()+visit()};
function visit(){return'<section class="sec alt"><div class="wrap cols2"><div><div class="eyebrow rv">'+t("visitenos")+'</div><h2 class="rv">'+t("sedes")+'</h2></div><div class="cinfo rv"><div><h4>Cajamarca</h4><p>'+esc(CFG.dir_cx)+'</p><p class="mut">'+t("horario_t")+' '+CFG.horario+' <span class="ej">'+t("gmaps")+'</span></p></div><div><h4>Lima · San Isidro</h4><p>'+esc(CFG.dir_lima)+'</p><p class="mut">'+t("previa_cita")+'</p></div><a class="link" style="justify-self:start" href="'+CFG.maps+'" target="_blank" rel="noopener">'+t("ver_mapa")+' ↗</a></div></div></section>'}

P.firma=function(a){
 var F=D.firma[LANG],hist=["2012","2014",t("tl_hoy"),t("tl_int"),t("tl_ex")];
 return phead(t("n_firma"),t("n_firma"),esc(F.sub),'<a href="#/">'+t("inicio")+'</a> / '+t("n_firma"))+
 '<section class="sec" id="estudio"><div class="wrap split"><div><div class="eyebrow rv">'+t("n_estudio")+'</div><h2 class="rv">'+esc(F.h_estudio)+'</h2><p class="rv" style="margin-top:1.4rem">'+esc(F.estudio[0])+'</p><p class="rv">'+esc(F.estudio[1])+'</p></div><div class="im rvi"><img src="'+im("equipo")+'" alt="'+esc(CFG.nombre_largo)+'" loading="lazy"><small class="mut">'+t("foto_ref")+'</small></div></div></section>'+
 '<section class="sec alt" id="nosotros"><div class="wrap" style="max-width:920px"><div class="eyebrow rv">'+esc(F.h_nosotros)+'</div><h2 class="rv">'+esc(F.h_nosotros)+'</h2>'+F.nosotros.slice(0,3).map(function(p){return'<p class="rv" style="margin-top:1.2rem">'+esc(p)+'</p>'}).join("")+'<blockquote class="rv" style="margin:2.2rem 0 0;padding:1.4rem 1.8rem;border-left:3px solid var(--acc);font:500 1.35rem/1.5 var(--f-d)">'+esc(F.nosotros[3])+'</blockquote></div></section>'+
 '<section class="sec" id="historia"><div class="wrap split"><div><div class="eyebrow rv">'+esc(F.h_historia)+'</div><h2 class="rv">'+esc(F.h_historia)+'</h2><div class="tl">'+F.historia.map(function(p,i){return'<div class="rv"><b>'+esc(hist[i])+'</b><p class="mut" style="margin:.3rem 0 0">'+esc(p)+'</p></div>'}).join("")+'</div></div><div class="im rvi" style="aspect-ratio:3/4"><img src="'+im("historia")+'" alt="" loading="lazy"></div></div></section>'+
 '<section class="sec alt"><div class="wrap">'+sh(t("porque_s"),esc(F.h_porque))+'<div class="why">'+F.porque.map(function(x){return'<div class="rv"><h3 style="margin-bottom:.7rem">'+esc(x[0])+'</h3><p class="mut" style="margin:0">'+esc(x[1])+'</p></div>'}).join("")+'</div></div></section>'+cta()};

P.profesionales=function(a){
 var I2=D.equipo_intro[LANG];
 var tabs=[["todos",t("g_todos")],["socios",t("g_socios")],["abogados",t("g_abog")],["contab",t("g_cont")],["asist",t("g_asist")]];
 return phead(t("n_prof"),t("n_prof"),esc(I2[0]),'<a href="#/">'+t("inicio")+'</a> / '+t("n_prof"))+
 '<section class="sec"><div class="wrap"><div style="max-width:780px;margin-bottom:2.4rem">'+I2.slice(1).map(function(p){return'<p class="mut">'+esc(p)+'</p>'}).join("")+'</div><div class="tabs" role="group">'+tabs.map(function(x){return'<button class="tab" type="button" data-tf="'+x[0]+'" aria-pressed="'+(TEAMF===x[0])+'">'+x[1]+'</button>'}).join("")+'</div><div class="team" id="tgrid">'+teamGrid()+'</div><p class="nota" style="margin-top:2rem">'+t("foto_ref")+'</p></div></section>'+cta()};
function teamGrid(){var L=D.equipo.filter(function(m){return TEAMF==="todos"||GRUPOS[TEAMF].indexOf(m.id)>-1});return L.map(mem).join("")}
var BIO={};
function personModal(id){
 var m=D.equipo.filter(function(x){return x.id===id})[0];if(!m)return;
 var arts=D.pubs.filter(function(p){return norm(p.autor).indexOf(norm(m.nombre.replace("CPC ","").split(" ")[0]))>-1&&(norm(p.autor).indexOf(norm(m.nombre.split(" ").slice(-2,-1)[0]))>-1||norm(p.autor).indexOf(norm(m.nombre.split(" ").slice(-1)[0]))>-1)});
 openModal('<div class="pm"><img src="'+im(m.img)+'" alt="'+esc(m.nombre)+'"><div class="t"><div class="eyebrow">'+esc(pick(m.rol))+'</div><h2 style="font-size:1.9rem">'+esc(m.nombre)+'</h2>'+
 (BIO[id]?'<p class="mut" style="margin-top:1rem">'+t(BIO[id])+'</p><p class="nota">'+t("bio_fuente")+'</p>':"")+
 '<p style="margin-top:1rem"><a class="link" href="mailto:'+m.correo+'">'+m.correo+'</a></p>'+
 (arts.length?'<h4 style="margin:1.4rem 0 .4rem;font:600 .72rem var(--f-b);letter-spacing:.16em;text-transform:uppercase;color:var(--acc)">'+t("n_pub")+'</h4>'+arts.map(function(p){return'<p style="margin:.3rem 0"><a href="#/publicacion/'+p.slug+'" data-a="close">'+esc(pick(p.titulo))+'</a></p>'}).join(""):"")+
 '<div style="margin-top:1.6rem;display:flex;gap:.6rem;flex-wrap:wrap"><a class="btn sm" href="mailto:'+m.correo+'">'+t("escribir")+'</a><a class="btn sm ghost" href="#/consulta" data-a="close">'+t("solicitar")+'</a></div></div></div>');
}

P.expertise=function(a){
 var e=D.expertise[LANG];
 var blocks=AREAS.map(function(x,k){return'<div class="split" style="margin-bottom:3.4rem;'+(k%2?"direction:rtl":"")+'"><div style="direction:ltr"><div class="eyebrow rv">0'+(k+1)+'</div><h2 class="rv" style="font-size:2rem">'+esc(aT(x))+'</h2><p class="rv mut" style="margin-top:1rem">'+esc(aD(x))+'</p><div class="chips rv">'+t("tm_"+x.id).map(function(c){return'<span class="chip">'+esc(c)+'</span>'}).join("")+'</div><a class="link rv" href="#/area/'+x.id+'">'+t("ver_area")+'</a></div><div class="im rvi" style="direction:ltr"><img src="'+im(x.img)+'" alt="" loading="lazy"></div></div>'}).join("");
 return phead(t("n_exp"),esc(e.sub),esc(e.intro[0]),'<a href="#/">'+t("inicio")+'</a> / '+t("n_exp"))+
 '<section class="sec" id="areas"><div class="wrap"><p class="lead rv" style="margin-bottom:3rem">'+esc(e.intro[1])+'</p>'+blocks+'</div></section>'+invBlock(true)+cta()};
P.area=function(id){
 var a=aById(id);if(!a)return P.nf();
 var rel=D.pubs.filter(function(p){return t("rel_"+id).indexOf(p.slug)>-1});
 var docs=t("docs_com").concat([t("doc_"+id)]);
 return phead(t("n_exp"),esc(aT(a)),esc(aD(a)),'<a href="#/">'+t("inicio")+'</a> / <a href="#/expertise">'+t("n_exp")+'</a> / '+esc(aT(a)))+
 '<section class="sec"><div class="wrap split"><div><div class="eyebrow rv">'+t("temas")+'</div><div class="chips rv">'+t("tm_"+id).map(function(c){return'<span class="chip" style="font-size:.9rem;padding:.45rem .9rem">'+esc(c)+'</span>'}).join("")+'</div>'+
 '<h3 class="rv" style="margin-top:2.4rem">'+t("docs_h")+'</h3><ul class="checks rv">'+docs.map(function(d){return'<li>'+esc(d)+'</li>'}).join("")+'</ul><p class="nota rv">'+t("docs_nota")+'</p>'+
 '<div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.6rem"><a class="btn" href="#/consulta?area='+id+'">'+t("solicitar")+'</a><a class="btn wa" href="'+wa(t("wa_area").replace("{area}",aT(a)))+'" target="_blank" rel="noopener">WhatsApp</a></div></div>'+
 '<div><div class="im rvi"><img src="'+im(a.img)+'" alt="" loading="lazy"></div>'+(rel.length?'<h4 style="margin:2rem 0 .5rem;font:600 .72rem var(--f-b);letter-spacing:.16em;text-transform:uppercase;color:var(--acc)">'+t("rel_h")+'</h4>'+rel.map(function(p){return'<a class="pub" style="margin-bottom:.8rem" href="#/publicacion/'+p.slug+'"><div class="m">'+esc(pick(p.cat))+'</div><h3 style="font-size:1.1rem;margin:0">'+esc(pick(p.titulo))+'</h3></a>'}).join(""):"")+'</div></div></section>'+
 '<section class="sec alt"><div class="wrap"><h3 style="margin-bottom:1.2rem">'+t("otras")+'</h3><div class="tabs">'+AREAS.filter(function(x){return x.id!==id}).map(function(x){return'<a class="tab" style="text-decoration:none" href="#/area/'+x.id+'">'+esc(aT(x))+'</a>'}).join("")+'<a class="tab" style="text-decoration:none" href="#/expertise/inversion">'+t("n_inv")+'</a></div></div></section>'+cta()};

P.publicaciones=function(){
 var cats=[];D.pubs.forEach(function(p){var c=pick(p.cat);if(cats.indexOf(c)<0)cats.push(c)});
 var L=D.pubs.filter(function(p){return PUBF==="todos"||pick(p.cat)===PUBF});
 return phead(t("n_pub"),t("n_pub"),esc(D.pubs_intro[LANG].sub),'<a href="#/">'+t("inicio")+'</a> / '+t("n_pub"))+
 '<section class="sec"><div class="wrap"><p class="lead" style="margin-bottom:2rem">'+esc(D.pubs_intro[LANG].intro)+'</p><div class="tabs" role="group">'+[["todos",t("g_todos")]].concat(cats.map(function(c){return[c,c]})).map(function(x){return'<button class="tab" type="button" data-pf="'+esc(x[0])+'" aria-pressed="'+(PUBF===x[0])+'">'+esc(x[1])+'</button>'}).join("")+'</div><div class="pubs" id="pgrid">'+L.map(pubCard).join("")+'</div></div></section>'+cta()};
function artBody(b){
 return b.map(function(x){
  if(x[0]==="h")return'<h2>'+esc(x[1])+'</h2>';
  if(x[0]==="ul")return'<ul>'+x[1].map(function(l){return'<li>'+esc(l)+'</li>'}).join("")+'</ul>';
  var s=x[1];
  if(s.indexOf("•")>-1){var ln=s.split("\n").map(function(z){return z.trim()}).filter(Boolean),intro=ln.filter(function(z){return z[0]!=="•"}),it=ln.filter(function(z){return z[0]==="•"});return(intro.length?'<p>'+esc(intro.join(" "))+'</p>':"")+'<ul>'+it.map(function(z){return'<li>'+esc(z.replace(/^•\s*/,""))+'</li>'}).join("")+'</ul>'}
  if(/^\[\d+\]/.test(s))return'<p class="ref">'+esc(s)+'</p>';
  if(s.length<70&&!/[.:;?]$/.test(s)&&s.indexOf(" ")>-1)return'<h2>'+esc(s)+'</h2>';
  return'<p>'+esc(s)+'</p>'}).join("")}
P.publicacion=function(slug){
 var p=pubBy(slug);if(!p)return P.nf();
 var others=D.pubs.filter(function(x){return x.slug!==slug});
 return phead(pick(p.cat),esc(pick(p.titulo)),fecha(p.fecha)+' · '+p.min+' '+t("min")+' · '+t("por")+' '+esc(p.autor),'<a href="#/">'+t("inicio")+'</a> / <a href="#/publicaciones">'+t("n_pub")+'</a>')+
 '<section class="sec"><article class="wrap art">'+(LANG!=="es"?'<p class="nota">'+t("art_es")+'</p>':"")+artBody(p.cuerpo)+'<div style="margin-top:3rem;padding-top:1.6rem;border-top:1px solid var(--line);display:flex;gap:.8rem;flex-wrap:wrap"><a class="btn ghost" href="#/publicaciones">← '+t("n_pub")+'</a><a class="btn" href="#/consulta">'+t("solicitar")+'</a></div></article></section>'+
 '<section class="sec alt"><div class="wrap"><h3 style="margin-bottom:1.4rem">'+t("mas_pub")+'</h3><div class="pubs" style="grid-template-columns:repeat(2,1fr)">'+others.map(pubCard).join("")+'</div></div></section>'};

P.contacto=function(){
 var C=D.contacto[LANG].campos,cn=D.contacto[LANG];
 return phead(t("n_contacto"),t("n_contacto"),esc(cn.intro),'<a href="#/">'+t("inicio")+'</a> / '+t("n_contacto"))+
 '<section class="sec"><div class="wrap split"><div class="card"><h3>'+esc(cn.h_form)+'</h3><p class="mut">'+esc(cn.form_sub)+'</p><form class="form" id="cform" novalidate style="margin-top:1.2rem"><div class="fg"><label class="f">'+esc(C[0])+'<input name="n" autocomplete="name" required></label><label class="f">'+esc(C[1])+'<input name="e" type="email" autocomplete="email" required></label></div><label class="f">'+esc(C[2])+'<input name="a" required></label><label class="f">'+esc(C[3])+'<textarea name="m" required></textarea></label><label class="ck"><input type="checkbox" name="ok" required><span>'+esc(C[4].replace(/\s*\*$/,""))+' <a href="#/privacidad" data-a="priv">'+t("ver_priv")+'</a></span></label><p class="nota" style="margin:0">'+t("conf_nota")+'</p><div style="display:flex;gap:.7rem;flex-wrap:wrap"><button class="btn" type="submit" data-via="mail">'+t("env_correo")+'</button><button class="btn wa" type="submit" data-via="wa">'+t("env_wa")+'</button></div><div id="cmsg" class="mut" role="status"></div></form></div>'+
 '<div class="cinfo"><div><h4>Cajamarca</h4><p>'+esc(CFG.dir_cx)+'</p><p class="mut">'+t("horario_t")+' '+CFG.horario+' <span class="ej">'+t("gmaps")+'</span></p></div><div><h4>Lima · San Isidro</h4><p>'+esc(CFG.dir_lima)+'</p><p class="mut">'+t("previa_cita")+'</p></div><div><h4>'+t("f_contacto")+'</h4><p><a href="mailto:'+CFG.email+'">'+CFG.email+'</a></p><p><a href="tel:'+CFG.tel_raw+'">'+t("central")+' '+CFG.tel+'</a></p><p><a href="'+wa(t("wa_hola"))+'" target="_blank" rel="noopener">WhatsApp +51 943 022 067</a></p></div><a class="link" style="justify-self:start" href="'+CFG.maps+'" target="_blank" rel="noopener">'+t("ver_mapa")+' ↗</a><div class="card" style="padding:1.4rem"><b>'+t("ya_cliente")+'</b><p class="mut" style="margin:.4rem 0 1rem">'+t("ya_cliente_p")+'</p><a class="btn sm ghost" href="#/portal">'+t("n_portal")+'</a></div></div></div></section>'};

/* Agenda de consulta (ejemplo) */
var B={area:"",mod:"",day:"",slot:"",paso:1};
var SLOTS=["9:30","10:30","11:30","12:30","14:30","15:30","16:30"];
function dias(){var o=[],d=new Date();d.setHours(12,0,0,0);while(o.length<10){d.setDate(d.getDate()+1);if(CFG.dias_hab.indexOf(d.getDay())>-1)o.push(new Date(d))}return o}
function dLabel(d){var w=t("dias_cor")[d.getDay()];return{w:w,n:d.getDate()+" "+t("meses_cor")[d.getMonth()],iso:d.toISOString().slice(0,10),full:t("dias")[d.getDay()]+" "+d.getDate()+" "+t("meses_cor")[d.getMonth()]}}
function bookHTML(){
 var s=B.paso,st=["bk1","bk2","bk3","bk4"].map(function(k,i){return'<span class="'+(i+1<=s?"on":"")+'">'+t(k)+'</span>'}).join("");
 var h='<div class="steps">'+st+'</div>';
 if(s===1)h+='<div class="opts">'+AREAS.map(function(a){return'<button class="opt" type="button" data-bk-area="'+a.id+'" aria-pressed="'+(B.area===a.id)+'"><i></i><span>'+esc(aT(a))+'</span></button>'}).join("")+'<button class="opt" type="button" data-bk-area="inv" aria-pressed="'+(B.area==="inv")+'"><i></i><span>'+esc(D.expertise[LANG].h_inv)+'</span></button></div>';
 if(s===2)h+='<div class="opts">'+["cx","lima","virt"].map(function(m){return'<button class="opt" type="button" data-bk-mod="'+m+'" aria-pressed="'+(B.mod===m)+'"><i></i><span><b>'+t("mod_"+m)+'</b><br><small class="mut">'+t("mod_"+m+"_d")+'</small></span></button>'}).join("")+'</div>';
 if(s===3){h+='<div class="days">'+dias().map(function(d){var l=dLabel(d);return'<button class="day" type="button" data-bk-day="'+l.iso+'" data-lbl="'+esc(l.full)+'" aria-pressed="'+(B.day===l.iso)+'"><small>'+l.w+'</small>'+l.n+'</button>'}).join("")+'</div>';
  h+=B.day?'<div class="slots">'+SLOTS.map(function(x){return'<button class="slot" type="button" data-bk-slot="'+x+'" aria-pressed="'+(B.slot===x)+'">'+x+'</button>'}).join("")+'</div>':'<p class="mut" style="margin-top:1rem">'+t("bk_dia")+'</p>';
  h+='<p class="nota">'+t("bk_nota")+' <span class="ej">'+t("ejemplo")+'</span></p>'}
 if(s===4)h+='<form class="form" id="bform" novalidate><div class="fg"><label class="f">'+t("c_nombre")+'<input name="n" autocomplete="name" required></label><label class="f">'+t("c_tel")+'<input name="t" type="tel" autocomplete="tel" required></label></div><label class="f">'+t("c_resumen")+'<textarea name="m" style="min-height:100px"></textarea></label><p class="nota" style="margin:0">'+t("conf_nota")+'</p><div class="card" style="padding:1.1rem;background:var(--bg2)">'+bookResumen()+'</div><div style="display:flex;gap:.7rem;flex-wrap:wrap"><button class="btn wa" type="submit" data-via="wa">'+t("env_wa")+'</button><button class="btn ghost" type="submit" data-via="mail">'+t("env_correo")+'</button></div></form>';
 if(s<4)h+='<div style="display:flex;justify-content:space-between;margin-top:1.6rem">'+(s>1?'<button class="btn ghost sm" type="button" data-bk="prev">← '+t("atras")+'</button>':"<span></span>")+'<button class="btn sm" type="button" data-bk="next" '+(bookOk()?"":"disabled style=\"opacity:.45;pointer-events:none\"")+'>'+t("siguiente")+' →</button></div>';
 else h+='<div style="margin-top:1rem"><button class="btn ghost sm" type="button" data-bk="prev">← '+t("atras")+'</button></div>';
 return h}
function bookOk(){return B.paso===1?!!B.area:B.paso===2?!!B.mod:B.paso===3?(B.day&&B.slot):true}
function areaName(id){return id==="inv"?D.expertise[LANG].h_inv:aT(aById(id))}
function bookResumen(){var lbl=$$("[data-bk-day]").filter(function(e){return e.dataset.bkDay===B.day})[0];var dl=B.dlbl||B.day;return'<b>'+esc(areaName(B.area))+'</b><br>'+t("mod_"+B.mod)+'<br>'+esc(dl)+' · '+B.slot+' <span class="ej">'+t("ejemplo")+'</span>'}
P.consulta=function(arg){
 if(arg&&arg.indexOf("area=")>-1){var q=arg.split("area=")[1];if(q)B.area=q}
 return phead(t("solicitar"),t("bk_h"),t("bk_lead"),'<a href="#/">'+t("inicio")+'</a> / '+t("solicitar"))+
 '<section class="sec"><div class="wrap split"><div class="card" id="bk">'+bookHTML()+'</div><div class="cinfo"><div><h4>'+t("bk_que")+'</h4><p class="mut">'+t("bk_que_p")+'</p></div><div><h4>Cajamarca</h4><p>'+esc(CFG.dir_cx)+'</p><p class="mut">'+t("horario_t")+' '+CFG.horario+' <span class="ej">'+t("gmaps")+'</span></p></div><div><h4>Lima</h4><p>'+esc(CFG.dir_lima)+'</p><p class="mut">'+t("previa_cita")+'</p></div></div></div></section>'};

/* Portal del cliente (ejemplo) */
P.portal=function(){
 return phead(t("n_portal"),t("n_portal"),t("pt_lead"),'<a href="#/">'+t("inicio")+'</a> / '+t("n_portal"))+
 '<section class="sec"><div class="wrap" style="max-width:980px"><p class="nota"><span class="ej">'+t("ejemplo")+'</span> '+t("pt_nota")+'</p><div class="card" id="pt">'+portalLogin()+'</div></div></section>'};
function portalLogin(){return'<form class="form" id="pform" novalidate style="max-width:460px"><h3>'+t("pt_h")+'</h3><label class="f">'+t("pt_cod")+'<input name="c" placeholder="DEMO-2026" autocomplete="off"></label><div id="pmsg" class="mut" role="status">'+t("pt_hint")+'</div><button class="btn" type="submit">'+t("pt_ing")+'</button></form>'}
function portalCase(){
 var d=new Date(),f=function(n){var x=new Date(d);x.setDate(x.getDate()+n);return(x.getDate())+" "+t("meses_cor")[x.getMonth()]+" "+x.getFullYear()};
 var steps=[[t("pt_s1"),f(-96),1],[t("pt_s2"),f(-80),1],[t("pt_s3"),f(-52),1],[t("pt_s4"),f(18),0],[t("pt_s5"),"—",0]];
 return'<div class="case"><div class="h"><div><div class="ej">'+t("ejemplo")+'</div><h3 style="margin-top:.5rem">'+t("pt_caso")+'</h3><p class="mut" style="margin:.2rem 0 0">'+t("pt_exp")+' 00000-2026-0-0601-JR-CI-01</p></div><button class="btn sm ghost" type="button" data-a="pexit">'+t("pt_sal")+'</button></div><div class="b"><div><h4 style="font:600 .72rem var(--f-b);letter-spacing:.16em;text-transform:uppercase;color:var(--acc);margin-bottom:1rem">'+t("pt_est")+'</h4><ul class="prog">'+steps.map(function(s){return'<li class="'+(s[2]?"ok":"")+'"><div><b>'+s[0]+'</b><small>'+s[1]+'</small></div></li>'}).join("")+'</ul></div><div><h4 style="font:600 .72rem var(--f-b);letter-spacing:.16em;text-transform:uppercase;color:var(--acc);margin-bottom:.6rem">'+t("pt_prox")+'</h4><p><b>'+f(18)+'</b><br>'+t("pt_aud")+'</p><h4 style="font:600 .72rem var(--f-b);letter-spacing:.16em;text-transform:uppercase;color:var(--acc);margin:1.4rem 0 .6rem">'+t("pt_docs")+'</h4><ul class="checks" style="margin:0"><li>'+t("pt_d1")+'</li><li>'+t("pt_d2")+'</li><li>'+t("pt_d3")+'</li></ul><a class="btn sm wa" style="margin-top:1.2rem" href="'+wa(t("pt_wa"))+'" target="_blank" rel="noopener">'+t("pt_msg")+'</a></div></div></div>'}

P.privacidad=function(){return phead(t("privacidad"),t("privacidad"),"",'<a href="#/">'+t("inicio")+'</a> / '+t("privacidad"))+'<section class="sec"><div class="wrap art"><p class="nota"><span class="ej">'+t("ejemplo")+'</span> '+t("priv_nota")+'</p>'+t("priv_txt").map(function(p){return'<p>'+esc(p)+'</p>'}).join("")+'</div></section>'};

/* Comparativa con la web actual (solo español: es material para el estudio) */
P.mejoras=function(){
 var R=[["Inicio","Solo el título con la foto y los datos de contacto en el pie.","Presentación completa: cifras, áreas, orientación por situación, inversión, estudio, socios y publicaciones."],
 ["Áreas de práctica","Cinco áreas en una sola página.","Una página por área, con temas, lista orientativa de documentos para la primera consulta y artículos relacionados."],
 ["Cómo empezar","Formulario de contacto y enlace a WhatsApp con un mensaje genérico.","Agenda de consulta por pasos (área, modalidad, fecha y hora) que llega armada a WhatsApp o al correo del estudio."],
 ["Orientación al visitante","No hay.","\"¿Cuál es su situación?\": el visitante elige y ve el área que corresponde, con aviso de que es una orientación general."],
 ["Clientes actuales","No hay.","Portal de seguimiento de caso (ejemplo): etapas, próxima actuación y documentos. En producción requiere sistema y acceso seguro."],
 ["Equipo","Fotos, nombres, cargos y correos de 13 profesionales.","Filtro por grupo (socios, abogados, contabilidad, asistentes), ficha por persona con sus publicaciones."],
 ["Publicaciones","Tres artículos en lista, sin filtro.","Filtro por materia, lectura cómoda con barra de avance, artículos relacionados y enlace a consulta."],
 ["Búsqueda","No hay.","Buscador de áreas, artículos y profesionales."],
 ["Idiomas","Español, inglés y chino (se mantienen).","Español, inglés y chino en toda la web, incluidas las funciones nuevas."],
 ["Sedes y horario","Direcciones sin horario ni mapa; el horario aparece solo en Google Maps.","Sedes de Cajamarca y Lima con horario (de Google Maps) y enlace al mapa."],
 ["Diseño","Una sola versión.","Dos versiones para elegir: clásica (marfil y burdeos) y sala de juntas (grafito y bronce)."]];
 return phead("Propuesta","Su web actual y la propuesta","Qué se mantiene y qué cambia. La información de la columna izquierda se verificó en estudioleon.pe el 19-11-2026.",'<a href="#/">Inicio</a> / Comparativa')+
 '<section class="sec"><div class="wrap"><div style="overflow:auto"><table class="cmp"><thead><tr><th></th><th>Su web actual (estudioleon.pe)</th><th>Propuesta</th></tr></thead><tbody>'+R.map(function(r){return'<tr><td>'+r[0]+'</td><td class="mut">'+r[1]+'</td><td>'+r[2]+'</td></tr>'}).join("")+'</tbody></table></div><p class="nota">Se conservan sus textos, fotos, equipo, publicaciones y los tres idiomas. El portal del cliente, los horarios de la agenda y el texto de privacidad son de ejemplo y deben ser revisados por el estudio.</p></div></section>'};
P.nf=function(){return phead("404","—","")+'<section class="sec"><div class="wrap"><a class="btn" href="#/">'+t("inicio")+'</a></div></section>'};
