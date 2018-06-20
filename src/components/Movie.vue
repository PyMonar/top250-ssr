<template>
  <div id="movie">
    <ol>
      <li v-for="movie in movies" :key="movie.id">
        {{movie.title}}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  computed: {
    movies () {
      return this.$store.state.movies
    }
  },
  created () {
    this.$store.dispatch('FETCH_MOVIES')
  }
}
</script>

<style scoped>

</style>
