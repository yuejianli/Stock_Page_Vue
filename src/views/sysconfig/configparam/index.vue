<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column v-if="false" align="center" label="参数编码" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="参数编码" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="参数值" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.codeValue }}
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="200" align="center">
        <i class="el-icon-time"/>
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleConfig(scope.row)">自定义配置</el-button>
          <el-button type="primary" size="mini" icon="el-icon-setting" @click="resetParam(scope.row)">重置配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
    <!--添加更新的对话框-->
    <el-dialog :visible.sync="dialogFormVisible" title="自定义配置">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="编码:" prop="code">
          <el-input v-model="temp.code"/>
        </el-form-item>
        <el-form-item label="名称:" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="值:" prop="codeValue">
          <el-input v-model="temp.codeValue"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import configParamApi from '@/api/sysconfig/configparam'
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
      searchObj: {}, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数
      // 处理对话框
      dialogFormVisible: false,
      temp: {
        id: undefined,
        code: '',
        name: '',
        codeValue: ''
      },
      rules: {
        code: [{ required: true, message: 'code is required', trigger: 'change' }]
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
    fetchData(currentPage, pagesize) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      configParamApi.getPageList(this.currentPage, this.pagesize, null).then(
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
    handleConfig(row) {
      this.dialogFormVisible = true
      this.temp = Object.assign({}, row) // copy obj
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      const tempData = Object.assign({}, this.temp)
      configParamApi.updateConfig(tempData).then(() => {
        this.dialogFormVisible = false
        this.fetchData()
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    resetParam(row) {
      this.$confirm('是否重置配置参数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('打印id', row.id)
        configParamApi.resetConfig(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '重置成功!'
          })
          // 刷新页面
          this.fetchData()
        })
      })
    }
  }
}
</script>
