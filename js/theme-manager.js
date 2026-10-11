(function () {
  const THEME_KEY = "chiram-theme-preference";
  const DARK_THEME = "dark";
  const LIGHT_THEME = "light";

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || DARK_THEME;
  }

  function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === LIGHT_THEME) {
      html.classList.add("light-mode");
    } else {
      html.classList.remove("light-mode");
    }

    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    const toggleIcon = document.getElementById("toggleIcon");
    if (toggleIcon) {
      toggleIcon.textContent = theme === LIGHT_THEME ? "🌞" : "🌙";
    }
  }

  function initTheme() {
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = getSavedTheme();
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    
    saveTheme(newTheme);
    applyTheme(newTheme);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initTheme();
      
      const themeToggle = document.getElementById("themeToggle");
      if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
      }
    });
  } else {
    initTheme();
    
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme);
    }
  }

  window.ThemeManager = {
    toggle: toggleTheme,
    getCurrentTheme: getSavedTheme,
    setTheme: function (theme) {
      if (theme === LIGHT_THEME || theme === DARK_THEME) {
        saveTheme(theme);
        applyTheme(theme);
      }
    }
  };
})();