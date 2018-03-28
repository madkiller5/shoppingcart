<template>
  <div id="cart">
    <p>Koszyk</p>
    <p>Ilosc: {{quantity}}</p>
    <p>Razem: {{sum | price-convert | math-decimal}} zł</p>
    <ul>
      <li v-for="(item, index) in itemList" :key="index">{{item.name | firstLetterUpperCase }} {{item.price.value | math-decimal}} zł<span class="deleteSign"  v-on:click="deleteItem(item)"><font-awesome-icon icon="times-circle" /></span></li>
    </ul>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faCoffee } from '@fortawesome/fontawesome-free-solid'
import { bus } from '../main'

export default {
  name: 'cart',
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      itemList: [],
      quantity: 0,
      sum: 0
    }
  },
  methods:{
    deleteItem: function(item){
      this.sum-= item.price.value*100;
      this.itemList.splice(this.itemList.indexOf(item),1);
      this.quantity--;
      bus.$emit('returnItem',item);
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
  box-sizing: border-box;
  opacity: 0.5;
  position: fixed;
  width: 300px;
  background: radial-gradient(rgb(140, 189, 140),rgb(47, 88, 47));
  border-radius: 15px;
  top:0;
  right: 0;
  margin-left: auto;
  padding: 5px;
}
#cart:hover{
  opacity: 1.0;
}
#cart p{
  margin: 10px;
}
#cart p:first-child{
  font-weight: bold;
}
.deleteSign{
  cursor: pointer;
  float: right;
  margin-right: 20px;
}
ul{
  box-sizing: border-box;
  overflow: scroll;
  display: none;
  height: 200px;
  text-align: left;
}
#cart:hover ul{
  display: block;
}
</style>
