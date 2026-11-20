/* ---------- enrutador y eventos ---------- */
var CUR="",RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
function parse(){var h=location.hash.replace(/^#\/?/,""),q="";var i=h.indexOf("?");if(i>-1){q=h.slice(i+1);h=h.slice(0,i)}var p=h.split("/").filter(Boolean);return{r:p[0]||"home",a:p[1]||"",q:q,key:h}}
function titleFor(r){return CFG.titulo}
function render(first){
 var x=parse(),r=x.r;if(!P[r])r="nf";
 var arg=(r==="consulta")?x.q:x.a;
 if(r==="profesionales")arg=x.a;
 $("#app").innerHTML=P[r](arg);
 activeNav(r==="area"?"expertise":r);
 var pb=$("#pbar");if(pb)pb.style.width="0";
 /* anclas */
 var anchor=null;
 if(r==="firma"&&x.a)anchor=x.a;
 if(r==="expertise"&&x.a==="inversion")anchor="inversion";
 if(anchor&&$("#"+anchor)){var el=$("#"+anchor);setTimeout(function(){window.scrollTo({top:el.getBoundingClientRect().top+scrollY-(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hh"))||76)-60,behavior:RM?"auto":"smooth"})},60)}
 else if(!first)window.scrollTo(0,0);
 reveal();
 if(r==="profesionales"&&x.a)personModal(x.a);
 document.title=CFG.titulo;
 if(!first){var m=$("#app");m.focus({preventScroll:true})}
}
function go(){
 var key=parse().key;
 if(key===CUR)return;
 var same=CUR.split("/")[0]===key.split("/")[0]&&key.indexOf("/")>-1&&CUR!=="";
 var c=$("#curtain");
 if(RM||CUR===""||same){CUR=key;render(CUR==="" );reveal();return}
 CUR=key;
 c.classList.remove("out");c.classList.add("on");
 setTimeout(function(){render(false);c.classList.add("out");c.classList.remove("on");setTimeout(function(){c.classList.remove("out")},700)},520);
}
function paint(){header();mnav();footer();document.documentElement.lang=LANG==="zh"?"zh-Hans":LANG;
 if(LANG==="zh"&&!$("#fzh")){var l=document.createElement("link");l.id="fzh";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600&family=Noto+Serif+SC:wght@500;600&display=swap";document.head.appendChild(l)}
 document.body.classList.toggle("zh",LANG==="zh")}
function setLang(l){LANG=l;paint();render(true);reveal()}
function setView(v){VIEW=v;document.body.setAttribute("data-view",v);$$(".vsel [data-v]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.v===v))});var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=v==="2"?"#121315":"#7a1f1f";paint()}

function menuToggle(){var m=$("#mnav"),on=!m.classList.contains("on");m.classList.toggle("on",on);document.body.style.overflow=on?"hidden":""}
function mailto(to,sub,body){return"mailto:"+to+"?subject="+encodeURIComponent(sub)+"&body="+encodeURIComponent(body)}
function rerender(sel,html){var e=$(sel);if(e)e.innerHTML=html}
function refreshBook(){rerender("#bk",bookHTML())}

document.addEventListener("click",function(e){
 var el=e.target.closest("[data-v],[data-lang],[data-a],[data-find],[data-tf],[data-pf],[data-person],[data-bk],[data-bk-area],[data-bk-mod],[data-bk-day],[data-bk-slot],a[href^='#/']");
 if(!el)return;
 if(el.dataset.v){setView(el.dataset.v);render(true);reveal();return}
 if(el.dataset.lang){setLang(el.dataset.lang);if($("#mnav").classList.contains("on"))mnav();return}
 if(el.dataset.a){
  var a=el.dataset.a;
  if(a==="search"){searchModal();var q=$("#sq");if(q)q.focus();return}
  if(a==="menu"){menuToggle();return}
  if(a==="close"){closeModal();return}
  if(a==="priv"){closeModal();return}
  if(a==="pexit"){rerender("#pt",portalLogin());return}
 }
 if(el.dataset.find!=null){FIND=+el.dataset.find;$$("[data-find]").forEach(function(b){b.setAttribute("aria-pressed",String(+b.dataset.find===FIND))});rerender("#fres",findRes());if(innerWidth<1020){var fr=$("#fres");if(fr.getBoundingClientRect().top>innerHeight*.7||fr.getBoundingClientRect().top<0)fr.scrollIntoView({block:"center",behavior:RM?"auto":"smooth"})}return}
 if(el.dataset.tf){TEAMF=el.dataset.tf;$$("[data-tf]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.tf===TEAMF))});rerender("#tgrid",teamGrid());reveal();return}
 if(el.dataset.pf!=null){PUBF=el.dataset.pf;$$("[data-pf]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.pf===PUBF))});var L=D.pubs.filter(function(p){return PUBF==="todos"||pick(p.cat)===PUBF});rerender("#pgrid",L.map(pubCard).join(""));reveal();return}
 if(el.dataset.person){personModal(el.dataset.person);return}
 if(el.dataset.bkArea){B.area=el.dataset.bkArea;refreshBook();return}
 if(el.dataset.bkMod){B.mod=el.dataset.bkMod;refreshBook();return}
 if(el.dataset.bkDay){B.day=el.dataset.bkDay;B.dlbl=el.dataset.lbl;B.slot="";refreshBook();return}
 if(el.dataset.bkSlot){B.slot=el.dataset.bkSlot;refreshBook();return}
 if(el.dataset.bk){if(el.dataset.bk==="next"&&bookOk())B.paso++;else if(el.dataset.bk==="prev"&&B.paso>1)B.paso--;refreshBook();var s=$("#bk");if(s&&s.getBoundingClientRect().top<0)s.scrollIntoView({block:"start"});return}
 if(el.tagName==="A"){
  if($("#mnav").classList.contains("on")){menuToggle()}
  if($("#modal").classList.contains("on"))closeModal();
  var href=el.getAttribute("href");if(href===location.hash){var x=parse();if(x.r==="consulta"||x.r==="home"||true){/* mismo destino: volver arriba */window.scrollTo({top:0,behavior:RM?"auto":"smooth"})}}
 }
});

/* búsqueda */
document.addEventListener("input",function(e){if(e.target.id==="sq")doSearch(e.target.value)});
/* hover de áreas */
function aiSet(k){$$(".aimg img").forEach(function(i){i.classList.toggle("on",+i.dataset.ai===k)});$$(".arow").forEach(function(r){r.classList.toggle("on",+r.dataset.ai===k)})}
document.addEventListener("mouseover",function(e){var r=e.target.closest(".arow");if(r)aiSet(+r.dataset.ai)});
document.addEventListener("focusin",function(e){var r=e.target.closest(".arow");if(r)aiSet(+r.dataset.ai)});
/* teclado */
document.addEventListener("keydown",function(e){
 if(e.key==="Escape"){if($("#modal").classList.contains("on"))closeModal();else if($("#mnav").classList.contains("on"))menuToggle()}
 if(e.key==="/"&&!/input|textarea|select/i.test((e.target.tagName||""))&&!$("#modal").classList.contains("on")){e.preventDefault();searchModal();var q=$("#sq");if(q)q.focus()}
});
$("#modal").addEventListener("click",function(e){if(e.target.id==="modal")closeModal()});

/* formularios: nunca envían nada a un servidor; abren WhatsApp o el correo */
function bad(f,msg){var m=f.querySelector("[role=status]");if(m){m.textContent=msg;m.style.color="var(--brand)"}}
document.addEventListener("submit",function(e){
 var f=e.target;e.preventDefault();
 var via=(e.submitter&&e.submitter.dataset.via)||"wa";
 if(f.id==="cform"){
  var v=function(n){return(f.elements[n].value||"").trim()};
  if(!v("n")||!/^\S+@\S+\.\S+$/.test(v("e"))||!v("a")||!v("m")||!f.elements.ok.checked){bad(f,t("val"));return}
  var body=t("wa_form").replace("{n}",v("n")).replace("{e}",v("e")).replace("{a}",v("a")).replace("{m}",v("m"));
  if(via==="mail")location.href=mailto(CFG.email,t("mail_sub")+" — "+v("a"),body);else window.open(wa(body),"_blank","noopener");
  bad(f,t("listo"));f.querySelector("[role=status]").style.color="var(--acc)";return}
 if(f.id==="bform"){
  var n=(f.elements.n.value||"").trim(),tl=(f.elements.t.value||"").trim(),m=(f.elements.m.value||"").trim();
  if(!n||tl.replace(/\D/g,"").length<7){toast(t("val"));return}
  var msg=t("wa_cita").replace("{n}",n).replace("{t}",tl).replace("{area}",areaName(B.area)).replace("{mod}",t("mod_"+B.mod)).replace("{dia}",B.dlbl||B.day).replace("{hora}",B.slot)+(m?"\n"+m:"");
  if(via==="mail")location.href=mailto(CFG.email,t("mail_sub")+" — "+areaName(B.area),msg);else window.open(wa(msg),"_blank","noopener");
  toast(t("listo"));return}
 if(f.id==="pform"){
  var c=(f.elements.c.value||"").trim().toUpperCase();
  if(c==="DEMO-2026"){rerender("#pt",portalCase())}else{bad(f,t("pt_err"))}
  return}
});

addEventListener("hashchange",go);
/* arranque */
paint();
(function boot(){
 var x=parse();CUR=x.key;render(true);reveal();
 setTimeout(rescue,400);
})();
})();
