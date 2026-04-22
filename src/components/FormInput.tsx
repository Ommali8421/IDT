import { type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface BaseProps {
  label: string;
  error?: string;
  required?: boolean;
}

// Input variant
interface InputProps extends BaseProps, InputHTMLAttributes<HTMLInputElement> {
  as?: 'input';
}

// Select variant
interface SelectProps extends BaseProps, SelectHTMLAttributes<HTMLSelectElement> {
  as: 'select';
  options: { value: string; label: string }[];
}

// Textarea variant
interface TextareaProps extends BaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
}

type FormInputProps = InputProps | SelectProps | TextareaProps;

const baseClass =
  'w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 ' +
  'focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all';

export default function FormInput(props: FormInputProps) {
  const { label, error, required, as = 'input', ...rest } = props;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {as === 'select' ? (
        <select
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
          className={`${baseClass} ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
        >
          {(props as SelectProps).options.map(({ value, label: optLabel }) => (
            <option key={value} value={value}>
              {optLabel}
            </option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          rows={3}
          className={`${baseClass} resize-none ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
      ) : (
        <input
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          className={`${baseClass} ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
