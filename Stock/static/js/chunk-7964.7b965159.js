(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7964"],{"Gqe/":function(e,t,a){"use strict";var o=a("t3Un");t.a={login:function(e){return Object(o.a)({url:"/user/login",method:"post",data:e})}}},M3h2:function(e,t,a){},"k/aX":function(e,t,a){"use strict";var o=a("M3h2");a.n(o).a},"qB2/":function(e,t,a){"use strict";a.r(t);var o=a("Gqe/"),n={name:"Login",data:function(){return{loginForm:{account:"test",password:"123456",readAgreement:0,readAgreementValue:!1},loading:!1,redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{handleLogin:function(){var e=this;this.loading=!0,this.loginForm.readAgreement=this.loginForm.readAgreementValue?1:0,o.a.login(this.loginForm).then(function(t){var a=t.data.currentUser;localStorage.setItem("loginUserId",a.id),localStorage.setItem("Authorization",a.token),e.loading=!1;var o=decodeURIComponent(e.$route.query.redirect||"/dashboard");e.$router.push({path:o})}).catch(function(t){e.loading=!1})}}},l=(a("k/aX"),a("KHd+")),r=Object(l.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticStyle:{height:"80%"}},[a("el-main",{staticStyle:{"padding-top":"200px"}},[a("el-col",{attrs:{span:8,offset:1}},[a("div",[a("h2",[e._v("欢迎登录  "),a("span",{staticClass:"relationName"},[a("a",{attrs:{href:"https://www.yueshushu.top"}},[e._v("两个蝴蝶飞")])]),e._v("  自用交易软件")])]),e._v(" "),a("div",{staticClass:"mar30"},[a("p",{staticStyle:{"font-size":"18px",color:"red"}},[e._v("股票有风险,入市需谨慎")])])]),e._v(" "),a("el-col",{attrs:{span:10}},[a("div",[a("el-form",{ref:"loginForm",staticClass:"loginForm",attrs:{model:e.loginForm,"auto-complete":"on","label-position":"left"}},[a("el-form-item",{attrs:{prop:"username"}},[a("el-col",{attrs:{span:8}},[a("label",{staticClass:"control-label"},[e._v("登录账号:")])]),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{type:"text","auto-complete":"on",placeholder:"请输入用户名"},model:{value:e.loginForm.account,callback:function(t){e.$set(e.loginForm,"account",t)},expression:"loginForm.account"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"username"}},[a("el-col",{attrs:{span:8}},[a("label",{staticClass:"control-label"},[e._v("密码:")])]),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{type:"password","auto-complete":"on",placeholder:"请输入密码"},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1)],1),e._v(" "),a("el-form-item",[a("el-col",{attrs:{span:6}},[a("el-checkbox",{attrs:{label:"1"},model:{value:e.loginForm.readAgreementValue,callback:function(t){e.$set(e.loginForm,"readAgreementValue",t)},expression:"loginForm.readAgreementValue"}},[e._v("我已同意并知晓")])],1),e._v(" "),a("el-col",{staticClass:"notes",attrs:{span:18}},[a("p",[e._v("本软件不提供股市任何有价值的信息,不能做为股市投资软件使用")])])],1),e._v(" "),a("el-form-item",[a("el-col",{attrs:{offset:5}},[a("el-button",{staticStyle:{width:"40%"},attrs:{loading:e.loading,"element-loading-text":"登录中,请稍候...",type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("\n                登录\n              ")])],1)],1),e._v(" "),a("el-form-item",[a("el-col",{attrs:{offset:5}},[e._v("\n              本软件不提供注册服务。 如有需要,请 "),a("a",{attrs:{href:"tencent://message/?uin=1290513799&Exe=QQ&Site=Simplelife&Menu=ye"}},[a("span",{staticClass:"relationUser"},[e._v("联系系统管理员")])])])],1)],1)],1)])],1),e._v(" "),a("el-footer",[a("div",{staticClass:"copyText"},[a("small",[e._v("© 2021 "),a("a",{attrs:{href:"https://blog.csdn.net/yjltx1234csdn",target:"_blank"}},[e._v("岳叔叔")])]),a("br")])])],1)},[],!1,null,"6767dcae",null);r.options.__file="myindex.vue";t.default=r.exports}}]);