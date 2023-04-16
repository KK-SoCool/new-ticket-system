<template>
  <div class='UnTicketInfo'>
    <div class='Breadcrumb'>
      <el-breadcrumb separator='/' class='biaoqian'>
        <el-breadcrumb-item :to="{ path: '/managerMainInterface' }"
        >火车售票系统
        </el-breadcrumb-item
        >
        <el-breadcrumb-item>列车管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>

    <div class='block'>
      <div class='nav'>
<!--        <el-date-picker-->
<!--          v-model='dateTime'-->
<!--          type='datetime'-->
<!--          size='mini'-->
<!--          placeholder='选择日期时间'-->
<!--          value-format='yyyy-MM-dd HH:mm:ss'>-->
<!--        </el-date-picker>-->

          <el-date-picker
            v-model="dateTime"
            size='mini'
            style='width: 210px'
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format='yyyy-MM-dd HH:mm:ss'>
          </el-date-picker>

        <el-select v-model='trainname' placeholder='选择类型' clearable size='mini' style='margin-left: 5px;width: 100px'>
          <el-option
            v-for='item in options'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
          </el-option>
        </el-select>

        <el-select v-model='trainname' placeholder='车次选择' clearable size='mini' style='margin-left: 5px;width: 100px'>
          <el-option
            v-for='item in options'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
          </el-option>
        </el-select>

        <el-button type='primary'
                   icon='el-icon-search'
                   size='mini'
                   style='margin-left: 5px'
                   @click='getDate'
        ></el-button>
      </div>

      <el-button type='primary'
                 size='mini'
                 class='addbutton'
                 @click='addItem'
      >添加车次
      </el-button>

      <el-switch
        class='switch'
        v-model='value1'
        inactive-text='价格'>
      </el-switch>
    </div>

    <div class='showUnTicketInfo'>
      <div class='container'>
        <el-table
          v-loading='loading'
          :data='TrainMsg'
          height='450'
          border
          style='width: 100%'
          :key="toggleIndex"
          stripe
        >
          <el-table-column
            prop='trainType.trainName'
            label='类型'
            width='100'
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop='trainType.trainCode'
            label='车次'
            width='85'
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop='startStation.stationName'
            label='始发站'
            width='100'
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop='endStation.stationName'
            label='终点站'
            width='100'
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop='startTime'
            label='出发时间'
            width='100'
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop='endTime'
            label='到达时间'
            width='100'
            align='center'
          >
          </el-table-column>
            <template v-if='!value1'>
              <el-table-column
                prop='firstSeatNum'
                label='一等座数量'
                width='70'
                align='center'
              >
              </el-table-column>
              <el-table-column
                prop='secondSeatNum'
                label='二等座数量'
                width='70'
                align='center'
              >
              </el-table-column>
              <el-table-column
                prop='thirdSeatNum'
                label='三等座数量'
                width='70'
                align='center'
              >
              </el-table-column>
            </template>

            <template v-if='value1'>
              <el-table-column
                prop='firstPrice'
                label='一等座价格'
                width='70'
                align='center'
              >
              </el-table-column>

              <el-table-column
                prop='secondPrice'
                label='二等座价格'
                width='70'
                align='center'
              >
              </el-table-column>
              <el-table-column
                prop='thirdPrice'
                label='三等座价格'
                width='70'
                align='center'
              >
              </el-table-column>
            </template>

            <el-table-column label='操作' align='center'>
              <template slot-scope='scope'>
                <i class="el-icon-zoom-in" @click='handleClick(scope.row)'></i>
<!--                <el-button @click='handleClick(scope.row)' type='text'-->
<!--                >查看-->
<!--                </el-button>-->

                <i class="el-icon-delete" @click="refund(scope.row.trainId)"></i>
<!--                <el-button class="el-icon-delete" @click="refund(scope.row.trainId)"></el-button>-->
              </template>
            </el-table-column>
        </el-table>
        <DialogCompenent
          v-if='showDialog'
          ref='dialogComponent'
          :dialog-title='dialogTitle'
          :item-info='trainItem'
          @closeDialog='closeDialog'
        ></DialogCompenent>
        <TrainDialog
          v-if='showTable'
          ref='trainDialog'
          :trainTableTitle='trainTableTitle'
          :item-info='trainItem'
          @closeDialog='closeDialog'
        ></TrainDialog>
      </div>
    </div>
  </div>
