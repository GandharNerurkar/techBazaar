import React from 'react'
import { MouseEvent } from 'react'

type props = {
    children: React.ReactNode,
    onClick: (e:React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void,
    disabled?: boolean,
    className?: string,
    width? : string
}

const BtnUnderline = ({children, disabled, onClick, className, width} : props) => {
  return (
    <div className={`${className} relative`} >
        <button className={`text-xs font-semibold text-blue-500 sm:text-sm dark:text-blue-300`}  disabled={disabled} onClick={(e)=>onClick(e)} >{children}</button>
        <div className={"absolute bottom-0 left-0 h-0.5 rounded-full bg-blue-500 dark:bg-blue-300 " + (width || "w-5")}></div>
    </div>
  )
}

export default BtnUnderline
