import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqCard = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden
        ${isOpen ? 'ring-2 ring-emerald-400 ring-opacity-50' : ''}`}
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight">{question.toLowerCase()}</h3>
          <span className="mt-1 flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-emerald-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-emerald-500" />
            )}
          </span>
        </div>
        <div 
          className={`mt-4 text-gray-600 transition-all duration-300 ease-in-out overflow-hidden
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <p className="leading-relaxed">{answer.toLowerCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqCard;
