<script setup lang="ts">
import { submissions } from '@/lib'

const available_submissions = submissions.filter(i => !i.draft)
</script>

<template>
  <div block class="centered">
    <h1 font-bold text-lg mb2>
      Submissions
    </h1>
    <div flex-auto mt-8 mb-2 />
    <pre grid=" ~  cols-1 sm:cols-2 lg:cols-3" gap-x-4 gap-y-3>
      <RouterLink 
      v-for="submission of available_submissions" 
      :key="submission.no" :to="`/${submission.no}`" 
      class="link"
      flex mr-4>
        <span mr-2 opacity-50>{{ submission.no }}</span>
        <b>{{ submission.title }}</b>
      </RouterLink>
    </pre>
    <TheFooter />
  </div>
</template>
