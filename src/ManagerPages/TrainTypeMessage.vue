<template>
  <div class="UnTicketInfo">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/managerMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>动车类型</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <el-button type="primary" @click="addItem" size="mini" class="addbutton"
    >添加列车
    </el-button>
    <div class="showUnTicketInfo">
      <div class="container">
        <el-table
          v-loading='loading'
          :data="TrainTypeMsg"
          height="450"
          border
          style="width: 100%"
          stripe
        >
          <el-table-column
            prop="name"
            label="动车类型"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="code"
            label="动车类型代码"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="firstSeatNum"
            label="一等座座位数"
            width="130"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="secondSeatNum"
            label="二等座座位数"
            width="130"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="thirdSeatNum"
            label="三等座座位数"
            width="130"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text"
                >修改</el-button
              >
              <el-button type="text" @click="refund(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <TrainTypeComponent
        v-if="showDialog"
        ref="trainTypeComponent"
        :dialog-title="dialogTitle"
        :item-info="trainTypeItem"
        @closeDialog="closeDialog"
    ></TrainTypeComponent>
  </div>
</template>

<script>
import TrainTypeComponent from '../ManagerComponents/TrainTypeComponent.vue'
import axios from 'axios'
export default {
  inject:['reload'],
  name: 'TrainMessage',
  components: { TrainTypeComponent },
  data() {
    return {
      loading:true,
      showDialog: false,
      TrainTypeMsg: [],
      trainTypeItem: {}
    }
  },

  mounted() {
    this.loading=true
    this.getTrainTypeMessage()
  },

  methods: {
    addItem() {
      this.trainTypeItem = {
        name: '',
        code: '',
        description: '',
        firstSeatTypeId: '',
        firstSeatNum: '',
        secondSeatTypeId: '',
        secondSeatNum: '',
        thirdSeatTypeId: '',
        thirdSeatNum: ''
      }
      this.dialogTitle = '添加列车'
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['trainTypeComponent'].showDialog = true
      })
    },

    handleClick(row) {
      this.trainTypeItem = row
      this.dialogTitle = "修改信息"
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs["trainTypeComponent"].showDialog = true
      });
    },

    async getTrainTypeMessage() {
      await axios
        .get('/api/trainType/admin/all')
        .then(res => {
          this.TrainTypeMsg = res.data.data
          this.loading=false
        })
        .catch(error => {
          console.log(error)
        })
    },

    closeDialog(flag) {
      if (flag) {
        // 重新刷新表格内容
        // this.fetchData();
        this.reload()
      }
      this.showDialog = false;
    },

    refund(id) {
      this.$confirm('此操作不可撤销，请问是否要删除该用户', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          axios.delete('/api/trainType/admin',{
            params:{
              id : id
            }
          }).then(res =>{
            if (res.data.code === 0){
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.reload()
            }
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

.addbutton {
    float: right;
    margin-right: 20px;
    margin-bottom: 10px;
}

.pagination{
    float: right;
    margin-right: 20px;
}
</style>