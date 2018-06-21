<template>
  <div id="us">
    <h4>北美票房榜</h4>
    <ol>
      <li v-for="movie in movies" :key="movie.rank" @click="show(movie.subject.title)">
        {{movie.subject.title}}-{{movie.subject.rating.average}}分
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'US',
  // 服务器端预取数据
  asyncData ({ store }) {
    return store.dispatch('FETCH_US')
  },
  methods: {
    show (title) {
      console.log(title)
    }
  },
  computed: {
    movies () {
      return this.$store.state.us_box
    }
  },
  // 客户端预取数据
  beforeMount () {
    this.$store.dispatch('FETCH_US')
  }
}
</script>
