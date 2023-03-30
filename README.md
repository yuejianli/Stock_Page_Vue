对应的后端代码是:   https://github.com/yuejianli/Stock_Api

# 安装运行

npm install 

npm run dev 

npm run build 

# 写在前面的话

> 股票是个害人的东西， 如果可以的话，千万别炒股, 大A就是在强奸所有国人的善良和勇敢 -------- 一个炒股亏钱的人的自省和感悟。
> 股市是个杀人坑， 请速速远离。
>
> 我操你妈个逼，大A股。

# 参考感谢

本项目是在群主的基础上进行扩展。

群主大大链接:   https://github.com/bosspen1/stock

# 项目预览提示

项目预览地址:   https://www.yueshushu.top/Stock

小提示:

1. 测试用户和密码是:   test1 ,test2,test3,test4 ~  test30

密码是:  123456 体验用户最好别进行修改。

2. 用户登录之后， 菜单可能不出来， 强制 F5 刷新浏览器即可。

3. 如果被挤掉了， 可以换其它的账号进行登录。

# 技术选型

采用的是, SpringBoot + MybatisPlus + Vue

# 相对好的地方

1. 用户 在本地 配置了 账号和密码之后， 可以实现真正的交易 (交易方式抄袭 群主大大的)
2. 提供了模拟交易功能，并且可以将模拟交易的数据保存下来， 便于追溯。
3. 提供了很多个定时任务， 可以获取每天的交易数据， 包括 股票价格数据，股票交易记录，版本/概念历史数据
4. 提供了股票持仓，金额历史保存功能， 用户可以方便的查看 股票每天的持仓变化， 对 成本价进行关注。
5. 提供了 股票模块，股票概念 的持久化数据 和统计查询功能。
6. 提供了股票指数查看和保存功能， 用户可以看过往大盘的数据。
7. 提供了较多的统计功能
8. 提供了 清仓，补仓，加仓小工具。
9. 提供股票池 (涨停，跌停，次新，强势，炸板 ) 股票最近的走势。
10. 可以进行按照配置的规则，进行自动交易。
11. 可以进行打版操作。
12. 可以通过邮箱， 公众号， 钉钉 进行发送消息。

# 目录结构

