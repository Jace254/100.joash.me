<script lang="ts" setup>
const colorMode = useColorMode()

function toggleMode() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <a
    class="select-none"
    title="Toggle Color Scheme"
    @click="toggleMode"
  >
    <div i-ph-sun-dim-duotone dark:i-tabler-moon-stars text-2xl />
  </a>
</template>
