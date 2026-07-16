/**
 * Converte um objeto (DTO em snake_case) em FormData, mantendo as chaves como estão
 * (o backend faz o model binding em snake_case).
 * Campos undefined/null são omitidos; arrays são enviados como múltiplos campos com o mesmo nome.
 */
export function toFormData<T extends object>(obj: T): FormData {
  const formData = new FormData()

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) formData.append(key, toFormValue(item))
      })
    } else {
      formData.set(key, toFormValue(value))
    }
  }

  return formData
}

function toFormValue(value: unknown): string | Blob {
  return value instanceof Blob ? value : String(value)
}
