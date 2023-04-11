<template>
  <div class="container">
    <div class="wrap">
      <ManagerHeader />
      <MangerAside />
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>

<script>
import ManagerHeader from '../ManagerComponents/ManagerHeader.vue'
import MangerAside from '../ManagerComponents/ManagerAside.vue'
export default {
  name: 'ManagerMainInterface',
  components: {
    ManagerHeader,
    MangerAside
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  width: 80%;
  height: 800px;
  margin: 0 auto;
  margin-top: 50px;
  border-radius: 20px;
  background-color: #fff;
}

.wrap {
  width: 100%;
}
</style>