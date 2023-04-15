<template>
  <transition name="dialog-fade">
    <el-dialog
      v-if="showDialog"
      :title="dialogTitle"
      class="dialog-component"
      :visible.sync="showDialog"
      width="630px"
      @close="closeDialog(0)"
    >
      <el-form
        ref="formInfo"
        :rules='rules'
        :model="formInfo"
        class="demo-form-inline"
        label-width="auto"
        style="text-align: center"
      >
        <el-row>
          <el-col :span='12'>

          </el-col>
          <el-col :span='12'>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="动车类型" prop="name" style="display:inline-block">
              <el-select v-model="formInfo.name" clearable placeholder="请选择" size="mini">
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
            <el-form-item label="动车类型代码" prop="code" style="display:inline-block">
              <el-input v-model="formInfo.code" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="一等座类型" prop="firstSeatTypeId" style="display:inline-block">
              <el-select v-model="formInfo.firstSeatTypeId" clearable placeholder="请选择" size="mini">
                <el-option
                  v-for="item in seatList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="一等座座位" prop="firstSeatNum" style="display:inline-block">
              <el-input v-model.number="formInfo.firstSeatNum" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="二等座类型" prop="secondSeatTypeId" style="display:inline-block">
              <el-select v-model="formInfo.secondSeatTypeId" clearable placeholder="请选择" size="mini">
                <el-option
                  v-for="item in seatList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="二等座座位" prop="secondSeatNum" style="display:inline-block">
              <el-input v-model.number="formInfo.secondSeatNum" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="三等座类型" prop="thirdSeatTypeId" style="display:inline-block">
              <el-select v-model="formInfo.thirdSeatTypeId" clearable placeholder="请选择" size="mini">
                <el-option
                  v-for="item in seatList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="三等座座位" prop="thirdSeatNum" style="display:inline-block">
              <el-input v-model.number="formInfo.thirdSeatNum" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="动车类型描述" prop="description" style="display:inline-block ;width:100%">
          <el-input v-model="formInfo.description" size="mini"></el-input>
        </el-form-item>

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
    name:'UserMessageComponent',
    props: {
        dialogTitle: {
        type: String,
        default: "添加列车",
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
      formInfo: JSON.parse(JSON.stringify(this.itemInfo)),
      value: '火车',
      seatList:[],
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
      rules:{
        name:[{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        code:[{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        firstSeatTypeId:[{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        firstSeatNum:[{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        secondSeatTypeId:[{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        secondSeatNum:[{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        thirdSeatTypeId:[{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],thirdSeatNum:[{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        description:[{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }]
      },
      }
  },
  mounted(){
    this.getSeat()
  },
  methods: {
    // 保存操作
    submitForm(formName) {
      const that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '添加列车'){
            axios.post('/api/trainType/admin',{
              name : this.formInfo.name,
              code : this.formInfo.code,
              description : this.formInfo.description ,
              firstSeatTypeId : parseInt(this.formInfo.firstSeatTypeId),
              firstSeatNum : this.formInfo.firstSeatNum,
              secondSeatTypeId : parseInt(this.formInfo.secondSeatTypeId),
              secondSeatNum : this.formInfo.secondSeatNum,
              thirdSeatTypeId : parseInt(this.formInfo.thirdSeatTypeId),
              thirdSeatNum : this.formInfo.thirdSeatNum
            }).then(res=>{
              if(res.data.code === 0)
              {
                that.$message({
                  message: "操作成功！",
                  type: "success",
                });
              }
            })
            that.closeDialog(1);
          }
          else{
            axios.put('/api/trainType/admin',{
              id : this.formInfo.id,
              name : this.formInfo.name,
              code : this.formInfo.code,
              description : this.formInfo.description ,
              firstSeatTypeId : parseInt(this.formInfo.firstSeatTypeId),
              firstSeatNum : parseInt(this.formInfo.firstSeatNum),
              secondSeatTypeId : parseInt(this.formInfo.secondSeatTypeId),
              secondSeatNum : parseInt(this.formInfo.secondSeatNum),
              thirdSeatTypeId : parseInt(this.formInfo.thirdSeatTypeId),
              thirdSeatNum : parseInt(this.formInfo.thirdSeatNum)
            })
              .then(res=>{
                if(res.data.code === 0)
                {
                  that.$message({
                    message: "操作成功！",
                    type: "success",
                  });
                }
                that.closeDialog(1);
              })
          }
        } else {
          return false;
        }
      });
    },
    getSeat(){
      axios
        .get('/api/seat/admin')
        .then(res => {
          this.seatList = res.data.data
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