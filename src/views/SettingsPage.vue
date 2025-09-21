<template>
  <div class="settings-page">
    <h1>Settings</h1>
    <p>Configure your preferences here.</p>
    <b-form-radio-group v-model="themeMode" :options="themeOptions" name="theme-mode" @change="onThemeChange"
      class="mt-4" buttons button-variant="outline-primary" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '../stores/theme'
import type { ThemeMode } from '../stores/theme'
import { BFormRadioGroup } from 'bootstrap-vue-next'

const themeStore = useThemeStore()
const { mode } = storeToRefs(themeStore)
const themeMode = ref<ThemeMode>(mode.value)

const themeOptions = [
  { value: 'auto', text: 'Auto' },
  { value: 'light', text: 'Light' },
  { value: 'dark', text: 'Dark' },
]

const onThemeChange = () => {
  themeStore.setMode(themeMode.value)
}

// 初始化时同步主题
watch(
  () => mode.value,
  (val) => {
    themeMode.value = val
  }
)

themeStore.initTheme()
</script>

<style scoped>
.settings-page {
  padding: 2rem;
  max-width: 500px;
}
</style>
