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
    <div class="showPassengerInfo">
      <div class="container">
        <el-descriptions
          class="margin-top"
          title="乘车人信息"
          :column="3"
          :size="size"
          border
        >
          <template slot="extra">
            <el-button type="primary" size="small">添加</el-button>
          </template>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              姓名
            </template>
            {{ passengerName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-menu"></i>
              证件类型
            </template>
            {{ passengerCardType }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-postcard"></i>
              证件号
            </template>
            {{ passengerCradNum }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PassengerInfo',
  data() {
    return {
      size: '',
      passengerName: '爱铿',
      passengerCardType: '身份证',
      passengerCradNum: '441283200204294970'
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
</style>