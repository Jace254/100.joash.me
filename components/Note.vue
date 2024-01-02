<script setup lang='ts'>
const route = useRoute()
let no = route.path.slice(1)
if (no.startsWith('x'))
  no = no.slice(1)

const hide = Boolean(route.query.shot || route.query.hideFrame)
const active = ref(false)
</script>

<template>
  <div v-if="!hide" class="note font-normal font-mono" :class="{ active }">
    <div class="handle fixed border border-gray-200 text-center p-2 text-gray-400 bg-white bg-opacity-50">
      i
    </div>
    <div class="modal-bg bg-black fixed top-0 left-0 right-0 bottom-0" />
    <div class="content border border-gray-200 p-8 fixed bottom-0 bg-white shadow">
      <slot />
      <br>
      <a class="link mr-3" :href="`https://github.com/Jace254/100.joash.me/blob/main/pages/${no}.vue`">source</a>
    </div>
  </div>
</template>

<style>
  .note .handle {
    left: calc(50% - 20px);
    width: 40px;
    height: 40px;
    bottom: -2px;
    cursor: default;
  }

  .note .content {
    pointer-events: none;
    left: 50%;
    width: 500px;
    max-width: 100vw;
    min-height: 100px;
    transform: translate(-50%, 110%);
    transition: 0.3s all ease-in-out;
  }

  .note .modal-bg {
    pointer-events: none;
    opacity: 0;
    transition: 0.2s opacity ease-in-out;
  }

  :active.note.content {
    display: block;
    transform: translate(-50%, 0);
    pointer-events: auto;
  }

  :active.note.modal-bg {
    opacity: 0.2;
    pointer-events: auto;
  }
</style>
