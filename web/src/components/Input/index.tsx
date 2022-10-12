interface InputProps {
  label: string
  name: string
  type?: string
  error?: string | boolean | undefined
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  required?: boolean
}

export function Input({
  name,
  label,
  type = 'text',
  error,
  placeholder,
  required,
  value,
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
        className={`input ${error && 'border border-red-300'}`}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className="p-2 text-sm text-red-300">{error}</span>
    </div>
  )
}
