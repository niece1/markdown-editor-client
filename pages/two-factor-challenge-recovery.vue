<template>
  <form @submit.prevent="twoFactorChallenge">
    <div class="mb-4">
      <div class="mb-2">
        <label for="recovery_code" class="block">Recovery code</label>
        <input type="text" name="recovery_code" id="recovery_code" v-model="form.recovery_code" class="border border-gray-400 py-1 px-2 rounded">
      </div>
    </div>
    <button type="submit" class="bg-gray-400 py-1 px-3 rounded">Submit code</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        recovery_code: ''
      }
    }
  },
  methods: {
    async twoFactorChallenge () {
      try {
        await this.$axios.get('sanctum/csrf-cookie')
        await this.$axios.post('two-factor-challenge', this.form)
        await this.$auth.fetchUser()
        this.$router.replace({ name: 'index' })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
