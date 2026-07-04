export interface ApiError {
  severidade: 'Alerta' | 'Erro'
  mensagem: string
}

export function isApiError(data: unknown): data is ApiError {
  return (
    typeof data === 'object' &&
    data !== null &&
    ['Alerta', 'Erro'].includes((data as ApiError).severidade) &&
    typeof (data as ApiError).mensagem === 'string'
  )
}
