<script setup lang='ts'>
import { useEventListener, useFullscreen, useTitle } from '@vueuse/core'
import { submissions } from '@/lib'

// const fullscreen = useFullscreen(ref(document?.querySelector('html') ?? null))

// useEventListener('keydown', (e) => {
//   if (document) {
//     if (document.activeElement === document.body) {
//       if (e.key === 'f') {
//         if (fullscreen.isFullscreen.value)
//           fullscreen.exit()
//         else
//           fullscreen.enter()
//       }
//     }
//   }
// })

const route = useRoute()
let no = route.path.slice(1)
if (no.startsWith('x'))
  no = no.slice(1)

const shot = Boolean(route.query.shot)
const hideFrame = Boolean(route.query.hideFrame)
const index = submissions.findIndex(i => i.no === no)

const submission = submissions[index]
const prev = submissions[index - 1]
const next = submissions[index + 1]

useTitle(submission ? `${no}. ${submission.title}` : '404')
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
    <div v-if="!shot && !hideFrame" class="nav font-mono">
      <RouterLink class="link  h-4 block pt-2 " to="/">
        <div text-2xl i-akar-icons-arrow-back/>
      </RouterLink>
    </div>
    <slot :submission="submission" />
  </div>
</template>

<style scoped>
.paper {
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
