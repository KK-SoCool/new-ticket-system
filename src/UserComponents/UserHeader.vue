<template>
  <div class="header">
    <h2>215-12306</h2>
    <h2 class="hello">早上好！UserName。欢迎使用火车售票系统！</h2>
    <el-avatar :size="50" :src="circleUrl" class="block"></el-avatar>
    <div class="goOut" @click="exit">退出登录</div>
  </div>
</template>

<script>
export default {
  name: 'UserHeader',
  data() {
    return {
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    exit() {
      this.$router.push({ name: 'denglu' })
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 80px;
  border-radius: 20px 20px 0 0;
  background-color: #545c64;
}

h2 {
  float: left;
  width: 150px;
  height: 100%;
  color: #fff;
  text-align: center;
  line-height: 80px;
  margin: 0;
  margin-left: 20px;
}

.hello {
  width: 550px;
  margin-left: 10%;
}

.goOut {
  float: right;
  height: 100%;
  width: 100px;
  line-height: 80px;
  margin-right: 20px;
  text-align: center;
  color: #fff;
  /* font-size: 16px; */
  cursor: pointer;
}

.goOut:hover {
  background-color: #36363c;
  color: #ffd04b;
}

.block {
  float: right;
  margin-right: 20px;
  margin-top: 15px;
}
</style>