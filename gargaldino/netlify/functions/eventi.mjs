import { getStore } from '@netlify/blobs';

const STORE_NAME = 'garibaldino-eventi';
const STORE_KEY = 'gallery';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function normalizeItem(item) {
  if (!item || typeof item !== 'object') return null;

  const mediaType = item.mediaType === 'video' ? 'video' : 'image';
  const mediaData = typeof item.mediaData === 'string' ? item.mediaData : '';
  const posterData = typeof item.posterData === 'string' ? item.posterData : mediaData;
  const titolo = typeof item.titolo === 'string' ? item.titolo.trim() : '';
  const descrizione = typeof item.descrizione === 'string' ? item.descrizione.trim() : '';
  const id = typeof item.id === 'string' ? item.id : '';

  if (!id || !mediaData) return null;

  return {
    id,
    mediaType,
    mediaData,
    posterData,
    titolo: titolo || 'Evento',
    descrizione,
    mimeType: typeof item.mimeType === 'string' ? item.mimeType : '',
    createdAt: typeof item.createdAt === 'number' ? item.createdAt : Date.now(),
  };
}

function normalizeItems(items) {
  if (!Array.isArray(items)) return [];
  return items.map(normalizeItem).filter(Boolean);
}

export default async (req) => {
  const store = getStore({ name: STORE_NAME, consistency: 'strong' });

  if (req.method === 'GET') {
    const entry = await store.get(STORE_KEY, { type: 'json' });
    const items = normalizeItems(entry?.items);
    return json({
      items,
      updatedAt: entry?.updatedAt || null,
    });
  }

  if (req.method === 'POST') {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return json({ error: 'Invalid JSON body' }, 400);
    }

    const items = normalizeItems(body.items);
    await store.setJSON(STORE_KEY, {
      items,
      updatedAt: Date.now(),
    });

    return json({ ok: true, count: items.length });
  }

  if (req.method === 'DELETE') {
    await store.delete(STORE_KEY);
    return json({ ok: true });
  }

  return json({ error: 'Method not allowed' }, 405);
};

export const config = {
  path: '/api/eventi',
};
