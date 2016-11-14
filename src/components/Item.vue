<template>
  <div>
    <el-col :span="2" >
      <router-link :to="'/books/' + book.id">
        <img :src='book.images.small'>
      </router-link>
      <h4>{{ book.title }}</h4>
    </el-col>
    <el-col :span="4">
      <el-tooltip class="item" effect="light" :content="getBookAuthorIntro(book)" placement="bottom-end">
        <el-button size="mini" v-for="author in book.author" :plain="true" type="success" @click='tagClicked(author)'>
          {{ author | trimText(16) }}
        </el-button>
      </el-tooltip>
    </el-col>
    <el-col :span="4" :offset="0">
      <el-tooltip v-for="tag in book.tags" class="item" effect="light" :content="tag.name" placement="bottom-end">
        <el-button size="mini" :plain="true" type="info" @click="tagClicked(tag.name)">
          {{ tag.name | trimText(10) }}
        </el-button>
      </el-tooltip>
      <h4 v-show="book.tags.length==0">没有信息</h4>
    </el-col>
    <el-col :span="4">
      <small>{{ book.summary | trimText(64) }}</small>
    </el-col>
    <el-col :span="4">
      <el-tooltip v-if="book.series" class="item" effect="light" :content="book.series.title" placement="bottom-end">
        <el-button size="mini" :plain="true" type="success" @click='tagClicked(book.series.title)'>
          {{ book.series.title | trimText(8) }}<!-- ({{ book.series.id }}) -->
        </el-button>
      </el-tooltip>
      <div><small>出版日期:{{ book.pubdate }}</small></div>
      <div><small>出版社:{{ book.publisher }}</small></div>
      <div><small>定价:{{ book.price }}</small></div>
    </el-col>
    <el-col :span="6">
      <h5>{{book.rating.numRaters}}个人评价了这本书</h5>
      <h5>评分:{{book.rating.average}}</h5>

      <!-- <el-rate v-model="(book.rating.average)" :max="10" disabled
               show-text text-color="#ff9900">
      </el-rate> -->
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'detail',
  props: ['book'],

  methods: {
    getBookSeriesTitle: function (book) {
      if (!book) {
        return '无'
      }

      if (!book.series) {
        return '无'
      }

      if (!book.series.title) {
        return '无'
      }

      return book.series.title
    },

    getBookAuthorIntro: function (book) {
      if (!book) {
        return '无'
      }

      if (!book.author_intro) {
        return '无'
      }

      if (book.author_intro.length <= 1) {
        return '无'
      }

      return book.author_intro
    },

    tagClicked: function (value) {
      this.$emit('tagClicked', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
