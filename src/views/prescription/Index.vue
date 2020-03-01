<template>
  <div>
    <el-card class="box-card">
      <div>
        <h2 style="text-align: center; margin-top: 0px">门诊处方</h2>
      </div>
      <div class="box-table">
        <el-row>
          <el-col :span="3">
            <div class="grid-content grid-label">
              <h3 style="margin-top: 0px">姓名</h3>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">
              <el-input v-model="input" placeholder="请输入姓名"></el-input>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content grid-label">
              <h3 style="margin-top: 0px">性别</h3>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">
              <el-select v-model="value" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content grid-label">
              <h3 style="margin-top: 0px">年龄</h3>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">
              <el-input v-model="input" placeholder="请输入年龄"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div class="grid-content grid-label">
              <h3 style="margin-top: 0px">职业</h3>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">
              <el-select v-model="value" placeholder="请选择职业">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content grid-label">
              <h3 style="margin-top: 0px">电话</h3>
            </div>
          </el-col>
          <el-col :span="13">
            <div class="grid-content">
              <el-input v-model="input" placeholder="请输入电话"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div class="grid-content grid-label">
              <h3 style="margin-top: 0px">住址</h3>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content">
              <el-input v-model="input" placeholder="请输入住址"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content grid-label">
              <el-button
                @click="drawer = true"
                type="primary"
                size="medium"
                plain
              >
                辩证
              </el-button>
              <el-button
                @click="drawer = true"
                type="success"
                size="medium"
                plain
              >
                散剂
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content grid-text">
              <el-divider content-position="left">证机概要</el-divider>
              <span>111</span>
              <el-divider content-position="left">治疗法则</el-divider>
              <span>222</span>
              <el-divider content-position="left">处方用药</el-divider>
              <span></span>
              <el-divider content-position="left">服药方法</el-divider>
              <span></span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div class="grid-content grid-label">
              <h3 style="margin-top: 0px">服药</h3>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">
              <el-select v-model="value" placeholder="请选择服药天数">
                <el-option label="1付" value="1"></el-option>
                <el-option label="2付" value="2"></el-option>
                <el-option label="3付" value="3"></el-option>
                <el-option label="5付" value="5"></el-option>
                <el-option label="7付" value="7"></el-option>
                <el-option label="10付" value="10"></el-option>
                <el-option label="15付" value="15"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="grid-content grid-label">
              <h3 style="margin-top: 0px">医生：XXX</h3>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content grid-label">
              <el-button type="danger" size="medium" style="width: 120px">
                保存
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :wrapperClosable="true"
      :with-header="false"
      size="60%"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Prescription",
  data() {
    return {
      input: "",
      value: "",
      drawer: false,
      direction: "ltr"
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
.box-card {
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  padding: 0px 10px 10px 10px;
}
.box-table {
  border: solid #2d3e50;
  border-width: 1px 0px 0px 1px;
  cellspacing: 0px;
}
.el-row {
  margin: 0px;
  width: 100%;
}
.el-col {
  border: solid #2d3e50;
  border-width: 0px 1px 1px 0px;
  min-height: 40px;
}
.grid-content {
  margin: 2px;
  min-height: 40px;
  text-align: center;
}
.grid-label {
  line-height: 39px;
}
.grid-text {
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 30px;
  min-height: 370px;
  text-align: left;
}
</style>
