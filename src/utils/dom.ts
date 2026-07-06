// src/utils/dom.ts

export function getText(selectors: string[]): string | null {
  for (const selector of selectors) {
    const element = document.querySelector(selector);

    if (element?.textContent?.trim()) {
      return element.textContent.trim();
    }
  }

  return null;
}