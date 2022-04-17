const offset = 127397;
const A = 65;
const Z = 90;

/**
 * @see https://github.com/srcagency/country-to-emoji-flag/blob/master/index.js
 */
export function toEmoji(country: string): string {
  const f = country.codePointAt(0);
  const s = country.codePointAt(1);

  return String.fromCodePoint(f + offset) + String.fromCodePoint(s + offset);
}
