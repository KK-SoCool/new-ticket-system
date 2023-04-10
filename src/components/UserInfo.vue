<template>
  <div class="userInfo">
    <div class="userName">
      <i class="el-icon-user"></i>
      <input type="text" v-model="userAccount" placeholder="请输入用户名" />
    </div>
    <div class="userPassword">
      <i class="el-icon-unlock"></i>
      <input type="password" v-model="userPassword" placeholder="请输入密码" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      userAccount: '',
      userPassword: ''
    }
  },
  methods: {
    JudgePermission() {
      if (this.userAccount == 1 && this.userPassword == 1) {
        this.$router.replace('/managerMainInterface')
      } else if (this.userAccount == 2 && this.userPassword == 2) {
        this.$router.replace('/userMainInterface')
      }
    },
    sendUsername() {
      this.$store.commit('CHANGENAME', this.userAccount)
    }
  },
  mounted() {
    this.$bus.$on('Login', this.JudgePermission)
    this.$bus.$on('SendUserName', this.sendUsername)
  }
}
</script>

<style scoped>
.userInfo .userName,
.userInfo .userPassword {
  width: 300px;
  height: 50px;
  line-height: 50px;
  padding: 0 5px;
  margin: 30px auto;
  border: 1px solid #f2e8e8;
  border-radius: 25px;
  background-color: #f2e8e8;
}

.userInfo input {
  height: 30px;
  width: 220px;
  font-size: 16px;
  position: relative;
  top: -1px;
  /* left: 25px; */
  vertical-align: center;
  border: none;
  border-bottom: 2px solid rgba(198, 198, 190, 0.797);
  background-color: #f2e8e8;
  outline: none;
}

.userInfo input:focus {
  border-bottom: 2px solid rgba(141, 201, 241, 0.879);
}

i {
  display: inline-block;
  margin-left: 20px;
  margin-right: 10px;
}
</style>