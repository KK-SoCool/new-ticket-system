<template>
  <div class="showTicketData">
    <BuyTicket
      :title="dialogTitle"
      :width="dialogWidth"
      :height="dialogHeight"
    />
    <div class="container">
      <el-table
        :data="ticketTable"
        height="450"
        border
        style="width: 100%"
        stripe
      >
        <el-table-column
          prop="originTime"
          label="起始时间"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="finalTime"
          label="到达时间"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="trainCode"
          label="车型车次（动车代码）"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="firstSeat"
          label="一等座"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="secondSeat"
          label="二等座"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text"
              >查看</el-button
            >
            <el-button type="text" @click="buy">购票</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import BuyTicket from './BuyTicket.vue'
export default {
  name: 'ShowTicketData',
  components: { BuyTicket },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    buy() {
      this.$bus.$emit('Show')
    }
  },
  data() {
    return {
      ticketTable: [
        {
          originTime: '15:39',
          finalTime: '16:50',
          trainCode: 'G6804',
          firstSeat: '有',
          secondSeat: '有'
        },
        {
          originTime: '15:39',
          finalTime: '16:50',
          trainCode: 'G6804',
          firstSeat: '有',
          secondSeat: '有'
        },
        {
          originTime: '15:39',
          finalTime: '16:50',
          trainCode: 'G6804',
          firstSeat: '有',
          secondSeat: '有'
        },
        {
          originTime: '15:39',
          finalTime: '16:50',
          trainCode: 'G6804',
          firstSeat: '有',
          secondSeat: '有'
        },
        {
          originTime: '15:39',
          finalTime: '16:50',
          trainCode: 'G6804',
          firstSeat: '有',
          secondSeat: '有'
        },
        {
          originTime: '15:39',
          finalTime: '16:50',
          trainCode: 'G6804',
          firstSeat: '有',
          secondSeat: '有'
        },
        {
          originTime: '15:39',
          finalTime: '16:50',
          trainCode: 'G6804',
          firstSeat: '有',
          secondSeat: '有'
        },
        {
          originTime: '15:39',
          finalTime: '16:50',
          trainCode: 'G6804',
          firstSeat: '有',
          secondSeat: '有'
        },
        {
          originTime: '15:39',
          finalTime: '16:50',
          trainCode: 'G6804',
          firstSeat: '有',
          secondSeat: '有'
        },
        {
          originTime: '15:39',
          finalTime: '16:50',
          trainCode: 'G6804',
          firstSeat: '有',
          secondSeat: '有'
        }
      ],
      dialogTitle: '请选择乘车人信息',
      dialogWidth: '35%',
      dialogHeight: '1000px'
    }
  }
}
</script>

<style scoped>
.showTicketData {
  width: 100%;
}

.container {
  padding: 20px;
  border: 1px solid #ddd;
}
</style>