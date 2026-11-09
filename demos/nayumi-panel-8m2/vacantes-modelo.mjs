// Corte de difusión revisado el 8 de noviembre de 2026. No acredita contratación.
export const platforms = [
  ['facebook', 'Página de Facebook'], ['grupoFacebook', 'Grupo de Facebook'],
  ['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['whatsapp', 'WhatsApp'], ['metaAds', 'Meta Ads']
];
export const publicationStatuses = ['Por verificar', 'Pendiente de publicar', 'Programado', 'Publicado', 'Activo', 'Pausado', 'Rechazado', 'No aplica'];
const p = (status = 'Por verificar', date = '', url = '') => ({status, date, url});
const fb = 'https://www.facebook.com/';
const tt = 'https://www.tiktok.com/@empleosnayumi/';
const group = 'https://www.facebook.com/groups/2168922623734212';
const ads = 'https://adsmanager.facebook.com/adsmanager/manage/ads?act=858490381773023';
const published = (url = '', date = '2026-11-08') => p('Publicado', date, url);
const active = () => p('Activo', '2026-11-08', ads);
export const vacancyCatalog = [
  {id:'rimac',title:'Costura · Rímac',pay:'S/ 2.600 · Máquina recta',image:'costura-rimac.jpg',note:'Fabricación de toldos de lona. Lunes a sábado, 8 a. m.–6 p. m. Incluida en el anuncio de vacantes.',platforms:{grupoFacebook:published(group),instagram:published(),tiktok:published(tt+'photo/7705680106450078996'),metaAds:active()}},
  {id:'victoria',title:'Ventas de lencería · La Victoria',pay:'S/ 1.600 · Av. Grau',image:'ventas-lenceria-la-victoria.jpg',note:'Lunes a sábado, 8 a. m.–8 p. m. Prioridad para ampliar difusión; no aparece en el anuncio de vacantes revisado.',platforms:{facebook:published(fb+'122110451877518006'),metaAds:p('Pendiente de publicar')}},
  {id:'santa-anita',title:'Todo servicio · Santa Anita',pay:'S/ 1.600',image:'todo-servicio-santa-anita.jpg',domestic:true,note:'Publicada en la página, el grupo propio y carruseles de Instagram y TikTok.',platforms:{facebook:published(fb+'122110439205518006'),grupoFacebook:published(group),instagram:published(),tiktok:published(tt+'photo/7705145810551328020')}},
  {id:'agustino',title:'Todo servicio · El Agustino',pay:'S/ 800 · Lunes, martes y jueves',domestic:true,note:'Atención a 2 personas, 8 a. m.–5 p. m. Ref. Condominio Los Nogales. Imagen exacta pendiente de incorporar.',platforms:{facebook:published(fb+'122110352145518006'),grupoFacebook:published(group),instagram:published(),tiktok:published(tt+'photo/7705458526637886721')}},
  {id:'molina',title:'Cocina y limpieza · La Molina',pay:'S/ 1.500 · Av. Los Frutales',image:'cocina-limpieza-la-molina.jpg',domestic:true,note:'Lunes a viernes, 7:30 a. m.–6 p. m.; sábado, 7:30 a. m.–2 p. m. No confundir con la publicación antigua de Los Fresnos.',platforms:{grupoFacebook:published(group)}},
  {id:'sjl',title:'Cuidado y apoyo · SJL',pay:'S/ 1.500 + beneficios al 50 %',image:'cuidado-san-juan-lurigancho.jpg',domestic:true,note:'Lunes a viernes, 7 a. m.–6 p. m.; sábado, 8 a. m.–1 p. m. Página publicada el 8 nov a las 10:00.',platforms:{facebook:published(fb+'122110442817518006')}},
  {id:'ate',title:'Cuidado y apoyo · Ate-Mayorazgo',pay:'S/ 1.800',image:'cuidado-ate.jpg',domestic:true,note:'Lunes a viernes, 7:30 a. m.–7 p. m.; sábado, 8 a. m.–1 p. m. Publicación del grupo verificada.',platforms:{grupoFacebook:published(group)}},
  {id:'cosmiatria',title:'Cosmiatría · Ate',pay:'S/ 1.500',image:'cosmiatria-ate.jpg',note:'Frente al Mall de Santa Anita. Lunes a sábado, 10 a. m.–8 p. m. Incluida en el anuncio de vacantes.',platforms:{facebook:published(fb+'122110441539518006'),instagram:published(),tiktok:published(tt+'photo/7705145810551328020'),metaAds:active()}},
  {id:'panaderia',title:'Panadería · San Luis',pay:'S/ 2.000',image:'panaderia-san-luis.jpg',note:'Ayudante con experiencia. Turno noche, 7 p. m.–6 a. m.; descanso los viernes. Incluida en el anuncio de vacantes.',platforms:{facebook:published(fb+'122110438557518006'),instagram:published(),tiktok:published(tt+'photo/7705145810551328020'),metaAds:active()}},
  {id:'sjm',title:'Cocina · San Juan de Miraflores',pay:'Condiciones por reconfirmar',domestic:true,pending:true,note:'Registro previo: S/ 500 semanales. Confirmar vigencia y condiciones antes de una nueva publicación.',platforms:{instagram:published(),tiktok:published(tt+'photo/7705145810551328020')}},
  {id:'salamanca',title:'Cocina y limpieza · Ate-Salamanca',pay:'Condiciones por reconfirmar',domestic:true,pending:true,note:'Registro previo: S/ 1.200 + beneficios. Confirmar vigencia; no confundir con limpieza y planchado retirada.',platforms:{facebook:published(fb+'122110035813518006'),instagram:published(),tiktok:published(tt+'photo/7705145810551328020')}},
  {id:'surco',title:'Ventas · Surco',pay:'S/ 1.400 y S/ 1.700 · Reconfirmar condiciones',pending:true,note:'Dos horarios publicados para Av. La Encalada. Incluida en el anuncio de vacantes; confirmar que ambos siguen disponibles.',platforms:{facebook:published(fb+'122110037289518006'),tiktok:published(tt+'photo/7702148019524816148'),metaAds:active()}},
  {id:'cocina-victoria',title:'Cocina y limpieza · La Victoria',pay:'S/ 700 + pasajes · Reconfirmar vigencia',domestic:true,pending:true,note:'Publicación verificada: frente a estación México; lunes a viernes, 8 a. m.–12 p. m. Confirmar antes de repetir.',platforms:{facebook:published(fb+'122109997449518006')}},
  {id:'abancay',title:'Atención al público · Abancay',pay:'Vigencia pendiente de confirmar',pending:true,note:'Figura en el anuncio individual y en el anuncio de varias vacantes. Falta confirmación del jefe; no anunciarla como disponible.',platforms:{metaAds:active()}},
  {id:'mecatronica',title:'Técnico mecatrónico · Cercado de Lima',pay:'Vigencia y condiciones por confirmar',pending:true,note:'Encontrada en publicaciones anteriores de Instagram y TikTok. Pendiente de confirmar con el jefe; no forma parte de la lista reciente.',platforms:{instagram:published('', '2026-10-29'),tiktok:published()}}
];
export const vacancyIds = vacancyCatalog.map(v => v.id);
export function statusesFor(platform) {
  return platform === 'metaAds' ? publicationStatuses.filter(s => s !== 'Publicado') : publicationStatuses.filter(s => !['Activo','Pausado'].includes(s));
}
export function validatePublicationMap(value = {}) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Difusión inválida.');
  const result = {};
  for (const [id, channels] of Object.entries(value)) {
    const vacancy = vacancyCatalog.find(v => v.id === id);
    if (!vacancy || !channels || typeof channels !== 'object' || Array.isArray(channels)) throw Error('Vacante de difusión inválida.');
    result[id] = {};
    for (const [channel, row] of Object.entries(channels)) {
      if (!platforms.some(p => p[0] === channel) || !row || typeof row !== 'object' || !statusesFor(channel).includes(row.status)) throw Error('Estado de difusión inválido.');
      if (vacancy.domestic && channel === 'metaAds' && row.status !== 'No aplica') throw Error('Esta vacante se difunde solo por canales orgánicos.');
      if (typeof row.date !== 'string' || (row.date && (!/^\d{4}-\d{2}-\d{2}$/.test(row.date) || Number.isNaN(Date.parse(row.date)) || new Date(row.date+'T12:00:00Z').toISOString().slice(0,10) !== row.date))) throw Error('Fecha de difusión inválida.');
      if (typeof row.url !== 'string' || row.url.length > 1500) throw Error('Enlace de publicación inválido.');
      if (row.url) { let url; try { url = new URL(row.url); } catch { throw Error('Enlace inválido.'); } if (url.protocol !== 'https:' || url.username || url.password) throw Error('Use un enlace https sin credenciales.'); }
      if (row.updatedBy !== undefined && !['','Kevin','Nayumi'].includes(row.updatedBy)) throw Error('Responsable de difusión inválido.');
      if (row.updatedAt !== undefined && (typeof row.updatedAt !== 'string' || row.updatedAt.length > 40 || (row.updatedAt && Number.isNaN(Date.parse(row.updatedAt))))) throw Error('Fecha de actualización inválida.');
      result[id][channel] = {status:row.status,date:row.date,url:row.url,updatedBy:row.updatedBy || '',updatedAt:row.updatedAt || ''};
    }
  }
  return result;
}
export function publicationFor(state, vacancy, channel) {
  if (vacancy.domestic && channel === 'metaAds') return p('No aplica');
  return state.vacancyPlatforms?.[vacancy.id]?.[channel] || vacancy.platforms[channel] || p();
}

