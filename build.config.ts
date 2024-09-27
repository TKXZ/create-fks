export default {
  entries: ['src/index.ts'],
  outDir: 'dist',
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
}
