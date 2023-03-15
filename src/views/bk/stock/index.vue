<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchObj.keyword" placeholder="股票编码" style="width: 200px;margin-bottom:30px;" class="filter-item" @change="fetchData"/>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="编码" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="板块/概念1" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.bkCode1 }}
        </template>
      </el-table-column>
      <el-table-column label="板块/概念2" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.bkCode2 }}
        </template>
      </el-table-column>
      <el-table-column label="板块/概念3" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.bkCode3 }}
        </template>
      </el-table-column>
      <el-table-column label="板块/概念4" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.bkCode4 }}
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
  </div>
</template>

<script>
import stockbkApi from '@/api/bk/stockbk'
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
        'type': 0,
        'keyword': ''
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0 // 总记录数
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.listLoading = true
    this.fetchData(this.currentPage, this.pagesize)
  },
  methods: {
    fetchData(currentPage = 1, pagesize = 10) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      stockbkApi.getPageList(this.currentPage, this.pagesize, this.searchObj).then(
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
