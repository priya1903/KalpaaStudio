# Kalpaa Studio direct checkout setup

The site runs on GitHub Pages. Product pages can send buyers to Stripe-hosted
Payment Links; card details never pass through the website or repository.
Until a reviewed live link is added, each product keeps its Etsy checkout.

## Before enabling a product

1. Set up or sign in to the **Kalpaa LLC** Stripe account. Complete business
   verification and set payouts to the Kalpaa LLC bank account in Stripe's
   dashboard. Never put secret keys or bank information in GitHub.
2. Start with fixed-price DIY kits. Create one Stripe product and one one-time
   Payment Link per kit. Match title, image, contents, and price to the actual
   kit. The site currently lists free U.S. shipping.
3. Collect buyer email and **shipping address**; restrict shipping countries
   to **United States** and set a free U.S. shipping rate. Configure applicable
   sales tax for Kalpaa's registrations and review the product tax category.
4. Configure order notifications and fulfillment. Monitor stock on both Etsy
   and Stripe: Payment Links do not synchronize Etsy inventory. Keep product
   variants, personalized orders, and one-of-a-kind art on Etsy for now.
5. Put each **live** `https://buy.stripe.com/...` URL in `CHECKOUT_LINKS` in
   `checkout-links.js`, keyed by its Etsy listing ID from `products.js`, e.g.
   `'4504955559': 'https://buy.stripe.com/ACTUAL_LIVE_LINK'`.
6. Review the rendered page and Stripe's product, price, shipping, tax, and
   seller identity. Make a controlled live-mode test purchase before using
   the link in advertising. Test links are ignored by the website.

The consent-based `begin_checkout` event measures clicks to Stripe, not
completed purchases. Verified order reporting requires a separate integration.
