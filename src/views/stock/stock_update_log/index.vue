<template>
  <div class="app-container">
    <div class="filter-container">
      <el-col :span="6">
        <el-input v-model="searchObj.code" placeholder="股票的代码" style="width: 200px;margin-bottom:30px;" class="filter-item" @change="fetchData()"/>
      </el-col>
      <el-col :span="12">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          format = "yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeDate()"/>
      </el-col>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="时间" width="200" align="center">
        <i class="el-icon-time"/>
        <template slot-scope="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="股票代码" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="股票类型" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.exchange | exchangeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="股票代码全称" width="200">
        <template slot-scope="scope">
          {{ scope.row.fullCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作类型" width="200">
        <template slot-scope="scope">
          <el-tag :type ="scope.row.updateType | typeFormat">{{ scope.row.updateType |updateTypeFormat }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
  </div>
</template>

<script>
import stocklogApi from '@/api/stock/stocklog'
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
    },
    updateTypeFormat(value) {
      let message = ''
      switch (value) {
        case 1: {
          message = '新上市'
          break
        }
        case 2: {
          message = '更改'
          break
        }
        case 3: {
          message = '退市'
          break
        }
        default: {
          break
        }
      }
      return message
    },
    typeFormat(value) {
      let message = ''
      switch (value) {
        case 1: {
          message = 'success'
          break
        }
        case 2: {
          message = 'primary'
          break
        }
        case 3: {
          message = 'danger'
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
      searchObj: {
        code: '',
        startDate: '',
        endDate: ''
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数
      dateRange: []
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
      this.dateRange = [s, e]
      this.searchObj.startDate = s
      this.searchObj.endDate = e
    },
    fetchData(currentPage, pagesize) {
      console.log('翻页.....', currentPage, pagesize)
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      stocklogApi.getPageList(this.currentPage, this.pagesize, this.searchObj).then(
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
      console.log('date', this.dateRange)
      this.searchObj.startDate = this.dateRange[0]
      this.searchObj.endDate = this.dateRange[1]
      this.fetchData(1, this.pagesize)
    }
  }
}
</script>
