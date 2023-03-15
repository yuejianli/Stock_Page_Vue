总的结构:

<div class="app-container">

</div>

<script>
import api from '@/api/sysconfig/jobInfo'
export default {
  
}
</script>


import request from '@/utils/request'
const MONEY_TOOL_URL = '/money'
export default {
 
}

#   表格

表格主体
<el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
</el-table>

表格对应普通列:

  <el-table-column label="上次触发的结果" width="80" align="center">
        <template slot-scope="scope">
<el-tag :type ="scope.row.triggerLastResult | statusStyleFilter">{{ scope.row.triggerLastResult |triggerResultFilter }</el-tag>
        </template>
      </el-table-column>

表格操作列:

  <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.triggerStatus !=1" type="info" size="mini" icon="el-icon-edit" @click="enable(scope.row)">启用</el-button>
          <el-button v-if="scope.row.triggerStatus !=0" type="danger" size="mini" icon="el-icon-edit" @click="disable(scope.row)">禁用</el-button>
          <el-button type="success" size="mini" icon="el-icon-setting" @click="handler(scope.row)">执行一次</el-button>
          <el-button v-if="scope.row.triggerStatus !=1" type="danger" size="mini" icon="el-icon-setting" @click="delete(scope.row)">删除</el-button>
        </template>
</el-table-column>

分页:

 <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>


对状态 这样的列处理:

filters: {
  triggerResultFilter(triggerResult) {
  if (triggerResult === 1) {
    return '成功'
  }
  return '失败'
  }
}

对分页展示这样的处理:

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
  }

// 页码和 展示条数发生改变时:
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

// 点击删除时， 进行的提示

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

// 对表格上面的搜索框进行处理
  <div class="app-container">
  <div class="filter-container">
        <el-input v-model="searchObj.keyword" placeholder="关键字" style="width: 200px;" class="filter-item" @change="handleFilter"/>
      </div>
      <el-table>
      </div-table>
</div>

methods:  
  handleFilter() {
      this.currentPage = 1
      this.fetchData(this.currentPage, this.pagesize)
    },


#  对话框

对话框中 通过有  el-form  form 表单处理
 <el-dialog :visible.sync="dialogFormVisible" title="维护规则">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        style="width:400px; margin-left:50px;"
      >
        <!--开始添加元素-->
        <el-form-item label="规则名称:" prop="name">
          <el-col :span="18"><el-input v-model="temp.name"/></el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()">确认</el-button
        >
      </div>
    </el-dialog>


 selected 元素

  <!--select 框-->
  <el-form-item label="选择条件:">
    <el-select v-model="temp.conditionId" class="filter-item">
      <el-option
        v-for="item in conditions"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </el-form-item>







