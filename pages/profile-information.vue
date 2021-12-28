<template>
  <form @submit.prevent="updateProfileInformation">
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
        <nuxt-link :to="{ name: 'delete' }">Delete account</nuxt-link>
      </div>
    </div>
    <button type="submit" class="bg-gray-400 py-1 px-3 rounded">Update</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: this.$auth.user.name,
        email: this.$auth.user.email,
      }
    }
  },
  methods: {
    async updateProfileInformation () {
      try {
        await this.$axios.get('sanctum/csrf-cookie')
        await this.$axios.put('user/profile-information', this.form)
        await this.$auth.fetchUser()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
