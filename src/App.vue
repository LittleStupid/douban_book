<template>
  <div id="app">
    <ItemList></ItemList>
  </div>
</template>

<script>
import Hello from './components/Hello'
import ItemList from './components/ItemList'

export default {
  name: 'app',
  components: {
    Hello,
    ItemList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
