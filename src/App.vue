<!-- App.vue -->

<template>
  <BApp>
    <div class="app-layout">
      <aside class="sidebar shadow">
        <BButtonGroup vertical class="w-100">
          <BButton to="/" variant="outline-primary" tag="router-link">Home</BButton>
          <BButton to="/tasks" variant="outline-primary" tag="router-link">Tasks</BButton>
          <BButton to="/timeline" variant="outline-primary" tag="router-link">Timeline</BButton>
          <BButton to="/mindmap" variant="outline-primary" tag="router-link">Mindmap</BButton>
          <BButton to="/settings" variant="outline-primary" tag="router-link">Settings</BButton>
        </BButtonGroup>
      </aside>
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </BApp>
</template>

// ...existing code...
<script setup lang="ts">
import { BApp, BButtonGroup, BButton } from 'bootstrap-vue-next'
import { useThemeStore } from './stores/theme'
import { onMounted } from 'vue'

const themeStore = useThemeStore()
onMounted(() => {
  themeStore.initTheme()
})
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 200px;
  padding: 2rem 1rem;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
