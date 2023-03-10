<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="任务编码" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务Cron表达式" width="200">
        <template slot-scope="scope">
          {{ scope.row.cron }}
        </template>
      </el-table-column>
      <el-table-column label="触发类型" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.triggerType | triggerTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column label="触发状态" width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type ="scope.row.triggerStatus | statusStyleFilter">{{ scope.row.triggerStatus |triggerStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="上次触发时间" width="200" align="center">
        <i class="el-icon-time"/>
        <template slot-scope="scope">
          {{ scope.row.triggerLastTime }}
        </template>
      </el-table-column>
      <el-table-column label="上次触发的结果" width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type ="scope.row.triggerLastResult | statusStyleFilter">{{ scope.row.triggerLastResult |triggerResultFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下次触发时间" width="200" align="center">
        <i class="el-icon-time"/>
        <template slot-scope="scope">
          {{ scope.row.triggerNextTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.triggerStatus !=1" type="info" size="mini" icon="el-icon-edit" @click="enable(scope.row)">启用</el-button>
          <el-button v-if="scope.row.triggerStatus !=0" type="danger" size="mini" icon="el-icon-edit" @click="disable(scope.row)">禁用</el-button>
          <el-button type="success" size="mini" icon="el-icon-setting" @click="handler(scope.row)">执行一次</el-button>
          <el-button v-if="scope.row.triggerStatus !=1" type="danger" size="mini" icon="el-icon-setting" @click="delete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
  </div>
</template>

<script>
import jobInfoApi from '@/api/sysconfig/jobInfo'
export default {
  // 定义 过滤器
  filters: {
    triggerTypeFilter(triggerType) {
      if (triggerType === 1) {
        return '手动'
      }
      return '自动'
    },
    triggerStatusFilter(triggerStatus) {
      if (triggerStatus === 1) {
        return '正常'
      }
      return '失败'
    },
    triggerResultFilter(triggerResult) {
      if (triggerResult === 1) {
        return '成功'
      }
      return '失败'
    },
    statusStyleFilter(triggerStatus) {
      const statusMap = {
        1: 'success',
        0: 'danger'
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
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      jobInfoApi.getPageList(this.currentPage, this.pagesize, null).then(
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
    disable(row) {
      this.$confirm('是否禁用该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        jobInfoApi.disable(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '禁用任务成功!'
          })
          // 刷新页面
          this.fetchData()
        })
      })
    },
    enable(row) {
      this.$confirm('是否启用该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        jobInfoApi.enable(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '启用任务成功!'
          })
          // 刷新页面
          this.fetchData()
        })
      })
    },
    handler(row) {
      this.$confirm('是否手动执行一次?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        jobInfoApi.handler(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '手动执行任务成功!'
          })
          // 刷新页面
          this.fetchData()
        })
      })
    },
    delete(row) {
      this.$confirm('是否要删除该定时任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        jobInfoApi.delete(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除任务成功!'
          })
          // 刷新页面
          this.fetchData()
        })
      })
    }
  }
}
</script>
