<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" prop="created_at" label="日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.holidayDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属年" width="200">
        <template slot-scope="scope">
          {{ scope.row.currYear }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.dateType |dateTypeFilter }}
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
  </div>
</template>

<script>
import holidayApi from '@/api/sysconfig/holiday'
export default {
  // 定义 过滤器
  filters: {
    dateTypeFilter(dateType) {
      // const dateTypeMap = {
      //   1: '正常',
      //   2: '调休',
      //   3: '法定节假日'
      // }
      // return dateTypeMap[dateType]
      return '法定节假日'
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
    fetchData(currentPage, pagesize) {
      console.log('翻页.....', currentPage, pagesize)
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      holidayApi.getPageList(this.currentPage, this.pagesize, null).then(
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
