import {
  required
} from './axios'


export function getcategory() {
  return required({
    url: '/category'
  })
}

export function getsubcategory(maitKey) {
  return required({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}
export function getSubcategoryDetail(miniWallkey, type) {
  return required({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}