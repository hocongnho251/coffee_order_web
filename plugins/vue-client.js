import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
export default ({ }, inject) => {

  const notyf = new Notyf()
  inject('notyf', notyf)

}
