import {
  required, requireMock
} from './axios'

export function gethomedata() {
  return requireMock({
    url: '/api/home'
  })
}
export function goodslist(type, page) {
  return required({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}