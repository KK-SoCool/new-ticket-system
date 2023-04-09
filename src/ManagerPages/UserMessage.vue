<template>
  <div class="UnTicketInfo">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/managerMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <div class="showUnTicketInfo">
      <div class="container">
        <el-table
          :data="UserMsg"
          height="450"
          border
          style="width: 100%"
          stripe
        >
          <el-table-column
            prop="userID"
            label="用户ID"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userAccount"
            label="用户名"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userPassword"
            label="用户密码"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户姓名"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userAuthority"
            label="用户权限"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text"
                >修改</el-button
              >
              <el-button type="text" @click="refund">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <UserMessageComponent
        v-if="showDialog"
        ref="userMessageComponent"
        :dialog-title="dialogTitle"
        :item-info="stationItem"
        @closeDialog="closeDialog"
    ></UserMessageComponent>
    <el-pagination class="pagination"
        small
        layout="prev, pager, next"
        :total="30">
    </el-pagination>
  </div>
</template>

<script>
import UserMessageComponent from '../ManagerComponents/UserMessageComponent.vue'
export default {
  name: 'UserMessage',
  components:{UserMessageComponent},
  data() {
    return {
      showDialog: false,
      UserMsg: [
        {
            userID:'666',
            userAccount:'haha',
            userPassword:'123456',
            userName:'欧阳',
            userAuthority:'用户'
        }
      ]
    }
  },
  methods: {
    handleClick(row){
      this.stationItem = row
      this.dialogTitle = "用户信息"
      this.showDialog = true
      this.$nextTick(() => {
      this.$refs["userMessageComponent"].showDialog = true
      });
      },

    closeDialog(flag) {
          // if (flag) {
          //   // 重新刷新表格内容
          //   this.fetchData();
          // }
          // this.showDialog = false;
      },

    refund() {
      this.$confirm('此操作不可撤销，请问是否要删除该用户', '注意', {
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