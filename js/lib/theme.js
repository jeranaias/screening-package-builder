/**
 * Theme Manager
 * Handles light/dark/night mode switching
 */
const ThemeManager = {
  STORAGE_KEY: 'usmc-tools-theme',
  themes: ['light', 'dark', 'night'],
  themeIcons: {
    light: '&#9728;', // sun
    dark: '&#9790;',  // moon
    night: '&#9733;'  // star
  },

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved && this.themes.includes(saved)) {
      this.setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
    this.updateToggleButton();
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.updateToggleButton();
  },

  toggle() {
    const current = this.getCurrent();
    const nextIndex = (this.themes.indexOf(current) + 1) % this.themes.length;
    this.setTheme(this.themes[nextIndex]);
  },

  getCurrent() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },

  updateToggleButton() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      const current = this.getCurrent();
      const nextIndex = (this.themes.indexOf(current) + 1) % this.themes.length;
      const nextTheme = this.themes[nextIndex];
      toggle.innerHTML = this.themeIcons[nextTheme];
      toggle.title = `Switch to ${nextTheme} mode`;
    }
  }
};
