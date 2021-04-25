<template>
  <ValidationObserver ref="observer">
    <form :disabled="disabled" :readonly="readonly" @submit.prevent="submit">
      <slot />
      <slot name="action" />
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate"
export default {
  components: {
    ValidationObserver
  },

  props: {
    submitColor: {
      type: String,
      default: "primary"
    },
    submitText: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.$emit("submit")
      }
    }
  }
}
</script>

<style></style>
