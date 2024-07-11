export function getLabelHtmlFor(id: string): string {
  return `for="${id}"`;
}

export function getLabelId(name: string): string {
  return `${name}-label`;
}
