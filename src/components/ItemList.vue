<template>
  <div>
    <div>
      <el-row type="flex" justify="center">
        <h3 v-if="showSearchText">{{ keyWord }}</h3>
        <h3 v-else>Search Your Book</h3>
      </el-row>
      <el-row type="flex"  justify="center">
        <el-col :span="6">
          <el-input :icon="getInputIcon()" v-model="keyWord" @click="search(0)"
                    @keyup.enter.native="search(0)">
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
      keyWord: '',
      books: null,
      searching: false,
      total: 0,
      currentPage: 1,
      showSearchText: true
    }
  },

  computed: {
    totalNum: function () {
      if (this.total > 240) {
        return 240
      }
      return this.total
    }
  },

  methods: {
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

    search: function (page) {
      let startQuery = 'start=' + (page * 20)
      let queryStr = 'https://api.douban.com/v2/book/search?q=' +
                      this.keyWord + '&' + startQuery
      console.log(queryStr)
      this.searching = true
      this.$http.jsonp(queryStr)
      .then((response) => {
        this.books = response.body.books
        this.total = response.body.total
        this.currentPage = page
        this.searching = false
      }, (response) => {
        this.searching = false
      })
    },

    searchByWords: function (words) {
      this.keyWord = words
      this.search(0)
    },

    hoverImg: function () {
      console.log('hovering')
    },

    handleCurrentChange: function (val) {
      if (this.currentPage === val) {
        return
      }
      this.search(val)
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
