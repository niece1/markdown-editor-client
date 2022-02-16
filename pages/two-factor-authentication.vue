<template>
  <div>
    <template v-if="$auth.user.two_factor_enabled">
      <div v-if="qrCode" v-html="qrCode" class="mb-2"></div>
      <ul v-if="recoveryCodes" class="mb-4">
        <li v-for="(code, index) in recoveryCodes" :key="index">{{ code }}</li>
      </ul>
      <form @submit.prevent="disableTwoFactorAuthentication">
        <button type="submit" class="bg-gray-400 py-1 px-3 rounded">Disable two factor authentication</button>
      </form>
    </template>
    <template v-if="!$auth.user.two_factor_enabled">
      <form @submit.prevent="enableTwoFactorAuthentication">
        <button type="submit" class="bg-gray-400 py-1 px-3 rounded">Enable two factor authentication</button>
      </form>
    </template>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        qrCode: null,
        recoveryCodes: null
      }
    },
    methods: {
      async enableTwoFactorAuthentication () {
        await this.$axios.get('sanctum/csrf-cookie')
        await this.$axios.post('user/two-factor-authentication')
        await this.$auth.fetchUser()
        this.qrCode = (await this.$axios.get('user/two-factor-qr-code')).data.svg
        this.getRecoveryCodes()
      },
      async disableTwoFactorAuthentication () {
        await this.$axios.delete('user/two-factor-authentication')
      //make sure we use auth to grab the user's info back
      await this.$auth.fetchUser()
    },
    async getRecoveryCodes () {
      this.recoveryCodes = (await this.$axios.get('user/two-factor-recovery-codes')).data
    }
  },
  async mounted () {
    if (this.$auth.user.two_factor_enabled) {
      this.getRecoveryCodes()
    }
  }
}
</script>
