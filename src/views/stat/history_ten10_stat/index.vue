<template>
  <div class="app-container">
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
import statApi from '@/api/stat/stat'
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
        pageSize: 10
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数
      tableHead: []
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
      this.searchObj.pageNum = currentPage
      this.searchObj.pageSize = pagesize
      statApi.getPageList(this.searchObj).then(
        response => {
          this.list = response.data.list
          // 添加响应数
          this.total = response.data.total
          this.listLoading = false
          // 动态部分的表头
          const tableHead = []
          const detailListItem = this.list[0].detailList
          detailListItem.forEach((item, index) => {
            // 这里是根据数据循环得到的动态的表头
            tableHead.push({ index: index, property: 'detailList', label: item.currDate + '(%)' }) // 动态表头
          })
          // 合并动态部分的表头
          this.tableHead = [...fixedTableHead, ...tableHead]

          console.log('tableHead', this.tableHead)
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
      let dataStr = ''
      // 获取相应的信息.
      if (rowData.type === 1) {
        dataStr += "<span style='color:red;''>涨</span></br>"
      } else if (rowData.type === -1) {
        dataStr += "<span style='color:green;''>跌</span></br>"
      } else if (rowData.type === 0) {
        dataStr += "<span style='color:black;''>平</span></br>"
      } else {
        dataStr += "<span style='color:black;''>未同步数据</span></br>"
      }
      // 放置值
      dataStr += "<span style='color:black;''>" + rowData.amplitudeProportion + '</span></br>'
      return dataStr
    }
  }
}
</script>
