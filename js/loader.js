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
    document.head.appendChild(script);
  }

  function loadAssets() {
    cssFiles.forEach(appendCSS);
    jsFiles.forEach(appendJS);
  }

  // Wait for document to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadAssets);
  } else {
    loadAssets();
  }
})();
