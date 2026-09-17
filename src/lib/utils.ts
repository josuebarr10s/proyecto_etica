export function formatDate(dateString: string): string {
  try {
    const options: Intl.DateTimeFormatOptions = { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    };
    return new Date(dateString).toLocaleDateString("es-GT", options);
  } catch {
    return dateString;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>?/gm, "")
    .trim();
}

/**
 * Validates that text does not contain sensitive identification patterns (DPI, Passports, exact cards)
 * adhering to ACM 2018 Data Minimization and Protection Ethics.
 */
export function containsSensitiveData(text: string): { hasSensitive: boolean; reason?: string } {
  // Check for DPI patterns (13 digits with or without spaces/dashes)
  const dpiRegex = /\b\d{4}\s*\d{5}\s*\d{4}\b/;
  if (dpiRegex.test(text)) {
    return {
      hasSensitive: true,
      reason: "Detectamos un posible número de DPI (13 dígitos). Por motivos éticos y de seguridad, no permitimos publicar identificaciones personales."
    };
  }

  // Check for 16-digit card numbers
  const cardRegex = /\b(?:\d{4}[ -]?){3}\d{4}\b/;
  if (cardRegex.test(text)) {
    return {
      hasSensitive: true,
      reason: "Detectamos lo que parece ser una tarjeta bancaria. Por seguridad y privacidad, esto no se puede compartir."
    };
  }

  return { hasSensitive: false };
}
