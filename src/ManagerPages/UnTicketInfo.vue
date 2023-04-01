<template>
  <div class="UnTicketInfo">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/managerMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>退票信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <div class="showUnTicketInfo">
      <div class="container">
        <el-table
          :data="UnTicket"
          height="450"
          border
          style="width: 100%"
          stripe
        >
          <el-table-column
            prop="ticketID"
            label="车票ID"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userID"
            label="退票用户"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="refundedPrice"
            label="退票金额"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="refundedTime"
            label="退票时间"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text"
                >查看</el-button
              >
              <el-button type="text" @click="refund">退票</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnTicketInfo',
  data() {
    return {
      UnTicket: [
        {
          ticketID: '12345',
          userID: '666',
          refundedPrice: '65',
          refundedTime: '12:32'
        }
      ]
    }
  },
  methods: {
    refund() {
      this.$confirm('请确定是否同意该用户的退票', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退票成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
    }
  }
}
</script>

<style scoped>
.UnTicketInfo {
  float: right;
  width: 83%;
  height: 720px;
  background-color: #fff;
  border-radius: 0 0 20px 0;
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

.showUnTicketInfo {
  width: 100%;
}

.container {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}
</style>