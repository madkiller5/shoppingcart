<template>
  <div id="wish">
    <p>Wishlista</p>
    <ul>
      <li v-for="item in itemList">{{item.name | firstLetterUpperCase}} <span class="deleteSign"  v-on:click="deleteItem(item)"><font-awesome-icon icon="times-circle" /></span></li>
    </ul>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faCoffee } from '@fortawesome/fontawesome-free-solid'
import { bus } from '../main'


export default {
  name: 'wish',
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      itemList: [],
    }
  },
  methods:{
    deleteItem: function(item){
      this.itemList.splice(this.itemList.indexOf(item),1);
    }
  },
  created() {
    bus.$on('addWish',data =>{
      if(this.itemList.indexOf(data) == -1)
        this.itemList.push(data);
    });
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wish{
  opacity: 0.5;
  position: fixed;
  width: 200px;
  background: radial-gradient(rgb(140, 141, 189),rgb(47, 54, 88));
  border-radius: 15px;
  top:0;
  right: 0;
  margin-left: auto;
  margin-right: 300px;
  padding: 5px;
}
#wish:hover{
  opacity: 1.0;
}
#wish p{
  margin: 10px;
}
#wish p:first-child{
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
#wish:hover ul{
  display: block;
}
</style>
