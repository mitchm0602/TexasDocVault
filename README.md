# TexasDocVault.com

Professional construction document templates for Texas contractors and subcontractors.

## Site Structure

```
texasdocvault/
├── index.html          # Homepage
├── lien.html           # Lien Paperwork category
├── contract.html       # Contract Paperwork category
├── payment.html        # Payment Applications category
├── safety.html         # Safety Paperwork category
├── bundles.html        # Bundles & Deals
├── blog.html           # Blog
├── css/
│   └── styles.css      # Main stylesheet
└── js/
    ├── data.js         # All product and blog data
    └── components.js   # Shared header, sidebar, footer, cart logic
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g., `texasdocvault`)
2. Upload all files maintaining the folder structure above
3. Go to **Settings → Pages**
4. Set Source to **Deploy from a branch → main → / (root)**
5. Your site will be live at `https://yourusername.github.io/texasdocvault`

## Connecting Your Custom Domain (texasdocvault.com)

1. In GitHub Pages settings, enter `texasdocvault.com` under Custom Domain
2. At your domain registrar (Namecheap, GoDaddy, etc.), add these DNS records:
   - Type: A — Host: @ — Value: 185.199.108.153
   - Type: A — Host: @ — Value: 185.199.109.153
   - Type: A — Host: @ — Value: 185.199.110.153
   - Type: A — Host: @ — Value: 185.199.111.153
   - Type: CNAME — Host: www — Value: yourusername.github.io
3. Enable **Enforce HTTPS** in GitHub Pages settings after DNS propagates (24–48 hours)

## Adding Products / Updating Content

All product data lives in `js/data.js`. To add a new product:

```js
{ id: 'xx-9', name: 'Your New Template', desc: 'Description here.', price: 19, fmt: 'PDF' }
```

Blog posts are also in `js/data.js` under the `BLOG_POSTS` array.

## Connecting Stripe (Next Step)

Replace the `proceedToCheckout()` function in `js/components.js` with a redirect
to your Stripe Payment Link or Stripe Checkout session URL.

For individual product "Add to Cart" flows, use **Stripe Payment Links** — no code required.

## SEO Notes

- Each page has unique `<title>`, `<meta description>`, and `<link rel="canonical">` tags
- Target keywords are embedded naturally in headings and body copy
- Submit `https://texasdocvault.com/sitemap.xml` to Google Search Console after launch
- Consider adding a `sitemap.xml` file listing all page URLs

## Legal Disclaimer

All templates include the following disclaimer in the footer:
> "These documents are for informational purposes only and do not constitute legal advice.
> Consult a licensed Texas attorney for guidance specific to your situation."
