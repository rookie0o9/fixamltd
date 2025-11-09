
// include.js - fetch & inject HTML partials by [data-include]
(function(){
  function include(el){
    var src = el.getAttribute('data-include');
    if(!src) return Promise.resolve();
    return fetch(src, {cache:'no-cache'}).then(r => r.text()).then(html => {
      el.innerHTML = html;
    });
  }
  function run(){
    var nodes = Array.from(document.querySelectorAll('[data-include]'));
    return Promise.all(nodes.map(include));
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  }else{
    run();
  }
})();
