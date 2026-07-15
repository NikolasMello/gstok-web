import { NumberField } from '@base-ui/react/number-field'
import type { AnyFieldApi } from '@tanstack/react-form'
import type { FocusEvent, ReactNode } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

type FormNumberFieldProps = Omit<
  NumberField.Root.Props,
  'value' | 'onValueChange' | 'render' | 'children' | 'id' | 'name'
> & {
  field: AnyFieldApi
  label?: ReactNode
  size?: 'small' | 'medium'
  fullWidth?: boolean
  startAdornment?: ReactNode
}

/**
 * Não existe NumberField no @mui/material — segue a composição oficial recomendada pelo MUI
 * (FormControl + OutlinedInput + InputLabel + FormHelperText em torno do NumberField do Base
 * UI, https://mui.com/material-ui/react-number-field), adaptada para se ligar a um field do
 * TanStack Form em vez de um value/onChange direto. As setas de incremento/decremento usam a
 * mesma estrutura (endAdornment em coluna) do exemplo oficial.
 */
export default function FormNumberField({
  field,
  label,
  size = 'medium',
  fullWidth,
  startAdornment,
  ...rootProps
}: FormNumberFieldProps) {
  const id = field.name as string
  const value = field.state.value as number | null
  const errors = field.state.meta.errors as Array<{ message?: string } | undefined>
  const hasError = Boolean(field.state.meta.isTouched) && !field.state.meta.isValid
  const helperTextId = `${id}-helper-text`

  return (
    <NumberField.Root
      {...rootProps}
      id={id}
      name={id}
      value={value}
      onValueChange={(novoValor) => field.handleChange(novoValor)}
      render={(rootRenderProps, state) => (
        <FormControl
          size={size}
          fullWidth={fullWidth}
          ref={rootRenderProps.ref}
          disabled={state.disabled}
          required={state.required}
          error={hasError}
          variant="outlined"
        >
          {rootRenderProps.children}
        </FormControl>
      )}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <NumberField.Input
        id={id}
        render={(inputRenderProps, state) => {
          const onBlur = (event: FocusEvent<HTMLInputElement>) => {
            inputRenderProps.onBlur?.(event)
            field.handleBlur()
          }
          return (
            <OutlinedInput
              aria-describedby={hasError ? helperTextId : undefined}
              label={label}
              inputRef={inputRenderProps.ref}
              value={state.inputValue}
              onBlur={onBlur}
              onChange={inputRenderProps.onChange}
              onKeyUp={inputRenderProps.onKeyUp}
              onKeyDown={inputRenderProps.onKeyDown}
              onFocus={inputRenderProps.onFocus}
              startAdornment={startAdornment}
              slotProps={{ input: { ...inputRenderProps, onBlur } }}
              endAdornment={
                <InputAdornment
                  position="end"
                  sx={{
                    flexDirection: 'column',
                    maxHeight: 'unset',
                    alignSelf: 'stretch',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    borderRadius: '0 14px 14px 0',
                    ml: 0,
                    '& button': {
                      py: 0,
                      flex: 1,
                      borderRadius: 0,
                    },
                  }}
                >
                  <NumberField.Increment render={<IconButton size={size} aria-label="Aumentar" />}>
                    <KeyboardArrowUpIcon fontSize={size} sx={{ transform: 'translateY(2px)' }} />
                  </NumberField.Increment>
                  <NumberField.Decrement render={<IconButton size={size} aria-label="Diminuir" />}>
                    <KeyboardArrowDownIcon fontSize={size} sx={{ transform: 'translateY(-2px)' }} />
                  </NumberField.Decrement>
                </InputAdornment>
              }
              sx={{ pr: 0 }}
            />
          )
        }}
      />
      {hasError && (
        <FormHelperText id={helperTextId} sx={{ ml: 0 }}>
          {errors.map((error) => error?.message).join(', ')}
        </FormHelperText>
      )}
    </NumberField.Root>
  )
}
