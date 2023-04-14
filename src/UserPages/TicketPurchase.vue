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
      <el-select
        v-model="searchRequirement.originStationOptionsValue"
        clearable
        filterable
        class="el-select"
        placeholder="起始车站"
      >
        <el-option
          v-for="item in originStationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <i class="el-icon-refresh"></i>
      <el-select
        v-model="searchRequirement.finalStationOptionsValue"
        clearable
        filterable
        class="el-select"
        placeholder="终点车站"
      >
        <el-option
          v-for="item in finalStationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="searchRequirement.trainName"
        clearable
        filterable
        class="el-select type"
        placeholder="选择动车类型"
      >
        <el-option
          v-for="item in trainName"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker
        v-model="searchRequirement.goDate"
        align="right"
        type="date"
        class="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="searchButton"
        @click.stop="
          searchTicket()
          openLoadingScreen()
        "
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
  components: { ShowTicketData },
  data() {
    return {
      originStationOptions: [
        {
          value: 4,
          label: '广州东站'
        },
        {
          value: 7,
          label: '广州南站'
        },
        {
          value: 1,
          label: '北京西站'
        },
        {
          value: 8,
          label: '潮阳站'
        }
      ],
      finalStationOptions: [
        {
          value: 4,
          label: '广州东站'
        },
        {
          value: 7,
          label: '广州南站'
        },
        {
          value: 1,
          label: '北京东站'
        },
        {
          value: 8,
          label: '潮阳站'
        }
      ],
      trainName: [
        {
          value: '高铁动车',
          label: '高铁动车'
        },
        {
          value: '火车',
          label: '火车'
        },
        {
          value: '普通动车',
          label: '普通动车'
        }
      ],
      searchRequirement: {
        originStationOptionsValue: '',
        finalStationOptionsValue: '',
        goDate: '',
        trainName: ''
      },
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
      }
    }
  },
  methods: {
    //点击搜索按钮，调用judge方法判断起始车站输入是否有误或为空,判断完后触发全局事件'Search'传参到展示数据的表格组件中，根据传过去的参数请求车票信息
    searchTicket() {
      if (
        (this.searchRequirement.originStationOptionsValue === '') |
        (this.searchRequirement.finalStationOptionsValue === '')
      ) {
        this.$message({
          message: '起始车站不能为空',
          type: 'info'
        })
      } else if (
        this.searchRequirement.originStationOptionsValue ===
        this.searchRequirement.finalStationOptionsValue
      ) {
        this.$message({
          message: '起始车站不能相同',
          type: 'info'
        })
      } else if (this.searchRequirement.trainName === '') {
        this.$message({
          message: '动车类型不能为空',
          type: 'info'
        })
      } else if (this.searchRequirement.goDate === '') {
        this.$message({
          message: '日期不能同时为空',
          type: 'info'
        })
      } else {
        this.$bus.$emit('SearchTicket', this.searchRequirement)
      }
    },
    //点击事件触发加载页面
    openLoadingScreen() {
      this.$bus.$emit('showLoadingScreen')
    }
  }
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

.search .el-select {
  margin-left: 20px;
  margin-right: 20px;
}

.search .searchButton {
  margin: 20px;
}

.search .type {
  width: 150px;
  margin-left: -10px;
}

.search .date {
  width: 150px;
}
</style>
