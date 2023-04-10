<template>
  <div class="Aside">
    <el-menu
      :default-active="activerouter"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        index="/managerMainInterface/managerFirstPage"
        @click="goManagerFirstPage"
      >
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item
        index="/managerMainInterface/ticketMessage"
        @click="goTicketMessage"
      >
        <i class="el-icon-shopping-cart-2"></i>
        <span slot="title">车票信息</span>
      </el-menu-item>
      <el-menu-item
        index="/managerMainInterface/unTicketInfo"
        @click="goUnTicketInfo"
      >
        <i class="el-icon-s-ticket"></i>
        <span slot="title">退票订单</span>
      </el-menu-item>
      <el-menu-item
        index="/managerMainInterface/stationManagement"
        @click="goStationManagement"
      >
        <i class="el-icon-location-information"></i>
        <span slot="title">车站管理</span>
      </el-menu-item>
      <el-menu-item
        index="/managerMainInterface/trainmanagement"
        @click="goTrainManagement"
      >
        <i class="el-icon-truck"></i>
        <span slot="title">列车管理</span>
      </el-menu-item>
      <el-menu-item
        index="/managerMainInterface/seatTypeManagement"
        @click="goSeatTypeManagement"
      >
        <i class="el-icon-user"></i>
        <span slot="title">座位管理</span>
      </el-menu-item>
      <el-menu-item
        index="/managerMainInterface/usermessage"
        @click="goUserMessage"
      >
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户信息管理</span>
      </el-menu-item>
      <el-menu-item
        index="/managerMainInterface/personalcenter"
        @click="goPersonalCenter"
      >
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'ManagerAside',
  data() {
    return {
      activerouter: ''
    }
  },
  methods: {
    goManagerFirstPage() {
      this.$router
        .push('/managerMainInterface/managerFirstPage')
        .catch((err) => {})
    },
    goUnTicketInfo() {
      this.$router.push('/managerMainInterface/unTicketInfo').catch((err) => {})
    },
    goTicketMessage() {
      this.$router
        .push('/managerMainInterface/ticketMessage')
        .catch((err) => {})
    },
    goStationManagement() {
      this.$router
        .push('/managerMainInterface/stationManagement')
        .catch((err) => {})
    },
    goTrainManagement() {
      this.$router
        .push('/managerMainInterface/trainmanagement')
        .catch((err) => {})
    },
    goUserMessage() {
      this.$router.push('/managerMainInterface/usermessage').catch((err) => {})
    },
    goSeatTypeManagement() {
      this.$router
        .push('/managerMainInterface/seatTypeManagement')
        .catch((err) => {})
    },
    goPersonalCenter() {
      this.$router
        .push('/managerMainInterface/personalcenter')
        .catch((err) => {})
    }
  },
  mounted() {
    this.activerouter = this.$route.path
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