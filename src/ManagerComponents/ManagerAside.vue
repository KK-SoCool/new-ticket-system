<template>
  <div class="Aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="goManagerFirstPage">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="2">
        <i class="el-icon-shopping-cart-2"></i>
        <span slot="title">车票信息</span>
      </el-menu-item>
      <el-menu-item index="3" @click="goUnTicketInfo">
        <i class="el-icon-s-ticket"></i>
        <span slot="title">退票订单</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'ManagerAside',
  methods: {
    goManagerFirstPage() {
      this.$router.push('/managerMainInterface/managerFirstPage')
    },
    goUnTicketInfo() {
      this.$router.push('/managerMainInterface/unTicketInfo')
    }
  }
}
</script>

<style scoped>
.Aside {
  float: left;
  width: 17%;
  height: 720px;
  border-radius: 0 0 0 20px;
}

.el-menu-vertical-demo {
  width: 100%;
  height: 100%;
  border-top: 1px solid #ffd04b;
  border-radius: 0 0 0 20px;
}
</style>