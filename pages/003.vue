<script setup lang="ts">
import crypticTyping from 'cryptic-typing'
import { lipsum } from '@/lib'
import { ScrollArea } from '@/components/ui/scroll-area'

definePageMeta({
  layout: 'submission',
})

const text = ref<string>()

onMounted(() => {
  crypticTyping(lipsum, (newText) => {
    text.value = newText
  })
})
</script>

<template>
  <div w-full py12 md:p12>
    <ScrollArea>
      {{ text }}
    </ScrollArea>
  </div>
  <Note>
    Text from <span><a href="https://www.lipsum.com/feed/html" target="_blank" rel="noopener" underline>lipsum</a></span><br>
    <pre lang="bash">
    npm i cryptic-typing
    </pre>
  </Note>
</template>
