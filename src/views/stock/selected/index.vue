<template>
  <div class="app-container">
    <div class="filter-container">
      <el-col :span="6">
        <el-input v-model="searchObj.keyword" placeholder="股票的代码或者名称" style="width: 200px;margin-bottom:30px;" class="filter-item" @change="fetchData()"/>
      </el-col>
      <el-col :span="6">
        <el-button
          class="filter-item"
          style="margin-left: 10px;margin-bottom:30px;"
          type="primary"
          icon="el-icon-add"
          @click="handleCreate">添加自选</el-button>
      </el-col>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="股票代码" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.stockCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="股票名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.stockName }}
        </template>
      </el-table-column>
      <el-table-column label="添加自选时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="自选笔记" width="700" align="center">
        <template slot-scope="scope">
          {{ scope.row.notes }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑笔记</el-button>
          <el-button type="warning" size="mini" @click="remove(scope.row)">移除自选</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
    <!--同步历史展示-->
    <el-dialog :visible.sync="dialogFormVisible" title="添加到自选">
      <el-form :model="temp" label-position="left" style="width:600px; margin-left:50px;" >
        <el-form-item label="编码:">
          <el-col :span="18"><el-input v-model="temp.code" :disabled="dialogStatus ==='update'"/></el-col>
        </el-form-item>
        <el-form-item label="笔记:">
          <el-col :span="18">
            <el-input v-model="temp.notes" type="textarea"/>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 返回</el-button>
        <el-button type="success" @click="dialogStatus === 'create' ? createData() : updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import selectedApi from '@/api/stock/selected'
export default {
  // 定义 过滤器
  filters: {
    dateTypeFilter(dateType) {
      return '法定节假日'
    }
  },
  // 定义数据模型
  data() {
    return {
      listLoading: true,
      list: null,
      // 追加分页相关的数据信息
      searchObj: {
        keyword: ''
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数
      temp: {
        id: null,
        code: '',
        notes: ''
      },
      dialogFormVisible: false,
      dialogStatus: ''
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
      selectedApi.getPageList(this.currentPage, this.pagesize, this.searchObj).then(
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
    resetTemp() {
      this.temp = {
        id: null,
        code: '',
        notes: ''
      }
    },
    handleCreate(row) {
      this.resetTemp()
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    createData() {
      selectedApi.add(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '添加自选成功!'
        })
        this.fetchData()
      })
    },
    handleUpdate(row) {
      // 复制数据
      this.temp.code = row.stockCode
      this.temp.notes = row.notes
      this.temp.id = row.id
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
    },
    updateData() {
      selectedApi.editNotes(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '更新自选笔记成功!'
        })
        this.fetchData()
      })
    },
    remove(row) {
      this.$confirm('您确定将该股票【' + row.stockName + '】移除自选吗 ？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        selectedApi.deleteByCode({ stockCode: row.stockCode }).then(response => {
          this.$message({
            type: 'success',
            message: '移除自选列表成功!'
          })
          this.fetchData()
        })
      })
    }
  }
}
</script>
