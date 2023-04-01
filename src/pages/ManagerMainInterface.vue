<template>
  <div class="container">
    <div class="wrap">
      <ManagerHeader />
      <MangerAside />
      <router-view></router-view>
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