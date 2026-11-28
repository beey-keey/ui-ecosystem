import { ref, watch } from "vue";

export type Brand = "academic" | "studio";
export type Theme = "light" | "dark";

export interface ThemeOptions {
  storageKey: string;
  defaultBrand?: Brand;
  defaultTheme?: Theme;
}

interface ThemePreferences {
  brand: Brand;
  theme: Theme;
}

function isValidBrand(value: unknown): value is Brand {
  return value === "academic" || value === "studio";
}

function isValidTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

function loadPreferences(storageKey: string): Partial<ThemePreferences> {
  try {
    const stored = localStorage.getItem(storageKey);

    if (!stored) {
      return {};
    }

    const preferences = JSON.parse(stored);

    return {
      brand: isValidBrand(preferences?.brand) ? preferences.brand : undefined,

      theme: isValidTheme(preferences?.theme) ? preferences.theme : undefined,
    };
  } catch {
    return {};
  }
}

export function useTheme(options: ThemeOptions) {
  const {
    storageKey,
    defaultBrand = "academic",
    defaultTheme = "light",
  } = options;

  const preferences = loadPreferences(storageKey);

  const brand = ref<Brand>(preferences.brand ?? defaultBrand);

  const theme = ref<Theme>(preferences.theme ?? defaultTheme);

  function setBrand(value: Brand) {
    brand.value = value;
  }

  function setTheme(value: Theme) {
    theme.value = value;
  }

  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
  }

  function resetTheme() {
    brand.value = defaultBrand;
    theme.value = defaultTheme;
  }

  watch(
    [brand, theme],
    ([currentBrand, currentTheme]) => {
      if (typeof document !== "undefined") {
        document.documentElement.dataset.brand = currentBrand;

        document.documentElement.dataset.theme = currentTheme;
      }

      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            brand: currentBrand,
            theme: currentTheme,
          }),
        );
      } catch {
        // The application remains functional
        // when localStorage is unavailable.
      }
    },
    { immediate: true },
  );

  return {
    brand,
    theme,
    setBrand,
    setTheme,
    toggleTheme,
    resetTheme,
  };
}
