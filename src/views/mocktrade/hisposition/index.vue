<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="股票编号:">
          <el-input v-model="searchObj.code" style="width: 200px;margin-bottom:30px;" class="filter-item" @change="fetchData()"/>
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
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="交易日" align="center">
        <template slot-scope="scope">
          {{ scope.row.currDate }}
        </template>
      </el-table-column>
      <el-table-column label="编码" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
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
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
  </div>
</template>

<script>
import positionhistoryApi from '@/api/trade/positionhistory'
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
        code: '',
        mockType: 1,
        startDate: '',
        endDate: ''
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数
      dateRange: [],
      bks: null
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.initDate()
    this.listLoading = true
    this.fetchData(this.currentPage, this.pagesize)
  },
  methods: {
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
      positionhistoryApi.historyPageList(this.currentPage, this.pagesize, this.searchObj).then(
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
