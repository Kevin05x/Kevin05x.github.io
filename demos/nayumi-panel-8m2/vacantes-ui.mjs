import {vacancyCatalog, platforms, statusesFor, publicationFor} from './vacantes-modelo.mjs';

export function createVacancyUI({getState, save, apiFetch, toast, esc, today}) {
  const $ = id => document.getElementById(id);
  let assets = [], selectedId = null, busy = false, detailSequence = 0;
  const imageCache = new Map();
  const filter = $('vacancy-platform'), search = $('vacancy-search'), mode = $('vacancy-mode');
  const dialog = document.createElement('dialog');
  dialog.className = 'vacancy-dialog'; dialog.setAttribute('aria-labelledby','vacancy-dialog-title');
  dialog.innerHTML = `<div class="dialog-heading"><div><span class="eyebrow">DIFUSIÓN Y MATERIALES</span><h2 id="vacancy-dialog-title"></h2></div><button type="button" id="vacancy-close" aria-label="Cerrar detalle de vacante">✕</button></div>
    <p id="vacancy-dialog-note" class="notice"></p><div class="vacancy-detail-grid"><section class="material-panel"><h3>Imagen del puesto</h3><div id="vacancy-image-preview" class="material-preview"></div>
    <p id="vacancy-image-status" class="small muted" role="status"></p><div class="row"><button type="button" id="vacancy-image-download">↓ Descargar imagen</button><label class="upload-control">↑ Subir imagen<input id="vacancy-image-upload" type="file" accept="image/png,image/jpeg,image/webp"></label></div><p class="small muted">Suba solo artes del puesto, sin documentos ni datos de postulantes. Se comparte con el equipo; no publica en las redes.</p><p class="small muted">Antes de reemplazar una imagen, descargue la versión que quiera conservar. El respaldo JSON contiene la difusión; las imágenes se descargan por separado.</p></section>
    <form id="vacancy-publications-form"><h3>¿Dónde está publicado?</h3><p class="small muted">Fecha de referencia o revisión y enlace, si los conoce. “Por verificar” no significa que nunca se publicó.</p><div id="vacancy-platform-fields"></div><p class="error" id="vacancy-publications-error" role="alert"></p><button type="submit" id="vacancy-publications-save" class="primary">Guardar difusión</button></form></div>`;
  document.body.append(dialog);
  const activeStatuses = new Set(['Publicado','Activo']);
  const tone = status => activeStatuses.has(status) ? 'done' : ['Rechazado','Pendiente de publicar'].includes(status) ? 'pending' : status === 'No aplica' ? 'na' : 'unknown';
  const material = id => assets.find(a => a.vacancy_id === id);
  const imageKey = vacancy => vacancy.id+':'+(material(vacancy.id)?.revision || 0);
  async function imageSource(vacancy) {
    const key=imageKey(vacancy);
    if(!imageCache.has(key))imageCache.set(key,(async()=>{const response=await apiFetch('/api/vacancy-image/'+vacancy.id);if(!response.ok)throw Error('No se pudo cargar la imagen compartida. Actualice el panel.');return URL.createObjectURL(await response.blob());})().catch(e=>{imageCache.delete(key);throw e}));
    return imageCache.get(key);
  }
  function render() {
    const state = getState(), channel = filter.value, view = mode.value, query = search.value.trim().toLocaleLowerCase('es');
    const rows = vacancyCatalog.filter(v => {
      if (query && !(v.title+' '+v.pay+' '+v.note).toLocaleLowerCase('es').includes(query)) return false;
      const s = channel ? [publicationFor(state,v,channel)] : platforms.filter(([p]) => p !== 'metaAds' || !v.domestic).map(([p]) => publicationFor(state,v,p));
      return !view || (view === 'pending' && s.some(r => ['Por verificar','Pendiente de publicar','Rechazado'].includes(r.status))) || (view === 'done' && s.some(r => activeStatuses.has(r.status))) || (view === 'image' && !v.image && !material(v.id));
    });
    $('vacancy-count').textContent = rows.length+' de '+vacancyCatalog.length+' puestos';
    $('vacancy-list').innerHTML = rows.length ? rows.map(v => {
      const custom = material(v.id), stateLabel = state.vacancies[v.id] || 'Por confirmar';
      return `<article class="vacancy"><div class="vacancy-thumb" data-image-for="${v.id}"><span>${custom||v.image ? 'Cargando imagen…' : 'Imagen pendiente'}</span></div><div class="vacancy-content"><div class="row"><span class="pill">${v.domestic ? 'Solo orgánico' : 'Puesto comercial'}</span>${v.pending ? '<span class="pill caution">Confirmar vigencia</span>' : ''}</div><h3>${esc(v.title)}</h3><p>${esc(v.pay)}</p><div class="platform-badges">${platforms.map(([p,label]) => {const r=publicationFor(state,v,p);return `<div class="platform-badge ${tone(r.status)}"><span>${esc(label)}</span><strong>${esc(r.status)}</strong></div>`}).join('')}</div><label>Estado de contratación<select data-vacancy="${v.id}" aria-label="Contratación de ${esc(v.title)}">${['Por confirmar','Vigente','En entrevistas','Cubierta','Retirada'].map(s=>`<option${s===stateLabel?' selected':''}>${s}</option>`).join('')}</select></label><button class="vacancy-open" type="button" data-open-vacancy="${v.id}">Ver difusión e imagen →</button></div></article>`;
    }).join('') : '<p class="empty">No hay puestos con estos filtros.</p>';
    for(const v of rows){if(!v.image&&!material(v.id))continue;const target=$('vacancy-list').querySelector('[data-image-for="'+v.id+'"]');imageSource(v).then(src=>{if(!target.isConnected)return;const img=document.createElement('img');img.src=src;img.alt='Arte de '+v.title;img.loading='lazy';target.replaceChildren(img)}).catch(()=>{if(target.isConnected)target.textContent='Imagen no disponible. Pulse Actualizar.'})}
  }
  async function showImage(v) {
    const sequence = ++detailSequence, custom = material(v.id);
    $('vacancy-image-preview').textContent = 'Cargando imagen…'; $('vacancy-image-download').disabled = true;
    try {
      const src = custom || v.image ? await imageSource(v) : '';
      if (sequence !== detailSequence || !dialog.open) return;
      $('vacancy-image-preview').replaceChildren();
      if (!src) {$('vacancy-image-preview').textContent='Aún no hay una imagen exacta para este puesto.';$('vacancy-image-status').textContent='Puede subirla aquí cuando esté preparada.';return;}
      const img = document.createElement('img'); img.src = src; img.alt = 'Imagen de '+v.title;
      $('vacancy-image-preview').append(img); $('vacancy-image-download').disabled=false;
      $('vacancy-image-status').textContent = custom ? 'Subida por '+custom.updated_by+' · '+new Date(custom.updated_at).toLocaleString('es-PE',{timeZone:'America/Lima'}) : 'Imagen preparada de marketing. Revise vigencia antes de difundir.';
    } catch(e) {if(sequence===detailSequence){$('vacancy-image-preview').textContent=e.message;$('vacancy-image-status').textContent='La imagen no se pudo comprobar.';}}
  }
  function open(id) {
    selectedId=id; const v=vacancyCatalog.find(v=>v.id===id), state=getState();
    $('vacancy-dialog-title').textContent=v.title; $('vacancy-dialog-note').textContent=v.note;
    $('vacancy-publications-error').textContent='';
    $('vacancy-platform-fields').innerHTML=platforms.map(([channel,label])=>{
      const row=publicationFor(state,v,channel), locked=v.domestic&&channel==='metaAds';
      return `<fieldset class="publication-field" data-publication="${channel}"><legend>${esc(label)}</legend><label>Estado<select name="status" ${locked?'disabled':''} aria-label="Estado en ${esc(label)}">${statusesFor(channel).map(s=>`<option${s===row.status?' selected':''}>${s}</option>`).join('')}</select></label>${locked?'<p class="small muted">Difusión orgánica, según lo acordado.</p>':`<details><summary>Fecha y enlace</summary><label>Fecha de referencia<input type="date" name="date" value="${esc(row.date)}" aria-label="Fecha de ${esc(label)}"></label><label>Enlace a la publicación<input type="url" name="url" value="${esc(row.url)}" maxlength="1500" placeholder="https://…" aria-label="Enlace de ${esc(label)}"></label></details>`}<span class="small muted">${row.updatedBy?'Último cambio: '+esc(row.updatedBy):'Revisión de referencia: 8 nov 2026'}</span></fieldset>`;
    }).join('');
    if(!dialog.open)dialog.showModal(); showImage(v);
  }
  $('vacancy-close').onclick=()=>{if(!busy)dialog.close()};
  dialog.addEventListener('cancel',e=>{if(busy)e.preventDefault()});
  dialog.addEventListener('close',()=>{detailSequence++;selectedId=null;});
  function setBusy(value) {busy=value;dialog.querySelectorAll('button,input,select').forEach(el=>{if(el.closest('[data-publication="metaAds"]')&&vacancyCatalog.find(v=>v.id===selectedId)?.domestic)return;el.disabled=value});}
  $('vacancy-list').addEventListener('click',e=>{const button=e.target.closest('[data-open-vacancy]');if(button)open(button.dataset.openVacancy)});
  $('vacancy-list').addEventListener('change',async e=>{const id=e.target.dataset.vacancy;if(!id)return;const next=structuredClone(getState());next.vacancies[id]=e.target.value;if(await save(next))toast('Estado de contratación guardado para el equipo.');render()});
  $('vacancy-publications-form').onsubmit=async e=>{
    e.preventDefault();if(busy)return;const id=selectedId,next=structuredClone(getState());next.vacancyPlatforms||={};next.vacancyPlatforms[id]||={};
    for(const field of dialog.querySelectorAll('[data-publication]'))next.vacancyPlatforms[id][field.dataset.publication]={status:field.querySelector('[name="status"]').value,date:field.querySelector('[name="date"]')?.value||'',url:field.querySelector('[name="url"]')?.value.trim()||''};
    setBusy(true);try{if(await save(next)){$('vacancy-publications-error').textContent='';render();toast('Difusión guardada para todo el equipo.');dialog.close()}else $('vacancy-publications-error').textContent='No se guardó. Revise el aviso y vuelva a intentarlo.';}finally{setBusy(false)}
  };
  async function prepareImage(file) {
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>12*1024*1024)throw Error('Use una imagen JPG, PNG o WebP de hasta 12 MB.');
    const bitmap=await createImageBitmap(file);try{
      if(!bitmap.width||!bitmap.height||bitmap.width*bitmap.height>40000000)throw Error('La imagen es demasiado grande.');
      const scale=Math.min(1,1600/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);
      const ctx=canvas.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);
      for(const quality of [.92,.82,.7]){const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',quality));if(blob&&blob.size<=1200000)return blob;}
      throw Error('No se pudo preparar una imagen liviana. Pruebe con otra de menor tamaño.');
    } finally {bitmap.close()}
  }
  $('vacancy-image-upload').onchange=async e=>{
    const file=e.target.files[0];if(!file||busy)return;const id=selectedId,existing=material(id);setBusy(true);$('vacancy-image-status').textContent='Preparando y guardando imagen…';
    try{const blob=await prepareImage(file);const response=await apiFetch('/api/vacancy-image/'+id,{method:'PUT',headers:{'Content-Type':blob.type,'X-Nayumi-Image-Revision':String(existing?.revision||0)},body:blob});const result=await response.json();if(!response.ok)throw Error(result.error||'No se pudo guardar la imagen.');assets=assets.filter(a=>a.vacancy_id!==id);assets.push(result.asset);render();await showImage(vacancyCatalog.find(v=>v.id===id));toast('Imagen guardada y disponible para el equipo.');}
    catch(err){$('vacancy-image-status').textContent=err.message;}finally{e.target.value='';setBusy(false);if(!$('vacancy-image-preview').querySelector('img'))$('vacancy-image-download').disabled=true;}
  };
  $('vacancy-image-download').onclick=async()=>{
    if(!selectedId)return;const id=selectedId;try{const response=await apiFetch('/api/vacancy-image/'+id);if(!response.ok)throw Error('No se pudo descargar.');const blob=await response.blob(),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='nayumi-'+id+(blob.type==='image/png'?'.png':blob.type==='image/webp'?'.webp':'.jpg');a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);toast('Descarga de imagen preparada.');}catch(e){toast(e.message)}
  };
  [filter,mode,search].forEach(el=>el.addEventListener(el===search?'input':'change',render));
  return {render,setAssets(value){assets=Array.isArray(value)?value:[];},isBusy:()=>busy};
}

