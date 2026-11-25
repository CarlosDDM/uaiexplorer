/**
 * Extrai os dígitos do telefone. Remove o código do país (55) só quando
 * sobram mais de 11 dígitos — assim o DDD 55 (RS) continua válido.
 */
export function phoneDigits(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.length > 11 && digits.startsWith('55')
    ? digits.slice(2)
    : digits;
}

export function phoneMask(phone: string) {
  const digits = phoneDigits(phone).slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
