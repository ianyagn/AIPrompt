import React, { useState, useEffect } from 'react';
import PromptCard from '@/components/prompt/PromptCard';
import { PromptCardData } from '@/types/prompt';
import { APP_CONFIG } from '@/config';
import { fetchPrompts } from '@/services/prompts';
import LanguageSelector from '@/components/LanguageSelector';
import CategoryTabs from '@/components/CategoryTabs';
import SearchBar from '@/components/SearchBar';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(APP_CONFIG.MENU_TABS[0]);
  const [currentLang, setCurrentLang] = useState('简体中文');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [committedQuery, setCommittedQuery] = useState('');
  const [searchSubmitNonce, setSearchSubmitNonce] = useState(0);

  const [prompts, setPrompts] = useState<PromptCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const SCROLL_PAGE_SIZE = 8;
  const [nextScrollPage, setNextScrollPage] = useState(2);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  

  const tabs = APP_CONFIG.MENU_TABS;
  const languages = [
    { code: 'zh-CN', label: '简体中文' },
    { code: 'zh-TW', label: '繁体中文' },
    { code: 'en', label: 'English' }
  ];

  

  useEffect(() => {
    try {
      const msg = localStorage.getItem('global_toast');
      if (msg) {
        setToast({ message: msg, type: 'error' });
        localStorage.removeItem('global_toast');
        setTimeout(() => setToast(null), 2000);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const w: any = window as any;
      if (w.__track_root_once) return;
      w.__track_root_once = true;
      setTimeout(() => { try { delete w.__track_root_once; } catch {} }, 1000);
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/' }),
      }).catch(() => {});
    } catch {}
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const categoryParam = activeTab && activeTab !== 'ALL' ? activeTab : undefined;
        const { items, meta } = await fetchPrompts(1, 24, undefined, categoryParam);
        setPrompts(items);
        setError(null);
        setPage(meta.page || 1);
        setTotalPages(meta.totalPages || 1);
        setTotal(meta.total || items.length);
        setNextScrollPage(Math.floor(items.length / SCROLL_PAGE_SIZE) + 1);
      } catch (err) {
        console.error('Error loading prompts via API:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred while loading data.');
        setPrompts([]);
        setPage(1);
        setTotalPages(1);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };
    setPage(1);
    load();
  }, [activeTab]);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const keyword = committedQuery.trim();
        const categoryParam = activeTab && activeTab !== 'ALL' ? activeTab : undefined;
        const { items, meta } = await fetchPrompts(1, 24, keyword || undefined, categoryParam);
        setPrompts(items);
        setError(null);
        setPage(meta.page || 1);
        setTotalPages(meta.totalPages || 1);
        setTotal(meta.total || items.length);
        setNextScrollPage(Math.floor(items.length / SCROLL_PAGE_SIZE) + 1);
      } catch (err) {
        console.error('Error loading prompts via API:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred while loading data.');
        setPrompts([]);
        setPage(1);
        setTotalPages(1);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };
    if (searchSubmitNonce > 0 || committedQuery === '') {
      setPage(1);
      load();
    }
  }, [searchSubmitNonce]);

  useEffect(() => {
    const onScroll = async () => {
      if (isLoading || isLoadingMore) return;
      if (page >= totalPages) return;
      const threshold = 200;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;
      if (!nearBottom) return;
      try {
        setIsLoadingMore(true);
        const keyword = committedQuery.trim();
        const categoryParam = activeTab && activeTab !== 'ALL' ? activeTab : undefined;
        const nextPage = nextScrollPage;
        const { items, meta } = await fetchPrompts(nextPage, SCROLL_PAGE_SIZE, keyword || undefined, categoryParam);
        setPrompts((prev) => {
          const seen = new Set(prev.map((p) => p.id));
          const uniq = items.filter((it) => !seen.has(it.id));
          return [...prev, ...uniq];
        });
        setPage(meta.page || nextPage);
        setTotalPages(meta.totalPages || totalPages);
        setTotal(meta.total || total);
        setNextScrollPage((meta.page || nextPage) + 1);
      } catch (err) {
        console.error('Error loading more prompts via API:', err);
      } finally {
        setIsLoadingMore(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLoading, isLoadingMore, page, totalPages, committedQuery, activeTab, nextScrollPage]);

  // 语言选择的外部点击关闭逻辑已迁移到 LanguageSelector 组件

  const displayPrompts = prompts;

  return (
    <div className="min-h-screen bg-[#e5e5e5] py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
          <div className={`px-6 py-3 border-[3px] font-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${toast.type === 'success' ? 'bg-green-100 border-green-600 text-green-800' : 'bg-red-100 border-red-600 text-red-800'}`}>
            {toast.message}
          </div>
        </div>
      )}
      
      <LanguageSelector
        currentLang={currentLang}
        languages={languages}
        isOpen={isLangMenuOpen}
        onToggle={() => setIsLangMenuOpen(!isLangMenuOpen)}
        onClose={() => setIsLangMenuOpen(false)}
        onSelect={(lang) => { setCurrentLang(lang.label); setIsLangMenuOpen(false); }}
      />

      <div className="max-w-[1920px] mx-auto mb-8 flex flex-col items-center pt-8 md:pt-0">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tighter text-center uppercase drop-shadow-sm">
          {APP_CONFIG.TITLE}
        </h1>
        <div className="bg-white border-2 border-black px-6 py-2 rotate-[-1deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] hover:rotate-0 transition-transform duration-300">
          <p className="text-gray-800 font-bold text-sm md:text-base tracking-wide flex items-center gap-2">
            <span>✨</span> {APP_CONFIG.SUBTITLE}
          </p>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <CategoryTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full md:w-auto">
            <div className="bg-[#FCD34D] border-[3px] border-black px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2 hover:rotate-0 transition-transform cursor-default">
              <span className="font-black text-sm">总(更新中)：{total}</span>
            </div>

            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSubmit={() => { setCommittedQuery(searchInput); setSearchSubmitNonce((n) => n + 1); }}
              onClear={() => { setSearchInput(''); setCommittedQuery(''); setSearchSubmitNonce((n) => n + 1); }}
              placeholder="搜索提示词或标签..."
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto w-full h-[3px] bg-black mb-8"></div>

      {error && (
        <div className="max-w-[1920px] mx-auto mb-8 bg-red-100 border-[3px] border-red-500 text-red-700 p-8 font-bold shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] text-center">
          <h3 className="text-2xl mb-2">Error Loading Data</h3>
          <p>Failed to load prompts from the remote server.</p>
          <p className="text-sm mt-2 font-mono bg-red-50 p-2 border border-red-300 inline-block">{error}</p>
        </div>
      )}

      {isLoading && !error && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-black text黑色 animate-pulse uppercase tracking-widest">LOADING DATABASE...</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {displayPrompts.map((prompt) => (
            <PromptCard key={prompt.id} data={prompt} />
          ))}
          {displayPrompts.length === 0 && (
            <div className="col-span-full py-20 text中心 flex flex-col items-center justify中心 opacity-50">
              <div className="bg-gray-200 rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 font-bold text-lg">没有找到相关提示词</p>
              <button 
                onClick={() => { setSearchInput(''); setCommittedQuery(''); setSearchSubmitNonce((n) => n + 1); }}
                className="mt-4 text蓝色-600 hover:underline font-bold"
              >
                清除搜索
              </button>
            </div>
          )}
        </div>
      )}

      {!error && !isLoading && isLoadingMore && (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mr-3"></div>
          <span className="font-black">加载更多...</span>
        </div>
      )}

      <footer className="max-w-[1920px] mx-auto mt-16 text-center text-gray-400 text-sm">
        <p>© 2025 AI Prompt Library. 101 LABS x GOOGOL NEXT LABS</p>
      </footer>
    </div>
  );
};

export default App;
