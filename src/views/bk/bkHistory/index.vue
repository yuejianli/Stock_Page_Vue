<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="请选择版块:">
          <el-select v-model="searchObj.bkCode" class="filter-item" filterable @change="fetchData()">
            <el-option
              v-for="item in bks"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="查询范围: ">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            format = "yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate()"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="syncHistoryData()">同步历史</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="编码" align="center">
        <template slot-scope="scope">
          {{ scope.row.bkCode }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.bkName }}
        </template>
      </el-table-column>
      <el-table-column label="当前日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.currentDateStr }}
        </template>
      </el-table-column>
      <el-table-column :formatter ="bkNowPriceFormatter" prop="bkNowPrice" label="当时价格" width="200px" class="info"/>
      <el-table-column :formatter ="todayMainInflowFormatter" prop="todayMainInflow" label="今日主力净注入净额" width="200px"/>
      <el-table-column :formatter ="todaySuperInflowFormatter" prop="todaySuperInflow" label="超大净注入净额" width="200px"/>
      <el-table-column :formatter ="todayMoreInflowFormatter" prop="todayMoreInflow" label="大单净注入净额" width="200px"/>
      <el-table-column :formatter ="todayMiddleInflowFormatter" prop="todayMiddleInflow" label="中单净注入净额" width="200px"/>
      <el-table-column :formatter ="todaySmallInflowFormatter" prop="todaySmallInflow" label="小单净注入净额" width="200px"/>
      <el-table-column :formatter ="todayMainInflowCodeFormatter" prop="todayMainInflowCode" label="主力净注入股票编码" width="200px"/>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
  </div>
</template>

<script>
import bkApi from '@/api/bk/bk'
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
        type: 0,
        bkCode: '',
        startDate: '',
        endDate: ''
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数
      dateRange: [],
      bks: null,
      bkCode: undefined
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.initDate()
    this.getParams()
    this.initBks()
    this.listLoading = true
    this.fetchData(this.currentPage, this.pagesize)
  },
  methods: {
    bkNowPriceFormatter(row, column) {
      return row.bkNowPrice + ' (' + row.bkNowProportion + '%)'
    },
    todayMainInflowFormatter(row, column) {
      return row.todayMainInflow + ' (' + row.todayMainInflowProportion + '%)'
    },
    todaySuperInflowFormatter(row, column) {
      return row.todaySuperInflow + ' (' + row.todaySuperInflowProportion + '%)'
    },
    todayMoreInflowFormatter(row, column) {
      return row.todayMoreInflow + ' (' + row.todayMoreInflowProportion + '%)'
    },
    todayMiddleInflowFormatter(row, column) {
      return row.todayMiddleInflow + ' (' + row.todayMiddleInflowProportion + '%)'
    },
    todaySmallInflowFormatter(row, column) {
      return row.todaySmallInflow + ' (' + row.todaySmallInflowProportion + '%)'
    },
    todayMainInflowCodeFormatter(row, column) {
      if (row.todayMainInflowCode) {
        return row.todayMainInflowCode + ' (' + row.todayMainInflowName + ')'
      }
      return ''
    },
    getParams() {
      this.bkCode = this.$route.query.bkCode
    },
    // 初始化版块列表
    initBks() {
      bkApi.listBk({}).then(
        response => {
          console.log('bkCode', this.bkCode)
          this.bks = response.data || []
          this.searchObj.bkCode = this.bkCode || response.data[0].code
          this.fetchData(this.currentPage, this.pagesize)
        }
      ).catch(error => {
        // 请求失败，则打印错误
        console.log(error)
      })
    },
    initDate() {
      const end = new Date(new Date().toLocaleDateString())
      const start = new Date(new Date().toLocaleDateString())
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      end.setTime(end.getTime() + 3600 * 1000 * 24 - 1)
      const s = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
      const e = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
      this.dateRange = [s, e]
      this.searchObj.startDate = s
      this.searchObj.endDate = e
    },
    fetchData(currentPage = 1, pagesize = 10) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      bkApi.getPageList(this.currentPage, this.pagesize, this.searchObj).then(
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
    },
    changeDate() {
      this.searchObj.startDate = this.dateRange[0]
      this.searchObj.endDate = this.dateRange[1]
      this.fetchData(this.currentPage, this.pagesize)
    },
    syncHistoryData() {
      const asyncData = {
        bkCode: this.searchObj.bkCode,
        startDate: this.searchObj.startDate,
        async: false
      }
      bkApi.asyncBkMoney(asyncData).then(
        response => {
          this.$message({
            type: 'success',
            message: '同步版块历史记录成功!'
          })
          this.fetchData(this.currentPage, this.pagesize)
        }
      ).catch(error => {
        // 请求失败，则打印错误
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  color:red;
  font-size: 18px;
}

</style>
