<template>
  <form @submit.prevent="sendForgotYourPasswordEmail">
    <div class="mb-4">
      <div class="mb-2">
        <label for="email" class="block">Email</label>
        <input type="text" name="email" id="email" v-model="form.email" class="border border-gray-400 py-1 px-2 rounded">
      </div>
    </div>

    <button type="submit" class="bg-gray-400 py-1 px-3 rounded">Recover password</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
      }
    }
  },
  methods: {
    async sendForgotYourPasswordEmail () {
      try {
        await this.$axios.get('sanctum/csrf-cookie')
        await this.$axios.post('forgot-password', this.form)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
