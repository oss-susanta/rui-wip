import React, { forwardRef } from "react";
import clsx from "clsx";

const IconButton = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx([
        "grid place-items-center",
        "border-0 p-0 bg-transparent outline-none rounded-sm",
        "text-icon cursor-pointer",
        className,
      ])}
      {...rest}
    >
      {children}
    </button>
  );
});

export default IconButton;
