<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form">
        <el-form-item label="股票编码:">
          <el-input v-model="code" />
        </el-form-item>
        <el-form-item style="margin-left: 160px;">
          <el-button type="primary" @click="fetchData()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-row>
        <el-col :span="12" style="margin-left: -80px;">
          <div class="grid-content bg-purple-light">
            <el-form ref="formResult" :model="formResult" label-width="180px">
              <el-form-item label="">
                <el-col :span="6" style="font-size: 18px;color: deeppink">股票基本信息:</el-col
                >
              </el-form-item>
              <el-form-item label="">
                <el-col :span="6">股票编码</el-col>
                <el-col :span="6" class="focus-info">{{ formResult.code }} </el-col>
                <el-col :span="6">股票名称</el-col>
                <el-col :span="6" class="focus-info">{{ formResult.name }} </el-col>
              </el-form-item>
              <el-form-item label="">
                <el-col :span="6">开盘价</el-col>
                <el-col :span="6" class="focus-info">{{ formResult.openingPrice }} </el-col>
                <el-col :span="6">当前价</el-col>
                <el-col :span="6" class="focus-info">{{ formResult.nowPrice }} </el-col>
              </el-form-item>
              <el-form-item label="">
                <el-col :span="6">最高价</el-col>
                <el-col :span="6" class="focus-info">{{ formResult.highestPrice }} </el-col>
                <el-col :span="6">最低价</el-col>
                <el-col :span="6" class="focus-info">{{ formResult.lowestPrice }} </el-col>
              </el-form-item>
              <el-form-item label="">
                <el-col :span="6">涨跌幅</el-col>
                <el-col :span="6">{{ formResult.amplitude }} </el-col>
                <el-col :span="6">涨跌百分比</el-col>
                <el-col :span="6" class="focus-info">{{ formResult.amplitudeProportion }} </el-col>
              </el-form-item>
              <el-form-item label="">
                <el-col :span="6">成交量</el-col>
                <el-col :span="6">{{ formResult.tradingVolume }} </el-col>
                <el-col :span="6">成交金额</el-col>
                <el-col :span="6">{{ formResult.tradingValue }} </el-col>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form ref="formResult" label-width="180px">
              <el-form-item label="">
                <el-col :span="6" style="font-size: 18px;color: deeppink">股票的涨幅度信息:</el-col
                >
              </el-form-item>
              <el-form-item label="">
                <el-col :span="7">范围: </el-col>
                <el-col :span="7"> 价位:</el-col>
                <el-col :span="7">幅度: </el-col>
              </el-form-item>
              <el-form-item v-for = "( item, index) in weekStatInfoList" :key ="index" >
                <el-col :span="7"> {{ item.typeName }} </el-col>
                <el-col :span="7" class="focus-info"> {{ item.rangePrice }}:</el-col>
                <el-col :span="7" class="focus-info">{{ item.rangeProportion }} </el-col>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <p>股票价格信息</p>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" class="demo-form">
            <el-form-item label="筛选日期:">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                format = "yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeDate()"/>
            </el-form-item>
            <!--select 框-->
            <el-form-item label="选择条件:">
              <el-select v-model="searchObj.charStockTypeList" multiple clearable class="filter-item">
                <el-option
                  v-for="item in allCharStockTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 200px;">
              <el-button type="success" @click="statData()">统计</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <div id="stockCharts" style="width: 1500px;height:600px;" />
      </el-row>
    </div>
  </div>
</template>
<script>
import stockCrawlerApi from '@/api/stockconfig/stockCrawler'
import statApi from '@/api/stat/stat'
import echarts from 'echarts'
export default {
  // 定义 过滤器
  filters: {
  },
  // 定义数据模型
  data() {
    return {
      code: '002812',
      formResult: {
        code: '',
        fullCode: '',
        name: '',
        openingPrice: '',
        yesClosingPrice: '',
        highestPrice: '',
        lowestPrice: '',
        closingPrice: '',
        nowPrice: '',
        tradingVolume: '',
        tradingValue: '',
        amplitude: '',
        amplitudeProportion: ''
      },
      weekStatInfoList: [],
      charResult: null,
      dateRange: [],
      searchObj: {
        startDate: '',
        endDate: '',
        code: '',
        charStockTypeList: []
      },
      allCharStockTypeList: []
    }
  },
  // 页面渲染成功后获取数据
  created() {
    this.initDate()
    this.initAllCharStockTypeList()
  },
  methods: {
    initDate() {
      const end = new Date(new Date().toLocaleDateString())
      const start = new Date(new Date().toLocaleDateString())
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
      const s = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
      const e = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
      this.dateRange = [s, e]
      this.searchObj.startDate = s
      this.searchObj.endDate = e
    },
    initAllCharStockTypeList() {
      statApi.listMoneyType({}).then(
        response => {
          this.allCharStockTypeList = response.data
        }
      )
    },
    fetchData() {
      // 根据 code 查询基本信息
      stockCrawlerApi.getInfoNow(this.code).then(
        response => {
          this.formResult = Object.assign({}, response.data)
          statApi.getWeekStat({ code: this.code }).then(
            response2 => {
              this.weekStatInfoList = response2.data.weekStatInfoList
            }
          )
        }
      )
    },
    changeDate() {
      this.searchObj.startDate = this.dateRange[0]
      this.searchObj.endDate = this.dateRange[1]
      this.statData()
    },
    convert(series) {
      const convertInfoArr = new Array(series.length)
      for (var i in series) {
        var tempInfo = series[i]
        const mdata = [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
        const markPoint = {}
        markPoint.data = mdata
        const adata = [{ type: 'average', name: 'Avg' }]
        const markLine = {}
        markLine.data = adata
        tempInfo.markPoint = markPoint
        tempInfo.markLine = markLine
        convertInfoArr.push(tempInfo)
      }
      return convertInfoArr
    },
    statData() {
      this.searchObj.code = this.code
      statApi.getCharStat(this.searchObj).then(
        response => {
          this.charResult = response.data
          var chartDom = document.getElementById('stockCharts')
          var myChart = echarts.init(chartDom)
          var option
          option = {
            title: {
              text: '价格展示图表'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: this.charResult.legend
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              show: true,
              feature: {
                magicType: { type: ['line', 'bar'] },
                restore: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.charResult.xaxisData
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} ￥'
              }
            },
            series: this.convert(this.charResult.series)
          }
          chartDom.setAttribute('_echarts_instance_', '')
          option && myChart.setOption(option, true)
        }
      )
    }
  }
}
</script>
<style>
.focus-info{
  font-size:18px;
  color:red;
}
</style>
