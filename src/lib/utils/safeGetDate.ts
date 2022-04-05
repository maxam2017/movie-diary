function isValidDate(d: Date) {
  return d instanceof Date && !Number.isNaN(d.getTime());
}

export default function safeGetDate(v: string): Date | undefined {
  const date = new Date(v);
  if (isValidDate(date)) return date;
}
