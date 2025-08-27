// components/ui/FloatingInput.tsx
"use client";

import { useState } from "react";
import { FloatingInputProps } from "@/types";
import { Eye, EyeClosed } from "iconoir-react";

export default function FloatingInput({
  id,
  placeholder = "",
  label,
  className = "!rounded-none",
  type = "text",
  value,
  onChange,
}: FloatingInputProps & {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="input-floating w-full sm:w-96 relative">
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        className={`input pr-10 ${className}`}
        value={value}
        onChange={onChange}
      />
      <label className="input-floating-label" htmlFor={id}>
        {label}
      </label>

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-800"
        >
          {showPassword ? <Eye /> : <EyeClosed />}
        </button>
      )}
    </div>
  );
}
