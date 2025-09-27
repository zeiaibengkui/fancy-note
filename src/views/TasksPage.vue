<template>
  <div class="tasks-page">
    <h1>Tasks</h1>
    <b-list-group>
      <b-list-group-item v-for="(file, index) in fileList.rows.value" :key="index">
        {{ index }} | {{ file.dir }} | {{ file.content }}
      </b-list-group-item>
    </b-list-group>
    <b-button variant="primary" @click="(new PGFile('/example2')).write('a')">Add File</b-button>
  </div>
</template>

<script setup lang="ts">
import { PGFile } from '@/pgfile';
import { injectPGlite, useLiveQuery } from '@electric-sql/pglite-vue';

injectPGlite()

const fileList = useLiveQuery(
  'SELECT * FROM files'
);
</script>

<style scoped>
.tasks-page {
  padding: 2rem;
}
</style>
