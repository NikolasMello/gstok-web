import { createMaskedInput } from './maskedInput'

export const CpfMaskedInput = createMaskedInput({
  mask: '000.000.000-00',
  unmask: true,
})

export const CnpjMaskedInput = createMaskedInput({
  mask: '00.000.000/0000-00',
  unmask: true,
})

export const TelefoneMaskedInput = createMaskedInput({
  mask: [{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }],
  unmask: true,
})

export const CepMaskedInput = createMaskedInput({
  mask: '00000-000',
  unmask: true,
})
