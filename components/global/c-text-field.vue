<template>
  <div>
    <ValidationProvider
      v-slot="{ errors }"
      :vid="label"
      :name="label"
      :rules="rules"
    >
      <v-text-field
        :value="value"
        :readonly="readonly"
        :type="inputType"
        outlined
        class="input"
        :disabled="disabled"
        solo
        flat
        :placeholder="placeholder"
        :error-messages="errors[0]"
        @input="$emit('input', $event)"
        v-on="$listeners"
      >
      </v-text-field>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate"
export default {
  components: {
    ValidationProvider
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    outlined: {
      type: Boolean,
      default: true
    },
    rules: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      showPassword: false
    }
  },
  computed: {
    inputType() {
      return this.password ? "password" : "text"
    }
  },

  watch: {},

  methods: {
  }
}
</script>

<style lang="scss"></style>
