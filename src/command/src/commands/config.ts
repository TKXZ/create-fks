import chalk from 'chalk'

export default {
  vue: [
    {
      name: chalk.greenBright('Vue 2.6.14'),
      value: {
        pkg_version: '2.6.14',
        templateField: 'vue-2.6',
        tooling: ['webpack'],
      },
    },
    {
      name: chalk.green('Vue 2.7.16'),
      value: {
        pkgVersion: '2.7.16',
        templateField: 'vue-2.7',
        tooling: ['vite'],
      },
    },
  ],
  tooling: [
    {
      name: chalk.cyan('Webpack'),
      value: {
        name: 'webpack',
        templateField: 'webpack',
      },
    },
    {
      name: chalk.magenta('Vite'),
      value: {
        name: 'vite',
        templateField: 'vite',
      },
    },
  ],
}