├─main │ ├─java │ │ └─top │ │ └─yueshushu │ │ └─learn │ │ ├─annotation @AuthToken 注解， 登录权限使用 │ │ ├─aop LogAspect 访问日志 │
│ ├─api 东财实际请求使用， 抄袭 群主的 │ │ │ ├─request │ │ │ ├─response │ │ │ └─responseparse │ │ ├─assembler 实体类转换 │ │ ├─business
业务处理接口， 在 Controller 层下方 │ │ │ └─impl 业务处理接口实现 │ │ ├─common 公共配置变量 和错误码 │ │ ├─config 组件配置信息 │ │ ├─controller 业务控制器， 最上方
│ │ ├─crawler 爬虫相关的业务处理 │ │ │ ├─business 爬虫 Business │ │ │ │ └─impl │ │ │ ├─crawler 爬虫处理 │ │ │ │ └─impl │ │ │ ├─entity
爬虫结果实体封装 │ │ │ ├─parse 解析爬虫结果，转换成实体类 │ │ │ │ └─impl │ │ │ ├─properties 网址 url 配置信息， 与 application-url 相关。 │ │ │
├─service 业务 Service, 在 Business 层下方 │ │ │ │ └─impl │ │ │ └─util 工具类 │ │ │ └─gif │ │ ├─domain 数据库表对应的实体 │ │
├─domainservice 数据库表对应的 service, db 操作 │ │ │ └─impl │ │ ├─entity 表体中间转换 │ │ ├─enumtype 枚举 │ │ │ └─message │ │
├─exception 异常处理 │ │ ├─extension 额外功能 │ │ │ ├─assembler │ │ │ ├─business │ │ │ │ └─impl │ │ │ ├─controller │ │ │
├─domain │ │ │ ├─domainservice │ │ │ │ └─impl │ │ │ ├─entity │ │ │ ├─job │ │ │ ├─mapper │ │ │ ├─model │ │ │ │ ├─dto │ │
│ │ │ ├─gaodeweather │ │ │ │ │ ├─shanbeici │ │ │ │ │ ├─shici │ │ │ │ │ └─tianxing │ │ │ │ ├─ro │ │ │ │ └─vo │ │ │
└─service │ │ │ └─impl │ │ ├─helper --- 帮助类， 在 service 上面。 提供了日期和 请求交易 │ │ ├─init --- 项目初始化启动 │ │ ├─interceptor --- 拦截器，
登录拦截器 │ │ ├─job --- 定时任务配置 │ │ ├─mapper --- mapper 层 │ │ ├─message --- 消息发送， 目前是 钉钉， 邮箱 和 企业微信 │ │ │ ├─dingtalk │ │ │
├─email │ │ │ │ └─impl │ │ │ └─weixin │ │ │ ├─model │ │ │ ├─properties │ │ │ ├─service │ │ │ └─util │ │ ├─mode --- 实体转换
│ │ │ ├─dto --- 中间转换 │ │ │ ├─info │ │ │ ├─ro ---接收请求信息封装 │ │ │ └─vo ---- 返回响应信息封装 │ │ │ ├─charinfo │ │ │ ├─stock │ │ │
└─ten10stat │ │ ├─ocr ----- ocr 识别， 群主的 │ │ │ └─impl │ │ ├─response -- 响应配置 │ │ ├─service --- 单数据库表业务功能 │ │ │ ├─cache --
缓存 │ │ │ │ └─impl │ │ │ └─impl │ │ ├─strategy -- 买卖策略 │ │ │ ├─bs -- 买卖策略 │ │ │ │ ├─base │ │ │ │ ├─baseimpl │ │ │ │
└─model │ │ │ └─select -- 选股策略， 股票亏惨了，没有心情实现了。 │ │ └─util │ └─resources --- 资源配置 │ ├─mybatis │ │ └─mapper --- mapper 层 │
└─sql --- 脚本sql, 先执行 插入表，再执行创建表 └─test --- 测试类 └─java └─top └─yueshushu

![img.png](img/img.png)

![img_1.png](img/img_1.png)

调用结构是:    Controller ---> Business--- > Helper---> Service ---> DomainService---> Mapper

关于实体对应的， 可以查看具体的表结构， 表结构有详细的字段描述。

# 项目部署 和启动

1. 项目 拉取下来之后， 先 使用 resources/sql 文件，执行 SQL语句， 创建 表。

2. 配置文件 application.yml application-*.yml 配置文件进行修改， 主要修改数据库连接 和 redis 连接， 用户在本地采用 明文即可。 也可以通过 /usr/encrypt 进行加密

3. 启动 top.yueshushu.learn.StockApplication 启动类即可。
4. 用户存储在 trade_user 中， 通过 /user/tradeUserText 加密后手动存储到数据库中。

# 项目页面演示

页面上出现的股票 编码和 名称，均是 两个蝴蝶飞 个人使用的， 不做参考建议。

## 登录

