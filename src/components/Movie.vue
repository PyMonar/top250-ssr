<template>
  <div id="movie">
    <h4>豆瓣TOP250</h4>
    <ol>
      <li v-for="movie in movies" :key="movie.id" @click="show(movie.title)">
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
  methods: {
    show (title) {
      console.log(title)
    }
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
