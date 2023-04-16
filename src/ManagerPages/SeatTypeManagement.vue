<template>
  <div class="UnTicketInfo">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/managerMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>座位管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <el-button type="primary" @click="addItem" size="mini" class="addbutton"
    >添加座位类型
    </el-button>
    <div class="showUnTicketInfo">
      <div class="container">
        <el-table
          v-loading='loading'
          :data="seatList"
          height="450"
          border
          style="width: 100%"
          stripe
        >
          <el-table-column
            prop="name"
            label="座位类型"
            width="160"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="description"
            label="座位描述"
            width="600"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text"
                >修改</el-button
              >
              <el-button type="text" @click="refund(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <SeatTypeComponent
          v-if="showDialog"
          ref="SeatTypeComponent"
          :dialog-title="dialogTitle"
          :item-info="seatItem"
          @closeDialog="closeDialog"
        ></SeatTypeComponent>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SeatTypeComponent from '@/ManagerComponents/SeatTypeComponent.vue'
export default {
  name: 'SeatType',
  inject:['reload'],
  components: { SeatTypeComponent },
  data() {
    return {
      loading:true,
      seatList: [],
      input: '',
      showDialog: false,
      dialogTitle: '添加座位类型',
      seat: {
        id: '',
        name: '',
        description: ''
      },
      seatItem: {}
    }
  },
  mounted() {
    this.getSeatList()
    this.loading = true
  },
  methods: {
    async getSeatList() {
      await axios
        .get('/api/seat/admin')
        .then((res) => {
          this.seatList = res.data.data
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },

    addItem() {
      this.seatItem = {
        name: '',
        description: ''
      }
      this.dialogTitle = '添加座位类型'
      this.showDialog = true
      this.$nextTick(() => {
      this.$refs['SeatTypeComponent'].showDialog = true
      })
    },

    handleClick(row) {
      this.seatItem = row
      this.dialogTitle = '编辑座位'
      this.showDialog = true
      this.$nextTick(() => {
      this.$refs['SeatTypeComponent'].showDialog = true
      })
    },
    closeDialog(flag) {
      if (flag) {
        // 重新刷新表格内容
        //this.getSeatList()
        this.reload()
      }
      this.showDialog = false
    },
    refund(id) {
      console.log()
      this.$confirm('此操作不可撤销，请问是否要删除该座位类型', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          axios
            .delete('/api/seat/admin', {
              params: {
                id: id
              }
            })
            .then(() => {
              this.reload()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(error=> {
            console.log(error)
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

.addbutton {
  float: right;
  margin-right: 20px;
  margin-bottom: 10px;
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

.pagination {
  float: right;
  margin-right: 20px;
}
</style>