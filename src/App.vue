<template>
  <BApp>
    <div class="app-layout">
      <aside class="sidebar shadow">
        <BButtonGroup vertical class="w-100">
          <BButton to="/" variant="link-secondary" tag="router-link">Home</BButton>
          <BButton to="/tasks" variant="link-secondary" tag="router-link">Tasks</BButton>
          <BButton to="/timeline" variant="link-secondary" tag="router-link">Timeline</BButton>
          <BButton to="/mindmap" variant="link-secondary" tag="router-link">Mindmap</BButton>
          <BButton to="/settings" variant="link-secondary" tag="router-link">Settings</BButton>
        </BButtonGroup>
      </aside>
      <main class="main-content">
        <router-view v-slot="{ Component }">

          <KeepAlive>
            <transition name="fade">
              <Suspense>
                <component :is="Component" />
              </Suspense>
            </transition>
          </KeepAlive>
        </router-view>
      </main>
    </div>
  </BApp>
</template>

<script setup lang="ts">
import { BApp, BButtonGroup, BButton } from 'bootstrap-vue-next'
import { useThemeStore } from './stores/theme'
import { onMounted } from 'vue'
import { db } from './stores/pglite'
import { providePGlite } from '@electric-sql/pglite-vue'


const themeStore = useThemeStore()
onMounted(() => {
  themeStore.initTheme()
})

//pglite

providePGlite(db)
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

/*Fade*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20vh);
}

.fade-leave-active,
.fade-leave-to {
  position: absolute;
}
</style>
