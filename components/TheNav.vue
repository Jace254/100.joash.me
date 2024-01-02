<template>
  <header class="blurred" md:w="calc(100% + var(--body-margin-left) + var(--body-margin-right))" w-full>
    <nav mx-auto px4 lg:px-8 md:max-w-7xl flex items-center  gap-3 h-full z-20>
      <NuxtLink to="/" title="100" flex gap-2 items-center font-bold font-mono>
        <Logo h-1.5em w-1.5em /> 100 days
      </NuxtLink>
      <div flex-auto />
      <ColorSchemeToggle />
      <a class="select-none" title="Github" href="https://github.com/Jace254/100.joash.me" rel="noopener" target="_blank" >
        <div  i-carbon-logo-github text-1.5em dark:hover:bg-white style="transition: background-color 0.3s ease-in-out;"/>
      </a>
    </nav>
  </header>
</template>
