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
              <el-col :span="10" :offset="3">
                <label class="control-label">证券账号已经提前绑定,无需输入:</label>
              </el-col>
            </el-form-item>
            <el-form-item prop="password">
              <el-col :span="10" :offset="3">
                <label class="control-label">证券密码已经提前写入,无需输入:</label>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="3">
                验证码:
              </el-col>
              <el-col :span="8">
                <el-input v-model="loginForm.identifyCode" type="text"/>
              </el-col>
              <el-col :span="12" class="yzm">
                <img :src="'data:image/png;base64,'+ url" alt="" @click="refreshYzm()">
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :offset="3">
                <el-button :loading="loading" element-loading-text="登录中,请稍候..." type="primary" style="width:35%;" @click.native.prevent="handleLogin">
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
import userApi from '@/api/trade/user'
import yzmApi from '@/api/tradeconfig/method'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        identifyCode: ''
      },
      url: null,
      loading: false
    }
  },
  // 页面渲染成功后获取数据
  created() {
  // 调用 刷新验证码的方法
    this.refreshYzm()
  },
  methods: {
    refreshYzm() {
      yzmApi.yzm().then(
        response => {
          this.url = response.data
        }
      )
    },
    handleLogin() {
      this.loading = true
      this.loginForm.readAgreement = this.loginForm.readAgreementValue ? 1 : 0
      userApi.login(this.loginForm).then(
        response => {
          this.loading = false
          this.$message({
            type: 'success',
            message: '交易用户登录成功!'
          })
          localStorage.removeItem('tradeUserNoLogin')
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
.yzm {
  margin-top: 0px;
  margin-left: 10px;
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