!img_2.png](https://github.com/yuejianli/Stock_Api/tree/develop/img/img_2.png)

跳转到首页

![img_3.png](img/img_3.png)

修改个人信息和退出

![img_4.png](img/img_4.png)

## 股票信息模块

### 股票模块

![img_5.png](img/img_5.png)

![img_7.png](img/img_7.png)

#### 查看详细信息

![img_8.png](img/img_8.png)

#### 查看历史

![img_9.png](img/img_9.png)

#### 加入自选列表

![img_10.png](img/img_10.png)

#### 分钟 K 线

![img_11.png](img/img_11.png)

#### 天线， 周线， 月线

![img_12.png](img/img_12.png)

### 自选股票

#### 查看列表

可以进行备注， 移出自选

![img_13.png](img/img_13.png)

### 自选股票最近交易记录

自选列表中最近的交易记录

![img_14.png](img/img_14.png)

### 股票更新日志

可以查看新上市的， 更名的 股票记录

![img_15.png](img/img_15.png)

## 板块/概念模块

### 股票关联版块查询

可以查看一个股票对应的概念信息

![img_16.png](img/img_16.png)

点击链接，可以跳转到对应的 历史查询页面

### 股票板块历史查询

支持同步最近的记录

![img_17.png](img/img_17.png)

### 概念历史查询

支持同步

![img_18.png](img/img_18.png)

### 板块涨幅度查询

可以查看每天 涨幅度 前10的 版块

![img_19.png](img/img_19.png)

### 概念涨幅度查询

可以查看每天 涨幅度 前10的 概念

![img_20.png](img/img_20.png)

## 统计分析功能

### 周和图表统计功能

展示基本的信息 和最近的 涨幅度

![img_21.png](img/img_21.png)

图表折线图展示最近的信息

![img_22.png](img/img_22.png)

![img_23.png](img/img_23.png)

### 股票历史记录统计

可以按照 日期(天) 进行查询

![img_24.png](img/img_24.png)

也可以按照星期进行查询

![img_25.png](img/img_25.png)

### 最近十天交易汇总

可以查看自选表里面的 股票最近十天的 涨跌幅情况

未同步，是当时 服务器挂了

![img_26.png](img/img_26.png)

### 股票池汇总

可以查看 涨停， 跌停， 次新， 强势, 炸板股 最近的走势

![img_27.png](img/img_27.png)

### 股票版块统计

可以以图表的形式查看 版块的走势

![img_28.png](img/img_28.png)

支持多种条件

![img_29.png](img/img_29.png)

### 股票概念统计

可以以图表的形式查看 概念的走势, 支持多种条件

![img_30.png](img/img_30.png)

## 小工具模块

### 股票清仓

![img_31.png](img/img_31.png)

### 股票补仓

![img_32.png](img/img_32.png)

### 股票减仓

![img_33.png](img/img_33.png)

## 系统配置

### 假期查询

定时任务会每年进行同步

![img_34.png](img/img_34.png)

### 全局参数配置

系统运行中，一些重要的参数，想让其动态的变化， 做了个参数表

![img_35.png](img/img_35.png)

### 缓存 key 列表查询

只会查询一些公共的缓存信息， 私有化的缓存不进行展示。

主要是 自选股票的价格 和 指数的价格

![img_36.png](img/img_36.png)

### 定时任务配置

不支持动态的定时任务配置， 可以 禁用和启动， 执行一次。

![img_37.png](img/img_37.png)

![img_38.png](img/img_38.png)

![img_39.png](img/img_39.png)

## 股票交易配置

### 交易方法

![img_40.png](img/img_40.png)

### 买入规则/ 卖出规则配置

![img_41.png](img/img_41.png)

支持

![img_42.png](img/img_42.png)

配置到应用的股票上

![img_43.png](img/img_43.png)

卖出跟其一样

![img_44.png](img/img_44.png)

### 股票对应的的规则

可以查看目前股票配置的 买入和卖出规则

目前只能配置一个规则

![img_45.png](img/img_45.png)


## 虚拟/ 真实 业务处理

用户配置了 财富交易用户，便可以登录，查看。 真实的业务，会有缓存。

### 登录

配置在 trade_user 表里面， 登录成功后，便 可以查看持仓等信息。

![img_46.png](img/img_46.png)

### 持仓信息查看

![img_47.png](img/img_47.png)

可以进行 买入和卖出

![img_48.png](img/img_48.png)

### 今日委托

![img_49.png](img/img_49.png)

### 查看历史委托

![img_50.png](img/img_50.png)

### 今日成交记录

![img_51.png](img/img_51.png)

### 历史成交记录

![img_52.png](img/img_52.png)

### 历史持仓记录

对每天的持仓记录 进行持久化，做成历史

![img_53.png](img/img_53.png)

### 历史金额记录

对每天的金额进行记录，做成历史

![img_54.png](img/img_54.png)

## 用户资源配置

### 角色

![img_55.png](img/img_55.png)

动态的配置菜单

![img_56.png](img/img_56.png)

### 用户配置

微信 id, 邮箱， 钉钉标识， 是用于发送消息的。

![img_57.png](img/img_57.png)

### 免责说明

本项目代码，均没有通过测试， 不能直接真实的交易， 由此造成的问题， 两个蝴蝶飞不负责， 均由个人自负。

股市是个杀人坑， 请速速远离。



