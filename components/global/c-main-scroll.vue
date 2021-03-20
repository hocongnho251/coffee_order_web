<template>
  <div
    id="scroller"
    class="overflow-y-auto overflow-x-hidden"
    :style="appBarHeight > 0 ? mainStyle : null"
  >
    <div :style="appBarHeight > 0 ? mainContentStyle : null">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    appBarHeight() {
      return this.$vuetify.application.top
    },
    mainStyle() {
      return {
        height: `calc(100vh - ${this.appBarHeight}px)`,
      }
    },
    mainContentStyle() {
      return {
        minHeight: `calc(100vh - ${this.appBarHeight}px)`,
      }
    },
  }
}
</script>

<style>
</style>
