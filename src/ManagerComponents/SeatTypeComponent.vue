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
        :rules="rules"
        :model="formInfo"
        class="demo-form-inline"
        label-width="auto"
      >
        <el-form-item label="座位名称" prop="name">
          <el-input v-model="formInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="座位描述" prop="description">
          <el-input v-model="formInfo.description"></el-input>
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
  name: "SeatTypeComponent",
  props: {
    dialogTitle: {
      type: String,
      default: "添加座位类型",
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
      rules: {
        name:[{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
      }
    }
  },
  methods: {
    // 保存操作
    submitForm(formName) {
      const that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.dialogTitle === '添加座位类型'){
            axios.post('/api/seat/admin',{
              name: this.formInfo.name,
              description: this.formInfo.description
            }).then(res=>{
              if(res.data.code ===0)
              {
                console.log(1)
                that.$message({
                  message: "操作成功！",
                  type: "success",
                });
              }
            })
          // 走保存请求
          that.closeDialog(1);
          }
          else {
            axios.put('/api/seat',{
              id: this.formInfo.id,
              name: this.formInfo.name,
              description: this.formInfo.description
            }).then(res=>{
              if(res.data.code ===0)
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
    // 关闭弹框
    closeDialog(flag) {
      this.$refs["formInfo"].resetFields();
      this.showDialog = false;
      console.log(this.dialogTitle);
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