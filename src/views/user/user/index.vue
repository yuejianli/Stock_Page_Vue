<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;margin-bottom:30px;"
        type="primary"
        icon="el-icon-add"
        @click="handleCreate">添加用户</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="账号" align="center">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="所属角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="微信id" align="center">
        <template slot-scope="scope">
          {{ scope.row.wxUserId }}
        </template>
      </el-table-column>
      <el-table-column label="钉钉标识" align="center">
        <template slot-scope="scope">
          {{ scope.row.dingUserId }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="最后登录时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.lastLoginTime }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="400">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-setting"
            @click="handlerUpdate(scope.row)">修改</el-button>
          <el-button v-if="scope.row.status !=1" type="info" size="mini" icon="el-icon-edit" @click="enable(scope.row)">启用</el-button>
          <el-button v-if="scope.row.status !=0" type="danger" size="mini" icon="el-icon-edit" @click="disable(scope.row)">禁用</el-button>
          <el-button v-if="scope.row.status !=1" type="danger" size="mini" icon="el-icon-setting" @click="deleteData(scope.row)">删除</el-button>
          <el-button type="danger" size="mini" icon="el-icon-edit" @click="resetPs(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pagesize" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
    <el-dialog :visible.sync="dialogFormVisible" title="维护用户">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="right"
        style="width:550px; margin-left:50px;"
      >
        <!--开始添加元素-->
        <el-form-item label="账号:" prop="account">
          <el-col :span="18"><el-input v-model="temp.account" :disabled="dialogStatus === 'update'"/></el-col>
        </el-form-item>
        <el-form-item label="名称:">
          <el-col :span="18"><el-input v-model="temp.name"/></el-col>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-col :span="18"><el-input v-model="temp.phone"/></el-col>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-col :span="18"><el-input v-model="temp.email"/></el-col>
        </el-form-item>
        <el-form-item v-if="!resetPassword">
          <el-button type="primary" @click="resetPassword= true">重置密码</el-button>
        </el-form-item>
        <el-form-item v-if="resetPassword">
          <el-button type="primary">设置新密码</el-button>
        </el-form-item>
        <el-form-item v-if="resetPassword" :label="passwordText">
          <el-col :span="18"><el-input v-model="temp.password" type="password" /></el-col>
        </el-form-item>
        <el-form-item label="选择角色:">
          <el-col :span="18">
            <el-radio-group v-model="temp.roleId">
              <div v-for="item in roles" :key="item.id" style="margin-top:25px;">
                <el-radio :label="item.id">{{ item.name }}</el-radio>
              </div>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="企业微信标识:">
          <el-col :span="18"><el-input v-model="temp.wxUserId"/></el-col>
        </el-form-item>
        <el-form-item label="钉钉标识:">
          <el-col :span="18"><el-input v-model="temp.dingUserId"/></el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import roleApi from '@/api/user/role'
import userApi from '@/api/user/user'
export default {
  // 定义 过滤器
  filters: {
    statusFilter(status) {
      if (status === 1) {
        return '启用'
      }
      return '禁用'
    }
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
        account: '',
        name: '',
        phone: '',
        email: '',
        wxUserId: '',
        dingUserId: '',
        roleId: 2,
        password: ''
      },
      roles: [],
      resetPassword: false,
      passwordText: '',
      clickUserId: null
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.listLoading = true
    this.initRoles()
    this.fetchData(this.currentPage, this.pagesize)
  },
  methods: {
    initRoles() {
      roleApi.getPageList(1, 100, this.searchObj).then(
        response => {
          this.roles = response.data.list
        }
      ).catch(error => {
        // 请求失败，则打印错误
        console.log(error)
      })
    },
    fetchData(currentPage = 1, pagesize = 10) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      userApi.getPageList(this.currentPage, this.pagesize, this.searchObj).then(
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
      this.temp.account = ''
      this.temp.name = ''
      this.temp.phone = ''
      this.temp.password = ''
      this.temp.email = ''
      this.temp.wxUserId = ''
      this.temp.dingUserId = ''
      this.temp.roleId = 2
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.resetPassword = true
      this.passwordText = '密码:'
    },
    handlerUpdate(row) {
      // 复制数据
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      this.resetPassword = false
      this.passwordText = '新密码:'
    },
    deleteData(row) {
      console.log('删除员工')
      this.$confirm('是否要删除该员工?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        userApi.delete({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除员工成功!'
          })
          this.fetchData()
        })
      })
    },
    disable(row) {
      console.log('禁用员工')
      this.$confirm('是否要禁用该员工?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        userApi.disable({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '禁用员工成功!'
          })
          this.fetchData()
        })
      })
    },
    resetPs(row) {
      this.$confirm('是否要重置该员工密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        userApi.update({ account: row.account, password: '123456' }).then(() => {
          this.$message({
            type: 'success',
            message: '重置员工密码成功!'
          })
          this.fetchData()
        })
      })
    },
    enable(row) {
      userApi.enable({ id: row.id }).then(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '更新员工成功!'
        })
        this.fetchData()
      })
    },
    updateData() {
      userApi.update(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '更新员工成功!'
        })
        this.fetchData()
      })
    },
    createData() {
      userApi.add(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '添加员工成功!'
        })
        this.fetchData()
      })
    }
  }
}
</script>
