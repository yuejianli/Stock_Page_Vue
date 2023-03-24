<template>
  <el-container style="height:80%;">
    <el-main style="padding-top:200px;">
      <el-col :span="8" :offset="1">
        <div>
          <h2>欢迎访问  <span class="relationName"><a href="https://www.yueshushu.top">岳泽霖</a></span></h2>
        </div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-form ref="loginForm" label-position="left" class="loginForm">
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

export default {
  name: 'Page404'
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
