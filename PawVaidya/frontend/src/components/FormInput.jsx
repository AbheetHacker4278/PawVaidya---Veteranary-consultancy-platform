import React from 'react'

const FormInput = ({ type, name, placeholder, value, onChange, icon }) => {
  return (
    <div className="relative group">
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#2A9D8F] transition-colors">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-4 pl-12 rounded-xl bg-gray-50 border border-gray-200 
                 focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/20 
                 transition-all duration-300 outline-none
                 hover:border-[#2A9D8F]/50 hover:bg-white"
      />
    </div>
  )
}

export default FormInput