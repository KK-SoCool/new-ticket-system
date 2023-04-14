<template>
  <div class="passengerInfo">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/userMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>乘车人信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <AddPassengerDialog
      :title="dialogTitle"
      :width="dialogWidth"
      :height="dialogHeight"
      :add="add"
    />
    <div class="showPassengerInfo">
      <div class="container">
        <div>
          <h3>乘车人信息</h3>
          <el-button type="primary" @click="addPassenger">添加</el-button>
        </div>
        <el-descriptions
          class="margin-top"
          :column="3"
          :size="size"
          border
          v-for="p in passengerInfo"
          :key="p.id"
        >
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              姓名
            </template>
            {{ p.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-menu"></i>
              证件类型
            </template>
            {{ p.type }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-postcard"></i>
              证件号
            </template>
            {{ p.number }}
            <el-button type="danger" plain @click="deletePassenger(p.id)"
              >删除</el-button
            >
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script>
import AddPassengerDialog from './components/AddPassengerDialog.vue'
import axios from 'axios'

export default {
  name: 'PassengerInfo',
  components: { AddPassengerDialog },
  data() {
    return {
      userID: null,
      size: '',
      dialogTitle: '请输入乘车人信息',
      dialogWidth: '35%',
      dialogHeight: '1000px',
      passengerInfo: []
    }
  },
  methods: {
    judgeCardType(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].type === 1) {
          list[i].type = '护照'
        } else {
          list[i].type = '身份证'
        }
      }
    },
    getUserID() {
      this.userID = this.$store.state.userID
      this.userID = this.userID - 0
    },
    getPassengerInfo() {
      this.getUserID()
      // console.log(this.userID)
      // console.log(typeof this.userID)
      axios
        .get('/api/passenger', {
          params: {
            id: this.userID
          }
        })
        .then((res) => {
          // console.log(res.data.code)
          this.passengerInfo = res.data.data
          this.judgeCardType(this.passengerInfo)
          if (this.passengerInfo.length === 0) {
            this.$message({
              message: '查不到乘车人信息，请添加'
            })
          }
        })
    },
    addPassenger() {
      this.$bus.$emit('Show')
    },

    //添加乘车人方法，push之后调用judgeCardType遍历数组改变value值
    add(passengerObj) {
      this.passengerInfo.push(passengerObj)
      this.judgeCardType(this.passengerInfo)
    },

    //删除乘车人信息
    deletePassenger(id) {
      //弹框确认是否删除
      this.$confirm('此操作将删除该乘车人信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        //点确定后运行
        .then(() => {
          console.log(id)
          axios.delete('/api/passenger/' + id).then((res) => {
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败'
              })
            }
          })
        })

        //点取消后运行
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  mounted() {
    this.getPassengerInfo()
  }
}
</script>

<style scoped>
.passengerInfo {
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

.showPassengerInfo {
  width: 100%;
}

.container {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

button {
  float: right;
}

h3 {
  float: left;
  margin: 0;
}

.margin-top {
  margin-bottom: 15px;
}
</style>
