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
      <el-input v-model="input" placeholder="请输入内容" size="mini" style="width: 200px" @keyup.enter.native='searchStation'>
        <el-button type="text" slot="suffix" size="mini" style="padding-right:5px" @click='searchStation'>搜索</el-button>
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
          v-loading='loading'
          :data="stationMsg"
          height="450"
          border
          style="width: 100%"
          ref="table"
          stripe
        >
          <el-table-column
            prop="province"
            label="车站省份"
            width="240"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="city"
            label="车站城市"
            width="240"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="车站站名"
            width="240"
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
                @click="refund(scope.row.id)"
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
        :page-size="size"
        :total="total"
        :current-page='page'
        @current-change='currentChange'>
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import StationComponent from '../ManagerComponents/StationComponent.vue'
export default {
  inject:['reload'],
  name: 'StationManagement',
  components:{StationComponent},
  data(){
    return {
      input:'',

      total:0,
      size:5,
      page:1,

      showDialog: false,
      dialogTitle: "添加车站",
      stationMsg:[],
      stationAllMsg:[],
      stationItem:{},
      station:{
        id:'',
        province:'',
        city:'',
        name:''
      },
      loading: true
    }
  },

  mounted(){
    this.loading =true
    this.getStationList() 
  },
  
  methods: {
     //data:{isAll : '1'}
    //查询所有的车站名
     async getStationList() {
       await axios.get('/api/station/getAll')
         .then((res) => {
           this.stationAllMsg = res.data.data
           this.loading = false
           this.getTableData()
         })
         .catch((error) => {
           console.log(error)
         })
     },

    searchStation(){
      console.log(this.input)
      axios
        .get('/api/station/getAll',{
          params:{
            city:this.input
          }
        }).then(res => {
          this.stationAllMsg = res.data.data
          this.getTableData()
      }).catch(error => {
        console.log(error)
      })
      this.input = ''
    },

    addItem(){
      this.stationItem = {
          province:'',
          city:'',
          name:''
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
            this.reload()
          }
          this.showDialog = false;
        },

      refund(id) {

      this.$confirm('此操作不可撤销，请问是否要删除车站', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          axios.delete('/api/station/admin',{
            params:{
              id : id
            }
          })
            .then(() => {
              this.reload()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
    },
    getTableData(){
      this.stationMsg = this.stationAllMsg.slice(
        (this.page - 1) * this.size,
        this.page * this.size
      )
      this.total = this.stationAllMsg.length
    },
    currentChange(val){
      this.page = val
      this.getTableData()
    },
  },

  beforeDestroy(){
    this.$bus.$off("add")
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