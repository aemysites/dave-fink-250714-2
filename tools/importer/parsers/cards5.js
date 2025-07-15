/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must contain exactly one column with the block name
  const headerRow = ['Cards (cards5)'];

  // Find all top-level paragraphs
  const contentRoot = element.querySelector('.field__item') || element;
  const paragraphs = Array.from(contentRoot.querySelectorAll(':scope > p'));
  let titleEl = null;
  let ctaParaEl = null;
  let ctaEl = null;
  let descriptionEls = [];

  // Identify the CTA link and its parent paragraph
  for (const p of paragraphs) {
    const link = p.querySelector('a');
    if (link && !ctaEl) {
      ctaEl = link;
      ctaParaEl = p;
    }
  }

  // First paragraph as title (if present)
  if (paragraphs.length > 0) {
    titleEl = paragraphs[0];
  }

  // Description: any other paragraphs except for the CTA paragraph and the title
  for (const p of paragraphs) {
    if (p !== titleEl && p !== ctaParaEl) {
      descriptionEls.push(p);
    }
  }

  // Compose second cell contents: title, description(s), CTA (paragraph containing link)
  const textContent = [];
  if (titleEl) textContent.push(titleEl);
  if (descriptionEls.length) textContent.push(...descriptionEls);
  if (ctaParaEl) textContent.push(ctaParaEl);

  // No image in this card, so first cell is empty
  const cardRow = ['', textContent];

  // Build the table: header is one column, cards are two columns
  const cells = [headerRow, cardRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
