<script setup lang="ts">
import { TransitionPresets, useTransition } from '@vueuse/core'
import { useSpring } from '@vueuse/motion'
import { cn, getAngleDifference, normalizeAngle } from '@/utils'

definePageMeta({
  layout: 'submission',
})

const { width, height } = useWindowSize()
const size = ref(1)
const opacity = ref(100)
const coords = ref({ x: width.value / 2, y: height.value / 2 })
const duration = 250

const output = useTransition(size, {
  duration,
  transition: TransitionPresets.easeInOutSine,
})

const outputOp = useTransition(opacity, {
  duration,
  transition: TransitionPresets.easeInOutSine,
})

const targetEl = ref<HTMLDivElement>()
const ringEl = ref<HTMLDivElement>()
const menuEl = ref<HTMLDivElement>()
const { pressed } = useMousePressed({
  target: targetEl,
})

const { x, y, sourceType } = useMouse({ target: targetEl })

function getItemStyle(i: number) {
  const rotate = (360 / 6) * i - 90
  return `--rotate: ${rotate}deg`
}

const ringAngle = ref<number | null>()
const selected = ref<number | null>()
const angle = ref()
const dx = ref()
const dy = ref()

const { set } = useSpring(ringEl, {
  stiffness: 0.04,
  damping: 0.19,
})

function getMouseSelection() {
  console.log(dx.value, dy.value)

  const distance = Math.sqrt(dx.value * dx.value + dy.value * dy.value)
  console.log(distance)
  const innerRadius = menuEl.value!.getBoundingClientRect().width / 2
  console.log(innerRadius)
  if (distance < innerRadius)
    return null

  const angle = Math.atan2(dy.value, dx.value) * (180 / Math.PI)
  const normalizedAngle = normalizeAngle(angle - 90)
  const stepAngle = 360 / 6

  return Math.floor(normalizedAngle / stepAngle)
}

function getRingAngle(): number | null {
  if (selected.value === undefined || selected.value === null)
    return null

  const newAngle = normalizeAngle((360 / 6) * selected.value - 120)
  if (ringAngle.value === null || ringAngle.value === undefined)
    return newAngle
  const oldAngle = normalizeAngle(ringAngle.value || 0)

  const diff = getAngleDifference(oldAngle, newAngle)

  return ringAngle.value + diff
}

// watch(selected, () => {
//   if (selected.value === null || selected.value === undefined) {
//     // When nothing is selected, the angle should be reset.
//     angle.value = -1
//     set({
//       style: `{
//           .radial-container {
//             background: conic-gradient(
//               from var(${angle.value}),
//               var(--color-gray-11) 83.2%,
//               var(--color-gray-9) 0,
//               var(--color-gray-9) 100%
//             );
//           }
//         }`,
//     })
//   }
//   else if (angle.value === -1) {
//     // Coming from a reset state, no need to animate, just show the new angle.
//     angle.value = ringAngle || 0
//     set({
//       style: `{
//           .radial-container {
//             background: conic-gradient(
//               from var(${angle.value}),
//               var(--color-gray-11) 83.2%,
//               var(--color-gray-9) 0,
//               var(--color-gray-9) 100%
//             );
//           }
//         }`,
//     })
//   }
//   else {
//     // Otherwise, we want to animate to the new angle.
//     angle.value = ringAngle || 0
//     set({
//       style: `{
//           .radial-container {
//             background: conic-gradient(
//               from var(${angle.value}),
//               var(--color-gray-11) 83.2%,
//               var(--color-gray-9) 0,
//               var(--color-gray-9) 100%
//             );
//           }
//         }`,
//     })
//   }
// })

const cursor = ref('default')

const items = [
  {
    icon: 'i-solar-microphone-large-broken',
    title: 'record',
  },
  {
    icon: 'i-solar-rewind-back-broken',
    title: 'rewind',
  },
  {
    icon: 'i-solar-play-broken',
    title: 'play',
  },
  {
    icon: 'i-solar-pause-broken',
    title: 'pause',
  },
  {
    icon: 'i-solar-rewind-forward-broken',
    title: 'forward',
  },
  {
    icon: 'i-solar-stop-bold',
    title: 'stop',
  },

]

