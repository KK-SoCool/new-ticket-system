<template>
  <div class="loginFooter">
    <div class="tips">
      <input type="checkbox" />
      <span>记住密码</span>
      <router-link replace :to="{ name: 'zhuce' }"
        >还没有账号？点击注册</router-link
      >
    </div>
    <div class="submit">
      <input
        type="submit"
        value="登录"
        class="button"
        @click="goUserMainInterface"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginFooter',
  methods: {
    goUserMainInterface() {
      this.$bus.$emit('SendUserName')
      this.$store.commit('JUDGETIME', this.nowHours)
      this.$bus.$emit('PostUserInfo')
    },
  },
  computed: {
    nowHours() {
      var date = new Date()
      var h = date.getHours()
      return h
    }
  }
}
</script>

<style scoped>
.loginButton {
  position: relative;
  width: 300px;
  height: 50px;
  left: 80px;
}

.tips {
  /* border: 1px solid #ddd; */
  height: 36px;
  line-height: 36px;
  margin-bottom: 20px;
}

.tips input {
  display: inline-block;
  margin-left: 80px;
  margin-right: 10px;
}

.tips span {
  position: relative;
  top: -1px;
}

.tips a {
  position: relative;
  display: inline-block;
  text-decoration: none;
  top: -1px;
  left: 50px;
}

.submit .button {
  position: relative;
  width: 300px;
  height: 50px;
  background-color: #0d94f5;
  border: 1px solid #0d94f5;
  color: #fff;
  border-radius: 10px;
  left: 75px;
}

.submit .button:hover {
  cursor: pointer;
  background-color: #0d94f5b5;
}
</style>