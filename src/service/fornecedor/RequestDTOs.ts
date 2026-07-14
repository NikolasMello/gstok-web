export type FornecedorCreateDto = {
  cd_cnpj: string
  nm_empresa: string
  nm_fantasia?: string | null
  nm_marca?: string | null
}

export type FornecedorUpdateDto = {
  cd_cnpj: string
  nm_empresa: string
  nm_fantasia?: string | null
  nm_marca?: string | null
}
