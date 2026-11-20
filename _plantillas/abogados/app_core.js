(function(){
"use strict";
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var D=CFG.datos,UI=CFG.ui,LANG="es",VIEW="1";
function t(k){var o=UI[LANG]&&UI[LANG][k];return o!=null?o:(UI.es[k]!=null?UI.es[k]:k)}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function im(k){return IMG[k]||""}
function pick(o){return o&&typeof o==="object"&&!Array.isArray(o)?(o[LANG]!=null?o[LANG]:o.es):o}
function wa(msg){return"https://wa.me/"+CFG.wa+"?text="+encodeURIComponent(msg)}
function toast(m){var e=$("#toast");e.textContent=m;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove("on")},2800)}
var I={
 arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16M14 6l6 6-6 6"/></svg>',
 search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
 menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
 x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6 6 18"/></svg>',
 wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.2-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.900c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.300-.2.300-.9.900-.9 2.200 0 1.300.9 2.500 1 2.700.1.200 1.800 2.800 4.400 3.900 1.600.7 2.300.7 3.100.6.500-.1 1.500-.6 1.700-1.200.2-.6.200-1.100.1-1.200-.1-.1-.2-.2-.5-.3Z"/></svg>',
 pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s7-6.200 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21Z"/><circle cx="12" cy="9.500" r="2.500"/></svg>'
};
var AREAS=[{id:"admin",img:"a_admin"},{id:"civil",img:"a_civil"},{id:"corp",img:"a_corp"},{id:"proc",img:"a_proc"},{id:"tec",img:"a_tec"}];
AREAS.forEach(function(a,i){a.i=i});
function aT(a){return D.expertise[LANG].areas[a.i][0]}function aD(a){return D.expertise[LANG].areas[a.i][1]}
function aById(id){return AREAS.filter(function(a){return a.id===id})[0]}
function pubBy(slug){return D.pubs.filter(function(p){return p.slug===slug})[0]}
function fecha(iso){var p=iso.split("-"),m=t("meses");if(LANG==="zh")return p[0]+"年"+(+p[1])+"月"+(+p[2])+"日";if(LANG==="en")return m[+p[1]-1]+" "+(+p[2])+", "+p[0];return(+p[2])+" de "+m[+p[1]-1]+" de "+p[0]}
function sh(eb,h,lead){return'<div class="sh"><div><div class="eyebrow rv">'+esc(eb)+'</div><h2 class="rv">'+h+'</h2>'+(lead?'<p class="lead rv" style="margin-top:1rem">'+lead+'</p>':"")+'</div></div>'}
function phead(eb,h,lead,crumb){return'<section class="phead"><div class="wrap">'+(crumb?'<div class="crumb">'+crumb+'</div>':"")+'<div class="eyebrow">'+esc(eb)+'</div><h1>'+h+'</h1>'+(lead?'<p>'+lead+'</p>':"")+'</div></section>'}
function cta(){return'<section class="sec" style="background:var(--brand);color:var(--on-brand)"><div class="wrap" style="display:flex;justify-content:space-between;align-items:center;gap:2rem;flex-wrap:wrap"><div style="max-width:640px"><h2 style="color:inherit">'+t("cta_h")+'</h2><p style="margin:.8rem 0 0;opacity:.9">'+t("cta_p")+'</p></div><div style="display:flex;gap:.8rem;flex-wrap:wrap"><a class="btn light" href="#/consulta">'+t("solicitar")+'</a><a class="btn light" href="'+wa(t("wa_hola"))+'" target="_blank" rel="noopener">WhatsApp</a></div></div></section>'}

