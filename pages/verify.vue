<template>
  <div>
    <p class="mb-4">You need to verify your email to visit Admin page.</p>
    <form @submit.prevent="resendEmailVerification">
      <button type="submit" class="bg-gray-400 py-1 px-3 rounded">Resend email</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    async resendEmailVerification () {
      await this.$axios.post('email/verification-notification')
    }
  }
}
</script>
