<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
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
      <el-table-column label="日期" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.currDate }}
        </template>
      </el-table-column>
      <el-table-column label="概念详细信息">
        <el-table-column label="版块编码" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.bkCode }}
          </template>
        </el-table-column>
        <el-table-column label="版块名称" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.bkName }}
          </template>
        </el-table-column>
        <el-table-column label="涨幅" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.bkNowProportion }}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 15, 50]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
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
        startDate: '',
        endDate: '',
        bkType: 2
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 15, // 每页显示记录数
      total: 0, // 总记录数
      dateRange: []
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
    fetchData(currentPage = 1, pagesize = 15) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      bkApi.listBkTopNew(this.currentPage, this.pagesize, this.searchObj).then(
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
