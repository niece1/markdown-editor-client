export default function ({ $axios, redirect, app }) {
  $axios.onError(error => {
    if (error.response.status === 423) {
      redirect({ name: 'confirm-password', query: { return: app.router.currentRoute.name } })
    }
  })
}
