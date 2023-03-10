<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchObj.keyword" placeholder="股票编码或者名称" style="width: 200px;margin-bottom:30px;" class="filter-item" @change="handleFilter()"/>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="股票编码" width="200">
        <template slot-scope="scope">
          {{ scope.row.stockCode }}
        </template>
      </el-table-column>
      <el-table-column label="股票名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.stockName }}
        </template>
      </el-table-column>
      <el-table-column label="买入规则名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.buyRuleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="配置时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.buyCreateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="买入规则状态" width="150">
        <template slot-scope="scope">
          <el-tag :type ="scope.row.buyRuleStatus | statusStyleFilter">{{ scope.row.buyRuleStatus |statusStyleFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="卖出规则名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.sellRuleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="卖出规则配置时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.sellCreateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卖出规则状态" width="150">
        <template slot-scope="scope">
          <el-tag :type ="scope.row.sellRuleStatus | statusStyleFilter">{{ scope.row.sellRuleStatus |statusStyleFilter }}</el-tag>
        </template>
      </el-table-column>

    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
  </div>
</template>

<script>
import stockruleApi from '@/api/tradeconfig/stockrule'
const statusMap = {
  1: '正常',
  0: '禁用'
}
export default {
  // 定义 过滤器
  filters: {
    statusStyleFilter(triggerStatus) {
      if (!triggerStatus) {
        return '未配置'
      }
      return statusMap[triggerStatus]
    }
  },
  // 定义数据模型
  data() {
    return {
      listLoading: true,
      list: null,
      // 追加分页相关的数据信息
      searchObj: {
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
    fetchData(currentPage, pagesize) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      stockruleApi.getPageList(this.currentPage, this.pagesize, this.searchObj).then(
        response => {
          this.list = response.data.list || []
          // 添加响应数
          this.total = response.data.total || 0
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
    handleFilter() {
      this.currentPage = 1
      this.fetchData(this.currentPage, this.pagesize)
    }
  }
}
</script>
