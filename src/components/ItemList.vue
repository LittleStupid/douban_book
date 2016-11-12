<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <h1>{{ keyWord }}</h1>
        <el-input :icon="getInputIcon()" v-model="keyWord" @click="search" @keyup.enter.native="search">
        </el-input>
      </el-col>
    </el-row>

    <el-row justify="start" align="start" v-for="book in books">
      <el-col :span="2" >
        <img :src='book.images.small'>
      </el-col>
      <el-col :span="4" :offset="0">
        <h4>{{ book.title }}</h4>
        <el-tooltip class="item" effect="light" :content="trimInfo(book.author_intro)" placement="bottom-end">
          <el-button size="mini" v-for="author in book.author" :plain="true" type="success">
            {{ author | trimText(16) }}
          </el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="4" :offset="0">
        <el-tooltip v-for="tag in book.tags" class="item" effect="light" :content="tag.name" placement="bottom-end">
          <el-button size="mini" :plain="true" type="info">
            {{ tag.name | trimText(10) }}
          </el-button>
        </el-tooltip>
        <h4 v-show="book.tags.length==0">没有信息</h4>
      </el-col>
      <el-col :span="4" :offset="0">
        <small>{{ book.summary | trimText(64) }}</small>
      </el-col>
      <el-col :span="4" :offset="0">
        <div><small>出版日期:{{ book.pubdate }}</small></div>
        <div><small>出版社:{{ book.publisher }}</small></div>
        <div><small>定价:{{ book.price }}</small></div>
        <!-- <div><small>系列:{{ book.series.title }}</small></div> -->
      </el-col>
      <el-col :span="4">
          <!-- {{ book.rating.average }} -->
        <h5>{{book.rating.numRaters}}个人评价了这本书</h5>
        <el-rate
          v-model="book.rating.average"
          :max="10"
          disabled
          show-text
          text-color="#ff9900"
        >
        </el-rate>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// import Item from './Item'

export default {
  name: 'ItemList',

  data () {
    return {
      keyWord: '',
      books: [],
      searching: false
    }
  },

  methods: {
    getInputIcon: function () {
      if (this.searching === false) {
        return 'search'
      }
      return 'loading'
    },

    search: function () {
      this.searching = true
      this.$http.jsonp('https://api.douban.com/v2/book/search?q=' + this.keyWord)
      .then((response) => {
        this.books = response.body.books
        console.log(response)
        this.searching = false
      }, (response) => {
        this.searching = false
      })
    },

    hoverImg: function () {
      console.log('hovering')
    },

    trimInfo: function (info) {
      if (info && (info.length > 2)) {
        return info
      }

      return 'No Info'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
