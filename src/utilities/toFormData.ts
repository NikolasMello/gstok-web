/**
 * Converte um objeto (DTO em snake_case) em FormData, convertendo as chaves para
 * PascalCase para bater com o model binding do backend (ex.: nm_email -> NmEmail).
 * Campos undefined/null são omitidos; arrays são enviados como múltiplos campos com o mesmo nome.
 */
export function toFormData<T extends object>(obj: T): FormData {
  const formData = new FormData()

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue

    const fieldName = toPascalCase(key)

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) formData.append(fieldName, toFormValue(item))
      })
    } else {
      formData.set(fieldName, toFormValue(value))
    }
  }

  return formData
}

function toFormValue(value: unknown): string | Blob {
  return value instanceof Blob ? value : String(value)
}

function toPascalCase(key: string): string {
  return key
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}
