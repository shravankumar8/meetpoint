import assert from "node:assert/strict";
import test from "node:test";

import {
  DARK_THEME_CLASS,
  THEME_STORAGE_KEY,
  applyTheme,
  persistTheme,
  resolveInitialTheme,
  toggleTheme,
} from "./theme.js";

function createStorage(initialValue) {
  const values = new Map();
  if (initialValue) {
    values.set(THEME_STORAGE_KEY, initialValue);
  }

  return {
    getItem: (key) => values.get(key),
    setItem: (key, value) => values.set(key, value),
    valueFor: (key) => values.get(key),
  };
}

function createRoot() {
  const classes = new Set();

  return {
    dataset: {},
    classList: {
      contains: (className) => classes.has(className),
      toggle: (className, force) => {
        if (force) {
          classes.add(className);
        } else {
          classes.delete(className);
        }
      },
    },
  };
}

test("resolveInitialTheme prefers a stored dark mode setting", () => {
  const storage = createStorage("dark");

  assert.equal(resolveInitialTheme({ storage }), "dark");
});

test("resolveInitialTheme falls back to the system dark-mode preference", () => {
  const storage = createStorage();
  const matchMedia = () => ({ matches: true });

  assert.equal(resolveInitialTheme({ storage, matchMedia }), "dark");
});

test("applyTheme marks the root element for dark mode", () => {
  const root = createRoot();

  applyTheme("dark", root);

  assert.equal(root.dataset.theme, "dark");
  assert.equal(root.classList.contains(DARK_THEME_CLASS), true);
});

test("toggleTheme switches between light and dark modes", () => {
  assert.equal(toggleTheme("light"), "dark");
  assert.equal(toggleTheme("dark"), "light");
});

test("persistTheme stores the selected theme", () => {
  const storage = createStorage();

  persistTheme("dark", storage);

  assert.equal(storage.valueFor(THEME_STORAGE_KEY), "dark");
});
