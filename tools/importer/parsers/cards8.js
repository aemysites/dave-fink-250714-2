/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matching the example
  const headerRow = ['Cards (cards8)'];

  // Find the container of the card blocks
  const cardsContainer = element.querySelector('.three-blocks');
  if (!cardsContainer) return;

  // Helper to extract 1 card from a block element
  function extractCard(card) {
    // Get image element (reference original element)
    const img = card.querySelector('.field--type-image img');
    // Get the text field (contains <p> mostly)
    const textDiv = card.querySelector('.field--type-text-long');
    // Get the CTA (link/button)
    const cta = card.querySelector('a');

    // Compose the right cell: text (preserve existing element) + CTA (if present)
    const cellContent = [];
    if (textDiv) cellContent.push(textDiv);
    if (cta) cellContent.push(cta);
    return [img, cellContent.length === 1 ? cellContent[0] : cellContent];
  }

  // Get all direct card blocks in order
  const cardBlocks = Array.from(cardsContainer.children);
  // Map to rows, skipping cards with no image or no text
  const cardRows = cardBlocks.map(extractCard).filter(row => row[0] && row[1]);

  // Compose table structure
  const tableData = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}