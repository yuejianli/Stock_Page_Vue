<template>
  <div class="app-container">
    <div>
      <el-row>
        <p>虚拟股票持仓信息:</p>
        <el-col :span="12">
          <el-form :model="moneyInfo" style="width: 800px;">
            <el-form-item label="" mode="moneyInfo">
              <el-col :span="4">总资产:</el-col>
              <el-col :span="4">{{ moneyInfo.totalMoney }} </el-col>
              <el-col :span="4">净值资产:</el-col>
              <el-col :span="4">{{ moneyInfo.marketMoney }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="4">可用资产:</el-col>
              <el-col :span="4" class="focus-info">{{ moneyInfo.useMoney }} </el-col>
              <el-col :span="4">可取资产:</el-col>
              <el-col :span="4" class="focus-info">{{ moneyInfo.takeoutMoney }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="4">总盈亏:</el-col>
              <el-col :span="4" class="focus-info">{{ moneyInfo.profitMoney }} </el-col>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-row style="margin-top:20px;margin-bottom:20px;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查询类型: ">
          <el-select v-model="searchObj.selectType" class="filter-item" filterable @change="fetchData()">
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="今日总盈亏:">
          <el-col :span="18">{{ todayMoney }}</el-col>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="股票编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="股票内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="总数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.allAmount }}
        </template>
      </el-table-column>
      <el-table-column label="可用数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.useAmount }}
        </template>
      </el-table-column>
      <el-table-column label="成本价" align="center">
        <template slot-scope="scope">
          {{ scope.row.avgPrice }}
        </template>
      </el-table-column>
      <el-table-column label="当前价" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="总市值" align="center">
        <template slot-scope="scope">
          {{ scope.row.allMoney }}
        </template>
      </el-table-column>
      <el-table-column label="今日盈亏" align="center">
        <template slot-scope="scope">
          {{ scope.row.todayMoney }}
        </template>
      </el-table-column>
      <el-table-column label="浮动盈亏" align="center">
        <template slot-scope="scope">
          {{ scope.row.floatMoney }}
        </template>
      </el-table-column>
      <el-table-column label="盈亏比例 (%)" align="center">
        <template slot-scope="scope">
          {{ scope.row.floatProportion }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width ="200" fixed="right">
        <template slot-scope="scope">
          <el-button type ="warning" size="mini" @click="showBuy(scope.row)">买入委托</el-button>
          <el-button v-if="scope.row.useAmount >= 100 " type="primary" size="mini" @click="showSell(scope.row)">卖出委托</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" title="买卖股票">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        style="width:250px; margin-left:20px;"
      >
        <!--开始添加元素-->
        <el-form-item label="价格:">
          <el-col :span="16"><el-input v-model="temp.price"/></el-col>
        </el-form-item>
        <el-form-item label="股票数:">
          <el-col :span="16">
            <el-input-number
              v-model="temp.amount"
              :step="100"
              :min="100"
              step-strictly
          /></el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'buy' ? buy() : sell()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import trademoneyApi from '@/api/trade/trademoney'
import positionApi from '@/api/trade/position'
import buyApi from '@/api/trade/buy'
import sellApi from '@/api/trade/sell'
const types = [
  { 'id': 1, name: '持仓' },
  { 'id': 2, name: '持仓和自选' }
]
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
        'mockType': 1,
        'selectType': 1
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 200, // 每页显示记录数
      total: 0, // 总记录数
      types,
      todayMoney: null,
      moneyInfo: {
        totalMoney: null,
        useMoney: null,
        marketMoney: null,
        takeoutMoney: null,
        profitMoney: null
      },
      dialogFormVisible: false,
      dialogStatus: null,
      temp: {
        code: null,
        name: null,
        amount: null,
        price: null,
        entrustType: 1,
        dbBuy: 0,
        mockType: ''
      }
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.listLoading = true
    this.initMoneyInfo()
    this.fetchData(this.currentPage, this.pagesize)
  },
  methods: {
    initMoneyInfo() {
      trademoneyApi.getInfo({ mockType: this.searchObj.mockType }).then(
        response => {
          this.moneyInfo = Object.assign({}, response.data)
        }
      )
    },
    fetchData(currentPage = 1, pagesize = 200) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      positionApi.getPageList(this.currentPage, this.pagesize, this.searchObj).then(
        response => {
          this.list = response.data.dataList
          // 添加响应数
          this.total = response.data.total
          this.todayMoney = response.data.todayMoney
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
    fillTemp(row) {
      this.temp.amount = 100
      this.temp.price = row.price
      this.temp.code = row.code
      this.temp.name = row.name
      this.temp.mockType = this.searchObj.mockType
    },
    showBuy(row) {
      this.fillTemp(row)
      this.dialogStatus = 'buy'
      this.dialogFormVisible = true
    },
    showSell(row) {
      this.fillTemp(row)
      this.dialogStatus = 'sell'
      this.dialogFormVisible = true
    },
    buy() {
      this.$confirm('确定买入股票?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        buyApi.buy(this.temp).then(response => {
          this.$message({
            type: 'success',
            message: '买入股票委托成功!'
          })
          this.dialogFormVisible = false
          // 刷新页面
          this.fetchData()
        })
      })
    },
    sell() {
      this.$confirm('确定卖出股票?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sellApi.sell(this.temp).then(response => {
          this.$message({
            type: 'success',
            message: '卖出股票委托成功!'
          })
          this.dialogFormVisible = false
          // 刷新页面
          this.fetchData()
        })
      })
    }
  }
}
</script>
<style>
.focus-info{
  font-size:18px;
  color:red;
}
</style>
