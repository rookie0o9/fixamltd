Partials-enabled build (v2)

- /partials/header.html and /partials/footer.html are fetched into each page
  at elements like: <div data-include="/partials/header.html"></div>
- /assets/js/include.js loads these partials on DOM ready.
- /assets/site-config.js then fills brand/phone/email/address/CTA from /assets/site-config.json.

How to add to a page:
  <div data-include="/partials/header.html"></div>
  ...page content...
  <div data-include="/partials/footer.html"></div>

Script order (already included in pages):
  <script defer src="/assets/js/include.js"></script>
  <script defer src="/assets/site-config.js"></script>