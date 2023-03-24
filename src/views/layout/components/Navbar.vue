<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img src="https://yueshushu.top/logo.jpg" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <!-- TODO: yjl 配置右侧的菜单栏-->
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="handlerUpdate()"> 修改个人信息</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout"> 退出 </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog :visible.sync="dialogFormVisible" title="维护用户">
      <el-form ref="dataForm" :model="temp" label-position="right" style="width:550px; margin-left:50px;">
        <!--开始添加元素-->
        <el-form-item label="账号:" prop="account">
          <el-col :span="18"><el-input v-model="temp.account" :disabled="true"/></el-col>
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
          <el-col :span="18"><el-input v-model="temp.password" type ="password"/></el-col>
        </el-form-item>
      </el-form>   
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="updateData()">确认</el-button>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import userApi from '@/api/user/user'
import { getLoginUser } from '@/utils/auth'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      temp: {
        account: '',
        name: '',
        phone: '',
        email: '',
        password: ''
      },
      dialogFormVisible: false,
      passwordText: '',
      resetPassword: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      localStorage.removeItem('Authorization')
      this.$router.push({ path: '/login' })
    },
    handlerUpdate() {
      // 复制数据
      const loginUser = getLoginUser()
      userApi.getInfo({ account: loginUser.account }).then(
        response => {
          this.temp.account = response.data.account
          this.temp.name = response.data.name
          this.temp.phone = response.data.phone
          this.temp.email = response.data.email
          this.temp.password = response.data.password
          this.dialogFormVisible = true
          this.resetPassword = false
          this.passwordText = '新密码:'
        }
      )
    },
    updateData() {
      userApi.update(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '更新员工信息成功!'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

