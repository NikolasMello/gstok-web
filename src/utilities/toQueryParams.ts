import type { HttpRequestConfig } from '@/service/http'
import type { QueryParams } from '@/service/shared/QueryParams'

/**
 * Converte um QueryParams (page/pageSize + filtro em snake_case) num objeto de query params,
 * convertendo as chaves do filtro para PascalCase para bater com o model binding do backend
 * (ex.: nm_produto -> NmProduto). Campos undefined/null são omitidos.
 */
export function toQueryParams<T extends object>(
  params?: QueryParams<T>,
): NonNullable<HttpRequestConfig['params']> {
  const query: Record<string, string | number | boolean | undefined> = {
    Page: params?.page,
    PageSize: params?.pageSize,
  }

  if (params?.filtro) {
    for (const [key, value] of Object.entries(params.filtro)) {
      if (value === undefined || value === null) continue
      query[toPascalCase(key)] = value as string | number | boolean
    }
  }

  return query
}

function toPascalCase(key: string): string {
  return key
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}
