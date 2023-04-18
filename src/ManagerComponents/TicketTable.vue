<template>
  <div class="showUnTicketInfo">
    <div class="container">
      <el-table
        v-loading='loading'
        :data="ticketMsg"
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
          prop="ticketId"
          label="乘车人"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sstStationName"
          label="起始站"
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
          prop="startTime"
          label="出发时间"
          width="180"
          align="center"
          :formatter="formatDate"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="refund(scope.row)" :disabled='scope.row.isSold!==1'>退票</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TicketTable',
  inject:['reload'],
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
      ticketMsg:[],
      loading:true,
      showTable: false,
      formInfo: JSON.parse(JSON.stringify(this.itemInfo)),
    }
  },
  methods:{
    getList(id){
      axios.get('/api/ticket/getAll',{
        params:{
          trainId:''+id
        }
      })
        .then(res =>{
          this.ticketMsg = res.data.data
          this.loading = false
        })
    },
    //将时间格式化
    formatDate(row, column) {
      // 获取单元格数据
      let data = row[column.property]
      if(data == null) {
        return null
      }
      let dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    },

    refund(list){
      axios.put('/api/refunded/admin/'+list.ticketId)
        .then(res =>{
          if (res.data.code === 0){
            list.isSold = 0
            this.$message({
              type: 'success',
              message: '退票成功!'
            })
          }
        })
        .catch(error =>{
          console.log(error)
        })
    }
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