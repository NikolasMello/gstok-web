type PessoaComNome = {
  nm_pessoa?: string | null
  nm_sobrenome?: string | null
}

export function nomeCompleto(pessoa: PessoaComNome): string {
  return [pessoa.nm_pessoa, pessoa.nm_sobrenome].filter(Boolean).join(' ')
}
