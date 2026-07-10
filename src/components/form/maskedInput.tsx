import { forwardRef, useRef } from 'react'

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
    /**
     * IMask dispara onAccept mais de uma vez já na montagem (normalizando o valor inicial),
     * sem interação do usuário — e repete o mesmo valor nessas chamadas. Repassar isso pro
     * form marcaria o campo como dirty (field.handleChange sempre seta isDirty, mesmo com o
     * valor inalterado), fazendo o form de edição parecer alterado assim que a tela abre já
     * preenchida. Por isso: a primeira chamada nunca é repassada, e as seguintes só são
     * repassadas quando o valor de fato muda em relação à última aceita.
     */
    const isPrimeiroAccept = useRef(true)
    const ultimoValorRef = useRef<string | null>(null)

    return (
      <IMaskInput
        {...rest}
        {...(options as ComponentProps<typeof IMaskInput>)}
        inputRef={ref}
        onAccept={(value) => {
          const stringValue = String(value)
          if (isPrimeiroAccept.current) {
            isPrimeiroAccept.current = false
            ultimoValorRef.current = stringValue
            return
          }
          if (stringValue === ultimoValorRef.current) return
          ultimoValorRef.current = stringValue
          onChange?.({ target: { name, value: stringValue } } as ChangeEvent<HTMLInputElement>)
        }}
      />
    )
  })
}
