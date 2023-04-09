<template>
  <div class="UnTicketInfo">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/managerMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>列车管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <el-button type="primary" @click="addItem" size="mini" class="addbutton">添加列车</el-button>
    <div class="showUnTicketInfo">
      <div class="container">
        <el-table
          :data="TrainMsg"
          height="450"
          border
          style="width: 100%"
          stripe
        >
          <el-table-column
            prop="trainType"
            label="类型"
            width="85"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="idTrain"
            label="车次"
            width="85"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="startstation"
            label="始发站"
            width="85"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="endstation"
            label="终点站"
            width="85"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="出发时间"
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
            prop="trainSum"
            label="车厢数"
            width="60"
            align="center"
          >
          </el-table-column>
         <el-table-column
            prop="firstSeatType"
            label="一等座"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="secondSeatType"
            label="二等座"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="noSeatType"
            label="无座"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text"
                >修改</el-button
              >
              <el-button type="text" @click="refund">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <DialogCompenent
            v-if="showDialog"
            ref="dialogComponent"
            :dialog-title="dialogTitle"
            :item-info="trainItem"
            @closeDialog="closeDialog"
        ></DialogCompenent>
      </div>
    </div>
     <el-pagination class="pagination"
        small
        layout="prev, pager, next"
        :total="30">
        </el-pagination>
  </div>
</template>

<script>
import DialogCompenent from '../ManagerComponents/DialogCompenent.vue'
export default {
  name: 'TrainManagement',
  components:{DialogCompenent},
  data() {
    return {
      tableLoading: false,
      showDialog: false,
      dialogTitle: "添加车次",
      trainItem:{
        trainType:'',
          idTrain:'',
          startstation:'',
          endstation:'',
          startTime:'',
          endTime:'',
          trainSum:'',
          firstSeatType:'',
          secondSeatType:'',
          noSeatType:''
      },
      TrainMsg: [],
    }
  },
  mounted(){
    this.fetchData()
  },
  methods: {
    fetchData(){
      const that = this;
      // that.tableLoading = true;
      that.TrainMsg = [
        {
          trainType:'高铁',
          idTrain:'G1',
          startstation:'北京',
          endstation:'上海虹桥',
          startTime:'12：00',
          endTime:'16：00',
          trainSum:'16',
          firstSeatType:'有',
          secondSeatType:'有',
          noSeatType:'有'
        },
        {
          trainType:'高铁',
          idTrain:'G2',
          startstation:'北京',
          endstation:'上海虹桥',
          startTime:'12：00',
          endTime:'16：00',
          trainSum:'16',
          firstSeatType:'有',
          secondSeatType:'有',
          noSeatType:'有'
        }
      ]
    },
    addItem(){
      this.trainItem = {
          trainType:'',
          idTrain:'',
          startstation:'',
          endstation:'',
          startTime:'',
          endTime:'',
          trainSum:'',
          firstSeatType:'',
          secondSeatType:'',
          noSeatType:''
      }
      this.dialogTitle = "添加车次"
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs["dialogComponent"].showDialog = true
      });
    },
    handleClick(row){
      this.trainItem = row
      this.dialogTitle = "编辑车次"
        this.showDialog = true
      this.$nextTick(() => {
        this.$refs["dialogComponent"].showDialog = true
      });
    },
     closeDialog(flag) {
      if (flag) {
        // 重新刷新表格内容
        this.fetchData();
      }
      this.showDialog = false;
    },
    refund() {
      this.$confirm('请确定是否删除该车次', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
    }
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

.addbutton{
  float: right;
  margin-right: 20px;
  margin-bottom: 10px;
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

.pagination{
    float: right;
    margin-right: 20px;
}
</style>
   