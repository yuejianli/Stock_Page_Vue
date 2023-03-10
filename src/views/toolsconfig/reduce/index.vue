<template>
  <div class="app-container">
    <el-row>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="股票代码:">
              <el-col :span="12"> <el-input v-model="form.code" @change="getStockInfo"/></el-col>
              <el-col :span="6" :offset="6"><el-button type="success" @click="showDetail()">查看走势图</el-button></el-col>
            </el-form-item>
            <el-form-item label="第一次买入时价位:">
              <el-input v-model="form.price" />
            </el-form-item>
            <el-form-item label="第一次买入股票数(整百)">
              <el-input-number v-model="form.number" :step="100" :min="100" step-strictly />
            </el-form-item>
            <el-form-item label="证券平台佣金比例(%):">
              <el-input v-model="form.platformFee" />
            </el-form-item>
            <el-form-item label="第二次卖出股票数(整百)">
              <el-input-number v-model="form.secNumber" :step="100" :min="100" step-strictly />
            </el-form-item>

            <el-form-item label="(>=)准备卖出后的价格:">
              <el-col :span="12"><el-input v-model="form.secPrice"/></el-col>
              <el-col :span="6" :offset="6"><el-button type="success" @click="calcMakePrice()">预计卖出计算</el-button></el-col
              >
            </el-form-item>
            <el-form-item label="(>=)填写预期平均后价位:">
              <el-col :span="12"><el-input v-model="form.makePrice"/></el-col>
              <el-col :span="6" :offset="6"><el-button type="success" @click="calcMakeProportion()">预期持仓计算</el-button></el-col
              >
            </el-form-item>
            <el-form-item />
            <el-form-item>
              <el-button type="primary" size="middle" @click="reset">重置</el-button >
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-form ref="formResult" :model="formResult" label-width="180px">
            <el-form-item label="">
              <el-col :span="6" style="font-size: 18px;color: deeppink">手续费信息:</el-col
              >
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6" class="focus-info">第一次买入:</el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">买入手续费</el-col>
              <el-col :span="6">{{ formResult.buyCharge1 }} </el-col>
              <el-col :span="6">买入过户费</el-col>
              <el-col :span="6">{{ formResult.buyTransferFee1 }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">买入通讯费</el-col>
              <el-col :span="6">{{ formResult.buyCommunications1 }} </el-col>
              <el-col :span="6">买入金额:</el-col>
              <el-col :span="6">{{ formResult.dealMoney1 }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">总的买入手续费</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.totalBuyCharge1 }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6" class="focus-info">第二次卖出:</el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">卖出手续费</el-col>
              <el-col :span="6">{{ formResult.sellCharge }} </el-col>
              <el-col :span="6">卖出过户费</el-col>
              <el-col :span="6">{{ formResult.sellTransferFee }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">卖出通讯费</el-col>
              <el-col :span="6">{{ formResult.sellCommunications }} </el-col>
              <el-col :span="6">卖出印花费</el-col>
              <el-col :span="6">{{ formResult.sellStampDuty }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">卖出金额:</el-col>
              <el-col :span="6">{{ formResult.sellMoney }} </el-col>
              <el-col :span="6">总的卖出手续费</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.totalSellCharge }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">总的交易费用合计:</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.totalCharge }} </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div class="grid-content bg-purple-light">
          <el-form ref="formResult" :model="formResult" label-width="180px">
            <el-form-item label="">
              <el-col :span="6" style="font-size: 18px;color: deeppink">操作记录信息:</el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">目前数量:</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.totalNum }} </el-col>
              <el-col :span="6">目前金额:</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.totalMoney }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">本次操作价格:</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.nowOperationPrice }} </el-col>
              <el-col :span="6">平均持仓价格:</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.avgPrice }} </el-col>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-dialog :visible.sync="showDetailDialogVisible" title="查看股票信息和分钟K线图">
        <el-form ref="dataForm" :model="detailInfo" style="width: 800px;">
          <el-form-item label="">
            <el-col :span="6">代码:</el-col>
            <el-col :span="6">{{ detailInfo.code }} </el-col>
            <el-col :span="6">名称:</el-col>
            <el-col :span="6">{{ detailInfo.name }} </el-col>
          </el-form-item>
          <el-form-item label="">
            <el-col :span="6">开盘价:</el-col>
            <el-col :span="6" class="focus-info">{{ detailInfo.openingPrice }} </el-col>
            <el-col :span="6">昨天收盘价:</el-col>
            <el-col :span="6" class="focus-info">{{ detailInfo.yesClosingPrice }} </el-col>
          </el-form-item>
          <el-form-item label="">
            <el-col :span="6">最高价格:</el-col>
            <el-col :span="6" class="focus-info">{{ detailInfo.highestPrice }} </el-col>
            <el-col :span="6">最低价格:</el-col>
            <el-col :span="6" class="focus-info">{{ detailInfo.lowestPrice }} </el-col>
          </el-form-item>
          <el-form-item label="">
            <el-col :span="6">当前的价格:</el-col>
            <el-col :span="6" class="focus-info">{{ detailInfo.closingPrice }} </el-col>
            <el-col :span="6">今天收盘价:</el-col>
            <el-col :span="6" class="focus-info">{{ detailInfo.nowPrice }} </el-col>
          </el-form-item>
          <el-form-item label="">
            <el-col :span="6">成交量(股):</el-col>
            <el-col :span="6">{{ detailInfo.tradingVolume }} </el-col>
            <el-col :span="6">成交量金额:</el-col>
            <el-col :span="6">{{ detailInfo.tradingValue }} </el-col>
          </el-form-item>
          <el-form-item label="">
            <el-col :span="6">涨跌幅度:</el-col>
            <el-col :span="6">{{ detailInfo.amplitude }} </el-col>
            <el-col :span="6">涨跌幅度百分比:</el-col>
            <el-col :span="6" class="focus-info">{{ detailInfo.amplitudeProportion }} </el-col>
          </el-form-item>
          <el-form-item label="">
            <img :src="'data:image/png;base64,'+ url" alt="">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDetailDialogVisible = false"> 返回</el-button>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>
