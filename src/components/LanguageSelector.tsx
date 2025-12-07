import React, { useEffect, useRef } from 'react';

export interface LanguageOption {
  code: string;
  label: string;
}

interface LanguageSelectorProps {
  currentLang: string;
  languages: LanguageOption[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (lang: LanguageOption) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  languages,
  isOpen,
  onToggle,
  onClose,
  onSelect,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50" ref={ref}>
      <div className="relative">
        <button
          onClick={onToggle}
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
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-32 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelect(lang)}
                className="px-4 py-2 text-left text-sm font-bold hover:bg-black hover:text-white transition-colors border-b-2 border-transparent last:border-b-0"
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
