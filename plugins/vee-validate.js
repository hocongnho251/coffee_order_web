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
  message: "{_field_} is required",
})

extend("numeric", {
  ...numeric,
  message: "This field must only contain numeric characters",
})

extend("email", {
  ...email,
  message: "Please, input correct format of email",
})

extend("password", {
  validate(value) {
    return value.length >= 8
  },
  message: "Password must be more than 8 characters",
})

extend("tel", {
  validate(value) {
    return numeric.validate(value)
  },
  message: "Please, input correctly phone format",
})

extend("peX", {
  validate: (value) => {
    const temp = value.replaceAll("-","")
    let strValue = temp.toString()
    let firstStr = temp.slice(0, strValue.length - 2)
    let secondStr = temp.slice(strValue.length - 2, strValue.length)
    let toTal = 0
    for(let i = 0; i < firstStr.length; i++){
      if(Number(firstStr[i]) % 2 == 0){
        toTal += Number(firstStr[i])
      } else {
        toTal += Number(firstStr[i]) * 3
      }     
    }
    if((toTal % 11) !== Number(secondStr)){
      return {
        valid: false
      }
    } else {
      return {
        valid: true
      }
    }
  },
  message: "PeX account number is invalid"
})
