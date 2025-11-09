// site-config.js – inject contact details after partials are ready
(function () {
  function esc(str) {
    return (str || "").toString();
  }
  function qa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  // Once all header/footer partials have been injected (event fired by include.js)
  document.addEventListener("partialsLoaded", function () {
    fetch("/assets/site-config.json", { cache: "no-cache" })
      .then((r) => r.json())
      .then((cfg) => {
        // Fill placeholders
        qa('[data-site="brand"]').forEach(
          (n) => (n.textContent = esc(cfg.brand))
        );
        qa('[data-site="phone"]').forEach(
          (n) => (n.textContent = esc(cfg.phone_display))
        );
        qa('[data-site="email"]').forEach(
          (n) => (n.textContent = esc(cfg.email))
        );
        qa('[data-site="address"]').forEach(
          (n) => (n.innerHTML = esc(cfg.address_lines.join("<br>")))
        );
        qa('[data-site="cta-text"]').forEach(
          (n) => (n.textContent = esc(cfg.contact_cta_text))
        );

        // Set href attributes
        qa('[data-sitehref="phone"]').forEach((n) =>
          n.setAttribute("href", "tel:" + esc(cfg.phone_e164))
        );
        qa('[data-sitehref="email"]').forEach((n) =>
          n.setAttribute("href", "mailto:" + esc(cfg.email))
        );

        // Inject/replace Organization JSON-LD
        var ld = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: cfg.brand,
          url: "https://" + cfg.domain + "/",
          // logo: "https://dev.fixam.co.uk/assets/img/logo-fixam.svg",

          logo: "https://" + cfg.domain + "/assets/img/logo-fixam.svg",
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: cfg.phone_display,
              contactType: "customer service",
              areaServed: "GB",
            },
          ],
        };
        // Remove any existing Organization JSON-LD blocks
        qa('script[type="application/ld+json"]').forEach((s) => {
          try {
            var j = JSON.parse(s.textContent);
            if (j && j["@type"] === "Organization") {
              s.remove();
            }
          } catch (e) {}
        });
        var script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(ld);
        document.head.appendChild(script);

        // Ensure there is an OpenGraph image meta tag
        var og = document.querySelector('meta[property="og:image"]');
        if (!og) {
          og = document.createElement("meta");
          og.setAttribute("property", "og:image");
          document.head.appendChild(og);
        }
        og.setAttribute(
          "content",
          "https://" + cfg.domain + "/assets/img/og-default.png"
        );
      })
      .catch((err) => console.warn("site-config load failed", err));
  });
})();
