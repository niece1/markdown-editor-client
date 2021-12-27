<template>
  <form @submit.prevent="login">
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
        
      </div>
    </div>

    <button type="submit" class="bg-gray-400 py-1 px-3 rounded">
      Login
    </button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async login () {
      try {
        await this.$auth.loginWith('laravelSanctum', {
          data: this.form
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>