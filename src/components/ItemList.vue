<template>
  <div>
    <div>
      <el-row type="flex" justify="center">
        <h3 v-if="showSearchText">{{ inputWord }}</h3>
        <h3 v-else>Search Your Book</h3>
      </el-row>
      <el-row type="flex"  justify="center">
        <el-col :span="6">
          <el-input :icon="getInputIcon()" v-model="inputWord" @click="searchByWords(inputWord)"
                    @keyup.enter.native="searchByWords(inputWord)">
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex"  justify="center">
        <el-col :span="2">
          <el-switch
            v-model="showSearchText"
            on-text="on"
            off-text="off">
          </el-switch>
        </el-col>
      </el-row>
    </div>

    <el-row type="flex">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next"
        :page-size="20"
        :total="totalNum">
      </el-pagination>
    </el-row>
    <el-row justify="start" align="start" v-for="book in books" v-if="books">
      <Item :book="book" :key="book.id" v-on:tagClicked="searchByWords($event)">
      </Item>
    </el-row>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  name: 'ItemList',
  components: {
    Item
  },

  data () {
    return {
      inputWord: '',
      keyWord: '',
      books: null,
      searching: false,
      total: 0,
      currentPage: 1,
      showSearchText: true
    }
  },
  watch: {
    '$route': 'onQueryChange'
  },

  computed: {
    totalNum: function () {
      if (this.total > 240) {
        return 240
      }
      return this.total
    }
  },

  mounted: function () {
    if (this.$route.query.q) {
      this.inputWord = this.$route.query.q
    }
    this.onQueryChange()
  },

  methods: {
    onQueryChange: function () {
      if (!this.$route.query.q) {
        return
      }

      if (this.$route.query.q.trim() === '') {
        return
      }

      let keyWord = this.$route.query.q

      let page = 1
      if (this.$route.query.page) {
        page = Number(this.$route.query.page)
      }
      this.search(page, keyWord)
    },
    getInputIcon: function () {
      if (this.searching === false) {
        return 'search'
      }
      return 'loading'
    },

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

    searchToQuery: function (page, keyWord) {
      this.$router.push({ path: 'books',
        query: { q: keyWord, page: page } })
    },

    search: function (page, keyWord) {
      let truePage = page - 1
      let startQuery = 'start=' + (truePage * 20)
      let queryStr = 'https://api.douban.com/v2/book/search?q=' +
                      keyWord + '&' + startQuery
      this.searching = true
      this.$http.jsonp(queryStr)
      .then((response) => {
        this.books = response.body.books
        this.total = response.body.total
        this.currentPage = page
        this.keyWord = keyWord
        this.searching = false
      }, (response) => {
        this.searching = false
      })
    },

    searchByWords: function (keyWord) {
      this.searchToQuery(1, keyWord)
    },

    hoverImg: function () {
      console.log('hovering')
    },

    handleCurrentChange: function (val) {
      // console.log(typeof (val))
      if (this.currentPage === val) {
        return
      }
      if (val < 0) {
        return
      }
      this.searchToQuery(val, this.keyWord)
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
