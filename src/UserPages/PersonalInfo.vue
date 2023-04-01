<template>
  <div class="container">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/userMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <div class="PersonalInfoForm">
      <h2>请完善个人信息</h2>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="姓名" class="userName" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-radio-group v-model="form.userSex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" class="userAge" prop="userAge">
          <el-input v-model.number="form.userAge"></el-input>
        </el-form-item>
        <el-form-item
          label="证件类型"
          class="userCardTypes"
          prop="userCardTypes"
        >
          <el-select v-model="form.userCardTypes" placeholder="请选择证件类型">
            <el-option label="身份证" value="IDcard"></el-option>
            <el-option label="护照" value="Passport"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" class="userCardNum" prop="userCardNum">
          <el-input v-model="form.userCardNum"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" class="userPhoneNum" prop="userPhoneNum">
          <el-input v-model="form.userPhoneNum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 150px"
            >保存</el-button
          ><el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInfo',
  data() {
    return {
      form: {
        userName: '',
        userSex: '',
        userSex: '',
        userCardTypes: '',
        userCardNum: '',
        userPhoneNum: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请填写真实姓名',
            trigger: 'blur'
          }
        ],
        userSex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        userAge: [
          { required: true, message: '年龄不能为空' },
          { type: 'number', message: '年龄必须为数字值' }
        ],
        userCardTypes: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        userCardNum: [
          {
            required: true,
            message: '请填写所选证件的证件号码',
            trigger: 'blur'
          }
        ],
        userPhoneNum: [
          {
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '请正确填写手机号码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.container {
  float: right;
  width: 83%;
  height: 720px;
  background-color: #fff;
  border-radius: 0 0 20px 0;
  margin: 0;
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

.PersonalInfoForm {
  padding: 20px;
  margin-left: 20%;
}

.PersonalInfoForm h2 {
  margin-left: 15%;
}

.PersonalInfoForm .userName {
  width: 300px;
}

.PersonalInfoForm .userAge {
  width: 200px;
  margin-bottom: 30px;
}

.PersonalInfoForm .userCardTypes {
  width: 250px;
}

.PersonalInfoForm .userCardNum {
  width: 400px;
}

.PersonalInfoForm .userPhoneNum {
  width: 400px;
}
</style>