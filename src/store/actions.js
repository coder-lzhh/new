const actions = {



  addCart(context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {

      let produce = context.state.producelist.find(item => item.iid == payload.iid && item.sizee == payload.sizee && item.stylee == payload.stylee)
      if (produce) {
        let num = payload.count;
        context.commit('addcount', [produce, num])
        resolve("商品成功加一")
      } else {
        context.commit('addproduce', payload)
        resolve("加入购物车成功")
      }
    })

  },

  collect(context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {

      let produce = context.state.collectObj.find(item => item.iid == payload.iid)
      if (produce) {
        resolve("取消收藏")
        context.commit('collectfalse', produce)
      } else {
        resolve("收藏成功")

        context.commit('collecttrue', payload)
      }
    })

  },
  watch(context, payload) {
    return new Promise((resolve, reject) => {
      let produce = context.state.watchObj.find(item => item.iid == payload.iid)
      if (!produce) {
        resolve("浏览成功")
        context.commit('watchtrue', payload)
      }
    })
  },
  buygoods(context) {
    return new Promise((resolve, reject) => {

      context.commit('buysuccess')
      resolve("结算成功")

    })
  }



}
export default actions