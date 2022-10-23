import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: string | boolean | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}

export function Input({
  name,
  label,
  type = 'text',
  error,
  onChange,
  onBlur,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className={`input ${error && 'border border-red-300'}`}
      />
      <span
        className={`p-2 text-sm text-red-300 ${error ? 'visible' : 'hidden'}`}
      >
        {error}
      </span>
    </div>
  )
}
