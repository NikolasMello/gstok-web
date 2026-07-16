import { toFormData } from '@/utilities/toFormData'

import { httpClient } from '../http'
import type { SessaoDadosPessoaisUpdateDto } from './RequestDTOs'
import type { SessaoDadosPessoaisResponseDto, SessaoResponseDto } from './ResponseDTOs'

export function obterSessao() {
  return httpClient.get<SessaoResponseDto>('/sessao')
}

export function obterDadosPessoais() {
  return httpClient.get<SessaoDadosPessoaisResponseDto>('/sessao/dados-pessoais')
}

/** Endpoint recebe multipart/form-data; os nomes de campo seguem o model binding do backend (snake_case). */
export function atualizarDadosPessoais(payload: SessaoDadosPessoaisUpdateDto) {
  return httpClient.put<SessaoDadosPessoaisResponseDto>(
    '/sessao/dados-pessoais',
    toFormData(payload),
  )
}
