import React from "react";

type props = {
    type : string,
    name : string,
    id : string,
    value? : string,
    label? : string,
    className? : string,
    wrapperClass? : string,
    placeholder : string,
    required? : boolean,
    onChange? : (e: any)=>void,
    ref? : React.LegacyRef<HTMLInputElement> | undefined,
    isChecked? : boolean
}

const CustomInput = ({type, name, id, value, label, className, wrapperClass, placeholder, required, onChange, ref, isChecked} : props) => {
  return <div className={wrapperClass} >
    {
        label &&
        <label htmlFor={id} className="mb-2 block text-sm font-medium tracking-wide text-slate-600 dark:text-slate-200" >{label}</label>
    }
    <input 
        type={type} 
        name={name}
        id={id}
        value={value}
        required={required}
        className={`${type === 'checkbox' ? 'h-5 w-5 rounded border-slate-300 text-blue-500 focus:ring-blue-400' : 'input-modern'} ${className || ''}`}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
        checked={isChecked}
    />
  </div>;
};

export default CustomInput;
