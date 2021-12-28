export default function ({ $axios, redirect, app }) {
  $axios.onResponse(response => {
    if (response.data.two_factor === true) {
      redirect({ name: 'two-factor-challenge' })
    }
  })

  $axios.onError(error => {
    if (error.response.status === 423) {
      redirect({ name: 'confirm-password', query: { return: app.router.currentRoute.name } })
    }
  })
}
