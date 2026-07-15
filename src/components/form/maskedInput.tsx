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
        onAccept={(value, _maskRef, event) => {
          /**
           * IMask dispara onAccept também fora de interação do usuário (normalização do valor
           * inicial na montagem, resync do `value` controlado vindo do form) — essas chamadas
           * não têm um DOM event associado (3º argumento vem undefined). Repassar essas
           * chamadas pro form marcaria o campo como dirty à toa. Distinguir por "é a primeira
           * chamada" (como era antes) não funciona: com o campo vazio (criação) o IMask não
           * dispara accept nenhum na montagem, então a primeira chamada real acaba sendo a do
           * próprio usuário — e se for um paste (valor inteiro aceito em uma única chamada,
           * ao contrário de digitar), essa chamada era descartada e o form nunca ficava
           * sabendo do valor colado, que só sumia depois ao sair do campo.
           */
          if (!event) return
          onChange?.({ target: { name, value: String(value) } } as ChangeEvent<HTMLInputElement>)
        }}
      />
    )
  })
}
