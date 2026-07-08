export interface UsuarioCreateDto {
  nm_email: string
  ds_senha: string
  pessoa_id?: string | null
}

export interface UsuarioUpdateDto {
  nm_email: string
  pessoa_id?: string | null
}
