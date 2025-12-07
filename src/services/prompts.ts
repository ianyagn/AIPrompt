import { PromptCardData } from '@/types/prompt';
import { API_BASE_URL, IS_DEV } from '@/config/env';
import { getAuthHeader } from '@/services/auth';

export interface PromptsResponseMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PromptsResult {
  items: PromptCardData[];
  meta: PromptsResponseMeta;
}

function cleanUrl(url?: string) {
  if (!url) return url;
  return url.replace(/`/g, '').trim();
}

export async function fetchPrompts(page = 1, pageSize = 24, keyword?: string, category?: string): Promise<PromptsResult> {
  const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  const kw = keyword?.trim();
  const cat = category?.trim();
  if (kw) params.append('keyword', kw);
  if (cat && cat !== 'ALL') params.append('category', cat);
  const qs = params.toString();
  const url = IS_DEV ? `/api/prompts?${qs}` : `${API_BASE_URL}/api/prompts?${qs}`;
  const auth = getAuthHeader();
  const headers = auth ? { Authorization: auth } : undefined;
  const resp = await fetch(url, { headers });
  if (!resp.ok) {
    if (resp.status === 401) {
      handleUnauthorized();
      throw new Error('会话已失效');
    }
    throw new Error(`Failed: ${resp.status} ${resp.statusText}`);
  }
  const json = await resp.json();

  const data = json?.data || {};
  const items = Array.isArray(data.items) ? data.items : [];
  const meta: PromptsResponseMeta = data.meta || { page, pageSize, total: items.length, totalPages: 1 };

  const normalized: PromptCardData[] = items.map((it: any, idx: number) => ({
    id: it?.id != null ? String(it.id) : `anon-${page}-${idx + 1}`,
    author: it.author ?? '',
    authorUrl: cleanUrl(it.authorUrl),
    date: it.date ?? '',
    title: it.title ?? '',
    description: it.description ?? '',
    imageUrl: cleanUrl(it.imageUrl) ?? '',
    promptCN: it.promptCN ?? '',
    promptEN: it.promptEN ?? '',
    isFeatured: Boolean(it.isFeatured),
    tags: Array.isArray(it.tags) ? it.tags : [],
    likes: typeof it.likes === 'number' ? it.likes : undefined,
    category: it.category ?? 'DEFAULT',
    isDeleted: typeof it.is_deleted === 'number' ? it.is_deleted : (typeof it.isDeleted === 'number' ? it.isDeleted : undefined),
  }));

  return { items: normalized, meta };
}

export async function fetchAllPrompts(page = 1, pageSize = 24, keyword?: string): Promise<PromptsResult> {
  const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  const kw = keyword?.trim();
  if (kw) params.append('keyword', kw);
  const qs = params.toString();
  const url = IS_DEV ? `/api/prompts/all?${qs}` : `${API_BASE_URL}/api/prompts/all?${qs}`;
  const auth = getAuthHeader();
  const headers = auth ? { Authorization: auth } : undefined;
  const resp = await fetch(url, { headers });
  if (!resp.ok) {
    if (resp.status === 401) {
      handleUnauthorized();
      throw new Error('会话已失效');
    }
    throw new Error(`Failed: ${resp.status} ${resp.statusText}`);
  }
  const json = await resp.json();
  const data = json?.data || {};
  const items = Array.isArray(data.items) ? data.items : Array.isArray(json?.data) ? json.data : [];
  const meta: PromptsResponseMeta = data.meta || { page, pageSize, total: items.length, totalPages: 1 };
  const normalized: PromptCardData[] = items.map((it: any, idx: number) => ({
    id: it?.id != null ? String(it.id) : `anon-${page}-${idx + 1}`,
    author: it.author ?? '',
    authorUrl: cleanUrl(it.authorUrl),
    date: it.date ?? '',
    title: it.title ?? '',
    description: it.description ?? '',
    imageUrl: cleanUrl(it.imageUrl) ?? '',
    promptCN: it.promptCN ?? '',
    promptEN: it.promptEN ?? '',
    isFeatured: Boolean(it.isFeatured),
    tags: Array.isArray(it.tags) ? it.tags : [],
    likes: typeof it.likes === 'number' ? it.likes : undefined,
    category: it.category ?? 'DEFAULT',
    isDeleted: typeof it.is_deleted === 'number' ? it.is_deleted : (typeof it.isDeleted === 'number' ? it.isDeleted : undefined),
  }));
  return { items: normalized, meta };
}

export interface CreatePromptPayload {
  author: string;
  authorUrl: string;
  title: string;
  description: string;
  imageUrl: string;
  promptCN?: string;
  promptEN?: string;
  isFeatured: boolean;
  tags?: string[];
  category: string;
}

export async function createPrompt(payload: CreatePromptPayload): Promise<PromptCardData> {
  const url = IS_DEV ? `/api/prompts/create` : `${API_BASE_URL}/api/prompts/create`;
  const body = {
    ...payload,
    authorUrl: cleanUrl(payload.authorUrl),
    imageUrl: cleanUrl(payload.imageUrl),
    promptCN: payload.promptCN ?? '',
    promptEN: payload.promptEN ?? '',
    tags: Array.isArray(payload.tags) ? payload.tags : [],
  };
  const auth = getAuthHeader();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (auth) headers.Authorization = auth;
  const resp = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const json = await resp.json();
  if (!resp.ok) {
    if (resp.status === 401) {
      handleUnauthorized();
      throw new Error('会话已失效');
    }
    const msg = json?.msg || JSON.stringify(json);
    throw new Error(msg);
  }
  const data = json?.data;
  const item: PromptCardData = {
    id: String(data?.id ?? ''),
    author: data?.author ?? body.author,
    authorUrl: cleanUrl(data?.authorUrl ?? body.authorUrl),
    date: data?.date ?? '',
    title: data?.title ?? body.title,
    description: data?.description ?? body.description,
    imageUrl: cleanUrl(data?.imageUrl ?? body.imageUrl) ?? '',
    promptCN: data?.promptCN ?? body.promptCN ?? '',
    promptEN: data?.promptEN ?? body.promptEN ?? '',
    isFeatured: Boolean(data?.isFeatured ?? body.isFeatured),
    tags: Array.isArray(data?.tags) ? data.tags : body.tags ?? [],
    category: data?.category ?? body.category,
  };
  return item;
}

export interface UpdatePromptPayload {
  id: string | number;
  author: string;
  authorUrl: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  promptCN?: string;
  promptEN?: string;
  isFeatured: boolean;
  tags?: string[];
  category: string;
}

export async function updatePrompt(payload: UpdatePromptPayload): Promise<PromptCardData> {
  const url = IS_DEV ? `/api/prompts/update` : `${API_BASE_URL}/api/prompts/update`;
  const body = {
    ...payload,
    authorUrl: cleanUrl(payload.authorUrl),
    imageUrl: cleanUrl(payload.imageUrl),
    promptCN: payload.promptCN ?? '',
    promptEN: payload.promptEN ?? '',
    tags: Array.isArray(payload.tags) ? payload.tags : [],
  };
  const auth = getAuthHeader();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (auth) headers.Authorization = auth;
  const resp = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const json = await resp.json();
  if (resp.status === 422) {
    throw new Error('更新失败');
  }
  if (!resp.ok || (json && typeof json.code === 'number' && json.code !== 0)) {
    if (resp.status === 401) {
      handleUnauthorized();
      throw new Error('会话已失效');
    }
    const msg = json?.msg || '更新失败';
    throw new Error(msg);
  }
  const data = json?.data ?? body;
  const item: PromptCardData = {
    id: String(data.id),
    author: data.author,
    authorUrl: cleanUrl(data.authorUrl),
    date: data.date ?? '',
    title: data.title,
    description: data.description,
    imageUrl: cleanUrl(data.imageUrl) ?? '',
    promptCN: data.promptCN ?? '',
    promptEN: data.promptEN ?? '',
    isFeatured: Boolean(data.isFeatured),
    tags: Array.isArray(data.tags) ? data.tags : [],
    category: data.category,
  };
  return item;
}

export async function deletePrompt(id: string | number): Promise<void> {
  const url = IS_DEV ? `/api/prompts/delete` : `${API_BASE_URL}/api/prompts/delete`;
  const body = { id };
  const auth = getAuthHeader();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (auth) headers.Authorization = auth;
  const resp = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const json = await resp.json().catch(() => ({}));
  if (resp.status === 422) {
    throw new Error('删除失败');
  }
  if (!resp.ok || (json && typeof json.code === 'number' && json.code !== 0)) {
    if (resp.status === 401) {
      handleUnauthorized();
      throw new Error('会话已失效');
    }
    const msg = json?.msg || '删除失败';
    throw new Error(msg);
  }
}
function handleUnauthorized() {
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_type');
  } catch {}
  try {
    const evt = new CustomEvent('auth:expired');
    window.dispatchEvent(evt);
  } catch {}
}
