<template>
  <div class="tasks-page">
    <h1>Tasks</h1>
    <b-list-group>
      <b-list-group-item button :active="!!selected(file.dir)" v-for="(file, index) in fileList.rows.value" :key="index"
        @click="select(file.dir)">
        {{ index }} | {{ file.dir }} | {{ file.content }}
      </b-list-group-item>
    </b-list-group>
    <b-button variant="primary" @click="(new PGFile('/example2')).write('a')">Add File</b-button>
  </div>
</template>

<script setup lang="ts">
import { PGFile, useFileStore } from '@/stores/pgfile';
import { injectPGlite, useLiveQuery } from '@electric-sql/pglite-vue';

injectPGlite()

const fileList = useLiveQuery(
  'SELECT * FROM files'
);

const filestore = useFileStore()
function selected(dir: string) {
  const index = filestore.selectedDirs.indexOf(dir)
  return index !== -1
}
function select(dir: string) {
  const index = filestore.selectedDirs.indexOf(dir);
  if (index !== -1) filestore.selectedDirs.splice(index, 1);
  else filestore.selectedDirs.push(dir);
}
</script>

<style scoped>
.tasks-page {
  padding: 2rem;
}
</style>
