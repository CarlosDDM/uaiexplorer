// Formato internacional, só dígitos: DDI + DDD + número (ex.: 5531999999999).
export const WHATSAPP_NUMBER = '556294539540';

export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Vim pelo site da UAI Explorer e gostaria de saber mais sobre os serviços.';

export function getWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
