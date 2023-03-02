import { createPinia as _createPinia } from 'pinia'

export * from './alertsStore'

export * from './authStore'

export * from './SidebarStore'

// Reusable installation function, used as an entry point for tests that
// require an identical setup to main.ts
export const createPinia = () => {
  return _createPinia()
}