/* cabecera, menú móvil y pie */
function navHTML(){
 var a=AREAS.map(function(x){return'<a href="#/area/'+x.id+'">'+esc(aT(x))+'</a>'}).join("");
 return'<nav class="main" aria-label="'+t("menu")+'">'+
 '<div class="dd" data-r="firma"><button type="button" aria-haspopup="true">'+t("n_firma")+'</button><div class="menu"><a href="#/firma/estudio">'+t("n_estudio")+'</a><a href="#/firma/nosotros">'+t("n_nosotros")+'</a><a href="#/firma/historia">'+t("n_historia")+'</a></div></div>'+
 '<a href="#/profesionales" data-r="profesionales">'+t("n_prof")+'</a>'+
 '<div class="dd" data-r="expertise area"><button type="button" aria-haspopup="true">'+t("n_exp")+'</button><div class="menu">'+a+'<a href="#/expertise/inversion">'+t("n_inv")+'</a></div></div>'+
 '<a href="#/publicaciones" data-r="publicaciones publicacion">'+t("n_pub")+'</a>'+
 '<div class="dd" data-r="contacto consulta portal"><button type="button" aria-haspopup="true">'+t("n_contacto")+'</button><div class="menu"><a href="#/contacto">'+t("n_contacto")+'</a><a href="#/consulta">'+t("solicitar")+'</a><a href="#/portal">'+t("n_portal")+'</a></div></div></nav>'}
