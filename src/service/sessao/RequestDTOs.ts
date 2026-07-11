/** PUT /sessao/dados-pessoais é multipart/form-data; ver SessaoService.atualizarDadosPessoais para o mapeamento dos campos. */
export interface SessaoDadosPessoaisUpdateDto {
  nm_pessoa?: string
  nm_sobrenome?: string
  nm_telefone?: string
  nm_email_contato?: string
  foto?: File
}
