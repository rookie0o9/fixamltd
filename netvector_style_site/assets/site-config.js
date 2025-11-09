
(function(){
  function esc(str){ return (str||'').toString(); }
  function qa(sel, root){ return Array.from((root||document).querySelectorAll(sel)); }

  fetch('/assets/site-config.json', {cache:'no-cache'})
    .then(r => r.json())
    .then(cfg => {
      qa('[data-site="brand"]').forEach(n => n.textContent = esc(cfg.brand));
      qa('[data-site="phone"]').forEach(n => n.textContent = esc(cfg.phone_display));
      qa('[data-site="email"]').forEach(n => n.textContent = esc(cfg.email));
      qa('[data-site="address"]').forEach(n => n.innerHTML = esc(cfg.address_lines.join('<br>')));
      qa('[data-site="cta-text"]').forEach(n => n.textContent = esc(cfg.contact_cta_text));

      qa('[data-sitehref="phone"]').forEach(n => n.setAttribute('href', 'tel:' + esc(cfg.phone_e164)));
      qa('[data-sitehref="email"]').forEach(n => n.setAttribute('href', 'mailto:' + esc(cfg.email)));

      // Inject/replace Organization JSON-LD
      var ld = {
        "@context":"https://schema.org",
        "@type":"Organization",
        "name": cfg.brand,
        "url": "https://" + cfg.domain + "/",
        "logo": "https://" + cfg.domain + "/assets/img/logo.svg",
        "contactPoint": [{
          "@type":"ContactPoint",
          "telephone": cfg.phone_display,
          "contactType":"customer service",
          "areaServed":"GB"
        }]
      };
      qa('script[type="application/ld+json"]').forEach(s => {
        try { var j = JSON.parse(s.textContent); if(j && j['@type']==='Organization'){ s.remove(); } } catch(e){}
      });
      var script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(ld);
      document.head.appendChild(script);

      // Set OpenGraph image if a meta tag exists without content
      var og = document.querySelector('meta[property="og:image"]');
      if(!og){
        og = document.createElement('meta');
        og.setAttribute('property','og:image');
        document.head.appendChild(og);
      }
      og.setAttribute('content','https://' + cfg.domain + '/assets/img/og-default.png');
    })
    .catch(err => console.warn('site-config load failed', err));
})();
