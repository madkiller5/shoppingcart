<template>
  <div id="app">
    <CartComponent></CartComponent>
    <router-view/>
  </div>
</template>

<script>
import CartComponent from './components/cartComponent'
export default {
  name: 'App',
  components:{
    CartComponent,
  }
}
</script>

<style>
#app{
  text-align: center;
}

</style>
