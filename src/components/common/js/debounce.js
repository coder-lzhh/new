export function debounce(fun, delay) {

  let timer = null
  return function () {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      console.log("xxxxx")
      fun.apply(this)
    }, delay);

  }
}