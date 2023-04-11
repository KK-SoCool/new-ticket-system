<template>
  <div class="UnTicketInfo">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/managerMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>车票信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <div class="showUnTicketInfo">
      <div class="container">
        <el-table
          :data="TicketMsg"
          height="450"
          border
          style="width: 100%"
          stripe
        >
          <el-table-column
            prop="ticketID"
            label="车票ID"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userID"
            label="购买用户"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="trainNum"
            label="车次"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="arriveStation"
            label="出发-到达站"
            width="130"
            align="center"
          >
          <template slot-scope="scope">
            <span v-html="scope.row.arriveStation"></span>
          </template>
          </el-table-column>
          <el-table-column
            prop="arriveTime"
            label="出发-到达时间"
            width="130"
            align="center"
          >
          <template slot-scope="scope">
            <span v-html="scope.row.arriveTime"></span>
          </template>
          </el-table-column>
          <el-table-column
            prop="sitNum"
            label="座位号"
            width="100"
            align="center"
          >
          <template slot-scope="scope">
            <span v-html="scope.row.sitNum"></span>
          </template>
          </el-table-column>
          <el-table-column
            prop="setOutdate"
            label="出发日期"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="refund">退票</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination class="pagination"
        small
        layout="prev, pager, next"
        :total="30">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'TicketMessage',
    data(){
        return{
            TicketMsg:[
                {
                    ticketID:'001',
                    userID:'001',
                    trainNum:'G001',
                    arriveStation:'北京<br>上海虹桥',
                    arriveTime:'12:00<br>16:00',
                    sitNum:'商务座<br>1排1A',
                    setOutdate:'2023-4-5'
                },
                {
                    ticketID:'001',
                    userID:'001',
                    trainNum:'G001',
                    arriveStation:'北京<br>上海虹桥',
                    arriveTime:'12:00<br>16:00',
                    sitNum:'商务座<br>1排1A',
                    setOutdate:'2023-4-5'
                },
                {
                    ticketID:'001',
                    userID:'001',
                    trainNum:'G001',
                    arriveStation:'北京<br>上海虹桥',
                    arriveTime:'12:00<br>16:00',
                    sitNum:'商务座<br>1排1A',
                    setOutdate:'2023-4-5'
                },
                {
                    ticketID:'001',
                    userID:'001',
                    trainNum:'G001',
                    arriveStation:'北京<br>上海虹桥',
                    arriveTime:'12:00<br>16:00',
                    sitNum:'商务座<br>1排1A',
                    setOutdate:'2023-4-5'
                },
            ]
        }
    },
    methods:{
      refund() {
      this.$confirm('此操作不可撤销，请问是否要执行退款的操作', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
    }
    },
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

.pagination{
    float: right;
    margin-right: 20px;
}
</style>