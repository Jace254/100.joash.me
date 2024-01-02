<script setup lang='ts'>
'use-client'
import { useEventListener, useFullscreen, useTitle } from '@vueuse/core'
import { submissions } from '@/lib'

const no = ref()

const shot = ref()
const hideFrame = ref()

const submission = ref<typeof submissions[0]>()
const index = ref<number>()
const prev = ref<typeof submissions[0]>()
const next = ref<typeof submissions[0]>()
const fullscreen = ref()
const doc = ref()

onMounted(async () => {
  await refreshNuxtData()
  doc.value = document.querySelector('html')
  fullscreen.value = useFullscreen(doc)
  const route = useRoute()
  shot.value = Boolean(route.query.shot)
  hideFrame.value = Boolean(route.query.hideFrame)
  no.value = route.path.slice(1)
  if (no.value.startsWith('x'))
    no.value = no.value.slice(1)
  index.value = submissions.findIndex(i => i.no === no.value)
  submission.value = submissions[index.value]
  prev.value = submissions[index.value - 1]
  next.value = submissions[index.value + 1]


  useEventListener('keydown', (e) => {
    if (document) {
      if (document.activeElement === document.body) {
        if (e.key === 'f') {
          if (fullscreen.value.isFullscreen.value)
            fullscreen.value.exit()
          else
            fullscreen.value.enter()
        }
      }
    }
  })
})

useTitle(submission.value ? `${no}. ${submission.value.title}` : '404')
</script>

<template>
  <div class="viewer" :class="{ shot }">
    <div v-if="submission" class="bottom-nav font-mono flex z-10">
      <div class="nav-links">
        <RouterLink v-if="prev" class="prev link" :to="`/${prev.no}`">
          <span>{{ prev.title }}</span>
          <span class="mx-1 opacity-25">{{ prev.no }}</span>
        </RouterLink>
        <div class="current">
          <span class="font-bold">{{ submission.title }}</span>
          <span class="mx-1 opacity-50">{{ submission.no }}</span>
        </div>
        <RouterLink v-if="next" class="next link" :to="`/${next.no}`">
          <span>{{ next.title }}</span>
          <span class="mx-1 opacity-25">{{ next.no }}</span>
        </RouterLink>
      </div>
      <div class="flex-auto" />
      <div class="flex flex-col">
        <div class="flex-auto" />
        <span class="opacity-50">{{ submission.date }}</span>
      </div>
    </div>
    <div v-if="!shot && !hideFrame" class="nav font-mono flex items-center justify-between">
      <RouterLink class="link w-2rem h-2rem flex items-center justify-center mt-2 " to="/">
        <div text-2xl i-akar-icons-arrow-back />
      </RouterLink>
      <div v-if="!fullscreen?.isFullscreen ?? false" font-mono opacity-50 pt-2 visible invisible md:visible>
        F for Fullscreen
      </div>
      <div w-2rem />
    </div>
    <slot :submission="submission" />
  </div>
</template>

<style scoped>
.viewer {
    display: -ms-grid;
    display: grid;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    place-items: center;
    user-select: none;
    justify-content: center;
}
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 12px;
  }

  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px 12px;
  }

  .shot.nav {
    padding: 24px;
  }

  .shot.bottom-nav {
    padding: 20px 24px;
  }

  .nav-links {
    .next, .prev {
      opacity: 0;
      transition: 0.3s all ease-in-out;
      margin-top: -1.5em;
      display: block;
    }

    &:hover {
      .next, .prev {
        opacity: 1;
        margin-top: 0;
      }
    }
  }
</style>
