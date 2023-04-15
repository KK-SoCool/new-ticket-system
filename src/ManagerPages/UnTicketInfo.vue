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
          v-loading='loading'
          :data="UnTicket"
          height="450"
          border
          style="width: 100%"
          stripe
        >
          <el-table-column
            prop="ticketInfo.ticketId"
            label="车票ID"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userId"
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
<!--              <el-button type="text" @click="refund">退票</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="pagination"
        small
        layout="prev, pager, next"
        :total="30">
      </el-pagination>
    </div>
    <UnTicketComponent
        v-if="showDialog"
        ref="unTicketComponent"
        :dialog-title="dialogTitle"
        :item-info="unTicketItem"
        @closeDialog="closeDialog"
    ></UnTicketComponent>
  </div>
</template>

<script>
import UnTicketComponent from '../ManagerComponents/UnTicketComponent'
import axios from 'axios'
export default {
  name: 'UnTicketInfo',
  components:{UnTicketComponent},
  data() {
    return {
      loading : true,
      showDialog: false,
      dialogTitle:'',
      UnTicket: [],
      unTicketItem:[]
    }
  },
  mounted() {
    this.loading = true
    this.getUnticketInfo()
  },
  methods: {
    async getUnticketInfo(){
      await axios
        .get('/api/refunded/getAll')
        .then(res => {
          this.UnTicket = res.data.data
          console.log(this.UnTicket)
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleClick(row){
      this.unTicketItem = row
      this.dialogTitle = "查看车票"
      this.showDialog = true
      this.$nextTick(() => {
      this.$refs["unTicketComponent"].showDialog = true
      });
      },

    closeDialog(flag) {
          if (flag) {
            // 重新刷新表格内容
            // this.fetchData();
          }
          this.showDialog = false;
      },

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

.pagination{
    float: right;
    margin-right: 20px;
}
</style>