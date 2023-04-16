<template>
  <transition name="dialog-fade">
    <el-dialog
      v-if="showDialog"
      :title="dialogTitle"
      class="dialog-component"
      :visible.sync="showDialog"
      width="600px"
      @close="closeDialog(0)"
    >
      <el-form
        ref="formInfo"
        :model="formInfo"
        class="demo-form-inline"
        label-width="auto"
        :rules="rules"
      >
        <el-row>
            <el-col :span='12'>
                <el-form-item label="类型" prop="trainName">
                  <el-select v-model="formInfo.trainName" clearable placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item label="车次" prop="idTrain">
                  <el-select v-model="formInfo.idTrain" clearable placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in unusedList"
                      :key="item.trainTypeId"
                      :label="item.trainCode"
                      :value="item.trainTypeId">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='12'>
                <el-form-item label="始发站" prop="startstation">
                  <el-select v-model="formInfo.startstation" clearable placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in sstationList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item label="终点站" prop="endstation">
                  <el-select v-model="formInfo.endstation" clearable placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in estationList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-form-item label="历时" required>
              <el-date-picker
                v-model="trainTime"
                size='mini'
                style='width: 100%'
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format='yyyy-MM-dd HH:mm:ss'>
              </el-date-picker>
          </el-form-item>
        </el-row>

        <el-row>
            <el-col style='width: 33.3333%' >
                <el-form-item label="一等座售价" prop="firstSeatSell">
                    <el-input v-model="formInfo.firstSeatSell" size="mini"></el-input>
                </el-form-item>
            </el-col>
            <el-col style='width: 33.3333%' >
              <el-form-item label="二等座售价" prop="secondSeatSell">
                <el-input v-model="formInfo.secondSeatSell" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col style='width: 33.3333%' >
              <el-form-item label="三等座售价" prop="thirdSeatSell">
                <el-input v-model="formInfo.thirdSeatSell" size="mini"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        
        <el-form-item style="text-align: right;">
          <el-button type="primary" @click="submitForm('formInfo')" size="mini"
            >确定</el-button
          >
          <el-button @click="closeDialog(0)" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </transition>
</template>
 
<script>
import axios from 'axios'

export default {
  name: "DialogComponent",
  props: {
    dialogTitle: {
      type: String,
      default: "添加车次",
    },
    itemInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      showDialog: false,
      trainTime:[],
      formInfo: JSON.parse(JSON.stringify(this.itemInfo)),
      value: '',
      trainMsg:[],
      stationList:[],
      sstationList:[],
      estationList:[],
      tunusedList:[],
      temp:[],
      unusedList:[],
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
      //必须填写的提示名
        rules: {
        trainName:[{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
        idTrain: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          startstation: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          endstation: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          firstSeatSell:[{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          secondSeatSell:[{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          thirdSeatSell:[{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
      }
    };
  },

  mounted(){
    this.getMessage()
  },

  methods: {
    // 保存操作
    submitForm(formName) {
      const that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/train/admin',{
            startTime : this.trainTime[0],
            endTime : this.trainTime[1],
            startStation : this.formInfo.startstation,
            endStation : this.formInfo.endstation,
            trainTypeId : this.formInfo.idTrain,
            firstPrice : parseInt(this.formInfo.firstSeatSell),
            secondPrice : parseInt(this.formInfo.secondSeatSell),
            thirdPrice : parseInt(this.formInfo.thirdSeatSell)
          })
            .then(res =>{
              if (res.data.code === 0){
                // 走保存请求
                that.$message({
                  message: "操作成功！",
                  type: "success",
                });
              }
              that.closeDialog(1);
            })
        } else {
          return false;
        }
      });
    },
    //获取所需信息
    getMessage() {
      axios.get('/api/station/getAll')
        .then(res => {
          this.stationList = res.data.data
          this.sstationList = this.stationList
          this.estationList = this.stationList
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 关闭弹框
    closeDialog(flag) {
      this.$refs["formInfo"].resetFields();
      this.showDialog = false;
      this.$emit("closeDialog", flag);
    },
  },

  watch:{
    'formInfo.trainName':{
      handler(newValue){
        this.temp = this.tunusedList
        this.unusedList = this.temp.filter(unused => unused.trainName === newValue)
        this.formInfo.idTrain = ''
      }
    },

    'formInfo.startstation':{
      handler(newValue){
        console.log(newValue)
        this.estationList = this.stationList.filter(used => used.id !== newValue)
      }
    },

    'formInfo.endstation':{
      handler(newValue){
        console.log(newValue)
        this.sstationList = this.stationList.filter(used => used.id !== newValue)
      }
    },

    trainTime:{
      handler(newTime) {
        axios.get('/api/train/admin/unused', {
          params: {
            startTime: newTime[0],
            endTime: newTime[1]
          }
        }).then(res => {
          this.tunusedList = res.data.data

          //时间改动的同时还能够根据旧有车次类型形成新的未排班次
          if (this.formInfo.trainName !== ''){
            this.unusedList = this.tunusedList.filter(unused => unused.trainName === this.formInfo.trainName)
          }
          this.formInfo.idTrain = ''
        })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }

};
</script>
 
<style scoped>
.dialog-fade-enter-active {
  -webkit-animation: dialog-fade-in 0.3s;
  animation: dialog-fade-in 0.3s;
}
.dialog-fade-leave-active {
  -webkit-animation: dialog-fade-out 0.3s;
  animation: dialog-fade-out 0.3s;
}
@-webkit-keyframes dialog-fade-in {
  0% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes dialog-fade-in {
  0% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@-webkit-keyframes dialog-fade-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
@keyframes dialog-fade-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>