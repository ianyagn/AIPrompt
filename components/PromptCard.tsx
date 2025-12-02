
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { PromptCardData } from '../types';

interface PromptCardProps {
  data: PromptCardData;
}

const PromptCard: React.FC<PromptCardProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Prevent scrolling when any modal is open
  React.useEffect(() => {
    if (isModalOpen || isImageModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isImageModalOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast({ show: true, message: '复制成功' });
      setTimeout(() => setToast({ show: false, message: '' }), 1500);
    });
  };

  // Helper to get color based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Banana Nano':
        return '#fef08a'; // Yellow-200
      case 'SORA':
        return '#bfdbfe'; // Blue-200
      case 'Qwen':
        return '#e9d5ff'; // Purple-200
      case '豆包':
        return '#bbf7d0'; // Green-200
      default:
        return '#e5e7eb'; // Gray-200
    }
  };

  return (
    <>
      <div className="flex flex-col h-full bg-white border-[3px] border-black relative group hover:-translate-y-1 transition-transform duration-200">
        
        {/* Featured Badge - Optimized */}
        {data.isFeatured && (
          <div className="absolute -top-5 -right-4 z-20 pointer-events-none">
            <div className="bg-[#FFD700] text-black text-sm font-black px-4 py-1 border-[3px] border-black -rotate-[5deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] tracking-widest uppercase">
              精选
            </div>
          </div>
        )}

        <div className="p-5 flex flex-col flex-grow">
          
          {/* Title and Date */}
          <div className="flex justify-between items-start mb-4 mt-2">
            <h2 className="text-xl font-black leading-tight text-black mr-2">
              {data.title}
            </h2>
            <span className="text-xs font-bold text-gray-400 shrink-0 pt-1 uppercase tracking-wide">
              {data.date}
            </span>
          </div>

          {/* Image - Clickable */}
          <div 
            className="w-full aspect-[16/9] border-2 border-black mb-4 overflow-hidden bg-gray-100 cursor-pointer relative group/image"
            onClick={() => setIsImageModalOpen(true)}
          >
            <img 
              src={data.imageUrl} 
              alt={data.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
              loading="lazy"
            />
            {/* Hover Overlay Hint - Simplified Eye Icon */}
            <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 text-white drop-shadow-md">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                   <circle cx="12" cy="12" r="3"></circle>
                 </svg>
              </div>
            </div>
          </div>

          {/* Description - flex-grow to push tags and buttons down */}
          <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
            {data.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Category Tag (Leftmost) */}
            <span 
              className="border border-black px-2 py-1 text-xs font-bold text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)]"
              style={{ backgroundColor: getCategoryColor(data.category) }}
            >
              {data.category}
            </span>

            {/* Other Tags */}
            {data.tags && data.tags.map((tag, index) => (
              <span key={index} className="border border-black px-2 py-1 text-xs font-bold bg-white text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)]">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-[#1a1a1a] text-white font-bold py-2.5 px-4 flex items-center justify-center gap-2 border-2 border-black hover:bg-gray-800 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              提示词
            </button>
            
            <button className="w-12 flex items-center justify-center border-2 border-black bg-white hover:bg-gray-50 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Prompt Modal Portal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content - Adaptive height with max limit */}
          <div className="bg-white border-[3px] border-black w-[600px] max-h-[min(600px,90vh)] max-w-[95vw] flex flex-col relative z-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Toast Notification - Centered and Brutalist */}
            {toast.show && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#FCD34D] border-[3px] border-black px-8 py-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-3 min-w-[200px]">
                <span className="font-black text-lg text-black uppercase tracking-widest">{toast.message}</span>
              </div>
            )}

            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b-[3px] border-black bg-[#f3f4f6] shrink-0">
               <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
                 <h3 className="font-black text-xl flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                   完整提示词
                 </h3>
                 <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    来源：
                    <a 
                      href={data.authorUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-black font-bold underline decoration-2 decoration-black/30 hover:decoration-black hover:bg-[#FCD34D]/20 transition-all"
                    >
                      {data.author}
                    </a>
                 </span>
               </div>
               <button 
                 onClick={() => setIsModalOpen(false)} 
                 className="p-1 hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-colors rounded-sm"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
            </div>

            {/* Modal Body - flex-1 allows it to shrink when parent is constrained */}
            <div className="p-6 overflow-y-auto custom-scrollbar bg-white flex-1 space-y-6">
              
              {/* CN Block */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-sm bg-black text-white px-2 py-0.5 inline-block">中文提示词</h4>
                </div>
                <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800 break-words">
                    {data.promptCN}
                  </pre>
                </div>
              </div>

              {/* EN Block */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-sm bg-black text-white px-2 py-0.5 inline-block">英文提示词</h4>
                </div>
                <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800 break-words">
                    {data.promptEN}
                  </pre>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t-[3px] border-black bg-white flex justify-end gap-3 shrink-0">
               <button 
                 onClick={() => copyToClipboard(data.promptCN)} 
                 className="px-4 py-2.5 border-2 border-black bg-white hover:bg-gray-100 font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                 中文
               </button>
               <button 
                 onClick={() => copyToClipboard(data.promptEN)} 
                 className="px-4 py-2.5 border-2 border-black bg-white hover:bg-gray-100 font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                 英文
               </button>
               <button 
                 onClick={() => setIsModalOpen(false)} 
                 className="px-5 py-2.5 bg-black text-white border-2 border-black font-bold text-sm hover:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] transition-all"
               >
                 关闭
               </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Image Zoom Modal Portal */}
      {isImageModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          {/* Dark Blurred Backdrop - Matching Prompt Modal Style */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
          ></div>
          
          {/* Close Button - Fixed to Viewport Top Right, White for contrast */}
           <button 
             onClick={(e) => {
               e.stopPropagation();
               setIsImageModalOpen(false);
             }}
             className="fixed top-6 right-6 z-[10010] text-white/70 hover:text-white transition-colors p-2"
             aria-label="Close"
           >
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
          
          {/* Image Content Container */}
          <div className="relative z-10 animate-in zoom-in-95 duration-200 pointer-events-none shadow-2xl">
             <img 
               src={data.imageUrl} 
               alt={data.title}
               className="max-w-[95vw] max-h-[85vh] object-contain pointer-events-auto cursor-pointer" 
             />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default PromptCard;