watch([x, y], () => {
  dx.value = x.value - coords.value.x
  dy.value = y.value - coords.value.y
  selected.value = getMouseSelection()
  ringAngle.value = getRingAngle()
  console.log(selected.value)
})

watch(pressed, () => {
  if (pressed.value === true) {
    if (sourceType.value === 'mouse') {
      coords.value.x = x.value
      coords.value.y = y.value
    }
    cursor.value = 'move'
    size.value = 1
    opacity.value = 100
  }
  else {
    cursor.value = 'default'
    size.value = 0.5
    opacity.value = 0
  }
})
onMounted(async () => {
  await refreshNuxtData()
})
</script>

<template>
  <div
    ref="targetEl" class="box" border
    border-border rounded-xl flex
    bg-faded overflow-hidden
    select-none
  >
    <div v-if="!pressed" class="text">
      Hold and rotate from anywhere
    </div>
    <div
      class="radial-box box" :active="pressed"
      :style="`
        transform: scale(${output});
        opacity: ${outputOp}%;
        cursor: ${cursor};
        top:  ${`${coords.y !== 0 && width >= 768 ? `${coords.y}px` : '50%'}`};
        left: ${`${coords.x !== 0 && width >= 768 ? `${coords.x}px` : '50%'}`};
      `"
      :class="cn(pressed ? 'select-none' : '')"
    >
      <div ref="ringEl" class="box radial-container" />
      <div class="box radial-circle" ref="menuEl">
        <span class="vh">Hold and rotate</span>
      </div>
      <ul class="menu">
        <li v-for="item, idx of items" :key="idx" :aria-label="item.title" :style="getItemStyle(idx)" :class="cn(selected === idx ? 'active' : '')">
          <div class="item" :class="item.icon" />
        </li>
      </ul>
    </div>
  </div>
  <Note />
</template>

<style scoped>
.box {
    box-sizing: border-box;
    margin: 0px;
}
.text {
    position: absolute;
    bottom: 12px;
    left: 50%;
    height: fit-content;
    width: 100%;
    text-align: center;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: opacity 250ms ease 0s;
    top: 50%;
}

.radial-box {
    --a: 0deg;
    --o: 0;
    --color-gray-9: #50514f;
    --color-gray-11: #252521;
    pointer-events: auto;
    width: 250px;
    height: 250px;
    border-radius: 9999px;
    position: absolute;
    border: 1px solid hsl(0 0% 17.9%);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    z-index: 5;
    touch-action: none;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}

.radial-container {
    content: "";
    position: absolute;
    border: 8px solid hsl(0 0% 13.6%);
    width: calc(100% + 24px);
    height: calc(100% + 24px);
    border-radius: inherit;
    z-index: -1;
    inset: -12px;
}

.radial-circle {
    width: 125px;
    height: 125px;
    border-radius: 9999px;
    background:hsl(0 0% 11.0%);
    position: absolute;
    border: 1px solid hsl(0 0% 17.9%);
    top: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vh {
    clip: rect(0 0 0 0);
    /* -webkit-clip-path: inset(50%);
    clip-path: inset(50%); */
    height: 100%;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    --at-apply: 'text-muted-foreground';
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
}

.menu {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 0 4px var(--colors-gray2);
}

li {
    display: list-item;
    text-align: -webkit-match-parent;
}

.menu li {
    --a: 30deg;
    position: absolute;
    bottom: 50%;
    right: 50%;
    font-size: 24px;
    width: 240px;
    height: 240px;
    transform-origin: 100% 100%;
    overflow: hidden;
    background: hsl(0 0% 13.6%);
    box-shadow: 0 0 0 1px hsl(0 0% 17.9%);
    color: hsl(0 0% 62.8%);
    transition: background 250ms ease 0s;
}

.menu li {
    transform: rotate(var(--rotate)) skew(var(--a));
}

li.active {
    background: hsl(0 0% 17.9%);
    color: hsl(0 0% 93.0%);
}

.item {
  position: absolute;
  transform: skew(calc(var(--a) * -1)) rotate(calc(var(--rotate) * -1));
  top: 76%;
  left: 73%;
  font-size: 1.5rem;
}
</style>
