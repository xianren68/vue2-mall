<template>
  <div class="home">
    <TypeNav></TypeNav>
  <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <!-- <Floor></Floor> -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from "./Rank"
import Like from "./Like"
import Floor from "./Floor"
import Brand from "./Brand"
import {mapState} from 'vuex'
export default {
  name:"Home",
  components:{
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
      ...mapState({
        floorList:(state)=> state.home.floorList  
      })
  },
  mounted() {
    this.$store.dispatch("getFloor")
    this.$store.dispatch("getUserInfo")
  },
}
</script>

<style>

</style>