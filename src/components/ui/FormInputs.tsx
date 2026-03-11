"use client";

import React, { useMemo, useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { PhoneInput } from "react-international-phone";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label?: React.ReactNode }) {
  const { label, className = "", ...rest } = props;
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        {...rest}
        className={
          "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#562C85]/15 " +
          className
        }
      />
    </div>
  );
}

export function PasswordInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label?: React.ReactNode }
) {
  const { label, className = "", ...rest } = props;
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <input
          {...rest}
          type={show ? "text" : "password"}
          className={
            "w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#562C85]/15 " +
            className
          }
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-base font-medium text-gray-600 hover:text-gray-900"
        >
           {show ? <FiEye /> : <FiEyeOff />}
        </button>
      </div>
    </div>
  );
}

export function Checkbox(props: {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 select-none">
      <input
        type="checkbox"
        name={props.name}
        checked={props.checked}
        onChange={props.onChange}
        className="h-4 w-4 rounded border-gray-300 text-[#562C85] focus:ring-[#562C85]/30"
      />
      <span>{props.label}</span>
    </label>
  );
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={
        "w-full rounded-lg bg-primary-500 py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60 " +
        className
      }
    />
  );
}

export function OtpInput(props: {
  length: number;
  value: string[];
  onChange: (val: string[]) => void;
  autoFocus?: boolean;
}) {
  const { length, value, onChange, autoFocus = true } = props;

  const safeValue = useMemo(() => {
    return Array.from({ length }, (_, i) => (value[i] ?? "").slice(0, 1));
  }, [length, value]);

  const refs = React.useRef<Array<HTMLInputElement | null>>([]);

  // autofocus first input
  React.useEffect(() => {
    if (!autoFocus) return;
    refs.current[0]?.focus();
  }, [autoFocus]);

  const setAt = (idx: number, char: string) => {
    const next = [...safeValue];
    next[idx] = char;
    onChange(next);
  };

  const focusIndex = (idx: number) => {
    const el = refs.current[idx];
    if (el) el.focus();
  };

  const handleChange = (idx: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(0, 1);
    setAt(idx, digit);

    // if user typed a digit -> go next
    if (digit && idx < length - 1) {
      focusIndex(idx + 1);
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      // if current has value -> clear it
      if (safeValue[idx]) {
        e.preventDefault();
        setAt(idx, "");
        return;
      }
      // if empty -> go previous & clear previous
      if (idx > 0) {
        e.preventDefault();
        focusIndex(idx - 1);
        setAt(idx - 1, "");
      }
    }

    if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      focusIndex(idx - 1);
    }

    if (e.key === "ArrowRight" && idx < length - 1) {
      e.preventDefault();
      focusIndex(idx + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData("text");
    const digits = text.replace(/\D/g, "").slice(0, length);
    if (!digits) return;

    e.preventDefault();

    const next = Array.from({ length }, (_, i) => digits[i] ?? "");
    onChange(next);

    // focus last filled
    const last = Math.min(digits.length, length) - 1;
    if (last >= 0) focusIndex(last);
  };

  return (
    <div onPaste={handlePaste} className="flex items-center justify-center gap-2">
      {safeValue.map((v, idx) => (
        <input
          key={idx}
          ref={(el) => {
            refs.current[idx] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className="h-12 w-11 rounded-lg border border-gray-300 text-center text-lg outline-none focus:ring-2 focus:ring-[#562C85]/15"
        />
      ))}
    </div>
  );
}


export function InternationalPhoneInput(props: {
  label?: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  defaultCountry?: string; // "in", "us", etc.
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      {props.label && (
        <label className="text-sm font-medium text-gray-700">{props.label}</label>
      )}

      <PhoneInput
        defaultCountry={props.defaultCountry ?? "in"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder ?? "Enter phone number"}
      />
    </div>
  );
}