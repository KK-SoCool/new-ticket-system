<template>
  <div class="Aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="goUserFirstPage">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="2" @click="goTicketPurchase">
        <i class="el-icon-shopping-cart-2"></i>
        <span slot="title">车票查询和购买</span>
      </el-menu-item>
      <el-menu-item index="3" @click="goTicketInfo">
        <i class="el-icon-tickets"></i>
        <span slot="title">订单信息</span>
      </el-menu-item>
      <el-menu-item index="4" @click="goPersonalInfo">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="5" @click="goPassengerInfo">
        <i class="el-icon-s-custom"></i>
        <span slot="title">乘车人信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'UserAside',
  methods: {
    goUserFirstPage() {
      this.$router.push('/userMainInterface/userFirstPage')
    },
    goTicketInfo() {
      this.$router.push('/userMainInterface/ticketInfo')
    },
    goTicketPurchase() {
      this.$router.push('/userMainInterface/ticketPurchase')
    },
    goPersonalInfo() {
      this.$router.push('/userMainInterface/personalInfo')
    },
    goPassengerInfo() {
      this.$router.push('/userMainInterface/passengerInfo')
    }
  }
}
</script>

<style scoped>
.Aside {
  float: left;
  width: 17%;
  height: 720px;
  /* background-color: #545c64; */
  border-radius: 0 0 0 20px;
}

.el-menu-vertical-demo {
  width: 100%;
  height: 100%;
  border-top: 1px solid #ffd04b;
  border-radius: 0 0 0 20px;
}
</style>