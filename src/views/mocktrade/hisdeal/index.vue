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
      <el-table-column label="成交时间" width = "200" align="center">
        <template slot-scope="scope">
          {{ scope.row.dealDate }}
        </template>
      </el-table-column>
      <el-table-column label="成交类型" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.dealType |dealTypeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="成交数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.dealNum }}
        </template>
      </el-table-column>
      <el-table-column label="成交价格" align="center">
        <template slot-scope="scope">
          {{ scope.row.dealPrice }}
        </template>
      </el-table-column>
      <el-table-column label="成交金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.dealMoney }}
        </template>
      </el-table-column>
      <el-table-column label="成交编号" width ="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.dealCode }}
        </template>
      </el-table-column>
      <el-table-column label="委托编号" width ="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.entrustCode }}
        </template>
      </el-table-column>
      <el-table-column label="成交方式" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.entrustType |entrustTypeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width ="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showEntrust(scope.row)">查看委托信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
    <!--股票详情展示-->
    <el-dialog :visible.sync="showDetailDialogVisible" title="查看委托单信息">
      <el-form :model="detailInfo" style="width: 800px;">
        <el-form-item label="">
          <el-col :span="6">股票编码:</el-col>
          <el-col :span="6">{{ detailInfo.code }} </el-col>
          <el-col :span="6">名称:</el-col>
          <el-col :span="6">{{ detailInfo.name }} </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="6">委托时间:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.entrustDate }} </el-col>
          <el-col :span="6">交易类型:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.dealType | dealTypeFilter }} </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="6">交易数量:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.entrustNum }} </el-col>
          <el-col :span="6">交易价格:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.entrustPrice }} </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="6">交易状态:</el-col>
          <el-col :span="6">{{ detailInfo.entrustStatus | entrustStatusFilter }} </el-col>
          <el-col :span="6">委托的交易费用:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.entrustMoney }} </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="6">总的手续费:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.handMoney }} </el-col>
          <el-col :span="6">总的交易费用:</el-col>
          <el-col :span="6" class="focus-info">{{ detailInfo.totalMoney }} </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="6">委托方式:</el-col>
          <el-col :span="6">{{ detailInfo.entrustType | entrustTypeFilter }} </el-col>
          <el-col :span="6">是否打板买入:</el-col>
          <el-col :span="6">{{ detailInfo.dbType | dbTypeFilter }} </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDetailDialogVisible = false"> 返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tradeDealApi from '@/api/trade/tradedeal'
import entrustApi from '@/api/trade/entrust'
export default {
  // 定义 过滤器
  filters: {
    dealTypeFilter(value) {
      if (value === 1) {
        return '买入'
      }
      return '卖出'
    },
    dbTypeFilter(value) {
      if (value === 1) {
        return '打板'
      }
      return '普通'
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
        'mockType': 1,
        entrustCode: null
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数
      showDetailDialogVisible: false,
      detailInfo: {
        code: null,
        name: null,
        entrustDate: null,
        dealType: null,
        entrustNum: null,
        entrustPrice: null,
        entrustStatus: null,
        entrustCode: null,
        useMoney: null,
        takeoutMoney: null,
        entrustMoney: null,
        handMoney: null,
        totalMoney: null,
        entrustType: null,
        dbType: null
      }
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
      tradeDealApi.historyPageList(this.currentPage, this.pagesize, this.searchObj).then(
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
    showEntrust(row) {
      this.searchObj.entrustCode = row.entrustCode
      entrustApi.getInfo(this.searchObj).then(
        response => {
          this.detailInfo = Object.assign({}, response.data)
          this.showDetailDialogVisible = true
        }
      )
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
