<template>
  <div class="ticketInfo">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/userMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>订单信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <div class="showUserTicket">
      <div class="container">
        <el-table
          :data="userTicketTable"
          height="500"
          border
          style="width: 100%"
          stripe
        >
          <el-table-column
            prop="ticketInfo.trainInfoDO.startTime"
            label="起始时间"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ticketInfo.startStation.stationName"
            label="起始车站"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ticketInfo.trainInfoDO.endTime"
            label="到达时间"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ticketInfo.endStation.stationName"
            label="终点车站"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ticketInfo.trainTypeDO.trainCode"
            label="动车代码"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ticketInfo.seatTypeDO.seatName"
            label="座位类型"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="purchasePrice"
            label="票价"
            width="70"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="passengerDO.passengerName"
            label="乘车人"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template v-slot="scope">
              <el-button
                type="text"
                @click="isRefund(scope.row)"
                :disabled="disabled"
                >退票</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TicketInfo',

  data() {
    return {
      userTicketTable: [],
      disabled: false,
      reason: '无'
    }
  },
  methods: {
    getTicketInfo() {
      axios.get('/api/ticketSale/getAll').then((res) => {
        this.userTicketTable = res.data.data
      })
    },
    isRefund(data) {
      this.$confirm('此操作将提交退票申请, 是否继续?', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = new URLSearchParams()
          params.append('saleId', data.saleId)
          params.append('reason', this.reason)
          axios.put('/api/ticketSale', params).then((res) => {
            console.log(res.data.code)
            console.log(res.data.description)
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: '已提交退票申请!'
              })
            } else {
              this.$message({
                type: 'warning',
                message: '退票失败!' + res.data.description
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退票'
          })
        })
    }
  },
  mounted() {
    this.getTicketInfo()
  }
}
</script>

<style scoped>
.ticketInfo {
  float: right;
  width: 83%;
  height: 720px;
  background-color: #fff;
  border-radius: 0 0 20px 0;
  margin: 0;
}

.Breadcrumb {
  width: 100%;
  height: 50px;
}

.Breadcrumb .biaoqian {
  margin-top: 25px;
  margin-left: 35px;
  font-size: 18px;
}

.showUserTicket {
  width: 100%;
}

.container {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}
</style>
