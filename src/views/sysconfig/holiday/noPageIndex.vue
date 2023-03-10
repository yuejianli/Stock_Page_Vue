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
  </div>
</template>

<script>
import holidayApi from '@/api/holiday'
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
      list: null
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.listLoading = true
    this.fetchData()
  },
  methods: {
    fetchData(page = 1, limit = 10) {
      console.log('翻页.....', page, limit)
      // 异步获取数据 (ajax)
      this.page = page
      this.limit = limit
      holidayApi.getPageList(1, 10, null).then(
        response => {
          this.list = response.data.list
          this.listLoading = false
        }
      )
    }
  }
}
</script>
