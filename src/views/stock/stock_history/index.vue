<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
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
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showHistory(scope.row)">查看历史</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
    <!--股票历史展示-->
    <el-dialog :visible.sync="showHistoryDialogVisible" title="查看历史记录信息" width="90%">
      <el-form :inline="true" :model="history" class="demo-form-inline">
        <el-form-item label="查询范围: ">
          <el-date-picker
            v-model="history.dateRange"
            type="daterange"
            format = "yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate()"/>
        </el-form-item>
        <el-form-item>
          <el-button v-if="false" type="primary" @click="syncHistoryDataShow()">同步股票历史交易信息</el-button>
        </el-form-item>
        <el-table
          v-loading="history.listLoading"
          :data="history.list"
          element-loading-text="Loading"
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
        <el-pagination :total="history.total" :current-page="history.currentPage" :page-sizes="[5, 7, 10,20]" :page-size="history.pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleHistoryCurrentChange" @size-change="handleHistorySizeChange"/>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import selectedApi from '@/api/stock/selected'
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
      searchObj: {}, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数
      // 对股票历史进行处理
      showHistoryDialogVisible: false,
      history: {
        dateRange: [],
        listLoading: true,
        list: null,
        // 追加分页相关的数据信息
        searchObj: {
          code: '',
          startDate: '2023-03-01',
          endDate: '2023-03-12'
        }, // 查询条件
        currentPage: 1, // 当前页
        pagesize: 5, // 每页显示记录数
        total: 0
      }
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.listLoading = true
    this.fetchData(this.currentPage, this.pagesize)
    this.initDate()
  },
  methods: {
    initDate() {
      const end = new Date(new Date().toLocaleDateString())
      const start = new Date(new Date().toLocaleDateString())
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      end.setTime(end.getTime() + 3600 * 1000 * 24 - 1)
      const s = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
      const e = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
      this.history.dateRange = [s, e]
      this.history.searchObj.startDate = s
      this.history.searchObj.endDate = e
    },
    fetchData(currentPage, pagesize) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      selectedApi.yesHistory(this.currentPage, this.pagesize, null).then(
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
    showHistory(row) {
      // 调用 fetchData 方法
      this.history.listLoading = true
      this.history.searchObj.code = row.code
      this.fetchHistoryData(this.history.currentPage, this.history.pagesize)
      this.showHistoryDialogVisible = true
    },
    changeDate() {
      console.log('date', this.history.dateRange)
      this.history.searchObj.startDate = this.history.dateRange[0]
      this.history.searchObj.endDate = this.history.dateRange[1]
      this.fetchHistoryData(this.history.currentPage, this.history.pagesize)
    },
    fetchHistoryData(currentPage = 1, pagesize = 5) {
      // 异步获取数据 (ajax)
      this.history.currentPage = currentPage
      this.history.pagesize = pagesize
      this.history.searchObj.pageSize = pagesize
      this.history.searchObj.pageNum = currentPage
      stockHistoryApi.getPageList(this.history.searchObj).then(
        response => {
          this.history.list = response.data.list
          // 添加响应数
          this.history.total = response.data.total
          this.history.listLoading = false
        }
      ).catch(error => {
        // 请求失败，则打印错误
        console.log(error)
      })
    },
    // 页码控制
    handleHistoryCurrentChange(val) {
      this.history.currentPage = val
      this.fetchHistoryData(this.history.currentPage, this.history.pagesize)
    },
    // 页数控制
    handleHistorySizeChange(val) {
      this.history.pagesize = val
      this.history.currentPage = 1
      this.fetchHistoryData(this.history.currentPage, this.history.pagesize)
    }
  }
}
</script>
