import React from "react";
import Select from "react-select";

type option = {
    value : string | number,
    label : string,
}

type props = {
    options : option[],
    className? : string,
    name : string,
    label? : string,
    id : string,
    value? : option
}

const CustomSelect = ({options, className, name, label, id, value}: props) => {
  return (
    <div>
      {
        label &&
        <label htmlFor={id} className="mb-2 block text-sm font-medium tracking-wide text-slate-600 dark:text-slate-200" >{label}</label>
      }
      <Select
        className={`${className} basic-single`}
        classNamePrefix="react-select"
        defaultValue={options[0]}
        value={value}
        id={id}
        name={name}
        options={options}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: 52,
            borderRadius: 18,
            borderColor: "rgba(148, 163, 184, 0.22)",
            backgroundColor: "rgba(255,255,255,0.72)",
            boxShadow: "none",
            backdropFilter: "blur(10px)",
            paddingInline: 6,
          }),
          menu: (base) => ({
            ...base,
            borderRadius: 18,
            overflow: "hidden",
            backdropFilter: "blur(14px)",
          }),
          singleValue: (base) => ({
            ...base,
            color: "inherit",
          }),
        }}
      />
    </div>
  );
};

export default CustomSelect;
