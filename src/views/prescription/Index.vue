<template>
  <div>
    <el-card class="box-card">
      <div>
        <h2 style="text-align: center; margin-top: 1px;margin-bottom: 1px">
          门诊处方
        </h2>
      </div>
      <div style="text-align: right">处方编号：{{ id | formatDateTime }}</div>
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
                @click="showDialog(1)"
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
              <el-divider content-position="left"><h3>证机概要</h3></el-divider>
              <span>{{ selectSymptomOutLine }}</span>
              <el-divider content-position="left"><h3>治疗法则</h3></el-divider>
              <span>{{ selectSymptomTherapy }}</span>
              <el-divider content-position="left"><h3>处方用药</h3></el-divider>
              <span>{{ selectSymptomDrugDesc }}</span>
              <el-divider content-position="left"><h3>服药方法</h3></el-divider>
              <span>{{ selectSymptomTakingMethod }}</span>
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
              <h3 style="margin-top: 0px" v-on:click="showAlert">
                医生：XXX
              </h3>
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
      <span style="font-size: 23px" v-show="alertVisible">{{ price }}</span>
    </el-card>
    <el-dialog
      title="请选择主症"
      width="1024px"
      :visible.sync="symptomDialogVisible"
    >
      <el-table
        :data="symptoms"
        :show-header="false"
        @row-click="selectSymptom"
        class="table-box"
      >
        <el-table-column property="symptom_name" width="180"></el-table-column>
        <el-table-column property="symptom_desc"></el-table-column>
      </el-table>
      <el-dialog
        title="请选择主症"
        width="1024px"
        :visible.sync="symptomItemDialogVisible"
        append-to-body
      >
        <el-table
          ref="multipleTable"
          :data="symptomItems"
          :show-header="false"
          @row-click="selectSymptomItem"
          @selection-change="handleSelectionChange"
          class="table-box"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column property="symptom_desc"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeSymptomItem">关 闭</el-button>
          <el-button type="primary" @click="confirm">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Prescription",
  data() {
    return {
      id: new Date(),
      input: "",
      value: "",
      symptoms: [],
      symptomItems: [],
      selectSymptomId: "", //症状编码
      selectSymptomOutLine: "空", //证机概要
      selectSymptomTherapy: "空", //治疗法则
      selectSymptomDrugDesc: "空", //处方用药
      selectSymptomTakingMethod: "空", //服用方法
      price: 0,
      selectItems: [], //加减项
      symptomDialogVisible: false,
      symptomItemDialogVisible: false,
      alertVisible: false
    };
  },
  filters: {
    formatDateTime(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  methods: {
    showDialog(flag) {
      if (flag == 1) {
        this.$axios
          .get("/p/tcm/symptom/parent/bgbz")
          .then(response => {
            this.symptoms = response.data;
            this.symptomDialogVisible = true;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    showAlert() {
      if (this.alertVisible) {
        this.alertVisible = false;
      } else {
        this.alertVisible = true;
      }
    },
    selectSymptom(row, column, event) {
      this.selectSymptomId = row.symptom_code;
      var level = row.symptom_level;
      this.$axios
        .get("/p/tcm/symptom/parent/".concat(row.symptom_code))
        .then(response => {
          if (level < 99) {
            this.symptoms = response.data;
          } else if (level == 99) {
            this.symptomItems = response.data;
            this.symptomItemDialogVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectSymptomItem(row, column, event) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    handleSelectionChange(val) {
      this.selectItems = val;
    },
    closeSymptomItem() {
      this.selectSymptomId = "";
      this.symptomDialogVisible = false;
      this.symptomItemDialogVisible = false;
    },
    confirm() {
      this.$axios
        .get("/p/tcm/symptom/", {
          params: {
            id: this.selectSymptomId,
            items: this.extractArray(this.selectItems, "symptom_code")
          },
          paramsSerializer: params => {
            return this.$qs.stringify(params, {
              arrayFormat: "repeat"
            });
          }
        })
        .then(response => {
          this.closeSymptomItem();
          this.selectSymptomOutLine = response.data.symptom.symptom_outline;
          this.selectSymptomTherapy = response.data.symptom.therapy;
          this.selectSymptomTakingMethod = response.data.symptom.taking_method;
          this.selectSymptomDrugDesc = response.data.drugInfo.drug;
          this.price = response.data.price;
        })
        .catch(error => {
          console.log(error);
        });
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
.el-divider-1 {
  font-size: 28px;
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
.table-box {
  margin-top: 0px;
  font-size: 17px;
}
</style>
