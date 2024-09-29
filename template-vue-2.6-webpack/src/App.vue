<template>
  <div>
    <div class="flex flex-col items-center justify-center">
      <h3 class="text-3xl">
        Create-FKS
        <span class="text-green-500">Vue2.6</span>
        &
        <span class="text-sky-500">Webpack5</span>
      </h3>
      <p class="text-xl">计数: {{ count }}</p>
      <button class="border-solid border-2 border-sky-500 rounded-md" @click="handleClick">
        更新计数
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    count: 1,
  }),
  methods: {
    handleClick() {
      this.count++
    },
  },
}
</script>

<style scoped></style>
