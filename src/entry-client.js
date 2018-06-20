import { createApp } from './app'

const { app, router } = createApp()

if (window.__INITIAL_STATE__) {
  console.log('Yes! Hydrate!')
  store.replaceState(window.__INITIAL_STATE__)
} else {
  console.log('No! Not Hydrate!')
}

router.onReady(() => {
  app.$mount('#app')
})
