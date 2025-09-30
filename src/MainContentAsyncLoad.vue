<template>
  <main class="main-content">
    <router-view v-if="PGliteLoaded" v-slot="{ Component }">
      <transition name="fade-from-top">
        <KeepAlive>
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </KeepAlive>
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { providePGlite } from '@electric-sql/pglite-vue'
import { ref } from 'vue'

//PGlite

const PGliteLoaded = ref(false)

const { db } = await import('./stores/pglite')
providePGlite(db)
PGliteLoaded.value = true
</script>

<style></style>
