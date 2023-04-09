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
          <el-table-column prop="ID" label="ID" width="50" align="center">
          </el-table-column>
          <el-table-column
            prop="originTime"
            label="起始时间"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="originStation"
            label="起始车站"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="finalTime"
            label="到达时间"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="finalStation"
            label="到达车站"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="trainCode"
            label="车型车次（动车代码）"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="seatType"
            label="座次"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="seatNum"
            label="座位号"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template>
              <el-button type="text" @click="isRefund" :disabled="disabled"
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
export default {
  name: 'TicketInfo',

  data() {
    return {
      userTicketTable: [
        {
          ID: 1,
          originTime: '15:39',
          originStation: '广州',
          finalTime: '16:50',
          finalStation: '深圳',
          trainCode: 'G6804',
          seatType: '一等座',
          seatNum: '0812A'
        }
      ],
      disabled: false
    }
  },
  methods: {
    isRefund() {
      this.$confirm('此操作将提交退票申请, 是否继续?', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.disabled = true
          this.$message({
            type: 'success',
            message: '已提交退票申请!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退票'
          })
        })
    }
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