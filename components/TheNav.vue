<template>
  <header class="blurred" md:w="calc(100% + var(--body-margin-left) + var(--body-margin-right))" w-full>
    <nav mx-auto px4 lg:px-8 md:max-w-7xl flex items-center  gap-3 h-full z-20>
      <NuxtLink to="/" title="100" flex gap-2 items-center font-bold>
        <Logo h-1.5em w-1.5em /> 100 days
      </NuxtLink>
      <div flex-auto />
      <ColorSchemeToggle />
    </nav>
  </header>
</template>
