/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content wrapper
  const whiteBanner = element.querySelector('.white-banner');
  if (!whiteBanner) return;

  // Extract the banner image element (reference, do not clone)
  let img = null;
  const imgContainer = whiteBanner.querySelector('.field--name-field-banner-image');
  if (imgContainer) {
    img = imgContainer.querySelector('img');
  }

  // Extract the main headline/text area (reference the whole container for resilience)
  let textContent = null;
  const textContainer = whiteBanner.querySelector('.homebanner-text');
  if (textContainer) {
    textContent = textContainer;
  }

  // Build the rows as per block structure: [Header], [Image], [Textual Content]
  const rows = [];
  rows.push(['Hero']);
  rows.push([img ? img : '']);
  rows.push([textContent ? textContent : '']);

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
