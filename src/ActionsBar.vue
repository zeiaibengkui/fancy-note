<script lang="ts" setup>
import { useFileStore } from './stores/pgfile'

const fileStore = useFileStore()
</script>

<template>
  <div class="out">
    <BButtonGroup id="actions" class="shadow mx-auto">
      <BButton @click="fileStore.delete()">Delete</BButton>
      <BButton @click="fileStore.create()">Create</BButton>
    </BButtonGroup>
  </div>
</template>

<style scoped lang="scss">
.out {
  position: fixed;
  inset: auto 2rem 2rem 2rem;

  #actions {
    width: max-content;
    display: flex;
  }
}
</style>
