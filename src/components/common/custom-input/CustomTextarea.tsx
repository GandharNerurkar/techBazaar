import React from "react";

type props = {
    name : string,
    id : string,
    value? : string,
    label? : string,
    className? : string,
    wrapperClass? : string,
    placeholder : string,
    required? : boolean,
    rows? : number,
    onChange? : (e : React.ChangeEvent<HTMLTextAreaElement>) => void
}

const CustomTextarea = ({name, id, value, label, className, wrapperClass, placeholder, required, onChange, rows} : props) => {
  return <div className={wrapperClass} >
    {
        label &&
        <label htmlFor={id} className="mb-2 block text-sm font-medium tracking-wide text-slate-600 dark:text-slate-200" >{label}</label>
    }
    <textarea
        name={name}
        id={id}
        value={value}
        required={required}
        className={`input-modern min-h-[140px] resize-y ${className || ''}`}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
    />
  </div>;
};

export default CustomTextarea;
