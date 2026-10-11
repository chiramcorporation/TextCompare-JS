(function () {
  const version = Date.now();
  const cssFiles = [
    "css/theme.css",
    "css/styles.css"
  ];

  const jsFiles = [
    "js/theme-manager.js",
    "js/main.js"
  ];

  function appendCSS(path) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path + "?v=" + version;
    document.head.appendChild(link);
  }

  function appendJS(path) {
    const script = document.createElement("script");
    script.src = path + "?v=" + version;
    script.defer = true;
    document.body.appendChild(script);
  }

  cssFiles.forEach(appendCSS);
  jsFiles.forEach(appendJS);
})();