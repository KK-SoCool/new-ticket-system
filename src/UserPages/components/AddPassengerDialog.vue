<template>
  <div>
    <el-dialog
      :modal="true"
      :modal-append-to-body="true"
      :title="tittle"
      :visible.sync="isShow"
      :width="width"
      :height="height"
      :close-on-click-modal="false"
      :show-close="true"
      :close-on-press-escape="true"
      center
    >
      <el-form :model="formData" ref="form" :rules="rules">
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="passengerName"
        >
          <el-input
            v-model="formData.name"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型" :label-width="formLabelWidth" required>
          <el-select v-model="formData.type" placeholder="请选择证件类型">
            <el-option label="身份证" value="0"></el-option>
            <el-option label="护照" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="证件号"
          :label-width="formLabelWidth"
          prop="passengerCardNum"
        >
          <el-input
            v-model="formData.number"
            placeholder="请输入完整证件号"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="submit">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  props: {
    add: {},
    switchStyle: {
      type: Boolean,
      default: true
    },
    tittle: {
      type: String,
      default: '请输入乘车人信息'
    },
    width: {
      type: String,
      default: '35%'
    },
    height: {
      type: String,
      default: '1000px'
    }
  },
  data() {
    return {
      formData: {
        name: '',
        type: '',
        number: ''
      },
      //校验规则
      rules: {
        passengerName: [
          {
            required: true,
            message: '请填写真实姓名',
            trigger: 'blur'
          }
        ],
        passengerCardType: [
          {
            required: true,
            message: '请选择证件类型',
            trigger: 'change'
          }
        ],
        passengerCardNum: [
          {
            required: true,
            message: '请填写所选证件的证件号码',
            trigger: 'blur'
          }
        ]
      },
      isShow: false,
      formLabelWidth: '100px'
    }
  },
  methods: {
    submit() {
      this.isShow = false
      console.log(this.formData)
      axios
        .post('/api/passenger', {
          id: null,
          name: this.formData.name,
          number: this.formData.number,
          phone: '13542982864',
          type: parseInt(this.formData.type),
          userId: parseInt(this.$store.state.userID)
        })
        .then((res) => {
          //通过返回值判断是否添加成功，并告知用户
          if (res.data.code === 0) {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '添加失败！',
              type: 'warning'
            })
          }
        })
      this.add(this.formData)
      this.formData.name = ''
      this.formData.type = ''
      this.formData.number = ''
    },

    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    //显示添加乘车人的对话框
    show() {
      this.isShow = true
    }
  },
  mounted() {
    //全局事件总线，在PassengerInfo组件中点击“添加”触发Show事件，进而调用show()弹出对话框
    this.$bus.$on('Show', this.show)
  }
}
</script>
<style scoped>
.divauto {
  margin: 10px auto 0 auto;
}
</style>
