<template>
  <div class="detail" v-if="book" transition name="fade">
    <el-row class="row-bg">
      <el-col :span="8">
        <img :src="book.images.large" alt="pic">
        <h3>{{ book.title }}</h3>
        <h4>{{ book.subtitle }}</h4>
        <h5>{{ book.author }}</h5>
      </el-col>
      <el-col :span="16">
        <div class="info">
          <div>页数: {{ book.pages }}</div>
          <div>出版社: {{ book.publisher }}</div>
          <div>作者信息: {{ book.author_intro }}</div>
          <div>售价: {{ book.price }}</div>
          <div>ISBN10: {{ book.isbn10 }}</div>
          <div>ISBN13: {{ book.isbn13 }}</div>
        </div>
      </el-col>
    </el-row>

    <hr>
    <el-row>
      <el-col :span="22" :offset="1">
        <strong>{{ book.summary }}</strong>
      </el-col>
    </el-row>

    <el-row v-for="annotation in annotations">
      <hr>
      <el-col :span="4">
        <div>
          <!-- <div>{{ annotation }}</div> -->
          <div>{{ annotation.author_user.name }}</div>
          <div>
            <router-link :to="'/users/' + annotation.author_user.id">
              <img :src="annotation.author_user.avatar" alt="avatar">
            </router-link>
          </div>
          <div>{{ annotation.time }}</div>
        </div>
      </el-col>
      <el-col :span="20">
        <div>{{ annotation.summary }}</div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      book: null,
      annotations: []
    }
  },

  mounted: function () {
    this.$http.jsonp('https://api.douban.com/v2/book/' + this.$route.params.id)
    .then((response) => {
      this.book = response.body
      // console.log(response)
    }, (response) => {
    })
    this.$http.jsonp('https://api.douban.com/v2/book/' + this.$route.params.id + '/annotations')
    .then((response) => {
      this.annotations = response.body.annotations
      console.log(this.annotations)
    }, (response) => {
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.info {
  padding-top: 25%;
  padding-bottom: 25%;
}
</style>
