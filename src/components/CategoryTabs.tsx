import React from 'react';

interface CategoryTabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex flex-wrap justify-start gap-4 w-full md:w-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
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
  );
};

export default CategoryTabs;

