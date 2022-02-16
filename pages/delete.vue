<template>
  <form @submit.prevent="deleteAccount">
    <button type="submit" class="bg-gray-400 py-1 px-3 rounded">Delete</button>
  </form>
</template>

<script>
  export default {
    methods: {
      async deleteAccount () {
        try {
        // we are under api namespace so we don't need to use csrf cookie
        // api/ route is excluded from csrf protection
        await this.$axios.delete('api/user')
        await this.$auth.logout()
        this.$router.replace({ name: 'index' })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
