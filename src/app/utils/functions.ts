export function getLabelHtmlFor(id: string): string {
  return `for="${id}"`;
}

export function getLabelId(name: string): string {
  return `${name}-label`;
}

export function isDefinedValue(value: unknown) {
  if (typeof value === 'undefined' || value === null) {
    return false;
  }

  if (Array.isArray(value) && value.length === 0) {
    return false;
  }

  return true;
}
