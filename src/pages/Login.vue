<template>
  <div class="wrap">
    <form action="">
      <div class="loginTitle">欢迎来到火车售票系统</div>
      <UserInfo></UserInfo>
      <LoginFooter></LoginFooter>
    </form>
  </div>
</template>

<script>
import LoginFooter from '../components/LoginFooter.vue'
import UserInfo from '../components/UserInfo.vue'
export default {
  name: 'Login',
  components: {
    LoginFooter,
    UserInfo
  }
}
</script>

<style scoped>
.wrap {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
}

.loginTitle {
  width: 300px;
  height: 40px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
}
</style>