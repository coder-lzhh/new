<template>
  <div id="tarBar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {}
};
</script>

<style  scoped>
#tarBar {
  display: flex;
  background: #f6f6f6;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
}
</style>