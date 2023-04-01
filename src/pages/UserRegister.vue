<template>
  <div class="wrap">
    <div class="loginTitle">注册</div>
    <form action="">
      <div class="registerInfo">
        <div class="userName">
          <i class="el-icon-s-custom"></i>
          <input type="text" placeholder="请输入用户名" v-model="userName" />
        </div>
        <div class="passWord">
          <i class="el-icon-lock"></i>
          <input
            type="password"
            placeholder="请输入密码"
            v-model="passWord"
            @keyup="checkErrPassword"
          />
        </div>
        <div class="rewritePassword">
          <i class="el-icon-lock"></i>
          <input
            type="password"
            placeholder="请再次输入密码"
            v-model="rewritePassword"
            @keyup="checkErrRewritePassword"
          />
        </div>
        <el-alert
          class="err"
          :class="classErrObj"
          title="两次输入的密码不相同！"
          type="error"
          center
          show-icon
        >
        </el-alert>
      </div>
      <div class="tips">
        <router-link :to="{ name: 'denglu' }"
          >已经有账号了？点击登录</router-link
        >
      </div>
      <div class="submit">
        <input type="submit" class="button" value="立即注册" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserRegister',
  data() {
    return {
      userName: '',
      userIDNumber: '',
      passWord: '',
      rewritePassword: '',
      classErrObj: {
        hideErr: true
      }
    }
  },
  methods: {
    checkErrRewritePassword(e) {
      if (e.target.value === this.passWord) {
        this.classErrObj.hideErr = true
      } else {
        this.classErrObj.hideErr = false
      }
    },
    checkErrPassword(e) {
      if (e.target.value === this.rewritePassword) {
        this.classErrObj.hideErr = true
      } else {
        this.classErrObj.hideErr = false
      }
    }
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

.userName,
.passWord,
.rewritePassword {
  width: 300px;
  height: 50px;
  line-height: 50px;
  padding: 0 5px;
  margin: 30px auto;
  border: 1px solid #f2e8e8;
  border-radius: 25px;
  background-color: #f2e8e8;
}

.registerInfo input {
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

.registerInfo input:focus {
  border-bottom: 2px solid rgba(141, 201, 241, 0.879);
}

i {
  display: inline-block;
  margin-left: 20px;
  margin-right: 10px;
}

.tips {
  height: 36px;
  line-height: 36px;
  margin-top: -10px;
  margin-bottom: 20px;
}

.tips a {
  position: relative;
  display: inline-block;
  text-decoration: none;
  top: -1px;
  left: 130px;
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

.err {
  height: 28px;
  margin-bottom: 10px;
}

.hideErr {
  display: none;
}
</style>