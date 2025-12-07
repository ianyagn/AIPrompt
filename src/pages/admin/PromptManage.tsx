import React, { useEffect, useState } from 'react';
import { APP_CONFIG } from '@/config';
import { getAuthHeader } from '@/services/auth';
import { fetchAllPrompts, createPrompt, updatePrompt, deletePrompt } from '@/services/prompts';
import { PromptCardData } from '@/types/prompt';

const PromptManage: React.FC = () => {
  const [items, setItems] = useState<PromptCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    author: '',
    authorUrl: '',
    imageUrl: '',
    category: '',
    isFeatured: false as boolean,
    tagsInput: '',
    description: '',
    promptCN: '',
    promptEN: '',
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    id: '',
    title: '',
    author: '',
    authorUrl: '',
    imageUrl: '',
    category: '',
    isFeatured: false as boolean,
    tagsInput: '',
    description: '',
    promptCN: '',
    promptEN: '',
    date: '',
  });
  const [updating, setUpdating] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageInput, setPageInput] = useState('1');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmId, setConfirmId] = useState<string>('');
  const [confirmTitle, setConfirmTitle] = useState<string>('');
  const [deleting, setDeleting] = useState(false);

  const categories = APP_CONFIG.MENU_TABS.filter((t) => t !== 'ALL');

  const load = async (kw?: string, p?: number, ps?: number) => {
    const auth = getAuthHeader();
    if (!auth) {
      return;
    }
    try {
      setLoading(true);
      const currentPage = p ?? page;
      const currentSize = ps ?? pageSize;
      const { items, meta } = await fetchAllPrompts(currentPage, currentSize, kw || undefined);
      setItems(items);
      setError(null);
      setPage(meta.page || currentPage);
      setTotalPages(meta.totalPages || 1);
      setTotal(meta.total || items.length);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '加载失败';
      setError(msg);
      setToast({ message: msg, type: 'error' });
      setTimeout(() => setToast(null), 2000);
      setItems([]);
      setTotalPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuthHeader();
    if (auth) {
      load();
    }
  }, []);

  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索..."
          className="px-3 py-2 border-[3px] border-black bg-white font-bold w-64"
        />
        <button
          onClick={() => { setPage(1); load(keyword.trim() || undefined, 1); }}
          className="px-4 py-2 bg-black text-white font-bold border-2 border-black"
        >
          搜索
        </button>
        <button
          onClick={() => { setIsCreateOpen(true); setCreateError(null); }}
          className="px-4 py-2 bg-white text-black font-bold border-[3px] border-black"
        >
          新增
        </button>
      </div>

      {false && (
        <div className="px-4 py-3 bg-red-100 border-[3px] border-red-600 text-red-800 font-bold">{error}</div>
      )}

      <div className="border-[3px] border-black relative">
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            <div className={`px-6 py-3 border-[3px] font-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${toast.type === 'success' ? 'bg-green-100 border-green-600 text-green-800' : 'bg-red-100 border-red-600 text-red-800'}`}>
              {toast.message}
            </div>
          </div>
        )}
        <div className="grid grid-cols-12 font-black border-b-[3px] border-black bg-[#FCD34D]">
          <div className="p-3">ID</div>
          <div className="p-3 col-span-2">标题</div>
          <div className="p-3 col-span-1">来源</div>
          <div className="p-3 col-span-1">分类</div>
          <div className="p-3 col-span-2">标签</div>
          <div className="p-3">推荐</div>
          <div className="p-3">显示</div>
          <div className="p-3 col-span-2">发布日期</div>
          <div className="p-3 border-l-[3px] border-black">操作</div>
        </div>
        {loading && (
          <div className="p-4">加载中...</div>
        )}
        {!loading && items.map((it, idx) => (
          <div key={it.id} className="grid grid-cols-12 border-b-[3px] border-black">
            <div className="p-3">{(page - 1) * pageSize + idx + 1}</div>
            <div className="p-3 col-span-2">{it.title}</div>
            <div className="p-3 col-span-1">{it.author}</div>
            <div className="p-3 col-span-1">{it.category}</div>
            <div className="p-3 col-span-2">{Array.isArray(it.tags) && it.tags.length ? it.tags.join(', ') : ''}</div>
            <div className="p-3">{it.isFeatured ? '是' : '否'}</div>
            <div className="p-3">{Number(it.isDeleted) === 1 ? '否' : '是'}</div>
            <div className="p-3 col-span-2">{it.date}</div>
            <div className="p-3 flex gap-2 flex-nowrap whitespace-nowrap border-l-[3px] border-black">
              <button
                onClick={() => {
                  setEditError(null);
                  setIsEditOpen(true);
                  setEditForm({
                    id: String(it.id),
                    title: it.title,
                    author: it.author,
                    authorUrl: it.authorUrl || '',
                    imageUrl: it.imageUrl || '',
                    category: it.category || '',
                    isFeatured: Boolean(it.isFeatured),
                    tagsInput: Array.isArray(it.tags) ? it.tags.join(', ') : '',
                    description: it.description || '',
                    promptCN: it.promptCN || '',
                    promptEN: it.promptEN || '',
                    date: it.date || '',
                  });
                }}
                className="px-3 py-1 border-[3px] border-black bg-white font-bold"
              >
                修改
              </button>
              <button
                onClick={() => { setConfirmId(String(it.id)); setConfirmTitle(it.title); setIsConfirmOpen(true); }}
                className="px-3 py-1 border-[3px] border-black bg-white font-bold"
              >
                下架
              </button>
            </div>
          </div>
        ))}
        {!loading && items.length === 0 && (
          <div className="p-4 text-gray-500 font-bold">暂无数据</div>
        )}
        {!loading && totalPages > 1 && (
          <div className="p-3 flex items-center justify-between">
            <div className="font-bold">第 {page} / {totalPages} 页，共 {total} 条</div>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => { const next = Math.max(1, page - 1); setPage(next); load(keyword.trim() || undefined, next); }}
                className={`px-3 py-1 border-[3px] border-black font-bold ${page <= 1 ? 'bg-gray-200 text-gray-500' : 'bg-white text-black'}`}
              >
                上一页
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => { const next = Math.min(totalPages, page + 1); setPage(next); load(keyword.trim() || undefined, next); }}
                className={`px-3 py-1 border-[3px] border-black font-bold ${page >= totalPages ? 'bg-gray-200 text-gray-500' : 'bg-white text-black'}`}
              >
                下一页
              </button>
              <input
                value={pageInput}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9]/g, '');
                  setPageInput(v);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const num = parseInt(pageInput || '1', 10);
                    const target = Math.min(Math.max(1, isNaN(num) ? 1 : num), totalPages);
                    setPage(target);
                    load(keyword.trim() || undefined, target);
                  }
                }}
                placeholder="页码"
                className="w-20 px-3 py-1 border-[3px] border-black bg-white font-bold"
              />
              <button
                onClick={() => {
                  const num = parseInt(pageInput || '1', 10);
                  const target = Math.min(Math.max(1, isNaN(num) ? 1 : num), totalPages);
                  setPage(target);
                  load(keyword.trim() || undefined, target);
                }}
                className="px-3 py-1 border-[3px] border-black bg-white font-bold"
              >
                跳转
              </button>
              <div className="h-6 w-px bg-black mx-2"></div>
              <span className="font-bold">每页</span>
              <select
                value={String(pageSize)}
                onChange={(e) => {
                  const ps = parseInt(e.target.value || '10', 10);
                  const valid = [10, 20, 50, 100].includes(ps) ? ps : 10;
                  setPageSize(valid);
                  setPage(1);
                  load(keyword.trim() || undefined, 1, valid);
                }}
                className="px-3 py-1 border-[3px] border-black bg白色 font-bold"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCreateOpen(false)}></div>
          <div className="relative bg-white border-[3px] border-black w-full max-w-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black mb-4">新增 Prompt</h3>
            {false && (
              <div className="mb-4 px-4 py-2 bg-red-100 border-[3px] border-red-600 text-red-800 font-bold">{createError}</div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">标题</label>
                <input className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">来源</label>
                <input className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">来源链接</label>
                <input className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={form.authorUrl} onChange={(e) => setForm({ ...form, authorUrl: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">图片链接</label>
                <input className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">归类</label>
                <select
                  className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">推荐</label>
                <select className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={String(form.isFeatured)} onChange={(e) => setForm({ ...form, isFeatured: e.target.value === 'true' })}>
                  <option value="true">是</option>
                  <option value="false">否</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-2">标签</label>
                <input placeholder="地图，书本" className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={form.tagsInput} onChange={(e) => setForm({ ...form, tagsInput: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-2">描述</label>
                <textarea rows={3} className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-2">中文提示词</label>
                <textarea rows={3} className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={form.promptCN} onChange={(e) => setForm({ ...form, promptCN: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-2">英文提示词</label>
                <textarea rows={3} className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={form.promptEN} onChange={(e) => setForm({ ...form, promptEN: e.target.value })} />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsCreateOpen(false)} className="px-4 py-2 border-[3px] border-black bg-white font-bold">取消</button>
              <button
                onClick={async () => {
                  try {
                    setCreating(true);
                    setCreateError(null);
                    const tags = form.tagsInput
                      .split(/,|，/)
                      .map((s) => s.trim())
                      .filter(Boolean);
                    const created = await createPrompt({
                      author: form.author,
                      authorUrl: form.authorUrl,
                      title: form.title,
                      description: form.description,
                      imageUrl: form.imageUrl,
                      promptCN: form.promptCN || undefined,
                      promptEN: form.promptEN || undefined,
                      isFeatured: form.isFeatured,
                      tags,
                      category: form.category,
                    });
                    setIsCreateOpen(false);
                    setForm({ title: '', author: '', authorUrl: '', imageUrl: '', category: '', isFeatured: false, tagsInput: '', description: '', promptCN: '', promptEN: '' });
                    await load();
                  } catch (err: any) {
                    setCreateError(err?.message || '创建失败');
                    setToast({ message: '创建失败', type: 'error' });
                    setTimeout(() => setToast(null), 2000);
                  } finally {
                    setCreating(false);
                  }
                }}
                disabled={creating}
                className="px-4 py-2 bg-black text-white font-bold border-2 border-black"
              >
                {creating ? '提交中...' : '提交'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsEditOpen(false)}></div>
          <div className="relative bg-white border-[3px] border-black w-full max-w-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black mb-4">修改 Prompt</h3>
            {false && (
              <div className="mb-4 px-4 py-2 bg-red-100 border-[3px] border-red-600 text-red-800 font-bold">{editError}</div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">标题</label>
                <input className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">来源</label>
                <input className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={editForm.author} onChange={(e) => setEditForm({ ...editForm, author: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">来源链接</label>
                <input className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={editForm.authorUrl} onChange={(e) => setEditForm({ ...editForm, authorUrl: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">图片链接</label>
                <input className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={editForm.imageUrl} onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">归类</label>
                <input className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">推荐</label>
                <select className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={String(editForm.isFeatured)} onChange={(e) => setEditForm({ ...editForm, isFeatured: e.target.value === 'true' })}>
                  <option value="true">是</option>
                  <option value="false">否</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-2">标签</label>
                <input className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={editForm.tagsInput} onChange={(e) => setEditForm({ ...editForm, tagsInput: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-2">描述</label>
                <textarea rows={3} className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-2">中文提示词</label>
                <textarea rows={3} className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={editForm.promptCN} onChange={(e) => setEditForm({ ...editForm, promptCN: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-2">英文提示词</label>
                <textarea rows={3} className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold" value={editForm.promptEN} onChange={(e) => setEditForm({ ...editForm, promptEN: e.target.value })} />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setIsEditOpen(false)} className="px-4 py-2 border-[3px] border-black bg-white font-bold">取消</button>
              <button
                onClick={async () => {
                  try {
                    setUpdating(true);
                    setEditError(null);
                    const tags = editForm.tagsInput
                      .split(/,|，/)
                      .map((s) => s.trim())
                      .filter(Boolean);
                    await updatePrompt({
                      id: editForm.id,
                      author: editForm.author,
                      authorUrl: editForm.authorUrl,
                      date: editForm.date,
                      title: editForm.title,
                      description: editForm.description,
                      imageUrl: editForm.imageUrl,
                      promptCN: editForm.promptCN || undefined,
                      promptEN: editForm.promptEN || undefined,
                      isFeatured: editForm.isFeatured,
                      tags,
                      category: editForm.category,
                    });
                    setIsEditOpen(false);
                    setToast({ message: '更新成功', type: 'success' });
                    setTimeout(() => setToast(null), 2000);
                    await load();
                  } catch (err: any) {
                    setEditError(err?.message || '更新失败');
                    setToast({ message: '更新失败', type: 'error' });
                    setTimeout(() => setToast(null), 2000);
                  } finally {
                    setUpdating(false);
                  }
                }}
                disabled={updating}
                className="px-4 py-2 bg-black text-white font-bold border-2 border-black"
              >
                {updating ? '提交中...' : '确定'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsConfirmOpen(false)}></div>
          <div className="relative bg-white border-[3px] border-black w-full max-w-md p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black mb-2">确认下架</h3>
            <div className="mb-6 font-bold">是否确定下架：{confirmTitle}</div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsConfirmOpen(false)} className="px-4 py-2 border-[3px] border-black bg-white font-bold">取消</button>
              <button
                onClick={async () => {
                  try {
                    setDeleting(true);
                    await deletePrompt(confirmId);
                    setIsConfirmOpen(false);
                    setToast({ message: '下架成功', type: 'success' });
                    setTimeout(() => setToast(null), 2000);
                    await load();
                  } catch (err: any) {
                    setToast({ message: '下架失败', type: 'error' });
                    setTimeout(() => setToast(null), 2000);
                  } finally {
                    setDeleting(false);
                  }
                }}
                disabled={deleting}
                className="px-4 py-2 bg-black text-white font-bold border-2 border-black"
              >
                {deleting ? '处理中...' : '确定下架'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptManage;
