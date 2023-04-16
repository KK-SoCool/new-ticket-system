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
            prop="startTime"
            label="起始时间"
            width="100"
            align="center"
            :formatter="formatStartDate"
          >
          </el-table-column>
          <el-table-column
            prop="sstStationName"
            label="起始车站"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="到达时间"
            width="100"
            align="center"
            :formatter="formatEndDate"
          >
          </el-table-column>
          <el-table-column
            prop="estStationName"
            label="终点车站"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="trainCode"
            label="动车代码"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="座位" width="150" align="center">
            <template slot-scope="scope">
              {{
                scope.row.seatName +
                ' ' +
                scope.row.carNumber +
                '车' +
                ' ' +
                scope.row.seatNumber +
                '号'
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="purchasePrice"
            label="票价"
            width="70"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="passengerName"
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
                :disabled="scope.row.isRefunded > 0 ? true : false"
                v-text="scope.row.isRefunded > 0 ? '已退票' : '退票'"
              ></el-button>
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
      isResh: true,
      userTicketTable: [],
      disabled: false,
      reason: '无',
      trainIds: []
    }
  },
  methods: {
    formatStartDate(row, column) {
      // 获取单元格数据
      let data = row[column.property]
      if (data == null) {
        return null
      }
      let dt = new Date(data)
      return (
        dt.getFullYear() +
        '-' +
        (dt.getMonth() + 1) +
        '-' +
        dt.getDate() +
        ' ' +
        dt.getHours() +
        ':' +
        dt.getMinutes() +
        ':' +
        dt.getSeconds()
      )
    },
    formatEndDate(row, column) {
      // 获取单元格数据
      let data = row[column.property]
      if (data == null) {
        return null
      }
      let dt = new Date(data)
      return (
        dt.getFullYear() +
        '-' +
        (dt.getMonth() + 1) +
        '-' +
        dt.getDate() +
        ' ' +
        dt.getHours() +
        ':' +
        dt.getMinutes() +
        ':' +
        dt.getSeconds()
      )
    },
    loadData(data) {
      const params = new URLSearchParams()
      params.append('ticketId', data.ticketId)
      params.append('reason', this.reason)
      axios.post('/api/ticketSale', params).then((res) => {
        this.userTicketTable = res.data.data
      })
    },
    getTicketInfo() {
      axios.get('/api/ticketSale/getUserTicket').then((res) => {
        this.userTicketTable = res.data.data
        console.log(this.userTicketTable)
      })
    },
    isRefund(data) {
      console.log(data)
      this.$confirm('此操作将提交退票申请, 是否继续?', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = new URLSearchParams()
          params.append('ticketId', data.ticketId)
          params.append('reason', this.reason)
          axios.post('/api/ticketSale', params).then((res) => {
            console.log(res.data.code)
            console.log(res.data.description)
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: '已提交退票申请!'
              })
              this.loadData(data)
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
