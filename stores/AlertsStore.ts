import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

export type AlertStyle = 'error' | 'authError' | 'success' | 'warning' | 'info' | 'none'

export interface AlertOptions {
  html?: boolean
  closable?: boolean
  timeout?: number | false
  style?: AlertStyle
}

const defaultOptions: Required<AlertOptions> = {
  closable: true,
  html: false,
  timeout: 10000,
  style: 'info',
}

export interface Alert extends AlertOptions {
  id: string
  message: string
}

export const useAlertsStore = defineStore('AlertsStore', {
  state: () => ({
    items: [] as Alert[],
  }),

  actions: {
    notify(message: string, style: AlertStyle, options?: AlertOptions) {
      options = { ...defaultOptions, style, ...options }

      const id = uuid()
      this.items.push({
        message,
        id,
        ...options,
      })

      if (options.timeout !== false) {
        setTimeout(() => {
          this.remove(id)
        }, options.timeout)
      }
    },

    success(message: string, options?: AlertOptions) {
      this.notify(message, 'success', options)
    },

    error(message: string, options?: AlertOptions) {
      this.notify(message, 'error', options)
    },

    authError(message: string, options?: AlertOptions) {
      this.notify(message, 'warning', options)
    },

    warning(message: string, options?: AlertOptions) {
      this.notify(message, 'warning', options)
    },

    info(message: string, options?: AlertOptions) {
      this.notify(message, 'info', options)
    },

    remove(id: string) {
      const index = this.items.findIndex(item => item.id === id)
      if (index > -1)
        this.items.splice(index, 1)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAlertsStore, import.meta.hot))
