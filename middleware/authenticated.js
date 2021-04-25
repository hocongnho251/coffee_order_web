export default ({ store, route, redirect, error }) => {
  try {

    const no_auth = [
      "login"
    ].includes(route.name)
    
    const isLogged = store.getters.isLogged
    
    if (!isLogged && !no_auth) {
      return redirect("/login")
    }
  } catch (e) {
    return error({ statusCode: 404, message: "Page Not Found" })
  }
}
