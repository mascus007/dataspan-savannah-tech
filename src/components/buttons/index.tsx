import React from "react";

interface IButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    React.PropsWithChildren {
        btnColor?: string;
}

function ButtonDot({ children, btnColor, ...restOfProps }:IButtonProps) {
   
  return (
    <button 
        {...restOfProps}
        className={`${btnColor} border rounded-full h-[29px] px-2 font-bold btn-primary`}>
            <i className={`bi bi-record-fill  me-1`} />{children}
    </button>
  );
}

export default ButtonDot;
