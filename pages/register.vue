<template>
  <form @submit.prevent="register">
    <div class="mb-4">
      <div class="mb-2">
        <label for="name" class="block">Name</label>
        <input type="text" name="name" id="name" v-model="form.name" class="border border-gray-400 py-1 px-2 rounded">
      </div>
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
    <button type="submit" class="bg-gray-400 py-1 px-3 rounded">Register</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
    async register () {
      try {
        await this.$axios.get('sanctum/csrf-cookie')
        await this.$axios.post('register', this.form)
        await this.$auth.loginWith('laravelSanctum', {
          data: { email: this.form.email, password: this.form.password }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
