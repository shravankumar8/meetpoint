export const THEME_STORAGE_KEY = "meetpoint-theme";
export const DARK_THEME_CLASS = "theme-dark";

export function resolveInitialTheme({
  storage = globalThis.localStorage,
  matchMedia = globalThis.matchMedia,
} = {}) {
  const storedTheme = storage?.getItem?.(THEME_STORAGE_KEY);

  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  if (matchMedia?.("(prefers-color-scheme: dark)")?.matches) {
    return "dark";
  }

  return "light";
}

export function applyTheme(theme, root = globalThis.document?.documentElement) {
  if (!root) {
    return theme;
  }

  root.dataset.theme = theme;
  root.classList.toggle(DARK_THEME_CLASS, theme === "dark");
  return theme;
}

export function persistTheme(theme, storage = globalThis.localStorage) {
  storage?.setItem?.(THEME_STORAGE_KEY, theme);
  return theme;
}

export function toggleTheme(theme) {
  return theme === "dark" ? "light" : "dark";
}
