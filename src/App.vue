<template>
  <div id="app">
    <WishComponent></WishComponent>
    <CartComponent></CartComponent>
    <router-view/>
  </div>
</template>

<script>
import CartComponent from './components/cartComponent';
import WishComponent from './components/wishComponent';

export default {
  name: 'App',
  components:{
    CartComponent,
    WishComponent
  }
}
</script>

<style>
body{
  background-color: lavender;
  margin: 0px;
  padding: 0px;
}
#app{
  text-align: center;
}

</style>
