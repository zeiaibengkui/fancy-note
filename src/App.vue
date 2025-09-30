<template>
  <BApp>
    <div class="app-layout">
      <!-- Nav -->
      <aside class="sidebar shadow">
        <BButtonGroup vertical class="w-100">
          <BButton to="/" variant="link-secondary" tag="router-link">Home</BButton>
          <BButton to="/tasks" variant="link-secondary" tag="router-link">Tasks</BButton>
          <BButton to="/timeline" variant="link-secondary" tag="router-link">Timeline</BButton>
          <BButton to="/mindmap" variant="link-secondary" tag="router-link">Mindmap</BButton>
          <BButton to="/settings" variant="link-secondary" tag="router-link">Settings</BButton>
        </BButtonGroup>
      </aside>
      <!-- Main -->
      <Transition name="fade-from-top">
        <Suspense>
          <MainContentAsyncLoad />
          <template #fallback>
            <BButton
              variant="link-secondary"
              loading
              class="m-auto"
              loading-text="PGlite loading..."
            ></BButton>
          </template>
        </Suspense>
      </Transition>
      <!-- Actions -->
      <Transition name="fade-from-bottom">
        <ActionsBar></ActionsBar>
      </Transition>
    </div>
  </BApp>
</template>

<script setup lang="ts">
import { BApp, BButtonGroup, BButton } from 'bootstrap-vue-next'
import { useThemeStore } from './stores/theme'
import { onMounted } from 'vue'
import MainContentAsyncLoad from './MainContentAsyncLoad.vue'
import ActionsBar from './ActionsBar.vue'

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
  width: 10em;
  padding: 2rem 1rem;
}

.sidebar .router-link-exact-active {
  color: #0d6efd;
  font-weight: bold;
  background: rgba(13, 110, 253, 0.08);
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
