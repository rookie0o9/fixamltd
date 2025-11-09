// include.js - fetch & inject HTML partials by [data-include]
(function () {
  function include(el) {
    var src = el.getAttribute("data-include");
    if (!src) return Promise.resolve();
    return fetch(src, { cache: "no-cache" })
      .then((r) => r.text())
      .then((html) => {
        el.innerHTML = html;
      });
  }
  function run() {
    var nodes = Array.from(document.querySelectorAll("[data-include]"));
    // ↓ Add this .then() handler to dispatch the event when all partials are loaded
    return Promise.all(nodes.map(include)).then(function () {
      document.dispatchEvent(new Event("partialsLoaded"));
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      run(); // ← you could also do run().then(...) here instead of inside run()
    });
  } else {
    run(); // ← same here
  }
})();