<script>
import stockCrawlerApi from '@/api/stockconfig/stockCrawler'
import toolApi from '@/api/toolsconfig/tool'
const resetForm = {
  code: '002415',
  price: 100,
  number: 100,
  secNumber: 100,
  secPrice: '',
  platformFee: '0.015',
  makePrice: '',
  makeProportion: '',
  tradingArea: 0,
  nameType: 0,
  type: 1
}
const resetformResult = {
  // 展示手续费
  buyCharge1: '',
  buyTransferFee1: '',
  buyCommunications1: '',
  dealMoney1: '',
  totalBuyCharge1: '',
  sellMoney: '',
  totalSellCharge: '',
  sellCommunications: '',
  sellStampDuty: '',
  sellCharge: '',
  sellTransferFee: '',
  totalCharge: '',
  // 展示操作
  totalNum: '',
  totalMoney: '',
  avgPrice: '',
  nowOperationPrice: ''
}
const detailInfo = {
  code: '',
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
}
export default {
  data() {
    return {
      form: resetForm,
      formResult: resetformResult,
      showDetailDialogVisible: false,
      detailInfo: detailInfo,
      url: '5bKz5rO96ZyWLOS9oOWlveWVig=='
    }
  },
  created() {
    this.getStockInfo()
  },
  methods: {
    // 重置
    reset() {
      this.form = Object.assign({}, resetForm)
      this.formResult = Object.assign({}, resetformResult)
      this.detailInfo = Object.assign({}, detailInfo)
    },
    // 获取股票的信息
    getStockInfo() {
      stockCrawlerApi.getInfoNow(this.form.code).then(
        response => {
          this.form.price = response.data.nowPrice
          this.form.secPrice = response.data.nowPrice + 1
          this.form.makePrice = response.data.nowPrice + 0.5
        }
      )
    },
    // 计算 Price
    calcMakePrice() {
      this.form.type = 1
      this.calcAndShowResult()
    },
    // 计算 Proportion
    calcMakeProportion() {
      this.form.type = 2
      this.calcAndShowResult()
    },
    // 计算并展示结果
    calcAndShowResult() {
      toolApi.reduceMoney(this.form).then(
        response => {
          var calcBuyMoneyVoList = response.data.calcBuyMoneyVoList
          this.formResult.buyCharge1 = calcBuyMoneyVoList[0].buyCharge
          this.formResult.buyTransferFee1 = calcBuyMoneyVoList[0].buyTransferFee
          this.formResult.buyCommunications1 = calcBuyMoneyVoList[0].buyCommunications
          this.formResult.dealMoney1 = calcBuyMoneyVoList[0].dealMoney
          this.formResult.totalBuyCharge1 = calcBuyMoneyVoList[0].totalBuyCharge

          var calcSellMoneyVoList = response.data.calcSellMoneyVoList
          this.formResult.sellMoney = calcSellMoneyVoList[0].sellMoney
          this.formResult.totalSellCharge = calcSellMoneyVoList[0].totalSellCharge
          this.formResult.sellCommunications = calcSellMoneyVoList[0].sellCommunications
          this.formResult.sellStampDuty = calcSellMoneyVoList[0].sellStampDuty
          this.formResult.sellCharge = calcSellMoneyVoList[0].sellCharge
          this.formResult.sellTransferFee = calcSellMoneyVoList[0].sellTransferFee
          this.formResult.totalCharge = response.data.totalCharge

          this.formResult.totalNum = response.data.totalNum
          this.formResult.totalMoney = response.data.totalMoney
          this.formResult.avgPrice = response.data.avgPrice
          this.formResult.nowOperationPrice = response.data.nowOperationPrice
        }
      )
    },
    // 查看详情信息
    showDetail() {
      // 查询信息
      stockCrawlerApi.getInfoNow(this.form.code).then(
        response => {
          this.detailInfo = Object.assign({}, response.data)
          // 继续查询 K 线
          stockCrawlerApi.getStockKline(response.data.fullCode, 1).then(
            response2 => {
              // 处理展示 base64 字符串
              this.url = response2.data
              this.showDetailDialogVisible = true
            }
          )
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
