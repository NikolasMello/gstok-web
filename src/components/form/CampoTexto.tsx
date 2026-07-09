import type { AnyFieldApi } from '@tanstack/react-form'

import TextField, { type TextFieldProps } from '@mui/material/TextField'

type CampoTextoProps = {
  field: AnyFieldApi
} & Omit<TextFieldProps, 'error' | 'helperText' | 'id' | 'name' | 'value' | 'onBlur' | 'onChange'>

export default function CampoTexto({ field, ...textFieldProps }: CampoTextoProps) {
  const name = field.name as string
  const value = field.state.value as string
  const errors = field.state.meta.errors as Array<{ message?: string } | undefined>
  const hasError = Boolean(field.state.meta.isTouched) && !field.state.meta.isValid

  return (
    <TextField
      id={name}
      name={name}
      value={value}
      onBlur={field.handleBlur}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => field.handleChange(event.target.value)}
      error={hasError}
      helperText={hasError ? errors.map((error) => error?.message).join(', ') : ''}
      color={hasError ? 'error' : 'primary'}
      {...textFieldProps}
    />
  )
}
