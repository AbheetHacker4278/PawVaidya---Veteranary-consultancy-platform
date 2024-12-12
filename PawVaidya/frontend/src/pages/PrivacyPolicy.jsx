import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { privacypolicydata } from '../faqdata/privacypolicydata';

const PrivacyPolicy = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-600 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {privacypolicydata.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-gray-200">
              <button
                onClick={() => toggleDropdown(index)}
                className="w-full flex justify-between items-center text-left py-4 text-gray-800 font-semibold focus:outline-none"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-green-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-green-400" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-screen' : 'max-h-0'
                }`}
              >
                <ul className="list-disc list-inside pl-5 text-gray-600">
                  {faq.answers.map((answer, i) => (
                    <li key={i} className="mb-2">
                      {answer}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Can't find what you're looking for?{' '}
            <a
              href="/contact"
              className="text-green-600 hover:text-green-500 font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
