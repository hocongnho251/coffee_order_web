<template>
  <div>
    <div class="c-table__item">
      <h2 class="white--text display-2 font-weight-black">{{ item.name }}</h2>
    </div>
    <div>
      <v-btn
        class="c-button"
        block
        :color="isEmpty ? '#F8EFE5' : '#AEB5B2'"
        @click.stop="onChange(item)"
      >
        {{ isEmpty ? "Trống" : "Khách" }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isEmpty() {
      if (this.item.status == "waiting") return true;
      return false;
    }
  },
  methods: {
    onChange(item){
      if(this.isEmpty){
        this.$router.push({name: 'table-id-order', params: {id: item.name}, query: {key: item.key}})
      } else {
        this.$router.push({name: 'table-id-bill', params: {id: item.name}, query: {key: item.key}})
      }
    }
  }
};
</script>

<style>
.c-table__item {
  background-color: #f0623d;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: 0px;
}

.c-button {
  border: 2px solid #f0623d !important;
  border-radius: 12px;
}
</style>
