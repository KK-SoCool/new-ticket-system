<template>
  <div class="UnTicketInfo">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" class="biaoqian">
        <el-breadcrumb-item :to="{ path: '/managerMainInterface' }"
          >火车售票系统</el-breadcrumb-item
        >
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </div>
    <div class="showPersonalCenter">
        <div class="container">
            <h2>个人信息</h2>
            <el-form :label-position="labelPosition" label-width="30%">
                <el-form-item label="用户名">
                    <el-col :span="16">
                    <el-input v-model="formLabelAlign.name" :readonly="true"></el-input>
                     </el-col>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-col :span="16">
                    <el-input v-model="formLabelAlign.region" :readonly="true"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证号码">
                    <el-col :span="16">
                    <el-input v-model="formLabelAlign.type" :readonly="true"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-col :span="16">
                    <el-input v-model="formLabelAlign.phone" :readonly="true"></el-input>
                    </el-col>
                </el-form-item>
                </el-form>
                <el-button type="primary" round  @click="dialogFormVisible = true">修改信息</el-button>
        </div>
    </div>
              <el-dialog title="个人中心" :visible.sync="dialogFormVisible">
            <el-form :model="formLabelAlign">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="formLabelAlign.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="formLabelAlign.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="省份证号码" :label-width="formLabelWidth">
                <el-input v-model="formLabelAlign.type" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" :label-width="formLabelWidth">
                <el-input v-model="formLabelAlign.phone" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="certain">确 定</el-button>
            </div>
          </el-dialog>
            </div>
</template>

<script>
export default {
  name: 'PersonalCenter',
  data() {
      return {
        dialogFormVisible: false,
        labelPosition: 'right',
        formLabelAlign: {
          name: 'ouyang',
          region: '欧阳',
          type: '1111111',
          phone:'13311111111'
        },
        formLabelWidth: '120px'
      };
    },
    methods:{
        cancel(){
          this.dialogFormVisible = false
          this.$message({
          showClose: true,
          message: '已取消修改'
        });
        },
        certain(){
          this.dialogFormVisible = false
          this.$message({
          showClose: true,
          message: '修改信息成功',
          type: 'success'
        });
        }
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

.showPersonalCenter {
  width: 100%;
}

.container {
  padding: 40px;
  text-align: center;
}

.showPersonalCenter .container .change{
    text-align: center;
}
</style>