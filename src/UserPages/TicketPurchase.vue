<template>
  <div class="TicketPurchase">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/userMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>车票查询和购买</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <div class="search">
      <el-cascader
        placeholder="起始地"
        :options="originStationOptions"
        v-model="originStationOptions.value"
        filterable
        class="el-cascader"
      ></el-cascader>
      <i class="el-icon-refresh"></i>
      <el-cascader
        placeholder="目的地"
        :options="finalStationOptions"
        v-model="finalStationOptions.value"
        filterable
        class="el-cascader"
      ></el-cascader>
      <el-date-picker
        v-model="goDate"
        align="right"
        type="date"
        placeholder="选择出发日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" class="searchButton"
        >搜索</el-button
      >
    </div>
    <ShowTicketData />
  </div>
</template>

<script>
import ShowTicketData from './components/ShowTicketData.vue'

export default {
  name: 'TicketPurchase',
  data() {
    return {
      originStationOptions: [
        {
          value: '广州',
          label: '广州'
        },
        {
          value: '深圳',
          label: '深圳'
        },
        {
          value: '佛山',
          label: '佛山'
        },
        {
          value: '肇庆',
          label: '肇庆'
        }
      ],
      finalStationOptions: [
        {
          value: '广州',
          label: '广州'
        },
        {
          value: '深圳',
          label: '深圳'
        },
        {
          value: '佛山',
          label: '佛山'
        },
        {
          value: '肇庆',
          label: '肇庆'
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '明天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '后天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      goDate: ''
    }
  },
  components: { ShowTicketData }
}
</script>

<style scoped>
.TicketPurchase {
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

.search {
  width: 100%;
  height: 100px;
}

.search .el-cascader {
  margin-left: 25px;
  margin-right: 25px;
}

.search .searchButton {
  margin: 20px;
}
</style>