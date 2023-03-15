<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="股票代码" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="股票名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="委托时间" width = "200" align="center">
        <template slot-scope="scope">
          {{ scope.row.entrustDate }}
        </template>
      </el-table-column>
      <el-table-column label="交易类型" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.dealType |dealTypeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="交易数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.entrustNum }}
        </template>
      </el-table-column>
      <el-table-column label="交易价格" align="center">
        <template slot-scope="scope">
          {{ scope.row.entrustPrice }}
        </template>
      </el-table-column>
      <el-table-column label="交易状态" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.entrustStatus |entrustStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="委托编号" width ="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.entrustCode }}
        </template>
      </el-table-column>
      <el-table-column label="委托费用" align="center">
        <template slot-scope="scope">
          {{ scope.row.entrustMoney }}
        </template>
      </el-table-column>
      <el-table-column label="手续费" align="center">
        <template slot-scope="scope">
          {{ scope.row.handMoney }}
        </template>
      </el-table-column>
      <el-table-column label="总费用" align="center">
        <template slot-scope="scope">
          {{ scope.row.totalMoney }}
        </template>
      </el-table-column>
      <el-table-column label="委托方式" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.entrustType |entrustTypeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width ="200" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.entrustStatus ===1" type="info" size="mini" @click="deal(scope.row)">手动成交</el-button>
          <el-button v-if="scope.row.entrustStatus ===1 || scope.row.entrustStatus == 0" type="danger" size="mini" @click="revoke(scope.row)">撤销委托</el-button>
          <el-tag v-if="scope.row.entrustStatus === 2" type="success"> 已成交</el-tag>
          <el-tag v-if="scope.row.entrustStatus === 3" type="primary"> 手动撤单</el-tag>
          <el-tag v-if="scope.row.entrustStatus === 4" type="primary"> 自动撤单</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
  </div>
</template>

<script>
import entrustApi from '@/api/trade/entrust'
import dealApi from '@/api/trade/deal'
import revokeApi from '@/api/trade/revoke'
export default {
  // 定义 过滤器
  filters: {
    dealTypeFilter(value) {
      if (value === 1) {
        return '买入'
      }
      return '卖出'
    },
    entrustStatusFilter(value) {
      if (value === 1) {
        return '委托中'
      } else if (value === 2) {
        return '成交'
      } else if (value === 0) {
        return '未报'
      } else {
        return '已撤销'
      }
    },
    entrustTypeFilter(value) {
      if (value === 1) {
        return '手动'
      }
      return '自动'
    }
  },
  // 定义数据模型
  data() {
    return {
      listLoading: true,
      list: null,
      // 追加分页相关的数据信息
      searchObj: {
        'mockType': 0
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
      entrustApi.getPageList(this.currentPage, this.pagesize, this.searchObj).then(
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
    deal(row) {
      this.$confirm('是否手动成交该委托?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const dataParam = {
          id: row.id,
          mockType: this.searchObj.mockType,
          entrustType: 1
        }
        dealApi.deal(dataParam).then(response => {
          this.$message({
            type: 'success',
            message: '手动成交委托单成功!'
          })
          // 刷新页面
          this.fetchData()
        })
      })
    },
    revoke(row) {
      this.$confirm('是否手动撤销该委托?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const dataParam = {
          id: row.id,
          mockType: this.searchObj.mockType,
          entrustType: 1
        }
        revokeApi.revoke(dataParam).then(response => {
          this.$message({
            type: 'success',
            message: '手动撤销委托单成功!'
          })
          // 刷新页面
          this.fetchData()
        })
      })
    }
  }
}
</script>
