<template>
  <el-container style="height:80%;">
    <el-main style="padding-top:200px;">
      <el-col :span="8" :offset="1">
        <div>
          <h2>欢迎登录  <span class="relationName"><a href="https://www.yueshushu.top">两个蝴蝶飞</a></span>  自用交易软件</h2>
        </div>
        <div class="mar30">
          <p style="font-size: 18px;color: red;">股票有风险,入市需谨慎</p>
        </div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-form ref="loginForm" :model="loginForm" auto-complete="on" label-position="left" class="loginForm">
            <el-form-item prop="username">
              <el-col :span="8">
                <label class="control-label">登录账号:</label>
              </el-col>
              <el-col :span="8">
                <el-input v-model="loginForm.account" type="text" auto-complete="on" placeholder="请输入用户名" />
              </el-col>
            </el-form-item>
            <el-form-item prop="username">
              <el-col :span="8">
                <label class="control-label">密码:</label>
              </el-col>
              <el-col :span="8">
                <el-input v-model="loginForm.password" type = "password" auto-complete="on" placeholder="请输入密码" />
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="6">
                <el-checkbox v-model="loginForm.readAgreementValue" label="1">我已同意并知晓</el-checkbox>
              </el-col>
              <el-col :span="18" class="notes">
                <p>本软件不提供股市任何有价值的信息,不能做为股市投资软件使用</p>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :offset="5">
                <el-button :loading="loading" element-loading-text="登录中,请稍候..." type="primary" style="width:40%;" @click.native.prevent="handleLogin">
                  登录
                </el-button>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :offset="5">
                本软件不提供注册服务。 如有需要,请 <a href="tencent://message/?uin=1290513799&Exe=QQ&Site=Simplelife&Menu=ye"><span class="relationUser">联系系统管理员</span></a>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-main>
    <el-footer>
      <div class="copyText">
        <small>&copy; 2021 <a href="https://blog.csdn.net/yjltx1234csdn" target="_blank">岳叔叔</a></small><br>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import userApi from '@/api/right/user'
import { setToken, setLoginUser } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: 'test',
        password: '123456',
        readAgreement: 0,
        readAgreementValue: false
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.loading = true
      this.loginForm.readAgreement = this.loginForm.readAgreementValue ? 1 : 0
      userApi.login(this.loginForm).then(
        response => {
          // 获取登录的数据
          const user = response.data.currentUser
          setToken(user.token)
          setLoginUser(user)
          this.loading = false
          // 进行跳转
          const redirect = decodeURIComponent(this.$route.query.redirect || '/dashboard')
          this.$router.push({ path: redirect })
        }
      ).catch(e => {
        this.loading = false
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.relationUser {
  font-size: 14px;
  color: red;
}
.relationName {
  font-size: 40px;
  color: red;
}
.notes {
  margin-top: -16px;
  margin-left: -30px;
}
.loginForm {
  border: 1px solid #eeeeee;
  padding: 20px 30px;
}
.copyText{
  padding-top: 120px;
  margin-left: 1400px;
}
</style>

