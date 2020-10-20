<template>
  <div v-show="isshow" class="toast">{{ message }}</div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return { isshow: false, message: "" };
  },
  created() {},
  computed: {},
  methods: {
    show(message, time = 1000) {
      this.isshow = true;
      this.message = message;

      setTimeout(() => {
        this.isshow = false;
        this.message = "";
      }, time);
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
.toast {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  padding: 20px;
  color: white;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
}
</style>