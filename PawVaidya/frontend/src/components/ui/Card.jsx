import React from 'react';
import { ChevronDown } from 'lucide-react';

const Card = ({ title, description, logo }) => {
  return (
    <div className="relative w-[320px] h-[320px] rounded-[32px] p-6 bg-gradient-to-br from-emerald-400 to-emerald-300 shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 group">

      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      

      {logo && (
        <div className="absolute top-6 right-6 bg-white/90 rounded-md px-2 py-1">
          <span className="font-bold text-emerald-500">{logo}</span>
        </div>
      )}

      <div className="h-full flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-white/90 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-4">
          <SocialLinks />
          <button className="flex items-center gap-1 text-white/90 hover:text-white transition-colors">
            View more <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default Card;
