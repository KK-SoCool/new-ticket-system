<template>
  <transition name="dialog-fade">
    <el-dialog
      v-if="showTable"
      :title="trainTableTitle"
      class="dialog-component"
      :visible.sync="showTable"
      width="1000px"
      @close="closeDialog(0)"
    >
      <div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane label="车票信息" name="ticket">
              <TicketTable v-if="activeName === 'ticket'" ref='ticket'></TicketTable>
          </el-tab-pane>
          <el-tab-pane label="退票信息" name="unticket">
              <UnTicketTable v-if="activeName === 'unticket'" ref='unticket'></UnTicketTable>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </transition>
</template>

<script>
import TicketTable from '@/ManagerComponents/TicketTable.vue'
import UnTicketTable from '@/ManagerComponents/UnTicketTable.vue'
import axios from 'axios'
export default {
  name: 'TrainDialog',
  inject:['reload'],
  components:{TicketTable,UnTicketTable},
  props: {
    trainTableTitle: {
      type: String,
      default: "查看信息",
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
      showTable: false,
      activeName: 'ticket',
      formInfo: JSON.parse(JSON.stringify(this.itemInfo)),
    };
  },
  updated() {
    this.onQuery()
  },
  methods: {
    // 关闭弹框
    closeDialog(flag) {
      // this.showTable = false;
      this.reload()
      this.$emit("closeDialog", flag);
    },
    handleClick(tab, event) {
      console.log(this.formInfo.trainId)
      this.activeName =tab.name
      setTimeout(() =>{
        this.onQuery()
      },500)
    },
    onQuery(){
      this.$refs[this.activeName].getList(this.formInfo.trainId)
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