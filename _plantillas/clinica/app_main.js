/* ---------- router ---------- */
var cur=null,busy=false;
function parse(){var h=location.hash.replace(/^#\/?/,""),q={},i=h.indexOf("?");if(i>=0){h.slice(i+1).split("&").forEach(function(kv){var a=kv.split("=");if(a[0])q[decodeURIComponent(a[0])]=decodeURIComponent(a[1]||"")});h=h.slice(0,i)}return {p:h.split("/").filter(Boolean),q:q,key:h+(i>=0?"?x":"")}}
function view(r){var a=r.p[0]||"home";if(a==="blog"&&r.p[1])a="post";return P[a]||P.nf}
function titulo(r){var a=r.p[0];if(a==="tratamiento"&&T[r.p[1]])return T[r.p[1]].nombre;if(a==="producto"&&PR[r.p[1]])return PR[r.p[1]].n;return ""}
function draw(r){cur=r.key;var f=view(r);$("#app").innerHTML=f(r);document.title=N.titulo+(titulo(r)?" · "+titulo(r):"");window.scrollTo(0,0);
 $$("nav.main>a").forEach(function(a){a.classList.toggle("on",a.getAttribute("data-r")===(r.p[0]||""))});$("#dd").classList.toggle("on",["tratamiento","servicios","acido-hialuronico"].indexOf(r.p[0])>=0);
 closeDrawer();$("#mnav").classList.remove("open");$("#dd").classList.remove("open");
 var a=r.p[0]||"home";
 if(a==="skinshop"&&$("#sorden")){$("#sorden").value=S.orden;shopGrid()}
 if(a==="checkout"&&$("#csum")){shipSel="rec";$("#csum").innerHTML=csumHTML()}
 if(a==="velocidad")setTimeout(vmetrics,400);
 if(a==="home"){hi=0;hauto()}else clearInterval(ht);
 updCart();reveal();$("#app").focus({preventScroll:true})}
function go(first){var r=parse();if(first||busy||cur===r.key||matchMedia("(prefers-reduced-motion:reduce)").matches){draw(r);return}
 busy=true;var c=$("#curtain");c.className="curtain go";void c.offsetWidth;c.classList.add("in");
 setTimeout(function(){draw(parse());c.classList.remove("in");c.classList.add("out");setTimeout(function(){c.className="curtain";busy=false},760)},720)}
window.addEventListener("hashchange",function(){go(false)});
function vmetrics(){var res=performance.getEntriesByType("resource"),nav=performance.getEntriesByType("navigation")[0],n=res.length+1,kb=Math.round(((nav&&nav.transferSize)||0)/1024)||Math.round(document.documentElement.outerHTML.length/1024);
 var set=function(i,v){var e=$("#"+i);if(e)e.textContent=v};set("vreq",n);if(nav){set("vdcl",Math.round(nav.domContentLoadedEventEnd)+" ms");set("vload",nav.loadEventEnd?Math.round(nav.loadEventEnd)+" ms":"cargando…");}
 set("vkb","≈ "+kb+" KB"+((nav&&nav.transferSize)?" transferidos":" de HTML"));var b=$("#vbar");if(b)b.style.width=Math.max(3,Math.round(n/N.actual.req*100))+"%";var rb=$(".bad .bar2 i");if(rb)rb.style.width="100%"}
/* ---------- eventos ---------- */
document.addEventListener("click",function(e){var t=e.target,c;
 if(t.closest("[data-close]")){closeDrawer()}
 if(t.closest("[data-mclose]")){var x=t.closest("[data-mclose]");if(!x.hasAttribute("data-add"))closeModal();else setTimeout(closeModal,10)}
 if(t.id==="modal")closeModal();
 if((c=t.closest("[data-book]"))){e.preventDefault();$("#mnav").classList.remove("open");openModal(bookHTML(c.getAttribute("data-book")||""))}
 if((c=t.closest("[data-add]"))){e.preventDefault();cartAdd(+c.getAttribute("data-add"),1)}
 if((c=t.closest("[data-addq]"))){cartAdd(+c.getAttribute("data-addq"),+($("#pq").textContent))}
 if((c=t.closest("[data-buynow]"))){cartAdd(+c.getAttribute("data-buynow"),+($("#pq").textContent));location.hash="#/checkout"}
 if((c=t.closest("[data-q]"))){var q=$("#pq");q.textContent=Math.max(1,Math.min(20,+q.textContent+ +c.getAttribute("data-q")))}
 if((c=t.closest("[data-qv]"))){e.preventDefault();openModal(qvHTML(+c.getAttribute("data-qv")),"wide")}
 if((c=t.closest("[data-rm]"))){cart=cart.filter(function(l){return l.id!==+c.getAttribute("data-rm")});saveCart();if(cur==="carrito")draw(parse()),window.scrollTo(0,0)}
 if((c=t.closest("[data-cq]"))){var a=c.getAttribute("data-cq").split("|"),l=cart.filter(function(x){return x.id===+a[0]})[0];if(l){l.q=Math.max(1,Math.min(maxq(PR[l.id]),l.q+ +a[1]));saveCart();var y=window.scrollY;draw(parse());window.scrollTo(0,y)}}
 if(t.closest("#bcart")){openDrawer()}
 if(t.closest("#bsearch")){openModal(searchHTML())}
 if(t.closest("#bburger")){$("#mnav").classList.add("open")}
 if(t.closest("#mclose")||(t.closest("#mnav")&&t.closest("#mnav a"))){$("#mnav").classList.remove("open")}
 if((c=t.closest("[data-v]"))){setView(c.getAttribute("data-v"))}
 if(t.id==="cookieok"){$("#cookie").classList.remove("show");try{sessionStorage.setItem("mn_ck","1")}catch(x){}}
 if((c=t.closest("[data-tab]"))){$$(".tab").forEach(function(b){b.setAttribute("aria-selected",b===c?"true":"false")});$("#tgrid").innerHTML=tgrid(+c.getAttribute("data-tab"));reveal()}
 if((c=t.closest("[data-goal]"))){var g=N.objetivos[+c.getAttribute("data-goal")];$$(".goal").forEach(function(b){b.setAttribute("aria-pressed",b===c?"true":"false")});$("#goalres").innerHTML=g.t.map(function(s,i){return tcard(T[s],i)}).join("");reveal()}
 if((c=t.closest("[data-hs]"))){hgo(hi+ +c.getAttribute("data-hs"));hauto()}
 if((c=t.closest("[data-dot]"))){hgo(+c.getAttribute("data-dot"));hauto()}
 if((c=t.closest("[data-rs]"))){var rv=$("#rvs");rv.scrollBy({left:+c.getAttribute("data-rs")*Math.min(420,rv.clientWidth*.9),behavior:"smooth"})}
 if(t.closest("[data-fclear]")){S.marca=[];S.cat=[];S.min=S.max="";S.ocultar=false;S.q="";var fl=$("#filt");if(fl)fl.innerHTML=filtHTML();var sb=$("#sbusca");if(sb)sb.value="";S.n=12;shopGrid()}
 if(t.closest("[data-ftoggle]")){$("#filt").classList.add("open");bg(1)}
 if(t.closest("[data-smore]")){S.n+=12;shopGrid()}
 if((c=t.closest(".ai>button"))){var ai=c.parentNode,o=!ai.classList.contains("open");ai.classList.toggle("open",o);c.setAttribute("aria-expanded",o)}
 if((c=t.closest(".day"))){$$(".day").forEach(function(b){b.setAttribute("aria-pressed",b===c?"true":"false")});bk.d=c.getAttribute("data-day").split("|")[1]}
 if((c=t.closest(".slot"))){$$(".slot").forEach(function(b){b.setAttribute("aria-pressed",b===c?"true":"false")});bk.h=c.getAttribute("data-h")}
 var a=t.closest("a[href^='#/']");if(a&&a.getAttribute("href")==="#/"+cur&&cur!==null){window.scrollTo({top:0,behavior:"smooth"})}
 if(t.closest("#dd>button")){$("#dd").classList.toggle("open");$("#dd>button").setAttribute("aria-expanded",$("#dd").classList.contains("open"))}else if(!t.closest("#dd")){$("#dd").classList.remove("open")}
});
document.addEventListener("change",function(e){var t=e.target;
 if(t.hasAttribute("data-fm")){var m=t.getAttribute("data-fm"),i=S.marca.indexOf(m);if(i>=0)S.marca.splice(i,1);else S.marca.push(m);S.n=12;shopGrid()}
 if(t.hasAttribute("data-fc")){var c=t.getAttribute("data-fc"),j=S.cat.indexOf(c);if(j>=0)S.cat.splice(j,1);else S.cat.push(c);S.n=12;shopGrid()}
 if(t.hasAttribute("data-fag")){S.ocultar=t.checked;shopGrid()}
 if(t.hasAttribute("data-pmin")){S.min=t.value;shopGrid()}if(t.hasAttribute("data-pmax")){S.max=t.value;shopGrid()}
 if(t.id==="sorden"){S.orden=t.value;shopGrid()}
 if(t.name==="env"){shipSel=t.value;$("#csum").innerHTML=csumHTML()}
 if(t.id==="bt")bk.t=t.value});
document.addEventListener("input",function(e){var t=e.target;if(t.id==="sbusca"){S.q=t.value;S.n=12;shopGrid()}if(t.id==="sq")doSearch(t.value)});
document.addEventListener("pointermove",function(e){var c=e.target.closest&&e.target.closest(".spot");if(c){var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")}});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeModal();closeDrawer();$("#mnav").classList.remove("open");$("#dd").classList.remove("open");var f=$("#filt");if(f)f.classList.remove("open");bg(0)}});
var dd=$("#dd");
function ddHover(){var d=$("#dd");if(!d)return;var tm;d.addEventListener("mouseenter",function(){clearTimeout(tm);d.classList.add("open")});d.addEventListener("mouseleave",function(){tm=setTimeout(function(){d.classList.remove("open")},180)})}
window.addEventListener("scroll",function(){var h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);$("#prog").style.width=(p*100)+"%"},{passive:true});
/* formularios */
function fv(el){var ok=!!el.value.trim();el.style.outline=ok?"":"2px solid #c0392b";return ok}
document.addEventListener("submit",function(e){var f=e.target;e.preventDefault();
 if(f.id==="bform"){var ok=fv($("#bn"))&fv($("#bc"));if(!bk.t||!bk.d||!bk.h){toast("Elija tratamiento, día y hora");return}if(!ok){toast("Complete su nombre y celular");return}
  var nm=bk.t==="eval"?"Evaluación médica":(T[bk.t]||{}).nombre;window.open(wa("Hola, quisiera agendar una cita.\nTratamiento: "+nm+"\nDía preferido: "+bk.d+"\nHora preferida: "+bk.h+"\nNombre: "+$("#bn").value+"\nCelular: "+$("#bc").value),"_blank","noopener");closeModal();toast("Abriendo WhatsApp…")}
 if(f.id==="cform"){var o1=fv($("#cn"))&fv($("#cc"));if(!o1){toast("Complete nombre y celular");return}var pay=(document.querySelector("input[name=pay]:checked")||{}).value;if(pay==="clin"&&shipSel!=="rec"){toast("Pagar en clínica solo aplica con recojo");return}
  var pm={yape:["Yape o Plin","Transfiera con Yape o Plin el total indicado y envíe el comprobante por WhatsApp (datos de pago de ejemplo)."],trf:["Transferencia bancaria","Le enviaremos los datos de la cuenta por WhatsApp (de ejemplo)."],card:["Tarjeta","En la web final se abriría la pasarela de pago segura (por integrar)."],clin:["Pago en la clínica","Pague al recoger su pedido en la clínica."]}[pay];
  order={id:"MN-"+new Date().getFullYear()+"-"+String(Math.floor(1000+Math.random()*9000)),n:$("#cn").value.trim(),env:shipSel,payn:pm[0],pay:pm[1],total:sub()+envio(),l:cart.map(function(l){return {q:l.q,n:PR[l.id].n,p:PR[l.id].p}})};cart=[];saveCart();location.hash="#/pedido"}
 if(f.id==="ctform"){if(!(fv($("#tn"))&fv($("#tc")))){toast("Complete nombre y celular");return}window.open(wa("Hola, soy "+$("#tn").value+" ("+$("#tc").value+").\n"+($("#ts").value?"Me interesa: "+$("#ts").value+"\n":"")+$("#tm").value),"_blank","noopener");toast("Abriendo WhatsApp…")}
 if(f.id==="rform"){var o2=fv($("#rn"))&fv($("#ra"))&fv($("#rd"))&fv($("#rdt"));if(!o2||!$("#rok").checked){toast("Complete los campos obligatorios y acepte la declaración");return}
  $("#rres").innerHTML='<div class="sheet"><b>Hoja registrada (demostración)</b><br>N.° RC-'+new Date().getFullYear()+'-'+Math.floor(1000+Math.random()*9000)+'<br><span class="demo-note">En la web final este formulario envía el reclamo a la empresa y una copia al correo del consumidor. Aquí no se guarda ni se envía nada.</span></div>';f.reset()}});
/* vistas */
function setView(v){document.body.setAttribute("data-view",v);$$(".vsel button").forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-v")===v?"true":"false")});var m=document.querySelector("meta[name=theme-color]");if(m)m.content=v==="2"?"#140a0d":"#64343d";try{history.replaceState(null,"",location.hash)}catch(e){}}
/* arranque */
$("#info").innerHTML=infoHTML();$("#top").innerHTML=headerHTML();$("#foot").innerHTML=footHTML();$("#fab").innerHTML=fabHTML();$("#mnav").innerHTML=mnavHTML();$("#cmk").src=im("logo");ddHover();
setInterval(function(){$("#info").innerHTML=infoHTML()},60000);
var vv=(/vista=2|vista2/.test(location.search+location.hash))?"2":"1";setView(vv);
go(true);updCart();
try{if(!sessionStorage.getItem("mn_ck"))setTimeout(function(){$("#cookie").classList.add("show")},1400)}catch(e){setTimeout(function(){$("#cookie").classList.add("show")},1400)}
})();
