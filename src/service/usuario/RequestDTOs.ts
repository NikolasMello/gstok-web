export interface UsuarioCreateDto {
  nm_email: string
  ds_senha: string
  pessoa_id?: string | null
}

/** PUT /usuario/{id} é multipart/form-data; ver UsuarioService.updateUsuario para o mapeamento dos campos. */
export interface UsuarioUpdateDto {
  cd_inscricao_nacional?: string
  nm_email?: string
  nm_pessoa?: string
  nm_sobrenome?: string
  nm_telefone?: string
  nm_email_contato?: string
  foto?: File
}

/** POST /usuario/admin é multipart/form-data; ver UsuarioService.createUsuarioAdmin para o mapeamento dos campos. */
export interface UsuarioAdminCreateDto {
  nm_email: string
  ds_senha: string
  cd_inscricao_nacional: string
  nm_pessoa: string
  nm_sobrenome: string
  nm_telefone: string
  nm_email_contato: string
  foto?: File
}
