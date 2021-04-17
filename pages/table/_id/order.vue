<template>
  <h2>Order</h2>
</template>

<script>
export default {
  data(){
    return {
      orders: []
    }
  },
  mounted(){
    this.getOrderList()
  },
  methods: {
    async getOrderList(){
      const id = this.$route.params.id;
      try {
      } catch (error) {
        this.$notyf.error({
          message: error,
          icon: false,
          dismissible: true
        });
      }
    }
  }

}
</script>

<style>


</style>