function langHTML(){return'<div class="lang" role="group" aria-label="Idioma">'+["es","en","zh"].map(function(l){return'<button type="button" data-lang="'+l+'" aria-pressed="'+(l===LANG)+'">'+l.toUpperCase()+'</button>'}).join("")+'</div>'}
function header(){
 $("#top").innerHTML='<div class="wrap bar"><a class="logo" href="#/" aria-label="'+esc(CFG.nombre_largo)+'"><img src="'+im(VIEW==="2"?"logo_b":"logo")+'" alt="'+esc(CFG.nombre_largo)+'"></a>'+navHTML()+'<div class="tools">'+langHTML()+'<button class="ib" type="button" data-a="search" aria-label="'+t("buscar")+'">'+I.search+'</button><a class="btn sm" href="#/consulta">'+t("solicitar")+'</a><button class="ib burger" type="button" data-a="menu" aria-label="'+t("menu")+'">'+I.menu+'</button></div></div>';
}
function mnav(){
 var s=AREAS.map(function(x){return'<a class="s" href="#/area/'+x.id+'">'+esc(aT(x))+'</a>'}).join("");
 $("#mnav").innerHTML='<button class="ib" type="button" data-a="menu" style="position:absolute;right:1rem;top:1rem" aria-label="'+t("cerrar")+'">'+I.x+'</button><div style="margin-bottom:1.2rem">'+langHTML()+'</div>'+
 '<a href="#/firma">'+t("n_firma")+'</a><a class="s" href="#/firma/estudio">'+t("n_estudio")+'</a><a class="s" href="#/firma/nosotros">'+t("n_nosotros")+'</a><a class="s" href="#/firma/historia">'+t("n_historia")+'</a>'+
 '<a href="#/profesionales">'+t("n_prof")+'</a><a href="#/expertise">'+t("n_exp")+'</a>'+s+'<a class="s" href="#/expertise/inversion">'+t("n_inv")+'</a>'+
 '<a href="#/publicaciones">'+t("n_pub")+'</a><a href="#/contacto">'+t("n_contacto")+'</a><a class="s" href="#/consulta">'+t("solicitar")+'</a><a class="s" href="#/portal">'+t("n_portal")+'</a>';
}
function footer(){
 var r=CFG.redes;
 $("#foot").innerHTML='<div class="wrap"><div class="g"><div><img src="'+im("logo_b")+'" alt="" style="height:56px;width:auto;margin-bottom:1rem"><p>'+t("f_desc")+'</p></div>'+
 '<div><h4>'+t("f_nav")+'</h4><a href="#/firma">'+t("n_firma")+'</a><a href="#/profesionales">'+t("n_prof")+'</a><a href="#/expertise">'+t("n_exp")+'</a><a href="#/publicaciones">'+t("n_pub")+'</a><a href="#/contacto">'+t("n_contacto")+'</a><a href="#/portal">'+t("n_portal")+'</a></div>'+
 '<div><h4>'+t("f_dir")+'</h4><p>'+esc(CFG.dir_cx)+'<br><span style="opacity:.75">'+esc(CFG.dir_lima)+' · '+t("previa_cita")+'</span></p><a href="'+CFG.maps+'" target="_blank" rel="noopener">'+t("ver_mapa")+' ↗</a></div>'+
 '<div><h4>'+t("f_contacto")+'</h4><a href="mailto:'+CFG.email+'">'+CFG.email+'</a><a href="tel:'+CFG.tel_raw+'">'+t("central")+' '+CFG.tel+'</a><a href="'+wa(t("wa_hola"))+'" target="_blank" rel="noopener">WhatsApp +51 943 022 067</a><div style="display:flex;gap:1rem;margin-top:.6rem"><a href="'+r.linkedin+'" target="_blank" rel="noopener">LinkedIn</a><a href="'+r.instagram+'" target="_blank" rel="noopener">Instagram</a><a href="'+r.facebook+'" target="_blank" rel="noopener">Facebook</a></div></div></div>'+
 '<div class="copy"><span>© 2026 '+esc(CFG.nombre_largo)+'. '+t("derechos")+'</span><span><a href="#/privacidad" style="display:inline">'+t("privacidad")+'</a></span></div></div>';
 $("#fab").innerHTML='<a href="'+wa(t("wa_hola"))+'" target="_blank" rel="noopener" aria-label="WhatsApp">'+I.wa+'</a>';
}
function activeNav(r){$$("nav.main [data-r]").forEach(function(e){var on=e.getAttribute("data-r").split(" ").indexOf(r)>-1;e.classList.toggle("on",on);if(e.tagName==="A")on?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")})}

/* modal */
function openModal(h){$("#modalbox").innerHTML='<button class="ib x" type="button" data-a="close" aria-label="'+t("cerrar")+'">'+I.x+'</button>'+h;$("#modal").classList.add("on");document.body.style.overflow="hidden";var f=$("#modalbox input,#modalbox button.mem,#modalbox .x");if(f)setTimeout(function(){f.focus()},50)}
function closeModal(){$("#modal").classList.remove("on");document.body.style.overflow=""}
function searchModal(){
 openModal('<div style="padding:2.2rem 2rem 1rem"><div class="eyebrow">'+t("buscar")+'</div><input id="sq" type="search" placeholder="'+t("buscar_ph")+'" autocomplete="off"><div class="sres" id="sres" style="margin-top:1rem"></div></div>');
}
function norm(s){return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"")}
function doSearch(q){
 var r=[];q=norm(q.trim());if(q.length<2){$("#sres").innerHTML="";return}
 AREAS.forEach(function(a){if(norm(aT(a)+" "+aD(a)).indexOf(q)>-1)r.push([t("n_exp"),aT(a),"#/area/"+a.id])});
 D.pubs.forEach(function(p){if(norm(pick(p.titulo)+" "+pick(p.resumen)+" "+pick(p.cat)).indexOf(q)>-1)r.push([t("n_pub"),pick(p.titulo),"#/publicacion/"+p.slug])});
 D.equipo.forEach(function(m){if(norm(m.nombre+" "+pick(m.rol)).indexOf(q)>-1)r.push([t("n_prof"),m.nombre+" · "+pick(m.rol),"#/profesionales/"+m.id])});
 $("#sres").innerHTML=r.length?r.slice(0,10).map(function(x){return'<a href="'+x[2]+'" data-a="close"><small>'+esc(x[0])+'</small>'+esc(x[1])+'</a>'}).join(""):'<p class="mut">'+t("sin_res")+'</p>';
}

/* revelado */
var io=null,rmap=new WeakMap();
function reveal(){
 var els=$$(".rv:not(.in),.rvi:not(.in)");
 if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in")});return}
 if(!io)io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.05,rootMargin:"0px 0px -4% 0px"});
 els.forEach(function(e){io.observe(e)});
 clearTimeout(reveal.t);reveal.t=setTimeout(rescue,1500);
}
function rescue(){var h=innerHeight;$$(".rv:not(.in),.rvi:not(.in)").forEach(function(e){var r=e.getBoundingClientRect();if(r.top<h*.92)e.classList.add("in")})}
var rq=0;addEventListener("scroll",function(){var p=$("#pbar");if(p){var h=document.documentElement.scrollHeight-innerHeight;p.style.width=(h>0?scrollY/h*100:0)+"%"}if(rq)return;rq=setTimeout(function(){rq=0;rescue()},160)},{passive:true});
