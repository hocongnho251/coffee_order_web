<template>
  <div>
    <v-container class="c-layout" :style="{'height': centerFillHeight? '90vh': undefined}">
      <v-row v-if="center" align="center" justify="center" :class="{'fill-height': centerFillHeight}">
        <v-col>
          <v-card width="720" class="mx-auto mt-3" flat>
            <slot />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    center: {
      type: Boolean,
      required: false,
      default: false
    },
    centerFillHeight: {
      type: Boolean,
      required: false,
      default: false
    },
  },
}
</script>

<style>
</style>
