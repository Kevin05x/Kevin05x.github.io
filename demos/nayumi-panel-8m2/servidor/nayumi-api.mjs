// API de NAYUMI. Las claves y los datos se configuran fuera del repositorio.
import { env } from 'cloudflare:workers';
import { vacancyIds, vacancyCatalog, validatePublicationMap } from '../vacantes-modelo.mjs';
const encoder = new TextEncoder();
const encode = (value) => btoa(String.fromCharCode(...value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const decode = (value) => Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
const cookieName = '__Host-nayumi';
function accountName(value) {
    const name = value.trim().toLowerCase();
    return name === 'kevin' ? 'Kevin' : name === 'nayumi' ? 'Nayumi' : null;
}
async function hmac(value) {
    if (!env.NAYUMI_SESSION_SECRET)
        throw Error('Acceso aún no configurado.');
    const key = await crypto.subtle.importKey('raw', encoder.encode(env.NAYUMI_SESSION_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
    return { key, bytes: encoder.encode(value) };
}
async function fingerprint(value) {
    const { key, bytes } = await hmac(value);
    return encode(new Uint8Array(await crypto.subtle.sign('HMAC', key, bytes)));
}
async function session(request) {
    try {
        const authorization = request.headers.get('authorization');
        const value = authorization?.startsWith('Bearer ') ? authorization.slice(7) : request.headers.get('cookie')?.split(';').map(v => v.trim()).find(v => v.startsWith(cookieName + '='))?.slice(cookieName.length + 1);
        if (!value)
            return null;
        const [payload, signature, ...extra] = value.split('.');
        if (!payload || !signature || extra.length)
            return null;
        const { key, bytes } = await hmac(payload);
        if (!await crypto.subtle.verify('HMAC', key, decode(signature), bytes))
            return null;
        const data = JSON.parse(new TextDecoder().decode(decode(payload)));
        if (!['Kevin', 'Nayumi'].includes(data.username) || !Number.isFinite(data.exp) || data.exp < Date.now())
            return null;
        return data.username;
    }
    catch {
        return null;
    }
}
async function createSessionToken(username, lifetime = 86400000) {
    const payload = encode(encoder.encode(JSON.stringify({ username, exp: Date.now() + lifetime, nonce: crypto.randomUUID() })));
    return payload + '.' + await fingerprint(payload);
}
async function sessionCookie(username) {
    return cookieName + '=' + await createSessionToken(username, 7 * 86400000) + '; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=604800';
}
const clearCookie = () => cookieName + '=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0';
async function passwordMatches(username, password) {
    const configured = username === 'Kevin' ? env.KEVIN_PASSWORD_HASH : env.NAYUMI_PASSWORD_HASH;
    if (!configured)
        throw Error('Acceso aún no configurado.');
    const [kind, iterations, salt, expected] = configured.split(':');
    if (kind !== 'pbkdf2' || Number(iterations) !== 100000)
        throw Error('Configuración de acceso inválida.');
    const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
    const result = new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: decode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256));
    const target = decode(expected);
    let mismatch = result.length ^ target.length;
    for (let i = 0; i < result.length; i++)
        mismatch |= result[i] ^ (target[i] ?? 0);
    return mismatch === 0;
}
function allowedOrigin(request) {
    const origin = request.headers.get('origin');
    return origin === new URL(request.url).origin || origin === 'https://kevin05x.github.io' || (env.DEV_ORIGIN && ['127.0.0.1','localhost'].includes(new URL(request.url).hostname) && origin === env.DEV_ORIGIN);
}
const isSameOrigin = (request) => allowedOrigin(request) && request.headers.get('X-Nayumi-Request') === '1';
function corsHeaders(request) {
    const origin = request.headers.get('origin');
    return origin && allowedOrigin(request) ? { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin' } : {};
}
function preflight(request) {
    if (!allowedOrigin(request))
        return new Response(null, { status: 403 });
    return new Response(null, { status: 204, headers: { ...corsHeaders(request), 'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS', 'Access-Control-Allow-Headers': 'Authorization,Content-Type,X-Nayumi-Request,X-Nayumi-Image-Revision', 'Access-Control-Max-Age': '600' } });
}
const json = (data, status = 200, headers = {}) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers } });
const htmlHeaders = { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer', 'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'none'" };

const emptyData = () => ({ version: 1, entries: [], vacancies: {}, vacancyPlatforms: {} });
const fields = ['contacts', 'appointments', 'visits', 'interviews', 'contracts', 'spend', 'revenue'];
const channels = ['WhatsApp', 'Facebook', 'Instagram', 'TikTok', 'Meta Ads', 'Web', 'Referidos', 'Presencial', 'Sin identificar'];
function validateData(value) {
    if (!value || value.version !== 1 || !Array.isArray(value.entries) || value.entries.length > 20000)
        throw Error('Formato de registro inválido.');
    const keys = new Set();
    const entries = value.entries.map((r) => {
        if (!r || typeof r.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(r.date))
            throw Error('Fecha inválida.');
        const d = new Date(r.date + 'T12:00:00Z');
        if (!Number.isFinite(d.getTime()) || d.toISOString().slice(0, 10) !== r.date)
            throw Error('Fecha inválida.');
        if (!['postulantes', 'empleadores'].includes(r.audience) || !channels.includes(r.channel))
            throw Error('Atención o canal inválido.');
        const key = [r.date, r.audience, r.channel].join('|');
        if (keys.has(key))
            throw Error('Hay registros duplicados.');
        keys.add(key);
        for (const f of fields) {
            const n = r[f];
            if (n !== null && (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 1000000 || (!['spend', 'revenue'].includes(f) && !Number.isInteger(n))))
                throw Error('Cantidad inválida.');
        }
        if (typeof r.notes !== 'string' || r.notes.length > 500 || typeof (r.registeredBy ?? '') !== 'string' || (r.registeredBy ?? '').length > 60)
            throw Error('Texto inválido.');
        if (r.updatedBy !== undefined && (typeof r.updatedBy !== 'string' || r.updatedBy.length > 60))
            throw Error('Responsable de edición inválido.');
        if (r.updatedAt !== undefined && (typeof r.updatedAt !== 'string' || (r.updatedAt !== '' && (!/^\d{4}-\d\d-\d\dT/.test(r.updatedAt) || !Number.isFinite(Date.parse(r.updatedAt)) || r.updatedAt.length > 40))))
            throw Error('Fecha de edición inválida.');
        return { ...Object.fromEntries(['date', 'audience', 'channel', ...fields, 'notes'].map(f => [f, r[f]])), registeredBy: r.registeredBy || '', updatedBy: r.updatedBy || '', updatedAt: r.updatedAt || '' };
    });
    const vacancies = {};
    for (const [id, status] of Object.entries(value.vacancies || {}))
        if (vacancyIds.includes(id) && ['Por confirmar', 'Vigente', 'En entrevistas', 'Cubierta', 'Retirada'].includes(status))
            vacancies[id] = status;
    return { version: 1, entries, vacancies, vacancyPlatforms: validatePublicationMap(value.vacancyPlatforms) };
}

const loginHandlers=(()=>{
const dynamic = 'force-dynamic';
const OPTIONS = preflight;
async function POST(request) {
    const reply = (data, status = 200, headers = {}) => json(data, status, { ...corsHeaders(request), ...headers });
    if (!isSameOrigin(request))
        return reply({ error: 'Solicitud no permitida.' }, 403);
    if (!env.DB || !env.NAYUMI_PASSWORD_HASH || !env.NAYUMI_SESSION_SECRET)
        return reply({ error: 'El acceso todavía está en preparación.' }, 503);
    try {
        const raw = await request.text();
        if (raw.length > 2048)
            return reply({ error: 'Datos inválidos.' }, 400);
        const input = JSON.parse(raw);
        if (typeof input.username !== 'string' || typeof input.password !== 'string' || input.password.length > 200)
            return reply({ error: 'Datos inválidos.' }, 400);
        const id = await fingerprint('login:' + (request.headers.get('cf-connecting-ip') || 'local')), now = Date.now();
        const row = await env.DB.prepare('SELECT count,started_at FROM login_attempts WHERE id=?').bind(id).first();
        if (row && row.started_at > now - 900000 && row.count >= 6)
            return reply({ error: 'Demasiados intentos. Espere 15 minutos.' }, 429);
        const username = accountName(input.username);
        if (!username || !await passwordMatches(username, input.password)) {
            await env.DB.prepare('INSERT INTO login_attempts (id,count,started_at) VALUES (?,1,?) ON CONFLICT(id) DO UPDATE SET count=CASE WHEN started_at < ? THEN 1 ELSE count+1 END,started_at=CASE WHEN started_at < ? THEN excluded.started_at ELSE started_at END').bind(id, now, now - 900000, now - 900000).run();
            return reply({ error: 'Usuario o contraseña incorrectos.' }, 401);
        }
        await env.DB.prepare('DELETE FROM login_attempts WHERE id=? OR started_at < ?').bind(id, now - 86400000).run();
        return reply({ ok: true, username, accessToken: await createSessionToken(username) }, 200, { 'Set-Cookie': await sessionCookie(username) });
    }
    catch {
        return reply({ error: 'No se pudo iniciar sesión. Intente de nuevo.' }, 503);
    }
}

return {POST,OPTIONS};
})();

const panelHandlers=(()=>{
const dynamic = 'force-dynamic';
const OPTIONS = preflight;
async function GET(request) {
    const reply = (data, status = 200) => json(data, status, corsHeaders(request));
    const username = await session(request);
    if (!username)
        return reply({ error: 'Inicie sesión.' }, 401);
    if (!env.DB)
        return reply({ error: 'Guardado compartido no disponible.' }, 503);
    const row = await env.DB.prepare('SELECT revision,data FROM panel_state WHERE id=1').first();
    const assets = await env.DB.prepare('SELECT vacancy_id,mime,revision,updated_by,updated_at FROM vacancy_assets').all();
    return reply({... (row ? { revision: row.revision, data: JSON.parse(row.data), username } : { revision: 0, data: emptyData(), username }), assets: assets.results || []});
}
async function PUT(request) {
    const reply = (data, status = 200) => json(data, status, corsHeaders(request));
    const username = await session(request);
    if (!username)
        return reply({ error: 'Inicie sesión.' }, 401);
    if (!isSameOrigin(request))
        return reply({ error: 'Solicitud no permitida.' }, 403);
    if (!env.DB)
        return reply({ error: 'Guardado compartido no disponible.' }, 503);
    try {
        const raw = await request.text();
        if (new TextEncoder().encode(raw).length > 1500000)
            return reply({ error: 'Los registros exceden el tamaño permitido. Descargue un respaldo.' }, 413);
        const input = JSON.parse(raw);
        if (!Number.isSafeInteger(input.revision) || input.revision < 0)
            throw Error('Versión de registro inválida.');
        const data = validateData(input.data), revision = input.revision + 1;
        const previous = await env.DB.prepare('SELECT revision,data FROM panel_state WHERE id=1').first();
        if ((previous?.revision ?? 0) !== input.revision)
            return reply({ error: 'Otro integrante actualizó el panel. Vuelva a revisar.' }, 409);
        const key = (r) => [r.date, r.audience, r.channel].join('|');
        const stored = validateData(previous ? JSON.parse(previous.data) : emptyData());
        data.vacancies = {...stored.vacancies, ...data.vacancies};
        // Older clients/backups must not erase the new publication tracking.
        if (input.data.vacancyPlatforms === undefined) data.vacancyPlatforms = stored.vacancyPlatforms;
        const byKey = new Map(stored.entries.map((r) => [key(r), r]));
        const contentFields = ['date', 'audience', 'channel', 'contacts', 'appointments', 'visits', 'interviews', 'contracts', 'spend', 'revenue', 'notes'];
        const now = new Date().toISOString();
        for (const [id, channelRows] of Object.entries(data.vacancyPlatforms)) {
            for (const [channel, row] of Object.entries(channelRows)) {
                const old = stored.vacancyPlatforms[id]?.[channel];
                channelRows[channel] = old && ['status','date','url'].every(f => old[f] === row[f]) ? old : {...row, updatedBy: username, updatedAt: now};
            }
        }
        data.entries = data.entries.map((r) => {
            const old = byKey.get(key(r));
            // Preserve existing attribution on unchanged rows; clients cannot assign authors.
            if (old && contentFields.every(f => old[f] === r[f]))
                return old;
            return { ...r, registeredBy: old?.registeredBy || username, updatedBy: username, updatedAt: now };
        });
        const result = await env.DB.prepare('INSERT INTO panel_state (id,revision,data,updated_at) VALUES (1,?,?,?) ON CONFLICT(id) DO UPDATE SET revision=excluded.revision,data=excluded.data,updated_at=excluded.updated_at WHERE panel_state.revision=? RETURNING revision').bind(revision, JSON.stringify(data), new Date().toISOString(), input.revision).first();
        if (!result)
            return reply({ error: 'Otro integrante actualizó el panel. Vuelva a revisar.' }, 409);
        return reply({ revision: result.revision, data, username });
    }
    catch (e) {
        return reply({ error: e instanceof Error ? e.message : 'No se pudo guardar.' }, 400);
    }
}

return {GET,PUT,OPTIONS};
})();

const logoutHandlers=(()=>{
const OPTIONS = preflight;
async function POST(request) {
    if (!isSameOrigin(request))
        return json({ error: 'Solicitud no permitida.' }, 403);
    return json({ ok: true }, 200, { ...corsHeaders(request), 'Set-Cookie': clearCookie() });
}

return {POST,OPTIONS};
})();

async function imageHandler(request, id) {
    const username = await session(request), reply = (data,status=200) => json(data,status,corsHeaders(request));
    if (!username) return reply({error:'Inicie sesión.'},401);
    if (!vacancyIds.includes(id)) return reply({error:'Vacante no disponible.'},404);
    if (request.method === 'GET') {
        const row = await env.DB.prepare('SELECT mime,image_bytes FROM vacancy_assets WHERE vacancy_id=?').bind(id).first();
        if (!row) {
            const image = vacancyCatalog.find(v => v.id === id)?.image;
            if (!image || !env.MATERIALES) return reply({error:'Aún no hay una imagen subida para este puesto.'},404);
            const asset = await env.MATERIALES.fetch(new Request('https://materiales.local/vacantes/'+image));
            if (!asset.ok) return reply({error:'La imagen preparada no está disponible.'},404);
            return new Response(asset.body,{headers:{...corsHeaders(request),'Content-Type':'image/jpeg','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Disposition':'inline; filename="nayumi-'+id+'.jpg"'}});
        }
        return new Response(new Uint8Array(row.image_bytes),{headers:{...corsHeaders(request),'Content-Type':row.mime,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; sandbox",'Content-Disposition':'inline; filename="nayumi-'+id+(row.mime==='image/png'?'.png':row.mime==='image/webp'?'.webp':'.jpg')+'"'}});
    }
    if (request.method !== 'PUT') return reply({error:'Método no permitido.'},405);
    if (!isSameOrigin(request)) return reply({error:'Solicitud no permitida.'},403);
    const revisionHeader = request.headers.get('X-Nayumi-Image-Revision');
    if (!revisionHeader || !/^\d+$/.test(revisionHeader) || !Number.isSafeInteger(Number(revisionHeader))) return reply({error:'Actualice el panel antes de subir la imagen.'},400);
    const expected = Number(revisionHeader), limit=1200000;
    const mime=request.headers.get('Content-Type');
    if (!['image/jpeg','image/png','image/webp'].includes(mime)) return reply({error:'Use una imagen JPG, PNG o WebP.'},415);
    if (Number(request.headers.get('Content-Length')||0)>limit) return reply({error:'La imagen preparada excede 1,2 MB.'},413);
    const reader=request.body?.getReader();if(!reader)return reply({error:'Falta la imagen.'},400);
    let size=0;const chunks=[];
    while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>limit){await reader.cancel();return reply({error:'La imagen preparada excede 1,2 MB.'},413)}chunks.push(value)}
    const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length}
    const matches = mime==='image/jpeg' ? bytes[0]===255&&bytes[1]===216&&bytes[2]===255 : mime==='image/png' ? [137,80,78,71,13,10,26,10].every((n,i)=>bytes[i]===n) : new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP';
    if(size<16||!matches)return reply({error:'El archivo no corresponde a una imagen válida.'},400);
    const previous=await env.DB.prepare('SELECT revision FROM vacancy_assets WHERE vacancy_id=?').bind(id).first();
    if((previous?.revision||0)!==expected)return reply({error:'Otro integrante cambió la imagen. Cierre el detalle, pulse Actualizar y revísela antes de reemplazarla.'},409);
    const now=new Date().toISOString();
    const asset=await env.DB.prepare('INSERT INTO vacancy_assets (vacancy_id,mime,image_bytes,revision,updated_by,updated_at) VALUES (?,?,?,1,?,?) ON CONFLICT(vacancy_id) DO UPDATE SET mime=excluded.mime,image_bytes=excluded.image_bytes,revision=vacancy_assets.revision+1,updated_by=excluded.updated_by,updated_at=excluded.updated_at WHERE vacancy_assets.revision=? RETURNING vacancy_id,mime,revision,updated_by,updated_at').bind(id,mime,Array.from(bytes),username,now,expected).first();
    if(!asset)return reply({error:'La imagen cambió mientras se guardaba. Actualice y vuelva a revisar.'},409);
    return reply({asset});
}
export default {async fetch(request){
    const path=new URL(request.url).pathname;
    if(path.startsWith('/api/vacancy-image/')){
        if(request.method==='OPTIONS')return preflight(request);
        try{return await imageHandler(request,path.slice('/api/vacancy-image/'.length))}catch{return json({error:'No se pudo recuperar o guardar la imagen. Intente de nuevo.'},503,corsHeaders(request))}
    }
    const routes={'/api/login':loginHandlers,'/api/panel':panelHandlers,'/api/logout':logoutHandlers};const handlers=routes[path];if(!handlers)return json({error:'Ruta no disponible.'},404,corsHeaders(request));const handle=handlers[request.method];return handle?handle(request):json({error:'Método no permitido.'},405,corsHeaders(request));
}};

