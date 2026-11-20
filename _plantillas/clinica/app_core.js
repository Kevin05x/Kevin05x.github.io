(function(){
"use strict";
var D=CFG.datos,N=CFG;
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function im(k){return IMG[k]||""}
function money(n){return "S/ "+Number(n).toFixed(2)}
function wa(t){return "https://wa.me/"+N.wa+"?text="+encodeURIComponent(t)}
function norm(s){return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"")}
function toast(m){var t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(toast.h);toast.h=setTimeout(function(){t.classList.remove("show")},2600)}
var T={},PR={};D.trat.forEach(function(t){T[t.slug]=t});D.prods.forEach(function(p){PR[p.id]=p});
var SV=function(p,w){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'};
var I={
 chev:SV('<path d="M6 9l6 6 6-6"/>'),arr:SV('<path d="M5 12h14M13 6l6 6-6 6"/>'),
 l:SV('<path d="M15 6l-6 6 6 6"/>'),r:SV('<path d="M9 6l6 6-6 6"/>'),
 cart:SV('<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.2a1 1 0 001 .8h9.2a1 1 0 001-.8L21 7H6"/>'),
 search:SV('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),menu:SV('<path d="M4 7h16M4 12h16M4 17h10"/>'),
 eye:SV('<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>'),
 wa:SV('<path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8v.5z"/><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1.2-1.2-1.8-1-.8.7a3 3 0 01-1.6-1.6l.7-.8-1-1.8z"/>'),
 fb:SV('<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>'),
 ig:SV('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>'),
 yt:SV('<path d="M22.5 6.4a2.8 2.8 0 00-2-2C18.9 4 12 4 12 4s-6.9 0-8.5.4a2.8 2.8 0 00-2 2A29 29 0 001 11.8a29 29 0 00.5 5.3 2.8 2.8 0 002 2C5.1 19.5 12 19.5 12 19.5s6.9 0 8.5-.4a2.8 2.8 0 002-2 29 29 0 00.5-5.3 29 29 0 00-.5-5.4z"/><path d="M9.8 15l5.7-3.2L9.8 8.5z"/>'),
 x:SV('<path d="M4 4l16 16M20 4L4 20"/>'),tt:SV('<path d="M9 18a3 3 0 103-3V3c1 3 3 4 6 4"/>'),pin:SV('<circle cx="12" cy="12" r="9"/><path d="M10 21l2-9M9.5 10a3 3 0 115 2"/>'),
 pinmap:SV('<path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>'),
 star:'★★★★★'
};
var SOC={Facebook:I.fb,X:I.x,Instagram:I.ig,YouTube:I.yt,Pinterest:I.pin,WhatsApp:I.wa,TikTok:I.tt};
/* ---------- carrito ---------- */
var cart=[];try{cart=JSON.parse(localStorage.getItem("mn_cart")||"[]").filter(function(l){return PR[l.id]})}catch(e){cart=[]}
function maxq(p){return p.st?Math.min(p.st,20):10}
function saveCart(){try{localStorage.setItem("mn_cart",JSON.stringify(cart))}catch(e){}updCart()}
function cartAdd(id,q){var p=PR[id];if(!p||p.ag){toast("Producto agotado");return}var l=cart.filter(function(x){return x.id===id})[0];if(l){if(l.q+q>maxq(p)){toast("Máximo disponible: "+maxq(p));l.q=maxq(p)}else l.q+=q}else cart.push({id:id,q:Math.min(q,maxq(p))});saveCart();toast("Añadido al carrito")}
function sub(){return cart.reduce(function(a,l){return a+PR[l.id].p*l.q},0)}
function cnt(){return cart.reduce(function(a,l){return a+l.q},0)}
function updCart(){var c=cnt();$$(".cartbtn .n").forEach(function(n){n.textContent=c;n.classList.toggle("has",c>0)});$$(".cartbtn .tt").forEach(function(t){t.textContent=money(sub())});if($("#drawer").classList.contains("open"))drawerHTML()}
/* ---------- horario ---------- */
function lima(){return new Date(Date.now()-5*3600*1000)}
function fmtH(h){var s=h>=12?"p. m.":"a. m.";var x=h%12||12;return x+":00 "+s}
function abierto(){var d=lima(),w=d.getUTCDay(),h=d.getUTCHours()+d.getUTCMinutes()/60,tr=N.horario.tramos;
 if(w>=1&&w<=6){for(var i=0;i<tr.length;i++){if(h>=tr[i][0]&&h<tr[i][1])return {on:1,t:"Abierto ahora · hasta las "+fmtH(tr[i][1])}}
  for(var j=0;j<tr.length;j++){if(h<tr[j][0])return {on:0,t:"Cerrado · abre a las "+fmtH(tr[j][0])}}}
 return {on:0,t:"Cerrado · abre "+(w===6?"el lunes":"mañana")+" a las "+fmtH(tr[0][0])}}
/* ---------- shell ---------- */
function infoHTML(){var a=abierto();return '<div class="wrap in"><div><span>'+I.pinmap.replace("<svg",'<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:.3rem"')+esc(N.direccion)+' · '+esc(N.ref)+'</span></div><div><span class="abierto'+(a.on?" on":"")+'">'+esc(a.t)+'</span><a href="tel:+'+N.wa+'"><b>'+esc(N.telf)+'</b></a><span><img class="av" src="'+im("asesora")+'" alt="" width="22" height="22">'+esc(N.asesora)+'</span></div></div>'}
function megaHTML(){return D.grupos.map(function(g,gi){var it=g.items.map(function(i){return '<a href="#/tratamiento/'+i.slug+'">'+esc(i.n)+'</a>'});if(gi===3)it.splice(2,0,'<a href="#/acido-hialuronico">Ácido Hialurónico</a>');return '<div><h4>'+esc(g.n)+'</h4>'+it.join("")+'</div>'}).join("")}
function headerHTML(){return '<div class="wrap"><div class="bar glass"><a class="logo" href="#/" aria-label="'+esc(N.negocio)+' · inicio"><img src="'+im("logo")+'" alt="'+esc(N.negocio)+'" width="130" height="46"></a>'+
 '<nav class="main" aria-label="Principal"><a href="#/" data-r="">Inicio</a><a href="#/nosotros" data-r="nosotros">Nosotros</a><div class="dd" id="dd"><button type="button" aria-haspopup="true" aria-expanded="false">Servicios '+I.chev.replace("<svg",'<svg class="chev"')+'</button><div class="mega glass">'+megaHTML()+'</div></div><a href="#/skinshop" data-r="skinshop">Skinshop</a><a href="#/blog" data-r="blog">Blog</a><a href="#/contacto" data-r="contacto">Contacto</a></nav>'+
 '<div class="hr"><button class="iconbtn" type="button" id="bsearch" aria-label="Buscar">'+I.search+'</button><button class="btn sm ag" type="button" data-book>'+I.wa+'Agendar cita</button><button class="cartbtn" type="button" id="bcart" aria-label="Abrir carrito">'+I.cart+'<span class="tt">S/ 0.00</span><i class="n">0</i></button><button class="iconbtn burger" type="button" id="bburger" aria-label="Abrir menú">'+I.menu+'</button></div></div></div>'}
function footHTML(){var s=N.redes.map(function(r){return '<a href="'+esc(r[1])+'" target="_blank" rel="noopener" aria-label="'+esc(r[0])+'">'+SOC[r[0]]+'</a>'}).join("");
 return '<div class="wrap"><div class="fg"><div><img class="fl" src="'+im("logo")+'" alt="'+esc(N.negocio)+'" style="filter:brightness(0) invert(1)"><p>'+esc(N.direccion)+', '+esc(N.ciudad)+'<br>'+esc(N.ref)+'</p><div class="soc">'+s+'</div></div>'+
 '<div><h4>Munnay</h4><a href="#/nosotros">Nosotros</a><a href="#/contacto">Contacto</a><a href="#/servicios">Servicios</a><a href="#/skinshop">Skinshop</a><a href="#/blog">Blog</a></div>'+
 '<div><h4>Legal</h4><a href="#/datos">Eliminación de datos</a><a href="#/terminos">Términos y Condiciones Generales</a><a href="#/reclamaciones">Libro de Reclamaciones</a></div>'+
 '<div><h4>Atención</h4><p>'+N.horario.texto+'</p><p style="margin-top:.6rem">WhatsApp y llamadas<br><b>'+esc(N.telf)+'</b> · 24 h para emergencias post-tratamiento</p></div></div></div>'+
 '<div class="legal"><div class="wrap in"><span>© '+new Date().getFullYear()+' '+esc(N.negocio)+'. Todos los derechos reservados.</span><span class="pay"><span>Tarjeta</span><span>Yape</span><span>Plin</span><span>Transferencia</span><span style="background:transparent">(ejemplo)</span></span></div></div>'}
function fabHTML(){return '<a class="w" href="'+wa("Hola, quisiera información sobre sus tratamientos.")+'" target="_blank" rel="noopener" aria-label="WhatsApp">'+I.wa+'</a><a class="s" href="#/skinshop" aria-label="Skinshop">'+I.cart+'</a>'}
function mnavHTML(){var g=D.grupos.map(function(g,gi){var it=g.items.map(function(i){return '<a href="#/tratamiento/'+i.slug+'">'+esc(i.n)+'</a>'});if(gi===3)it.splice(2,0,'<a href="#/acido-hialuronico">Ácido Hialurónico</a>');return '<h5>'+esc(g.n)+'</h5>'+it.join("")}).join("");
 return '<button class="iconbtn x" type="button" id="mclose" aria-label="Cerrar">✕</button><a href="#/">Inicio</a><a href="#/nosotros">Nosotros</a><details><summary>Servicios</summary>'+g+'</details><a href="#/skinshop">Skinshop</a><a href="#/blog">Blog</a><a href="#/contacto">Contacto</a><p style="margin-top:1.4rem"><button class="btn block" type="button" data-book>'+I.wa+'Agendar cita</button></p>'}
/* ---------- drawer ---------- */
function drawerHTML(){var d=$("#drawer");var body=cart.length?cart.map(function(l){var p=PR[l.id];return '<div class="line"><img src="'+im(p.img)+'" alt="" loading="lazy"><div><b>'+esc(p.n)+'</b><small>'+l.q+' × '+money(p.p)+'</small><br><button class="rm" type="button" data-rm="'+p.id+'">Quitar</button></div><div class="rt"><b>'+money(p.p*l.q)+'</b></div></div>'}).join(""):'<div class="empty"><h3>Su carrito está vacío</h3><p class="lead" style="margin:0 auto 1rem">Explore el Skinshop y añada sus productos.</p><a class="btn" href="#/skinshop" data-close>Ir al Skinshop</a></div>';
 d.innerHTML='<div class="dh"><h3>Su carrito</h3><button class="iconbtn" type="button" data-close aria-label="Cerrar">✕</button></div><div class="db">'+body+'</div>'+(cart.length?'<div class="df"><div class="r" style="display:flex;justify-content:space-between;font-weight:800;margin-bottom:.8rem"><span>Subtotal (IGV incl.)</span><span>'+money(sub())+'</span></div><div style="display:grid;gap:.5rem"><a class="btn" href="#/checkout" data-close>Finalizar compra</a><a class="btn ghost" href="#/carrito" data-close>Ver carrito</a></div></div>':'')}
function openDrawer(){drawerHTML();$("#drawer").classList.add("open");$("#modal").classList.remove("open");bg(1)}
function closeDrawer(){$("#drawer").classList.remove("open");bg(0)}
var scrim;function bg(on){if(!scrim){scrim=document.createElement("div");scrim.style.cssText="position:fixed;inset:0;z-index:181;background:rgba(15,6,9,.45);opacity:0;visibility:hidden;transition:.3s";scrim.addEventListener("click",function(){closeDrawer();$("#filt")&&$("#filt").classList.remove("open")});document.body.appendChild(scrim)}scrim.style.opacity=on?1:0;scrim.style.visibility=on?"visible":"hidden"}
/* ---------- modal ---------- */
var lastFocus;
function openModal(html,cls){var m=$("#modal");$("#modalbox").innerHTML='<button class="x" type="button" data-mclose aria-label="Cerrar">✕</button>'+html;m.className="modal open "+(cls||"");lastFocus=document.activeElement;setTimeout(function(){var f=$("#modalbox input,#modalbox select,#modalbox button:not(.x),#modalbox a");f&&f.focus()},60)}
function closeModal(){$("#modal").classList.remove("open");lastFocus&&lastFocus.focus&&lastFocus.focus()}
/* reserva */
var bk={t:"",d:"",h:""};
function days(){var o=[],d=lima(),n=0;while(o.length<12&&n<40){n++;d=new Date(d.getTime()+86400000*(n===1?0:1));var w=d.getUTCDay();if(w!==0)o.push(d)}return o}
var DN=["dom","lun","mar","mié","jue","vie","sáb"],MN=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
function bookHTML(slug){bk={t:slug||"",d:"",h:""};
 var opts='<option value="">Seleccione un tratamiento</option>'+D.grupos.map(function(g){return '<optgroup label="'+esc(g.n)+'">'+g.items.map(function(i){return '<option value="'+i.slug+'"'+(i.slug===slug?" selected":"")+'>'+esc(i.n)+'</option>'}).join("")+'</optgroup>'}).join("")+'<option value="eval">Evaluación médica (no sé qué tratamiento necesito)</option>';
 var dd=days().map(function(d,i){var k=d.getUTCFullYear()+"-"+(d.getUTCMonth()+1)+"-"+d.getUTCDate();return '<button type="button" class="day" data-day="'+k+'|'+DN[d.getUTCDay()]+' '+d.getUTCDate()+' '+MN[d.getUTCMonth()]+'" aria-pressed="false">'+DN[d.getUTCDay()]+'<b>'+d.getUTCDate()+'</b>'+MN[d.getUTCMonth()]+'</button>'}).join("");
 var sl=[];N.horario.tramos.forEach(function(t){for(var h=t[0];h<t[1];h++)sl.push(h)});
 return '<h3>Agendar su cita</h3><form id="bform" novalidate><div class="form"><div class="full"><label for="bt">Tratamiento</label><select class="field" id="bt" required>'+opts+'</select></div><div class="full"><label>Día preferido</label><div class="days" role="group">'+dd+'</div></div><div class="full"><label>Hora preferida</label><div class="slots" role="group">'+sl.map(function(h){return '<button type="button" class="slot" data-h="'+fmtH(h)+'" aria-pressed="false">'+fmtH(h)+'</button>'}).join("")+'</div></div><div><label for="bn">Nombre</label><input class="field" id="bn" autocomplete="name" required></div><div><label for="bc">Celular</label><input class="field" id="bc" type="tel" inputmode="tel" autocomplete="tel" required></div><div class="full note">'+esc(N.reservaNota)+'</div><div class="full"><button class="btn wa block" type="submit">'+I.wa+'Solicitar por WhatsApp</button></div><p class="full demo-note">La página no guarda ni envía estos datos: arma el mensaje y abre WhatsApp.</p></div></form>'}
/* buscador */
function searchHTML(){return '<h3>Buscar</h3><input class="field" id="sq" type="search" placeholder="Tratamiento o producto: láser, vitamina C, labios…" autocomplete="off" aria-label="Buscar"><div class="sr-res" id="sres"></div>'}
function doSearch(q){q=norm(q.trim());var o=[];if(q.length<2){$("#sres").innerHTML='<p class="demo-note">Escriba al menos 2 letras.</p>';return}
 D.trat.forEach(function(t){if(norm(t.nombre+" "+t.sub+" "+t.grupo).indexOf(q)>=0)o.push('<a href="#/tratamiento/'+t.slug+'" data-mclose><img src="'+im(t.img)+'" alt=""><span><small>Tratamiento</small>'+esc(t.nombre)+'</span></a>')});
 D.prods.forEach(function(p){if(norm(p.n+" "+p.c.join(" ")+" "+p.m).indexOf(q)>=0)o.push('<a href="#/producto/'+p.id+'" data-mclose><img src="'+im(p.img)+'" alt=""><span><small>'+esc(p.m)+' · '+money(p.p)+'</small>'+esc(p.n)+'</span></a>')});
 $("#sres").innerHTML=o.length?o.slice(0,14).join(""):'<p class="demo-note">Sin resultados para “'+esc(q)+'”.</p>'}
/* ---------- utilidades de página ---------- */
function splitEl(el){var i=0;(function walk(n){Array.prototype.slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(" "))}else{var s=document.createElement("span");s.className="w";s.style.setProperty("--i",i++);s.textContent=w;f.appendChild(s)}});n.replaceChild(f,c)}else if(c.nodeType===1)walk(c)})})(el)}
var io;
var rmap=new WeakMap();
function reveal(){var els=$$(".rv:not(.in),.rvi:not(.in),.sp:not(.in)");$$(".sp:not([data-s])").forEach(function(e){e.setAttribute("data-s","1");splitEl(e)});
 if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in")});return}
 if(!io)io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target,l=rmap.get(t);if(l){l.forEach(function(x){x.classList.add("in")});rmap.delete(t)}else{t.classList.add("in");if(t.hasAttribute("data-count"))count(t)}io.unobserve(t)})},{threshold:.05,rootMargin:"0px 0px -4% 0px"});
 els.forEach(function(e){if(e.classList.contains("rvi")){var h=e.parentElement||e,l=rmap.get(h);if(!l){l=[];rmap.set(h,l)}l.push(e);io.observe(h)}else io.observe(e)});$$("[data-count]:not([data-o])").forEach(function(e){e.setAttribute("data-o","1");io.observe(e)});
 clearTimeout(reveal.t);reveal.t=setTimeout(rescue,1600)}
