<template>
  <div>
    <!-- <h1>{{ bknm }}</h1> -->
    <h2>{{ author }}</h2>
  </div>
</template>

<script>
export default {
  name: 'item',
  props: ['author'],

  data () {
    return {
      bknm: 'bknm'
    }
  },

  mounted: function () {
    this.$http.jsonp('https://api.douban.com/v2/book/1220562')
    .then((response) => {
      this.bknm = response.body.summary
    }, (response) => {
    })
  },
  computed: {
    comment () {
      // console.log(this.$http)
      return 'COMMENT'
    }
  }
}
</script>

<style>
</style>
