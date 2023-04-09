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
          :key="p.passengerCradNum"
        >
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              姓名
            </template>
            {{ p.passengerName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-menu"></i>
              证件类型
            </template>
            {{ p.passengerCardType }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-postcard"></i>
              证件号
            </template>
            {{ p.passengerCradNum }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script>
import AddPassengerDialog from './components/AddPassengerDialog.vue'

export default {
  name: 'PassengerInfo',
  components: { AddPassengerDialog },
  data() {
    return {
      size: '',
      dialogTitle: '请输入乘车人信息',
      dialogWidth: '35%',
      dialogHeight: '1000px',
      passengerInfo: [
        {
          passengerName: '爱铿',
          passengerCardType: '身份证',
          passengerCradNum: '441283200204294970'
        },
        {
          passengerName: 'ikun',
          passengerCardType: '粉丝证',
          passengerCradNum: '1234567891011121314'
        }
      ]
    }
  },
  methods: {
    addPassenger() {
      this.$bus.$emit('Show')
    },
    add(passengerObj) {
      this.passengerInfo.push(passengerObj)
    }
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