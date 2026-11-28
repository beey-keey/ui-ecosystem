import { afterEach, beforeEach } from 'vitest'
import { enableAutoUnmount } from '@vue/test-utils'

enableAutoUnmount(afterEach)

if (!HTMLDialogElement.prototype.showModal) {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    writable: true,
    value: function (this: HTMLDialogElement) {
      this.setAttribute('open', '')
    },
  })
}

if (!HTMLDialogElement.prototype.close) {
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    writable: true,
    value: function (this: HTMLDialogElement) {
      this.removeAttribute('open')
      this.dispatchEvent(new Event('close'))
    },
  })
}

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()

  document.documentElement.removeAttribute('data-brand')
  document.documentElement.removeAttribute('data-theme')
})
