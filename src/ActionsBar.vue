<script lang="ts" setup>

</script>

<template>
  <div class="out">
    <BButtonGroup id="actions" class="shadow mx-auto">
      <BButton>abc</BButton>
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
