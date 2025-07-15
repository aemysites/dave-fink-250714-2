/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header
  const cells = [['Cards (cards3)']];

  // Find all top-level card blocks (three-blocks > *-block)
  const blocks = element.querySelector('.three-blocks');
  if (!blocks) return;
  // Get all direct card children
  const cardEls = Array.from(blocks.children);

  cardEls.forEach(card => {
    // Image cell: first image under this card
    const img = card.querySelector('img');
    // Text cell: compose text and CTA
    const textCell = document.createElement('div');

    // Copy all <p> or text from the field--type-text-long div
    const textDiv = card.querySelector('div.field--type-text-long');
    if (textDiv) {
      // move all children (usually just one <p>)
      while (textDiv.firstChild) {
        textCell.appendChild(textDiv.firstChild);
      }
    }

    // CTA: <a> if present
    const cta = card.querySelector('a');
    if (cta) {
      // Add a <br> for spacing between text and CTA
      textCell.appendChild(document.createElement('br'));
      textCell.appendChild(cta);
    }
    cells.push([img, textCell]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
