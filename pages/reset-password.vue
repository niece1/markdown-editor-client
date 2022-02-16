<template>
  <form @submit.prevent="resetPassword">
    <div class="mb-4">
      <div class="mb-2">
        <label for="email" class="block">Email</label>
        <input type="text" name="email" id="email" v-model="form.email" class="border border-gray-400 py-1 px-2 rounded">
      </div>
      <div class="mb-2">
        <label for="password" class="block">Password</label>
        <input type="password" name="password" id="password" v-model="form.password" class="border border-gray-400 py-1 px-2 rounded">
      </div>
      <div class="mb-2">
        <label for="password_confirmation" class="block">Password confirmation</label>
        <input type="password" name="password_confirmation" id="password_confirmation" v-model="form.password_confirmation" class="border border-gray-400 py-1 px-2 rounded">
      </div>
    </div>
    <button type="submit" class="bg-gray-400 py-1 px-3 rounded">Update password</button>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        form: {
        email: this.$route.query.email || '', //email from query
        password: '',
        password_confirmation: '',
        token: this.$route.query.token || ''
      }
    }
  },
  methods: {
    async resetPassword () {
      try {
        await this.$axios.get('sanctum/csrf-cookie')
        await this.$axios.post('reset-password', this.form)
        this.$router.replace({ name: 'login' })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
