import { defineStore } from 'pinia'

export type ThemeMode = 'auto' | 'light' | 'dark'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: 'auto' as ThemeMode,
  }),
  actions: {
    setMode(mode: ThemeMode) {
      this.mode = mode
      if (mode === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.body.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light')
      } else {
        document.body.setAttribute('data-bs-theme', mode)
      }
    },
    initTheme() {
      this.setMode(this.mode)
    },
  },
  persist: true,
})
