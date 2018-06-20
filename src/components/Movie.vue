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
  // 服务器端预取数据
  asyncData ({ store }) {
    return store.dispatch('FETCH_MOVIES')
  },
  computed: {
    movies () {
      return this.$store.state.movies
    }
  },
  // 客户端预取数据
  beforeMount () {
    this.$store.dispatch('FETCH_MOVIES')
  }
}
</script>

<style scoped>

</style>
