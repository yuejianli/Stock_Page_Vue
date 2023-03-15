<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchObj.keyword" placeholder="股票的代码或者名称" style="width: 200px;margin-bottom:30px;" class="filter-item" @change="fetchData()"/>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" prop="code" label="股票代码" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="股票名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="股票类型" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.exchange | exchangeFilter }}
        </template>
      </el-table-column>
      <el-table-column label="股票代码全称" width="200">
        <template slot-scope="scope">
          {{ scope.row.fullCode }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDetail(scope.row)">查看详细信息</el-button>
          <el-button type="primary" size="mini" @click="showHistory(scope.row)">查看历史</el-button>
          <el-button type="warning" size="mini" @click="addSelected(scope.row)">加入自选</el-button>
          <el-button type="primary" size="mini" @click="showMinute(scope.row)">分钟k线</el-button>
          <el-button type="primary" size="mini" @click="showDay(scope.row)">天k线</el-button>
          <el-button type="primary" size="mini" @click="showWeekly(scope.row)">周k线</el-button>
          <el-button type="primary" size="mini" @click="showMonthly(scope.row)">月k线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
    <!--股票详情展示-->
    <el-dialog :visible.sync="showDetailDialogVisible" title="查看股票信息">
      <el-form :model="detailInfo" style="width: 800px;">
        <el-form-item label="">
          <el-col :span="6">代码:</el-col>
          <el-col :span="6">{{ detailInfo.code }} </el-col>
          <el-col :span="6">名称:</el-col>
          <el-col :span="6">{{ detailInfo.name }} </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="6">开盘价:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.openingPrice }} </el-col>
          <el-col :span="6">昨天收盘价:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.yesClosingPrice }} </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="6">最高价格:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.highestPrice }} </el-col>
          <el-col :span="6">最低价格:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.lowestPrice }} </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="6">当前的价格:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.closingPrice }} </el-col>
          <el-col :span="6">今天收盘价:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.nowPrice }} </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="6">成交量(股):</el-col>
          <el-col :span="6">{{ detailInfo.tradingVolume }} </el-col>
          <el-col :span="6">成交量金额:</el-col>
          <el-col :span="6">{{ detailInfo.tradingValue }} </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="6">涨跌幅度:</el-col>
          <el-col :span="6">{{ detailInfo.amplitude }} </el-col>
          <el-col :span="6">涨跌幅度百分比:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.amplitudeProportion }} </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDetailDialogVisible = false"> 返回</el-button>
      </div>
    </el-dialog>
    <!--K线图展示-->
    <el-dialog :visible.sync="showKDialogVisible" :title="showKText">
      <el-form :model="detailInfo" style="width: 800px;">
        <el-form-item label="">
          <img :src="'data:image/png;base64,'+ url" alt="">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showKDialogVisible = false"> 返回</el-button>
      </div>
    </el-dialog>
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
    <!--同步历史展示-->
    <el-dialog :visible.sync="asyncHistoryDialogVisible" title="同步历史交易信息">
      <el-form style="width: 800px;">
        <el-form-item label="同步范围:">
          <el-col :span="10">
            <el-select v-model="asyncType" class="filter-item">
              <el-option
                v-for="item in asyncTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col v-if="asyncType == 0" :span="10">
            <el-date-picker
              v-model="asyncDateRange"
              :default-time="['00:00:00', '23:59:59']"
              type="daterange"
              format = "yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期" />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="asyncHistoryDialogVisible = false"> 返回</el-button>
        <el-button type="success" @click="asyncHistoryData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import stockApi from '@/api/stock/stock'
import stockCrawlerApi from '@/api/stockconfig/stockCrawler'
import selectedApi from '@/api/stock/selected'
import stockHistoryApi from '@/api/stock/stockhistory'
const detailInfo = {
  code: '',
  name: '',
  openingPrice: '',
  yesClosingPrice: '',
  highestPrice: '',
  lowestPrice: '',
  closingPrice: '',
  nowPrice: '',
  tradingVolume: '',
  tradingValue: '',
  amplitude: '',
  amplitudeProportion: ''
}
const asyncTypes = [
  { 'id': 1, 'name': '同步最近一周' },
  { 'id': 2, 'name': '同步最近一月' },
  { 'id': 3, 'name': '同步最近一年' },
  { 'id': 4, 'name': '同步最近三年' },
  { 'id': 5, 'name': '同步最近五年' },
  { 'id': 6, 'name': '同步最近十年' },
  { 'id': 7, 'name': '全部交易记录' },
  { 'id': 0, 'name': '自定义日期' }
]
export default {
  // 定义 过滤器
  filters: {
    exchangeFilter(exchange) {
      let message = ''
      switch (exchange) {
        case 0: {
          message = '深圳交易所股票'
          break
        }
        case 1: {
          message = '上海交易所股票'
          break
        }
        case 2: {
          message = '北京交易所股票'
          break
        }
        default: {
          break
        }
      }
      return message
    }
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
      // 对股票详情和 K线图进行展示
      showDetailDialogVisible: false,
      showKDialogVisible: false,
      showKType: 1,
      showKText: '',
      detailInfo: detailInfo,
      url: '5bKz5rO96ZyWLOS9oOWlveWVig==',
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
      },
      asyncHistoryDialogVisible: false,
      asyncType: 1,
      asyncDateRange: [],
      asyncTypes
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
    fetchData(currentPage = 1, pagesize = 10) {
      console.log('翻页.....', currentPage, pagesize)
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      stockApi.getPageList(this.currentPage, this.pagesize, this.searchObj).then(
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
    // 查看详情信息
    showDetail(row) {
      // 查询信息
      stockCrawlerApi.getInfoNow(row.code).then(
        response => {
          this.detailInfo = Object.assign({}, response.data)
          this.showDetailDialogVisible = true
        }
      )
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
    },
    addSelected(row) {
      this.$confirm('您确定将该股票【' + row.name + '】加入自选吗 ？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        selectedApi.add({ stockCode: row.code, notes: '' }).then(response => {
          this.$message({
            type: 'success',
            message: '添加到自选列表成功!'
          })
        })
      })
    },
    showMinute(row) {
      // 继续查询 K 线
      this.showKText = '查看分钟级别的K线图'
      this.showKUrl(row.fullCode, 1)
    },
    showDay(row) {
      this.showKText = '查看天级别的K线图'
      this.showKUrl(row.fullCode, 2)
    },
    showWeekly(row) {
      this.showKText = '查看周级别的K线图'
      this.showKUrl(row.fullCode, 3)
    },
    showMonthly(row) {
      this.showKText = '查看月级别的K线图'
      this.showKUrl(row.fullCode, 4)
    },
    showKUrl(fullCode, type) {
      stockCrawlerApi.getStockKline(fullCode, type).then(
        response2 => {
          // 处理展示 base64 字符串
          this.url = response2.data
          this.showKDialogVisible = true
        }
      )
    },
    syncHistoryDataShow() {
      this.asyncType = 1
      this.showHistoryDialogVisible = false
      this.asyncHistoryDialogVisible = true
    },
    asyncHistoryData() {
      const asyncData = {
        code: this.history.searchObj.code,
        type: this.asyncType,
        exchange: '0',
        startDate: this.asyncDateRange[0] || '',
        endDate: this.asyncDateRange[1] || ''
      }
      stockCrawlerApi.stockHistoryAsync(asyncData).then(
        response2 => {
          // 处理展示 base64 字符串
          this.asyncHistoryDialogVisible = false
          this.showHistoryDialogVisible = true
          this.fetchHistoryData()
        }
      )
    }
  }
}
</script>
