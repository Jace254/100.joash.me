<script setup lang="ts">
import { clamp, useDeviceOrientation } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'submission',
})

const route = useRoute()

const debug = !!route.query.debug
const shot = !!route.query.shot
const { gamma, beta, alpha } = useDeviceOrientation()

const mobile = computed(() => gamma.value != null && beta.value != null && (gamma.value !== 0 || beta.value !== 0 || alpha.value !== 0))
const theta = computed(() => {
  if (shot)
    return Math.PI / 2 * 4.55

  if (gamma.value == null || beta.value == null)
    return 0

  const x = clamp(beta.value, -90, 90) / 90
  const y = clamp(-gamma.value, -90, 90) / 90

  return Math.atan2(y, x)
})

const transformStyle = computed(() => {
  return {
    transform: `rotate(${theta.value}rad)`,
  }
})
</script>

<template>
  <div :style="transformStyle">
    <div rounded-t-full border border-b-0 border-foreground w-9em h-5em flex justify-center items-center>
      o o<br>
    </div>
    <div fixed left="50%" top="50%" w-0 h-0 overflow-visible>
      <a class="link" href="https://en.wikipedia.org/wiki/Kokeshi" target="_blank" rel="noopener" text-center style="width: 500px;transform: translate(-50%, -50%);">Kokeshi</a>
    </div>
    <div rounded-b-full border border-foreground w-9em h-9em flex justify-center items-center>
      ( )
    </div>
  </div>
  <div py3 class="box-description">
    <p v-if="!mobile && !shot" text-gray text-center>
      Use mobile to visit
    </p>
  </div>
  <div v-if="debug" p4>
    <p>Gamma {{ gamma }}</p>
    <p>Beta  {{ beta }}</p>
    <p>Theta {{ theta }}</p>
    <p>Alpha {{ alpha }}</p>
  </div>

  <Note>
    Tilt your phone
  </Note>
</template>
