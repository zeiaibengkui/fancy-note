<template>
  <div class="tasks-page">
    <h1>Tasks</h1>
    <b-list-group>
      <b-list-group-item
        button
        :active="selected(file.dir)"
        v-for="(file, index) in fileList.rows.value as { dir: string; content: string }[]"
        :key="index"
        @click="select(file.dir)"
      >
        {{ index }} | {{ file.dir }} | {{ file.content }}
      </b-list-group-item>
    </b-list-group>
    <b-button variant="primary" @click="new PGFile('/example2').write('a')">Add File</b-button>
  </div>
</template>

<script setup lang="ts">
import { PGFile, useFileStore } from '@/stores/pgfile'
import { injectPGlite, useLiveQuery } from '@electric-sql/pglite-vue'

injectPGlite()

const fileList = useLiveQuery('SELECT * FROM files')

const filestore = useFileStore()
function selected(dir: string) {
  return filestore.selectedDirs.has(dir)
}
function select(dir: string) {
  if (filestore.selectedDirs.has(dir)) filestore.selectedDirs.delete(dir)
  else filestore.selectedDirs.add(dir)
}
</script>

<style scoped>
.tasks-page {
  padding: 2rem;
}
</style>
