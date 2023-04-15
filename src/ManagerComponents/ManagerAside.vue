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
        <i class="el-icon-cpu"></i>
        <span slot="title">车次管理</span>
      </el-menu-item>
      <el-menu-item
        index="/managerMainInterface/seatTypeManagement"
        @click="goSeatTypeManagement"
      >
        <i class="el-icon-user"></i>
        <span slot="title">座位管理</span>
      </el-menu-item>
      <el-menu-item
        index="/managerMainInterface/traintypemessage"
        @click="goTrainTypeMessage"
      >
        <i class="el-icon-truck"></i>
        <span slot="title">动车类型</span>
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
    goTrainTypeMessage() {
      this.$router.push('/managerMainInterface/traintypemessage')
        .catch((err) => {})
    },
    goSeatTypeManagement() {
      this.$router
        .push('/managerMainInterface/seatTypeManagement')
        .catch((err) => {})
    },
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