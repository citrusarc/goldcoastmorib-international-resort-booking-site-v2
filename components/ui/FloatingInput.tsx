"use client";

import { useState } from "react";
import { FloatingInputProps } from "@/types";
import { Eye, EyeClosed } from "iconoir-react";

interface Props extends FloatingInputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FloatingInput({
  id,
  placeholder = "",
  label,
  className = "!rounded-none",
  type = "text",
  value,
  onChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="input-floating w-full sm:w-96 relative">
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input pr-10 ${className}`}
      />
      <label className="input-floating-label" htmlFor={id}>
        {label}
      </label>

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-800"
        >
          {showPassword ? <Eye /> : <EyeClosed />}
        </button>
      )}
    </div>
  );
}
