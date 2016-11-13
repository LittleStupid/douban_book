<template>
  <el-row class="row-bg">
    <el-col :span="4">
      <div>
        <a :href="info.alt">
          <img :src="info.large_avatar" alt="avatar">
        </a>
      </div>
      <div>{{ info.name }}@{{ info.loc_name }}</div>
      {{ info.created }}
    </el-col>
    <el-col :span="4">
      <div>{{ info.signature }}</div>
      <hr>
      <div>{{ info.desc }}</div>
    </el-col>
    <!-- <el-col :span="8">
      {{ info }}
    </el-col> -->
  </el-row>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      info: null
    }
  },

  mounted: function () {
    this.$http.jsonp('https://api.douban.com/v2/user/' + this.$route.params.id)
    .then((response) => {
      this.info = response.body
      console.log(response)
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
</style>
