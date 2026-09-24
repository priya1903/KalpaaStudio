// Add live Stripe Payment Links by Etsy listing ID after reviewing each link's
// price, U.S. shipping, tax, product details, and fulfillment settings.
// Keep this file public: never put Stripe secret keys here.
const CHECKOUT_LINKS = Object.freeze({
  // '4504955559': 'https://buy.stripe.com/your-live-link',
});

function checkoutLinkFor(product) {
  // Variants, personalized orders, and one-of-a-kind art require a separate
  // product-specific checkout and inventory process before enabling here.
  if (product.category !== 'DIY Art Kits' || product.priceLabel.includes('–')) return null;
  const url = CHECKOUT_LINKS[product.id];
  if (typeof url !== 'string') return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname === 'buy.stripe.com' &&
      !parsed.pathname.startsWith('/test_') ? parsed.href : null;
  } catch {
    return null;
  }
}
