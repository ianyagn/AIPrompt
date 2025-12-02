
import React, { useState, useRef, useEffect } from 'react';
import PromptCard from './components/PromptCard';
import { PROMPTS, GITHUB_DATA_URL } from './constants';
import { PromptCardData } from './types';

const App: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptCardData[]>(PROMPTS);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');
  const [currentLang, setCurrentLang] = useState('简体中文');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const langMenuRef = useRef<HTMLDivElement>(null);

  const tabs = ['ALL', 'Banana Nano', 'SORA', 'Qwen', '豆包'];
  const languages = [
    { code: 'zh-CN', label: '简体中文' },
    { code: 'zh-TW', label: '繁体中文' },
    { code: 'en', label: 'English' }
  ];

  // Close language menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }

    if (isLangMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangMenuOpen]);

  // Fetch prompts from GitHub
  useEffect(() => {
    const fetchPrompts = async () => {
      // If no URL is configured, stop loading and rely on local data (which might be empty)
      if (!GITHUB_DATA_URL) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(GITHUB_DATA_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // Generate IDs since they are removed from the source
        const dataWithIds = data.map((item: any, index: number) => ({
          ...item,
          id: String(index + 1)
        }));
        setPrompts(dataWithIds);
      } catch (error) {
        console.error('Failed to fetch prompts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  // Filter prompts based on active tab category AND search query
  const displayPrompts = prompts.filter(prompt => {
    // 1. Filter by Tab/Category
    const matchesCategory = activeTab === 'ALL' || prompt.category === activeTab;

    // 2. Filter by Search Query (Title or Tags)
    const lowerQuery = searchQuery.toLowerCase().trim();
    const matchesSearch = !lowerQuery ||
      prompt.title.toLowerCase().includes(lowerQuery) ||
      (prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(lowerQuery)));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#e5e5e5] py-12 px-4 sm:px-6 lg:px-8 font-sans relative">

      {/* Language Switcher - Absolute Top Right */}
      <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50" ref={langMenuRef}>
        <div className="relative">
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-2 bg-white border-[3px] border-black px-3 py-1.5 font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 8 6 6"></path>
              <path d="m4 14 6-6 2-3"></path>
              <path d="M2 5h12"></path>
              <path d="M7 2h1"></path>
              <path d="m22 22-5-10-5 10"></path>
              <path d="M14 18h6"></path>
            </svg>
            <span className="text-sm">{currentLang}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {isLangMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-32 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang.label);
                    setIsLangMenuOpen(false);
                  }}
                  className="px-4 py-2 text-left text-sm font-bold hover:bg-black hover:text-white transition-colors border-b-2 border-transparent last:border-b-0"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Header Section */}
      <div className="max-w-[1920px] mx-auto mb-8 flex flex-col items-center pt-8 md:pt-0">

        {/* Centered Title */}
        <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tighter text-center uppercase drop-shadow-sm">
          AI 提示词库
        </h1>

        {/* Relocated Subtitle - Styled as a badge/sticker */}
        <div className="bg-white border-2 border-black px-6 py-2 rotate-[-1deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] hover:rotate-0 transition-transform duration-300">
          <p className="text-gray-800 font-bold text-sm md:text-base tracking-wide flex items-center gap-2">
            <span>✨</span> 精选高质量 AIGC 提示词，激发你的创作灵感，然我们一起创作吧。
          </p>
        </div>
      </div>

      {/* Toolbar Section: Menu (Left) + Count/Search (Right) */}
      <div className="max-w-[1920px] mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">

          {/* Navigation Menu (Left Aligned) */}
          <div className="flex flex-wrap justify-start gap-4 w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  // Optional: Clear search when switching tabs? 
                  // Keeping search allows searching across tabs or refining within new tab. 
                  // Current logic keeps search query.
                }}
                className={`
                  px-6 py-2.5 font-bold text-base border-[3px] border-black transition-all duration-200
                  ${activeTab === tab
                    ? 'bg-[#FCD34D] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]'
                    : 'bg-white text-black hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Section: Count + Search */}
          <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full md:w-auto">

            {/* Total Count Badge */}
            <div className="bg-[#FCD34D] border-[3px] border-black px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2 hover:rotate-0 transition-transform cursor-default">
              <span className="font-black text-sm">总(更新中)：{displayPrompts.length}</span>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索提示词或标签..."
                className="block w-full pl-10 pr-3 py-2.5 border-[3px] border-black bg-white text-black placeholder-gray-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 transition-all font-bold"
              />
              {/* Clear Search Button (visible if query exists) */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Separator Line */}
      <div className="max-w-[1920px] mx-auto w-full h-[3px] bg-black mb-8"></div>

      {/* Main Grid Layout 
          - 4 blocks per row on lg screens (1024px+)
      */}
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
        {displayPrompts.map((prompt) => (
          <PromptCard key={prompt.id} data={prompt} />
        ))}

        {/* Loading State */}
        {isLoading && (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
            <p className="text-gray-500 font-bold text-lg">正在加载提示词...</p>
          </div>
        )}

        {/* Empty State (only if not loading) */}
        {!isLoading && displayPrompts.length === 0 && (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center opacity-50">
            <div className="bg-gray-200 rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-bold text-lg">没有找到相关提示词</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-600 hover:underline font-bold"
            >
              清除搜索
            </button>
          </div>
        )}
      </div>

      {/* Simple Footer */}
      <footer className="max-w-[1920px] mx-auto mt-16 text-center text-gray-400 text-sm">
        <p>© 2025 AI Prompt Library. Design inspired by provided reference.</p>
      </footer>
    </div>
  );
};

export default App;
