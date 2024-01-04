<script setup lang="ts">
import { TransitionPresets, type UseMouseEventExtractor, useTransition } from '@vueuse/core'

definePageMeta({
  layout: 'submission',
})

const size = ref(0.5)
const opacity = ref(0)
const coords = ref({ x: 0, y: 0 })
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
const { pressed } = useMousePressed({
  target: targetEl,
})

const { x, y, sourceType } = useMouse({ target: targetEl })

watch(pressed, () => {
  if (pressed.value === true) {
    if (sourceType.value === 'mouse') {
      coords.value.x = x.value
      coords.value.y = y.value
    }
    size.value = 1
    opacity.value = 100
  }
  else {
    size.value = 0.5
    opacity.value = 0
  }
})
</script>

<template>
  <div
    ref="targetEl" class="box" border
    border-border rounded-xl flex
    items-center justify-center
    bg-faded overflow-hidden
    select-none
  >
    <div v-if="!pressed" class="text">
      Hold and rotate from anywhere
    </div>
    <div
      class="radial-box box"
      :style="`
        transform: scale(${output});
        opacity: ${outputOp}%;
        top: ${sourceType === 'mouse' ? `${coords.y}px` : '50%'};
        left: ${sourceType === 'mouse' ? `${coords.x}px` : '50%'};;
        translate: -50% -50%;
      `"
      sm:top="50%"
      sm:left="50%"
    >
      <div class="box radial-container" />
      <div class="box radial-circle">
        <span class="vh">Hold and rotate</span>
      </div>
      <ul class="menu">
        <li>
          <div i-solar-rewind-back-broken class="box item" />
        </li>
        <li>
          <div i-solar-rewind-back-broken class="box item" />
        </li>
        <li>
          <div i-solar-rewind-back-broken class="box item" />
        </li>
        <li>
          <div i-solar-rewind-back-broken absolute h="24px" w="24px" class="box item" />
        </li>
        <li>
          <div i-solar-rewind-back-broken absolute h="24px" w="24px" class="box item" />
        </li>
        <li>
          <div i-solar-rewind-back-broken absolute h="24px" w="24px" class="box item" />
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
    pointer-events: auto;
    width: 250px;
    height: 250px;
    border-radius: 9999px;
    position: absolute;
    border: 1px solid hsl(0 0% 17.9%);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    z-index: 5;
    touch-action: none;
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

.menu li:nth-of-type(1) {
    transform: rotate(calc(var(--a) * -1)) skew(var(--a));
}
.menu li:nth-of-type(2) {
    transform: rotate(var(--a)) skew(var(--a));
}
.menu li:nth-of-type(3) {
    transform: rotate(calc(var(--a) * 3)) skew(var(--a));
}
.menu li:nth-of-type(4) {
    transform: rotate(calc(var(--a) * 5)) skew(var(--a));
}
.menu li:nth-of-type(5) {
    transform: rotate(calc(var(--a) * 7)) skew(var(--a));
}
.menu li:nth-of-type(6) {
    transform: rotate(calc(var(--a) * 9)) skew(var(--a));
}

li:active {
    background: hsl(0 0% 17.9%);
    color: hsl(0 0% 93.0%);
}

.item {
    transform: skew(calc(var(--a) * -1)) rotate(var(--a)) translateX(330px) translateY(15px);
	font-size: 1.5rem;
}
</style>
