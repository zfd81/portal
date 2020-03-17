<template>
  <div>
    <el-row style="margin-top: 20px;margin-bottom: 8px;">
      <el-col :span="24">
        <div>
          日期：<el-date-picker v-model="date" align="right" type="date" placeholder="请选择日期" :picker-options="pickerOptions"> </el-date-picker>
          <span style="margin-right: 20px"></span>
          <el-button type="primary" @click="selectPrescriptions" plain>查询处方</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="box-table">
      <el-row>
        <el-table ref="multipleTable" v-loading="loading" element-loading-text="拼命加载中" :data="prescriptions" max-height="700">
          <el-table-column type="index" width="28"> </el-table-column>
          <el-table-column prop="prescription_id" label="处方编号" width="150"></el-table-column>
          <el-table-column prop="name" label="患者姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="occ_name" label="职业"></el-table-column>
          <el-table-column prop="contact_number" label="联系电话"></el-table-column>
          <el-table-column prop="mm_name" label="调剂方式"></el-table-column>
          <el-table-column label="创建日期" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.created_date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini">处方内容</el-button>
              <el-button size="mini" type="danger">打印处方</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <el-row>
      <el-pagination
        background
        layout="prev, pager, next, total"
        :page-sizes="[5, 10, 20, 40, 100]"
        :page-size="size"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ListByDate",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "前天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      date: new Date(),
      prescriptions: [],
      num: 1,
      size: 30,
      total: 10,
      loading: false
    };
  },
  methods: {
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
      return y + "-" + MM + "-" + d;
    },
    selectPrescriptions() {
      this.loading = true;
      this.$axios
        .get("/p/tcm/prescription/date/".concat(this.formatDateTime(this.date)), {
          params: {
            num: this.num,
            size: this.size
          },
          paramsSerializer: params => {
            return this.$qs.stringify(params, {
              arrayFormat: "repeat"
            });
          }
        })
        .then(response => {
          this.prescriptions = response.data.l;
          this.total = response.data.cnt;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChange(num) {
      this.num = num;
      this.selectPrescriptions();
    }
  },
  created: function() {
    this.selectPrescriptions();
  }
};
</script>

<style scoped>
.box-table {
  border: solid #ebeef5;
  border-width: 1px 1px 1px 1px;
  padding: 15px;
}
</style>
