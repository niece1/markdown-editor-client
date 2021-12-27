<template>
  <ul class="flex items-center mb-6 -mx-2">
    <li><nuxt-link :to="{ name: 'index' }" class="px-2">Home</nuxt-link></li>

    <template v-if="$auth.loggedIn">
      <li><nuxt-link :to="{ name: 'profile-information' }" class="px-2">{{ $auth.user.name }}</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'admin' }" class="px-2">Admin</nuxt-link></li>
      <li><a href="#" class="px-2" @click.prevent="logout">Log out</a></li>
    </template>

    <template v-if="!$auth.loggedIn">
      <li><nuxt-link :to="{ name: 'login' }" class="px-2">Login</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'register' }" class="px-2">Register</nuxt-link></li>
    </template>
  </ul>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.replace({ name: 'index' })
    }
  }
}
</script>