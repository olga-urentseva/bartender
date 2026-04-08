import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./styles.module.css";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`${styles.input}${className ? ` ${className}` : ""}`}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
export default Input;
