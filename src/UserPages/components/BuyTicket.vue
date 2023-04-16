<template>
  <div>
    <el-dialog
      :modal="true"
      :modal-append-to-body="true"
      :title="tittle"
      :visible.sync="isShow"
      :width="width"
      :height="height"
      :close-on-click-modal="false"
      :show-close="true"
      :close-on-press-escape="true"
      center
    >
      <el-steps :active="1" align-center>
        <el-step
          :title="receiveSeatTypePrice.startStationName"
          description="起点站"
        ></el-step>
        <el-step title="途经"></el-step>
        <el-step
          :title="receiveSeatTypePrice.endStationName"
          description="终点站"
        ></el-step>
      </el-steps>
      <div class="form">
        <el-form :model="formData" ref="form" :rules="rules">
          <el-checkbox-group v-model="formData.checkedPassenger">
            <el-checkbox
              v-for="p in passengers"
              :label="p.number"
              :key="p.id"
              border
              size="medium"
              class="checkBoxItem"
              @change="(checked) => saveCheckedValue(checked, p.id)"
              >姓名：{{ p.name }} /证件号：{{ p.number }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form>
      </div>
      <div></div>
      <div class="seatType">
        <el-select
          v-model="seatTypeValue"
          clearable
          filterable
          placeholder="选择座位类型"
          class="select"
        >
          <el-option
            v-for="item in seatType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  props: {
    switchStyle: {
      type: Boolean,
      default: true
    },
    tittle: {
      type: String,
      default: '请选择乘车人信息'
    },
    width: {
      type: String,
      default: '35%'
    },
    height: {
      type: String,
      default: '1000px'
    }
  },
  data() {
    return {
      formData: {
        checkedPassenger: []
      },
      seatType: [
        {
          value: '高贵的一等座',
          label: '高贵的一等座'
        },
        {
          value: '普通的二等座',
          label: '普通的二等座'
        },
        {
          value: '没得坐',
          label: '没得坐'
        }
      ],
      seatTypeValue: '',
      seatTypeId: '',
      passengers: [
        {
          name: '无',
          number: '无'
        }
      ],
      passengersID: [],
      rules: {},
      isShow: false,
      // isChecked: false,
      formLabelWidth: '100px',
      //接收ShowTicketData组件中传来的对应座位类型id和价格
      receiveSeatTypePrice: {
        trainId: '',
        trainTypeId: '',
        firstPrice: '',
        secondPrice: '',
        thirdPrice: '',
        startStationName: '',
        endStationName: ''
      },
      receiveSeatInfo: {
        firstSeatId: '',
        secondSeatId: '',
        thirdSeatId: ''
      }
    }
  },
  methods: {
    //给后端发送请求，获取当前用户的乘车人信息
    getPassengerInfo() {
      axios
        .get('/api/passenger', {
          params: {
            id: parseInt(this.$store.state.userID)
          }
        })
        .then((res) => {
          this.passengers = res.data.data
          if (this.passengers.length === 0) {
            this.$message({
              message: '查不到乘车人信息，请先去添加'
            })
          }
        })
    },

    //拿到checked的值，判断是否选中，选中的话就把乘客id push进数组，如果取消选中则把id从数组中删掉
    saveCheckedValue(checked, id) {
      if (checked === true) {
        console.log('乘客' + id + '选中了')
        this.passengersID.push(id)
      }
      if (checked === false) {
        console.log('乘客' + id + '取消选中')
        this.passengersID = this.passengersID.filter((p) => {
          return p !== id
        })
      }
    },

    //给后端发送购票信息
    purchaseTicket() {
      this.judgeSeatId()
      console.log(this.seatTypeId)
      console.log(typeof this.passengersID)
      const params = new URLSearchParams()
      params.append('trainId', this.receiveSeatTypePrice.trainId)
      for (let i = 0; i < this.passengersID.length; i++) {
        params.append('passengerId', this.passengersID[i])
      }
      params.append('seatTypeId', this.seatTypeId)
      // params: {
      //   trainId: this.receiveSeatTypePrice.trainId,
      //     passengerId: this.passengersID,
      //     seatTypeId: this.seatTypeId
      // }
      axios.post('/api/ticket/test', params).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            message: '购买车票成功！',
            type: 'success'
          })
        } else {
          console.log(res.data.description)
          this.$message({
            message: '购买失败' + ',' + res.data.description,
            type: 'warning'
          })
        }
      })
    },
    cancel() {
      this.isShow = false
    },
    submit() {
      if (this.passengersID.length === 0) {
        this.$message({
          message: '需要选择乘车人信息',
          type: 'warning'
        })
      } else if (this.seatTypeValue === '') {
        this.$message({
          message: '需要选择座位类型',
          type: 'warning'
        })
      } else {
        this.isShow = false
        this.purchaseTicket()
      }
    },

    //data里面存着传来的车票id和购买价格
    show(data) {
      this.isShow = true
      this.getSeat()
      this.receiveSeatTypePrice.trainId = data.trainId
      this.receiveSeatTypePrice.trainTypeId = data.trainTypeId
      this.receiveSeatTypePrice.firstPrice = data.firstPrice
      this.receiveSeatTypePrice.secondPrice = data.secondPrice
      this.receiveSeatTypePrice.thirdPrice = data.thirdPrice
      this.receiveSeatTypePrice.startStationName = data.startStationName
      this.receiveSeatTypePrice.endStationName = data.endStationName
      this.getSeatType()
    },

    //拿到座位类型id和描述
    getSeatType() {
      axios
        .get('/api/train/detail', {
          params: {
            trainTypeId: this.receiveSeatTypePrice.trainTypeId
          }
        })
        .then((res) => {
          this.receiveSeatInfo.firstSeatId = res.data.data.firstSeatId
          this.receiveSeatInfo.secondSeatId = res.data.data.secondSeatId
          this.receiveSeatInfo.thirdSeatId = res.data.data.thirdSeatId
        })
    },

    //判断座位类型
    judgeSeatId() {
      if (this.seatTypeValue === '高贵的一等座') {
        this.seatTypeId = this.receiveSeatInfo.firstSeatId
      } else if (this.seatTypeValue === '普通的二等座') {
        this.seatTypeId = this.receiveSeatInfo.secondSeatId
      } else if (this.seatTypeValue === '没得坐') {
        this.seatTypeId = this.receiveSeatInfo.thirdSeatId
      }
    },
    getSeat() {
      axios.get('/api/seat/admin').then((res) => {
        console.log(res.data.data)
      })
    }
  },
  mounted() {
    this.$bus.$on('Show', this.show)
    this.getPassengerInfo()
  },
  beforeDestroy() {
    this.$bus.$off('Show')
  }
}
</script>
<style scoped>
.divauto {
  margin: 10px auto 0 auto;
}

.checkBox {
  margin: 0 auto;
}

.checkBoxItem {
  margin-bottom: 10px;
  margin-left: 10px;
}

.form {
  margin-top: 20px;
  margin-left: 65px;
}

.seatType {
  margin-top: 30px;
  margin-left: 80px;
}

.seatType .select {
  width: 330px;
}
</style>
