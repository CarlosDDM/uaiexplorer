// Formato internacional, só dígitos: DDI + DDD + número (ex.: 5531999999999).
// TODO: substituir pelo número real da UAI Explorer.
export const WHATSAPP_NUMBER = '5500000000000';

export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Vim pelo site da UAI Explorer e gostaria de saber mais sobre os serviços.';

export function getWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
