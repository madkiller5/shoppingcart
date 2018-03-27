<template>
  <div id="cart">
    <p>Koszyk</p>
    <p>Ilosc: {{quantity}}</p>
    <p>Razem: {{sum | price-convert}} zł</p>
  </div>
</template>

<script>
import { bus } from '../main'
export default {
  name: 'cart',
  data () {
    return {
      itemList: [],
      quantity: 0,
      sum: 0
    }
  },
  created() {
    bus.$on('addItem',data =>{
      this.itemList.push(data);
      this.quantity++;
      this.sum+=data.price.value*100;
    });
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cart{
  position: fixed;
  width: 200px;
  height: 100px;
  background-color: gold;
  border-radius: 15px;
  top:0;
  right: 0;
  margin: 10px;
  margin-left: auto;
  padding: 5px;
}
#cart p{
  margin: 10px;
}
</style>
