<template>
  <div class="showTicketData">
    <BuyTicket
      :title="dialogTitle"
      :width="dialogWidth"
      :height="dialogHeight"
    />
    <div class="container">
      <el-empty
        v-show="!isShow"
        description="暂无数据"
        class="emptyBox"
      ></el-empty>
      <el-table
        v-loading="screenLoading"
        v-show="isShow"
        :data="ticketTable"
        height="450"
        border
        style="width: 100%"
        stripe
      >
        <el-table-column
          prop="trainType.trainCode"
          label="车次"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="发车时间"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="到达时间"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="trainType.trainName"
          label="动车类型"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="firstSeatNum"
          label="一等座（剩余量）"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="secondSeatNum"
          label="二等座（剩余量）"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="thirdSeatNum"
          label="三等座（剩余量）"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text"
              >查看</el-button
            >
            <el-button type="text" @click.stop="buy(scope.row)">购票</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="6"
      :total="total"
      style="float: right"
    >
    </el-pagination>
  </div>
</template>

<script>
import BuyTicket from './BuyTicket.vue'
import axios from 'axios'
export default {
  name: 'ShowTicketData',
  components: { BuyTicket },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    //点击页码时拿到当前页码进行再次请求数据
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`)
      this.screenLoading = true
      axios
        .post('/api/train/list', {
          startStationId: this.searchData.originStationId,
          endStationId: this.searchData.finalStationId,
          startTime: this.searchData.date,
          page: parseInt(page),
          size: 6,
          isAvailable: 1,
          mode: 1
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.ticketTable = res.data.data.list
            this.$message({
              message: '搜索成功',
              type: 'success'
            })
            this.screenLoading = false
          } else {
            console.log(res.data.message)
            this.$message({
              message: '搜索失败，或无数据',
              type: 'warning'
            })
            this.screenLoading = false
          }
        })
    },
    //点击搜索后触发，请求第一页的数据
    searchTicket(data) {
      if (this.isShow === false) {
        this.isShow = !this.isShow
      }
      //传来的值用变量保存，方便以后点击页码再次发送请求
      this.searchData.originStationId =
        data.originStationOptionsValue.toString()
      this.searchData.finalStationId = data.finalStationOptionsValue.toString()
      this.searchData.date = data.goDate
      axios
        .post('/api/train/list', {
          startStationId: data.originStationOptionsValue.toString(),
          endStationId: data.finalStationOptionsValue.toString(),
          startTime: data.goDate,
          trainName: data.trainName,
          page: 1,
          size: 5,
          isAvailable: 1,
          mode: 1
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.ticketTable = res.data.data.list
            if (this.ticketTable.length !== 0) {
              this.$message({
                message: '搜索成功',
                type: 'success'
              })
              this.screenLoading = false
              this.total = res.data.data.pageTotal * 5
            } else {
              this.$message({
                message: '没找到车票',
                type: 'warning'
              })
            }
          } else {
            console.log(res.data.message)
            this.$message({
              message: '搜索失败，或无数据',
              type: 'warning'
            })
            this.screenLoading = false
          }
        })
    },
    buy(row) {
      this.sendInfoObj.trainId = row.trainId
      this.sendInfoObj.trainTypeId = row.trainType.trainTypeId
      this.sendInfoObj.firstPrice = row.firstPrice
      this.sendInfoObj.secondPrice = row.secondPrice
      this.sendInfoObj.thirdPrice = row.thirdPrice
      this.sendInfoObj.startStationName = row.startStation.stationName
      this.sendInfoObj.endStationName = row.endStation.stationName
      console.log(this.sendInfoObj)
      this.$bus.$emit('Show', this.sendInfoObj)
    },
    //展示加载画面
    showLoadingScreen() {
      this.screenLoading = true
    }
  },
  data() {
    return {
      ticketTable: [],
      dialogTitle: '请选择乘车人信息',
      dialogWidth: '35%',
      dialogHeight: '1000px',
      sendInfoObj: {
        trainId: '',
        trainTypeId: '',
        firstPrice: '',
        secondPrice: '',
        thirdPrice: '',
        startStationName: '',
        endStationName: ''
      },
      //展示车票的表格是否展示（点击搜索后展示）
      isShow: false,
      //加载画面是否展示
      screenLoading: false,
      searchData: {
        originStationId: '',
        finalStationId: '',
        date: ''
      },
      total: null,
      pageTotal: ''
    }
  },
  mounted() {
    this.$bus.$on('SearchTicket', this.searchTicket)
    this.$bus.$on('showLoadingScreen', this.showLoadingScreen)
  },
  beforeDestroy() {
    this.$bus.$off('SearchTicket')
    this.$bus.$off('showLoadingScreen')
  }
}
</script>

<style scoped>
.showTicketData {
  width: 100%;
}

.emptyBox {
  height: 450px;
}

.container {
  padding: 20px;
  border: 1px solid #ddd;
}
</style>
