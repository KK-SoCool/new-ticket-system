<template>
  <div class="showUnTicketInfo">
    <div class="container">
      <el-table
        :data="unTicketList"
        v-loading='loading'
        height="450"
        border
        style="width: 100%"
        stripe
      >
        <el-table-column
          prop="trainCode"
          label="车次"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sstStationName"
          label="始发站"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="estStationName"
          label="终点站"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="座位"
          width="150"
          align="center"
        >
          <template slot-scope='scope'>
            {{ scope.row.seatName + ' ' + scope.row.carNumber + '车' + ' ' + scope.row.seatNumber + '号'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="refundedPrice"
          label="退票金额"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="refundedTime"
          label="退票时间"
          align="center"
          :formatter="formatDate"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UnTicketTable',
  props:{
    //获取父组件传来的信息
    itemInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      showTable: false,
      loading:true,
      unTicketList:[],
      formInfo: JSON.parse(JSON.stringify(this.itemInfo)),
    }
  },
  methods:{
    getList(id){
      axios.get('/api/refunded/getAll',{
        params:{
          trainId : parseInt(id)
        }
      })
        .then(res =>{
          this.unTicketList = res.data.data
          this.loading = false
          console.log(this.unTicketList)
        })
    },
    formatDate(row, column) {
      // 获取单元格数据
      let data = row[column.property]
      if(data == null) {
        return null
      }
      let dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    },
  },

}
</script>

<style scoped>
.showUnTicketInfo {
    width: 100%;
}

.container {
    border-bottom: 1px solid #ddd;
}

.pagination{
    float: right;
    margin-right: 20px;
}
</style>