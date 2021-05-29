import { extend, setInteractionMode } from "vee-validate"
import {
  required,
  numeric,
  email,
} from "vee-validate/dist/rules"

setInteractionMode("custom", (context) => {
  if (context.value === null || context.value === "") {
    return {
      on: [],
    }
  }
  //
  if (context.errors.length) {
    return {
      on: ["input", "change"],
    }
  }

  return {
    on: ["change", "blur"],
  }
})

extend("required", {
  ...required,
  message: "Yêu cầu nhập {_field_}",
})

extend("numeric", {
  ...numeric,
  message: "{_field_} chỉ chứa số",
})

extend("email", {
  ...email,
  message: "Hãy nhập đúng định dạng email",
})

extend("password", {
  validate(value) {
    return value.length >= 6
  },
  message: "Mật khẩu trên 6 kí tự",
})

extend("tel", {
  validate(value) {
    return numeric.validate(value)
  },
  message: "Please, input correctly phone format",
})

extend("min", {
  validate(value) {
    return value > 0
  },
  message: "Số lượng phải lớn hơn 0",
})

