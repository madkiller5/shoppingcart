<template>
  <div id="shoppingList">
    <div class="item" v-for="(item,index) in itemsList" :key="index">
      <p v-on:click="hideItem(item)" class="hideButton"><font-awesome-icon icon="times-circle" /></p>
      <img :src="'../../static/products/'+ item.image" >
      <p>Produkt: {{ item.name | firstLetterUpperCase}}</p>
      <p class="price" v-bind:class="{special: ifSpecial(item)}">Cena: {{ item.price.value | math-decimal }} zł</p>
      <button class="addCartButton" @click="addCart(item)" :disabled="!isAvailable(item)"><font-awesome-icon icon="plus-circle" /> Add to cart</button>
      <button class="addWishlistButton" @click="addWish(item)"><font-awesome-icon icon="plus-circle" /> Add to wishlist</button>
      <p class="notAvailable" v-if="!isAvailable(item)">Item not available</p>
      <p class="available" v-else>Item available</p>
      <p class="details">Browar: {{ item.brewery }}</p>
      <p class="details">Gatunek: {{ item.species }}</p>
      <p class="details">Słód: {{ item.malts }}</p>
      <p class="details">Chmiel: {{ item.hop }}</p>
      <p class="details">Kraj pochodzenia: {{ item.origin }}</p>
      <p class="details">Smak: {{ item.flavours }}</p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { bus } from '../main'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faCoffee } from '@fortawesome/fontawesome-free-solid'


export default {
  name: 'shoppingList',
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      itemsList: []
    }
  },
  methods:{
    hideItem: function(item){
      this.itemsList.splice(this.itemsList.indexOf(item),1);
    }, 
    addCart: function(item){
      this.itemsList[this.itemsList.indexOf(item)].quantity--;
      bus.$emit('addItem',item);
    },
    addWish: function(item){
      bus.$emit('addWish',item);
    },
    isAvailable: function(item){
      return this.itemsList[this.itemsList.indexOf(item)].quantity>0 ? true : false;
    },
    ifSpecial: function(item){
      return this.itemsList[this.itemsList.indexOf(item)].price.type == "special" ? true : false;
    }
  },
  created(){
    bus.$on('returnItem',(item)=>{
      this.itemsList[this.itemsList.indexOf(item)].quantity++;
    });

    let dbRef = firebase.database().ref();
    let value = dbRef.on('value', snap => {

      var data=snap.val();
      var products=data.products;

      var parser = function(values,list){
        values=values.split('|');
        list=list.split('|');
        var ret = "";
        for(let i=0;i<values.length;i++){
          ret += list[parseInt(values[i])-1]+", ";
        }
        return ret.slice(0,-2);
      };
      for(let id=0;id<products.length;id++){
        let newItem={
          sku: data.products[id].sku,
          name: data.products[id].name,
          image: data.products[id].image,
          quantity: data.products[id].quantity,
          price: data.products[id].price,
          brewery: data.attributesIdValue[0].split("|")[parseInt(data.products[id].attributes[0])-1],
          species: data.attributesIdValue[1].split("|")[parseInt(data.products[id].attributes[1])-1],
          malts: parser(data.products[id].attributes[2],data.attributesIdValue[2]),
          hop: parser(data.products[id].attributes[3],data.attributesIdValue[3]),
          origin: data.attributesIdValue[4].split("|")[parseInt(data.products[id].attributes[4])-1],
          flavours: parser(data.products[id].attributes[5],data.attributesIdValue[5]),
        };
        this.itemsList.push(newItem);
      };
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#shoppingList{
  display: table;
  width: 100%;
  text-align: center;
  overflow-x: scroll;
}
p{
  margin: 5px;
  font-size: 15px;
}
p:nth-child(2n+6){
  background-color: gray;
}
.item{
  border-spacing: 20px;
  display: inline-block; 
  margin: 10px;
  background: radial-gradient(rgb(172, 172, 172),rgb(197, 197, 197));
  text-align: center;
  width: 300px;
  padding: 10px;
  
}
.item > img{
  padding: 5px 30px 5px 30px;
  border-radius: 15px;
  background-color: rgba(184, 212, 238, 0.596);
}
.hideButton{
  right: 0;
  margin-left: auto;
  cursor: pointer;
  width: 10px;
}
.addCartButton{
  background: radial-gradient(rgb(140, 189, 140),rgb(47, 88, 47));
  width:inherit;
}
.addWishlistButton{
  background: radial-gradient(rgb(140, 141, 189),rgb(47, 54, 88));
  width: inherit;
}
button{
  font-size: 10px;
  font-weight: bold;
  padding: 5px;
}
.available{
  font-weight: bold;
  color: rgb(0, 82, 0);
}
.notAvailable{
  font-weight: bold;
  color:red;
}
.special{
  background-color: yellow;
  border-radius: 15px;
}
.details{
  text-align: left;
}
.price{
  padding: 20px;
}

</style>
