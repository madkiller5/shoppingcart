<template>
  <div id="shoppingList">
    <div v-for="item in itemsList" class="item">
      <p v-on:click="hideItem(item)" class="hideButton">X</p>
      <img :src="'../../static/products/'+ item.image" >
      <p>Produkt: {{item.name}}</p>
      <p>Cena: {{ item.price.value }}</p>
      <button class="addCartButton" @click="addCart(item)">Add to cart</button>
      <button class="addWishlistButton">Add to wishlist</button>
    </div>
    
  </div>
</template>

<script>
import firebase from 'firebase'
import { bus } from '../main'

export default {
  name: 'shoppingList',
  data () {
    return {
      itemsList: []

    }
  },
  methods:{
    hideItem: function(id){
      this.itemsList.splice(this.itemsList.indexOf(id),1);
    }, 
    addCart: function(item){
      bus.$emit('addItem',item);
    }
  },
  created(){
    let dbRef = firebase.database().ref();
    let value = dbRef.on('value', snap => {this.itemsList = snap.val().products;console.log(snap.val().products);});
    window.addEventListener('scroll', (data)=>{
       console.log(window.scrollY);
    });
  },
  computed: {
    quantity: function() {
      return this.itemsList.length;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#shoppingList{
  width: 100%;
  height: 500px;
  overflow: scroll;
}
p{
  margin: 5px;
}
.item{
  border-radius: 15px;
  margin: 10px;
  background-color: rgb(201, 201, 201);
  text-align: center;
  width: 200px;
  padding: 10px;
  display: inline-block;
}
.item > img{
  margin: 10px;
  border-radius: 15px;
  background-color: rgba(184, 212, 238, 0.596);
}
.hideButton{
  text-align: right;
  cursor: pointer;
}
.hideButton p{
  text-align: right;

}
.addCartButton{
  background: radial-gradient(rgb(140, 189, 140),rgb(47, 88, 47));
}
.addWishlistButton{
  background: radial-gradient(rgb(140, 141, 189),rgb(47, 54, 88));
}
button{
  font-weight: bold;
  padding: 5px;
}

</style>
