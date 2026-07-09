import { forwardRef } from 'react'

import type { ChangeEvent, ChangeEventHandler, ComponentProps } from 'react'
import type { ReactMaskOpts } from 'react-imask'
import { IMaskInput } from 'react-imask'

type MaskedInputProps = {
  name?: string
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

/**
 * IMaskInput não deve ser controlado via onChange (ver docs do react-imask); o valor
 * "aceito" chega por onAccept, que aqui é traduzido para o formato de evento que
 * FormTextField espera, mantendo a integração com TanStack Form sem precisar alterá-lo.
 */
export function createMaskedInput(options: ReactMaskOpts) {
  return forwardRef<HTMLInputElement, MaskedInputProps>(function MaskedInput(
    { onChange, name, ...rest },
    ref,
  ) {
    return (
      <IMaskInput
        {...rest}
        {...(options as ComponentProps<typeof IMaskInput>)}
        inputRef={ref}
        onAccept={(value) =>
          onChange?.({ target: { name, value: String(value) } } as ChangeEvent<HTMLInputElement>)
        }
      />
    )
  })
}
