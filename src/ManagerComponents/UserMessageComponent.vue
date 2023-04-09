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
        style="text-align: center"
      >

        <el-form-item label="用户名" prop="userAccount" style="display:inline-block">
            <el-input v-model="formInfo.userAccount" size="mini"></el-input>
        </el-form-item>
       <el-form-item label="用户密码" prop="userPassword" style="display:inline-block">
            <el-input v-model="formInfo.userPassword" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName" style="display:inline-block">
            <el-input v-model="formInfo.userName" size="mini"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户权限" prop="userAuthority" style="display:inline-block">
            <el-input v-model="formInfo.userAuthority" size="mini"></el-input>
        </el-form-item> -->
        <el-form-item label="活动区域" prop="userAuthority" style="display:inline-block">
            <el-select v-model="formInfo.userAuthority" size="mini">
                <el-option label="用户" value="user"></el-option>
                <el-option label="管理员" value="common"></el-option>
            </el-select>
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
export default {
    name:'UserMessageComponent',
    props: {
        dialogTitle: {
        type: String,
        default: "用户信息",
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
      }
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