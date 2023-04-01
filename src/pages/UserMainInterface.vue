<template>
  <div class="container">
    <div class="wrap">
      <UserHeader />
      <UserAside />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import UserFirstPage from '../UserComponents/UserFirstPage.vue'
import UserAside from '../UserComponents/UserAside.vue'
import UserHeader from '../UserComponents/UserHeader.vue'
export default {
  name: 'UserMainInterface',
  components: {
    UserHeader,
    UserAside,
    UserFirstPage
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