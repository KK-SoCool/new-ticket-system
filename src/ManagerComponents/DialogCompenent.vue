<template>
  <transition name="dialog-fade">
    <el-dialog
      v-if="showDialog"
      :title="dialogTitle"
      class="dialog-component"
      :visible.sync="showDialog"
      width="500px"
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
                <el-form-item label="类型" prop="trainType">
                  <el-select v-model="computeType" clearable placeholder="请选择" size="mini">
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
                    <el-input v-model="formInfo.idTrain" size="mini"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='12'>
                <el-form-item label="始发站" prop="startstation" required>
                    <el-input v-model="formInfo.startstation" size="mini"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item label="终点站" prop="endstation" required>
                    <el-input v-model="formInfo.endstation" size="mini"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='12'>
                <el-form-item label="出发时间" prop="startTime" required>
                    <el-input v-model="formInfo.startTime" size="mini"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item label="到达时间" prop="endTime" required>
                    <el-input v-model="formInfo.endTime" size="mini"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='12'>
                <el-form-item label="一等座" prop="firstSeatType" required>
                    <el-input v-model="formInfo.firstSeatType" size="mini"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item label="售价" prop="firstSeatSell" required>
                    <el-input v-model="formInfo.firstSeatSell" size="mini"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='12'>
                <el-form-item label="二等座" prop="secondSeatType" required>
                    <el-input v-model="formInfo.firstSeatType" size="mini"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item label="售价" prop="secondSeatSell" required>
                    <el-input v-model="formInfo.firstSeatSell" size="mini"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='12'>
                <el-form-item label="无座" prop="noSeatType" required>
                    <el-input v-model="formInfo.firstSeatType" size="mini"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item label="售价" prop="noSeatSell" required>
                    <el-input v-model="formInfo.firstSeatSell" size="mini"></el-input>
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
export default {
  name: "DialogComponent",
  props: {
    dialogTitle: {
      type: String,
      default: "添加人员",
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
      value: '选项1',
      options: [{
          value: '选项1',
          label: '直达'
        }, {
          value: '选项2',
          label: '特快'
        }, {
          value: '选项3',
          label: '高铁'
        }],
        rules: {
        idTrain: [
          {
            required: true,
            message: '请填写真实车次',
            trigger: 'blur'
          }
        ],
  }
    };
  },
  methods: {
    // 保存操作
    submitForm(formName) {
      const that = this;
      const params = Object.assign(that.formInfo, {});
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 走保存请求
          that.$message({
            message: "操作成功！",
            type: "success",
          });
          that.closeDialog(1);
        } else {
          return false;
        }
      });
    },
    // 关闭弹框
    closeDialog(flag) {
      this.$refs["formInfo"].resetFields();
      this.showDialog = false;
      this.$emit("closeDialog", flag);
    },
  },
  computed:{
    computeType(){
      return this.formInfo.trainType === '' ? this.value : this.formInfo.trainType
    }
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