function rescue(){var h=innerHeight;$$(".rv:not(.in),.rvi:not(.in),.sp:not(.in)").forEach(function(e){var r=e.getBoundingClientRect();if(r.top<h*.92&&r.bottom>0){e.classList.add("in");if(e.hasAttribute("data-count"))count(e)}})}
var rq=0;addEventListener("scroll",function(){if(rq)return;rq=setTimeout(function(){rq=0;rescue()},180)},{passive:true});
function count(el){var to=parseFloat(el.getAttribute("data-count")),dec=+(el.getAttribute("data-dec")||0),t0=null;if(matchMedia("(prefers-reduced-motion:reduce)").matches){el.textContent=to.toFixed(dec);return}
 (function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1500,1),e=1-Math.pow(1-p,3);el.textContent=(to*e).toFixed(dec);if(p<1)requestAnimationFrame(f)})(performance.now())}
function acc(items){return '<div class="acc">'+items.map(function(it,i){return '<div class="ai glass'+(i===0?" open":"")+'"><button type="button" aria-expanded="'+(i===0)+'"><span>'+esc(it.t)+'</span><i aria-hidden="true">+</i></button><div class="pn"><div><div class="ct">'+it.html+'</div></div></div></div>'}).join("")+'</div>'}
function crumb(a){return '<nav class="crumb" aria-label="Ruta"><a href="#/">Inicio</a>'+a.map(function(x){return '<span>/</span>'+(x[1]?'<a href="'+x[1]+'">'+esc(x[0])+'</a>':'<span>'+esc(x[0])+'</span>')}).join("")+'</nav>'}
function tcard(t,d){return '<a class="tcard glass spot rv" style="--d:'+(d||0)+'" href="#/tratamiento/'+t.slug+'"><div class="im"><img src="'+im(t.img)+'" alt="'+esc(t.nombre)+' · foto referencial" loading="lazy"></div><div class="bd"><small>'+esc(t.grupo)+'</small><h3>'+esc(t.nombre)+'</h3><p>'+esc(t.sub||"")+'</p><span class="go">Ver tratamiento '+I.arr+'</span></div></a>'}
function pcard(p,d){return '<article class="pcard glass spot rv" style="--d:'+(d||0)+'"><a class="im" href="#/producto/'+p.id+'" aria-label="'+esc(p.n)+'"><img src="'+im(p.img)+'" alt="'+esc(p.n)+'" loading="lazy">'+(p.ag?'<span class="tag ag">Agotado</span>':"")+'</a><button class="qv" type="button" data-qv="'+p.id+'" aria-label="Vista rápida">'+I.eye+'</button><div class="bd"><small>'+esc(p.m)+'</small><h3><a href="#/producto/'+p.id+'">'+esc(p.n)+'</a></h3><div class="pr">'+money(p.p)+'<small>IGV incl.</small></div><div class="row">'+(p.ag?'<a class="btn ghost sm" href="'+wa("Hola, quisiera consultar cuándo vuelve a tener "+p.n)+'" target="_blank" rel="noopener">Avísenme</a>':'<button class="btn sm" type="button" data-add="'+p.id+'">Añadir</button><a class="btn ghost sm" href="'+wa("Hola, quisiera comprar: "+p.n+" ("+money(p.p)+")")+'" target="_blank" rel="noopener">'+I.wa+'WhatsApp</a>')+'</div></div></article>'}
function qvHTML(id){var p=PR[id];return '<div class="pd" style="gap:1.4rem"><div class="im"><img src="'+im(p.img)+'" alt="'+esc(p.n)+'"></div><div><small style="color:var(--acc);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.7rem">'+esc(p.m)+' · '+esc(p.c.join(", "))+'</small><h3 style="margin:.4rem 0">'+esc(p.n)+'</h3><div class="pr" style="font-size:1.8rem">'+money(p.p)+'<small>IGV incl.</small></div><p class="demo-note">SKU '+esc(p.sku||"—")+'</p><div class="buy">'+(p.ag?'<span class="stock no">Agotado</span>':'<button class="btn" type="button" data-add="'+p.id+'" data-mclose>Añadir al carrito</button>')+'<a class="link" href="#/producto/'+p.id+'" data-mclose>Ver ficha</a></div></div></div>'}
