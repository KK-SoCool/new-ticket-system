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
import axios from 'axios'
export default {
  name: 'UserInfo',
  data() {
    return {
      userAccount: '',
      userPassword: ''
    }
  },
  methods: {
    sendUsername() {
      this.$store.commit('CHANGENAME', this.userAccount)
    },
    postUserInfo() {
      axios
        .post('/api/user/login', {
          account: this.userAccount,
          password: this.userPassword
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            if (res.data.data.authority === 1) {
              this.$store.commit('CHANGEID',res.data.data.id)
              this.$router.replace('/managerMainInterface')
            } else if (res.data.data.authority === 0) {
              this.$store.commit('CHANGEID',res.data.data.id)
              this.$router.replace('/userMainInterface')
            }
          } else if (res.data.code === 40001) {
            this.$message({
              message: '登录失败，密码错误',
              type: 'warning'
            })
          } else if (res.data.code === 40004) {
            this.$message({
              message: '登录失败，账户名不存在',
              type: 'warning'
            })
          } else {
            this.$message({
              message: '登录失败，请检查账户和密码是否有误',
              type: 'warning'
            })
          }
        })
    }
  },
  mounted() {
    this.$bus.$on('SendUserName', this.sendUsername)
    this.$bus.$on('PostUserInfo', this.postUserInfo)
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