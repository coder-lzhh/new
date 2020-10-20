const mutations = {

  addcount(state, arr) {
    console.log(arr)
    arr[0].count += arr[1]
  },
  addproduce(state, payload) {
    payload.select = true
    state.producelist.push(payload)
  },
  watchtrue(state, payload) {

    state.watchObj.push(payload)
  },
  buysuccess(state) {
    let listfalse = state.producelist.filter(item => !item.select)
    let listtrue = state.producelist.filter(item => item.select)
    state.producelist = []
    state.producelist.push(...listfalse)
    state.buyGoods.push(...listtrue)
  },
  deletecollectobj(state) {
    let list = state.collectObj.filter(item => !item.isCollect)
    state.collectObj = []
    state.collectObj.push(...list)
  },

  sub(state, item) {
    item.count--
  },
  add(state, item) {
    item.count++
  },
  isselect(state, item) {
    item.select = !item.select;
  },
  isCollect(state, item) {
    item.isCollect = !item.isCollect;
  },
  deleteitem(state, payload) {
    let index = state.producelist.findIndex(item => item.iid == payload.iid && item.sizee == payload.sizee && item.stylee == payload.stylee)
    state.producelist.splice(index, 1)
  },
  collectfalse(state, payload) {
    let index = state.collectObj.findIndex(item => item.iid == payload.iid && item.sizee == payload.sizee && item.stylee == payload.stylee)
    state.collectObj.splice(index, 1)
    // payload.isCollect = false
  },
  collecttrue(state, payload) {
    state.collectObj.push(payload)
  }
}



export default mutations