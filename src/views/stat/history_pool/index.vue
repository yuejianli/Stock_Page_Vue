<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form" style="width:700px;margin-left:15px;">
        <!--select 框-->
        <el-form-item label="股票池类型:">
          <el-select v-model="searchObj.poolType" class="filter-item" @change="fetchData()">
            <el-option
              v-for="item in allPoolTypeList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:30px;">
          <el-input v-model="searchObj.keywords" :placeholder="股票编码" @change="fetchData()"/>
        </el-form-item>
        <el-form-item label="查询范围: ">
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
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column v-for="(item,index) in tableHead" :key="index" :label="item.label" :property="item.property" :index="item.index" align="center">
        <template slot-scope="scope">
          <p v-if="scope.column.property != 'detailList'">{{ scope.row[scope.column.property] }}</p>
          <p v-else v-html="showValue(scope.row.detailList[scope.column.index])"/>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
  </div>
</template>

<script>
import stockpoolApi from '@/api/stat/stockpool'
// 这里是固定的表头
const fixedTableHead = [
  {
    label: '股票编码',
    property: 'code'
  },
  {
    label: '名称',
    property: 'name'
  }
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
        pageNum: 1,
        pageSize: 10,
        keywords: null,
        poolType: null,
        startDate: null,
        endDate: null
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数
      tableHead: [],
      dateRange: [],
      timeChange: {
        disabledDate(time) {
          // 选择时间范围
          return time.getTime() > (Date.now() - 3600 * 1000 * 24 * 1)
        }
      },
      allPoolTypeList: []
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.listLoading = true
    this.initDate()
    this.initAllCharStockTypeList()
    this.fetchData(this.currentPage, this.pagesize)
  },
  methods: {
    initDate() {
      const end = new Date(new Date().toLocaleDateString())
      const start = new Date(new Date().toLocaleDateString())
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
      const s = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
      const e = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
      this.dateRange = [s, e]
      this.searchObj.startDate = s
      this.searchObj.endDate = e
    },
    initAllCharStockTypeList() {
      stockpoolApi.listPoolType({}).then(
        response => {
          this.allPoolTypeList = response.data
          this.searchObj.poolType = response.data[0].code
        }
      )
    },
    changeDate() {
      this.searchObj.startDate = this.dateRange[0]
      this.searchObj.endDate = this.dateRange[1]
      this.fetchData()
    },
    fetchData(currentPage = 1, pagesize = 10) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      this.searchObj.pageNum = currentPage
      this.searchObj.pageSize = pagesize
      stockpoolApi.getPageList(this.searchObj).then(
        response => {
          this.list = response.data.list
          // 添加响应数
          this.total = response.data.total
          this.listLoading = false
          // 动态部分的表头
          const tableHead = []
          const detailListItem = this.list[0].detailList || []
          detailListItem.forEach((item, index) => {
            // 这里是根据数据循环得到的动态的表头
            tableHead.push({ index: index, property: 'detailList', label: item.currDate + '(%)' }) // 动态表头
          })
          // 合并动态部分的表头
          this.tableHead = [...fixedTableHead, ...tableHead]
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
    showValue(rowData) {
      // 查询一下，当前的数据信息.
      if (!rowData || !rowData.currDate) {
        return '未同步'
      }
      let dataStr = '' + rowData.closePrice
      const bili = '(' + rowData.amplitudeProportion + ')'
      // 获取相应的信息.
      if (rowData.type === 1) {
        dataStr += '<span>' + bili + '</span></br>'
      } else if (rowData.type === -1) {
        dataStr += '<span>' + bili + '</span></br>'
      } else if (rowData.type === 0) {
        dataStr += '<span>' + bili + '</span></br>'
      } else {
        dataStr += '<span></span></br>'
      }
      // 放置值
      if (rowData.sign === 1) {
        dataStr = "<span style='color:red;''>" + dataStr + '</span></br>'
      } else {
        dataStr = "<span style='color:black;''>" + dataStr + '</span></br>'
      }
      return dataStr
    }
  }
}
</script>
