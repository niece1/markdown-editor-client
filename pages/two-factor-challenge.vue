<template>
  <form @submit.prevent="twoFactorChallenge">
    <div class="mb-4">
      <div class="mb-2">
        <label for="code" class="block">Code</label>
        <input type="text" name="code" id="code" v-model="form.code" class="border border-gray-400 py-1 px-2 rounded">
      </div>
      <div class="mb-2">
        <nuxt-link :to="{ name: 'two-factor-challenge-recovery' }">Or enter a recovery code</nuxt-link>
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
        code: ''
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