</template>

<script>
import DialogCompenent from '../ManagerComponents/DialogCompenent.vue'
import TrainDialog from '@/ManagerComponents/TrainDialog.vue'
import axios from 'axios'

export default {
  name: 'TrainManagement',
  inject:['reload'],
  components: { DialogCompenent,
    TrainDialog },
  data() {
    return {
      dateTime: [],
      trainname: '',
      //在价格和数量之间进行切换
      value1: true,
      loading: true,
      tableLoading: false,

      showDialog: false,
      showTable:false,

      dialogTitle: '添加车次',
      trainTableTitle:'查看信息',
      trainItem: {
        trainType: '',
        idTrain: '',
        startstation: '',
        endstation: '',
        startTime: '',
        endTime: '',
        trainSum: '',
        firstSeatType: '',
        secondSeatType: '',
        noSeatType: ''
      },

      options: [
        {
        value: '火车',
        label: '火车'
      }, {
        value: '普通动车',
        label: '普通动车'
      }, {
        value: '高铁动车',
        label: '高铁动车'
      }],
      TrainMsg: [],

      toggleIndex:0 // 设置索引默认值
    }
  },

  mounted() {
    this.getTrainList()
    this.loading = true
  },

  watch:{
    value1(){
      this.toggleIndex = Math.random();
    }
  },

  methods: {
    getTrainList() {
      axios
        .post('/api/train/list', {
          page: 1,
          mode: 2,
          size: 10,
          isAvailable: 1
          // startStationId: 1,
          // endStationId: 4,
          // startTime: this.dateTime,
          // page:1,
          // mode:1,
          // trainName: this.trainname,
          // size:10,
        })
        .then(res => {
          this.TrainMsg = res.data.data.list
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },

    addItem() {
      this.trainItem = {
        trainName: '',
        idTrain: '',
        startstation: '',
        endstation: '',
        startTime: '',
        endTime: '',
        firstSeatSell: '',
        secondSeatSell: '',
        thirdSeatSell: ''
      }
      this.dialogTitle = '添加车次'
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['dialogComponent'].showDialog = true
      })
    },

    handleClick(row) {
      this.trainItem = row
      this.trainTableTitle = '查看信息'
      this.showTable = true
      this.$nextTick(() => {
        this.$refs['trainDialog'].showTable = true
      })
    },

    getDate() {
      axios
        .post('/api/train/list', {
          startTime: this.dateTime[0],
          endTime: this.dateTime[1],
          page: 1,
          mode: 2,
          trainName: this.trainname.trim()==='' ? null:this.trainname,
          size: 10,
          isAvailable: 1,
        })
        .then(res => {
          this.TrainMsg = res.data.data.list
        })
        .catch(error => {
          console.log(error)
        })
      // this.dateTime = ''
      // this.trainname = ''
    },

    refund(id) {
      this.$confirm('此操作不可撤销，请问是否要删除该车次', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          axios.delete('/api/train/admin?trainId='+id).then(res =>{
            if (res.data.code === 0){
              this.$message({
                  type: 'success',
                  message: '删除成功!'
              })
              this.reload()
            }
            else{
              this.$message({
                type: 'warning',
                message: '删除失败!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
    },

    closeDialog(flag) {
      if (flag) {
        // 重新刷新表格内容
        this.reload()
      }
      this.showTable = false
      this.showDialog = false
    },
  }
}
</script>

<style scoped>
.UnTicketInfo {
    float: right;
    width: 83%;
    height: 720px;
    background-color: #fff;
    border-radius: 0 0 20px 0;
}

.block {
    padding: 5px 20px 0 20px;
}

.block .nav{
    float: left;
}

.block .switch{
  margin-left: 20px;
}

.block .addbutton {
    float: right;
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

.showUnTicketInfo {
    width: 100%;
}

.container {
    padding: 20px;
    border-bottom: 1px solid #ddd;
}

.pagination {
    float: right;
    margin-right: 20px;
}
</style>
   