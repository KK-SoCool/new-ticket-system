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
        <el-checkbox-group v-model="formData.checkedPassenger">
          <el-checkbox
            v-for="p in passengers"
            :label="p.cardNum"
            :key="p.cardNum"
            border
            size="medium"
            >姓名：{{ p.name }} /证件号：{{ p.cardNum }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    switchStyle: {
      type: Boolean,
      default: true
    },
    tittle: {
      type: String,
      default: '请选择乘车人信息'
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
        checkedPassenger: []
      },
      passengers: [
        {
          name: '张三',
          cardNum: '111'
        },
        {
          name: '李四',
          cardNum: '222'
        }
      ],
      rules: {},
      isShow: false,
      formLabelWidth: '100px'
    }
  },
  methods: {
    cancel() {
      this.isShow = false
    },
    submit() {
      this.isShow = false
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
