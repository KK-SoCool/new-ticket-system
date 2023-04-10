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
            v-model="formData.passengerName"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型" :label-width="formLabelWidth" required>
          <el-select
            v-model="formData.passengerCardType"
            placeholder="请选择证件类型"
          >
            <el-option label="身份证" value="IDcard"></el-option>
            <el-option label="护照" value="Passpost"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="证件号"
          :label-width="formLabelWidth"
          prop="passengerCardNum"
        >
          <el-input
            v-model="formData.passengerCardNum"
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
        passengerName: '',
        passengerCardType: '',
        passengerCardNum: ''
      },
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
      this.add(this.formData)
      this.passengerName = ''
      this.passengerCardType = ''
      this.passengerCardNum = ''
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    show() {
      this.isShow = true
    }
  },
  mounted() {
    this.$bus.$on('Show', this.show)
  }
}
</script>
<style scoped>
.divauto {
  margin: 10px auto 0 auto;
}
</style>
