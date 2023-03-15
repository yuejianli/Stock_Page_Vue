<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form">
        <el-form-item label="请选择版块:">
          <el-select v-model="searchObj.bkCode" class="filter-item" filterable @change="fetchData()">
            <el-option
              v-for="item in bks"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围:">
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
        <el-form-item label="选择条件:">
          <el-select v-model="searchObj.charBKTypeList" multiple clearable class="filter-item">
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
    </div>
    <el-row>
      <div id="stockCharts" style="width: 1500px;height:600px;" />
    </el-row>
  </div>
</template>
<script>
import bkApi from '@/api/bk/bk'
import echarts from 'echarts'
export default {
  // 定义 过滤器
  filters: {
  },
  // 定义数据模型
  data() {
    return {
      bks: null,
      charResult: null,
      dateRange: [],
      searchObj: {
        startDate: '',
        endDate: '',
        bkCode: '',
        charBKTypeList: []
      },
      allCharStockTypeList: []
    }
  },
  // 页面渲染成功后获取数据
  created() {
    this.initDate()
    this.initBks()
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
    // 初始化版块列表
    initBks() {
      bkApi.listGn({}).then(
        response => {
          this.bks = response.data || []
          this.searchObj.bkCode = this.bks[0].code
        }
      ).catch(error => {
        // 请求失败，则打印错误
        console.log(error)
      })
    },
    initAllCharStockTypeList() {
      bkApi.listMoneyType({}).then(
        response => {
          this.allCharStockTypeList = response.data
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
      bkApi.getCharStat(this.searchObj).then(
        response => {
          this.charResult = response.data
          var chartDom = document.getElementById('stockCharts')
          var myChart = echarts.init(chartDom)
          var option
          option = {
            title: {
              text: '概念统计展示图表'
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
