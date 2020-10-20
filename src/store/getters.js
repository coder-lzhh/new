const getters = {
  catproducelength(state) {
    return state.producelist.length
  },
  collectobjlength(state) {
    return state.collectObj.length
  },
  watchobjlength(state) {
    return state.watchObj.length
  },
  watchproduce(state) {
    return state.watchObj
  },
  buyGoodslength(state) {
    return state.buyGoods.length
  },
  buygoods(state) {
    return state.buyGoods
  },
  catproduce(state) {
    return state.producelist
  },
  collectproduce(state) {
    return state.collectObj
  },

}


export default getters