<template>
  <form @submit.prevent="confirmYourPassword">
    <div class="mb-4">
      <div class="mb-2">
        <label for="password" class="block">Password</label>
        <input type="password" name="password" id="password" v-model="form.password" class="border border-gray-400 py-1 px-2 rounded">
      </div>
    </div>
    <button type="submit" class="bg-gray-400 py-1 px-3 rounded">Confirm your password</button>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          password: '',
        }
      }
    },
    methods: {
      async confirmYourPassword () {
        try {
          await this.$axios.get('sanctum/csrf-cookie')
          await this.$axios.post('user/confirm-password', this.form)
          this.$router.replace({ name: this.$route.query.return || 'index' })
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>
