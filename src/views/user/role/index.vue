<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;margin-bottom:30px;"
        type="primary"
        icon="el-icon-add"
        @click="handleCreate">添加角色</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="角色名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="角色描述" width="500" align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-setting"
            @click="handlerUpdate(scope.row)">修改</el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-setting"
            @click="deleteData(scope.row)">删除</el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-setting"
            @click="config(scope.row)">配置资源</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
    <el-dialog :visible.sync="dialogFormVisible" title="维护角色">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        style="width:400px; margin-left:50px;"
      >
        <!--开始添加元素-->
        <el-form-item label="角色名称:" prop="name">
          <el-col :span="18"><el-input v-model="temp.name"/></el-col>
        </el-form-item>
        <el-form-item label="  描述:">
          <el-col :span="18" style="margin-left:30px;">
            <el-input v-model="temp.description" type="textarea"/>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="configDialogFormVisible" title="配置资源">
      <el-form
        ref="configDataForm"
        label-position="left"
        style="width:400px; margin-left:50px;"
      >
        <!--开始添加元素-->
        <el-tree
          ref="menuTree"
          :data="menuTree"
          :props="menuTreeProps"
          default-expand-all
          show-checkbox
          node-key="id"
          @check-change="handleCheckChange" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="configDialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="applyConfig()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import roleApi from '@/api/user/role'
import menuApi from '@/api/user/menu'
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
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数
      dialogFormVisible: false,
      dialogStatus: null,
      temp: {
        id: null,
        name: '',
        description: ''
      },
      clickRoleId: null,
      menuTree: [],
      menuListIds: [],
      menuTreeProps: {
        label: 'label'
      },
      haveMenuConfig: [],
      configDialogFormVisible: false
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.listLoading = true
    this.fetchData(this.currentPage, this.pagesize)
    this.initAllMenuList()
  },
  methods: {
    initAllMenuList() {
      menuApi.treeAllMenuList().then(
        response => {
          this.menuTree = response.data
        }
      )
    },
    fetchData(currentPage = 1, pagesize = 10) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      roleApi.getPageList(this.currentPage, this.pagesize, this.searchObj).then(
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
      this.temp.id = null
      this.temp.name = ''
      this.temp.description = ''
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    handlerUpdate(row) {
      // 复制数据
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
    },
    handleCheckChange(data, checked) {
      this.menuListIds = this.$refs.menuTree.getCheckedNodes(false, true).map(item => item.id)
    },
    async config(row) {
      // 进行查询, 根据角色id.
      this.clickRoleId = row.id
      this.configDialogFormVisible = true
      roleApi.findMenuByRoleId({ id: this.clickRoleId }).then(
        response => {
          this.haveMenuConfig = response.data
          console.log('this.haveMenuConfig', this.haveMenuConfig)
          this.$nextTick(() => {
            this.haveMenuConfig.forEach(item => {
              const node = this.$refs.menuTree.getNode(item.id)
              if (node.childNodes && node.childNodes.length === 0) {
                this.$refs.menuTree.setChecked(item.id, true)
              }
            })
          })
        }
      )
    },
    applyConfig() {
      if (this.menuListIds.length < 1) {
        this.$message({
          type: 'warning',
          message: '请配置菜单资源!'
        })
        return
      }
      roleApi.configMenuList({ id: this.clickRoleId, menuIdList: this.menuListIds }).then(
        response => {
          this.applyDialogFormVisible = false
          this.$message({
            type: 'success',
            message: '配置成功!'
          })
          this.configDialogFormVisible = false
          this.fetchData()
        }
      )
    },
    deleteData(row) {
      console.log('删除角色')
      this.$confirm('是否要删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        roleApi.delete({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除角色成功!'
          })
          this.fetchData()
        })
      })
    },
    updateData() {
      roleApi.update(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '更新角色成功!'
        })
        this.fetchData()
      })
    },
    createData() {
      roleApi.add(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '添加角色成功!'
        })
        this.fetchData()
      })
    }
  }
}
</script>
