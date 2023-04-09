<template>
  <div class="UnTicketInfo">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/managerMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>车站管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <div class="container">
      <el-input v-model="input" placeholder="请输入内容" size="mini" style="width: 200px">
        <el-button type="text" slot="suffix" size="mini" style="padding-right:5px">搜索</el-button>
      </el-input>
        <el-button 
            type="primary" 
            icon="el-icon-circle-plus-outline"
            @click="addItem"
            size="mini" 
            class="add"
            >增加车站</el-button>
    </div>
    <div class="showUnTicketInfo">
      <div class="container">
        <el-table
          :data="stationMsg"
          height="450"
          border
          style="width: 100%"
          stripe
        >
          <el-table-column
            prop="stationID"
            label="车站ID"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="stationProvince"
            label="车站省份"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="stationCity"
            label="车站城市"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="stationName"
            label="车站站名"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button 
                @click="handleClick(scope.row)" 
                type="primary" 
                icon="el-icon-edit" 
                size="mini"
                ></el-button>
              <el-button 
                @click="refund" 
                type="primary" 
                icon="el-icon-delete" 
                size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <StationComponent
        v-if="showDialog"
        ref="stationComponent"
        :dialog-title="dialogTitle"
        :item-info="stationItem"
         @closeDialog="closeDialog"
    ></StationComponent>
    <el-pagination class="pagination"
        small
        layout="prev, pager, next"
        :total="30">
    </el-pagination>
  </div>
</template>

<script>
import StationComponent from '../ManagerComponents/StationComponent.vue'
export default {
  name: 'StationManagement',
  components:{StationComponent},
  data(){
    return {
      input:'',
      showDialog: false,
      dialogTitle: "添加车站",
        stationMsg:[],
        stationItem:{
          stationID:'',
          stationProvince:'',
          stationCity:'',
          stationName:''
        }
    }
  },
   mounted(){
    this.fetchData()
  },
  methods: {
     fetchData(){
      const that = this;
      // that.tableLoading = true;
      that.stationMsg = [
        {
            stationID:'001',
            stationProvince:'北京',
            stationCity:'北京',
            stationName:'北京站'
        },
        {
            stationID:'002',
            stationProvince:'广东',
            stationCity:'广州',
            stationName:'广州南站'
        },
      ]
     },
    addItem(){
      this.stationItem = {
          stationID:'',
          stationProvince:'',
          stationCity:'',
          stationName:''
        }
      this.dialogTitle = "添加车站"
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs["stationComponent"].showDialog = true
      });
    },
    handleClick(row){
      this.stationItem = row
      this.dialogTitle = "编辑车站"
      this.showDialog = true
      this.$nextTick(() => {
      this.$refs["stationComponent"].showDialog = true
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
      this.$confirm('此操作不可撤销，请问是否要删除车站', '注意', {
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
  },
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

.Breadcrumb {
  width: 100%;
  height: 50px;
}

.Breadcrumb .biaoqian {
  margin-top: 25px;
  margin-left: 35px;
  font-size: 18px;
}

.container{
    padding: 20px;
}

.container .add{
    float: right;
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