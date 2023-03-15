<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form label-position="left" class="demo-form" style="width:700px;margin-left:50px;">
        <el-form-item label="股票编码:">
          <el-col :span="18">
            <el-input v-model="form.code" />
          </el-col>
        </el-form-item>
        <el-form-item label="查询范围: ">
          <el-col :span="18">
            <el-date-picker
              v-model="dateRange"
              :picker-options="timeChange"
              type="daterange"
              format = "yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate()"/>
          </el-col>
        </el-form-item>
        <el-form-item label="固定月:">
          <el-col :span="18">
            <el-input v-model="form.month" />
          </el-col>
        </el-form-item>
        <el-form-item label="查询类型:">
          <el-radio-group v-model="type" @change="changeType()">
            <el-radio :label="1">天查询</el-radio>
            <el-radio :label="2">星期</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if ="type ===1" label="开始天(月单位):">
          <el-col :span="18">
            <el-input v-model="form.startDayNum" />
          </el-col>
        </el-form-item>
        <el-form-item v-if ="type ===1" label="结束天(月单位):">
          <el-col :span="18">
            <el-input v-model="form.endDayNum" />
          </el-col>
        </el-form-item>
        <el-form-item v-if ="type ===2" label="星期(周单位):">
          <el-col :span="18">
            <el-checkbox v-model="form.weeks" label="1">星期一</el-checkbox>
            <el-checkbox v-model="form.weeks" label="2">星期二</el-checkbox>
            <el-checkbox v-model="form.weeks" label="3">星期三</el-checkbox>
            <el-checkbox v-model="form.weeks" label="4">星期四</el-checkbox>
            <el-checkbox v-model="form.weeks" label="5">星期五</el-checkbox>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column prop="currDate" label="日期" width="200px"/>
      <el-table-column prop="code" label="股票编码" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="closingPrice" label="股票编码" />
      <el-table-column prop="highestPrice" label="最高价格" />
      <el-table-column prop="lowestPrice" label="最低价格" />
      <el-table-column prop="openingPrice" label="开盘价" />
      <el-table-column prop="yesClosingPrice" label="昨天的收盘价" width="120px"/>
      <el-table-column prop="amplitude" label="涨跌额" />
      <el-table-column prop="amplitudeProportion" label="涨跌幅" />
      <el-table-column prop="tradingVolume" label="成交量" />
      <el-table-column prop="tradingValue" label="成交金额" />
      <el-table-column prop="outDish" label="外盘数量" />
      <el-table-column prop="innerDish" label="内盘数量" />
      <el-table-column prop="changingProportion" label="换手率" />
      <el-table-column prop="than" label="量比" />
      <el-table-column prop="avgPrice" label="均价" />
      <el-table-column prop="ttmPriceRatio" label="TTM 市盈率" />
      <el-table-column prop="buyHand" label="买前五手" />
      <el-table-column prop="sellHand" label="卖前五手" />
      <el-table-column prop="appointThan" label="委比" />
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
  </div>
</template>

<script>
import stockHistoryApi from '@/api/stock/stockhistory'
export default {
  // 定义 过滤器
  filters: {
  },
  // 定义数据模型
  data() {
    return {
      listLoading: true,
      list: null,
      // 追加分页相关的数据信息
      searchObj: {
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数
      dateRange: [],
      timeChange: {
        disabledDate(time) {
          // 选择时间范围
          return time.getTime() > (Date.now() - 3600 * 1000 * 24 * 1)
        }
      },
      type: 1,
      form: {
        code: '002812',
        month: '',
        startDate: '',
        endDate: '',
        startDayNum: '',
        endDayNum: '',
        weeks: [],
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.listLoading = true
    this.initDate()
    this.fetchData(this.currentPage, this.pagesize)
  },
  methods: {
    // 单选框改变类型
    changeType() {
      if (this.type === 1) {
        this.form.weeks = []
      } else {
        this.form.startDayNum = null
        this.form.endDayNum = null
      }
    },
    initDate() {
      const now = new Date()
      const end = new Date(now.toLocaleDateString())
      const start = new Date(now.toLocaleDateString())
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      end.setTime(end.getTime() + 3600 * 1000 * 24 - 1)
      const s = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
      const e = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
      this.dateRange = [s, e]
      this.form.startDate = s
      this.form.endDate = e
      // this.form.month = now.getMonth() + 1
      // 获取当前的天
      var nowDay = now.getDate()
      if (nowDay >= 23) {
        this.form.startDayNum = 23
        this.form.endDayNum = 31
      } else {
        this.form.startDayNum = nowDay
        this.form.endDayNum = nowDay + 7
      }
    },
    fetchData(currentPage = 1, pagesize = 10) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      this.form.pageNum = currentPage
      this.form.pageSize = pagesize
      stockHistoryApi.listDayRange(this.form).then(
        response => {
          this.list = response.data.list
          // 添加响应数
          this.total = response.data.total
          this.listLoading = false
        }
      ).catch(error => {
        // 请求失败，则打印错误
        console.log(error)
      })
    },
    // 页码控制
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage, this.pagesize)
    },
    // 页数控制
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      this.fetchData(this.currentPage, this.pagesize)
    }
  }
}
</script>
