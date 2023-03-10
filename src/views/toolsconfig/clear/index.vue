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
            <el-form-item label="买入时价位:">
              <el-input v-model="form.price" />
            </el-form-item>
            <el-form-item label="买入股票数(整百)">
              <el-input-number v-model="form.number" :step="100" :min="100" step-strictly />
            </el-form-item>
            <el-form-item label="证券平台佣金比例(%):">
              <el-input v-model="form.platformFee" />
            </el-form-item>
            <el-form-item label="(>=)填写预期所赚:">
              <el-col :span="12"><el-input v-model="form.makeMoney"/></el-col>
              <el-col :span="6" :offset="6"><el-button type="success" @click="calcMakeMoney()">预期金额计算</el-button></el-col
              >
            </el-form-item>
            <el-form-item label="(>=)填写预期价位:">
              <el-col :span="12"><el-input v-model="form.makePrice"/></el-col>
              <el-col :span="6" :offset="6"><el-button type="success" @click="calcMakePrice()">预期价位计算</el-button></el-col
              >
            </el-form-item>

            <el-form-item label="(>=)填写预期比例(%):">
              <el-col :span="12"><el-input v-model="form.makeProportion"/></el-col>
              <el-col :span="6" :offset="6"><el-button type="success" @click="calcMakeProportion()">预期比例计算</el-button></el-col
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
              <el-col :span="6">买入手续费</el-col>
              <el-col :span="6">{{ formResult.buyCharge }} </el-col>
              <el-col :span="6">买入过户费</el-col>
              <el-col :span="6">{{ formResult.buyTransferFee }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">买入通讯费</el-col>
              <el-col :span="6">{{ formResult.buyCommunications }} </el-col>
              <el-col :span="6">卖出印花税</el-col>
              <el-col :span="6">{{ formResult.sellStampDuty }} </el-col>
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
              <el-col :span="6">总的买入费用</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.totalBuyCharge }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">总的卖出费用</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.totalSellCharge }} </el-col>
              <el-col :span="6">总的手续费用</el-col>
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
              <el-col :span="6">买入股票名称:</el-col>
              <el-col :span="6">{{ formResult.name }} </el-col>
              <el-col :span="6">买入金额:</el-col>
              <el-col :span="6">{{ formResult.buyMoney }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">卖出金额:</el-col>
              <el-col :span="6">{{ formResult.sellMoney }} </el-col>
              <el-col :span="6">买入发生金额:</el-col>
              <el-col :span="6">{{ formResult.buyActualMoney }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">实际到账:</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.destMoney }} </el-col>
              <el-col :span="6">不卖，赚钱数:</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.noSellMoney }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">实际所得:</el-col>
              <el-col :span="6" class="focus-info">{{ formResult.realMoney }} </el-col>
              <el-col :span="6">操作价格:</el-col>
              <el-col :span="6">{{ formResult.realPrice }} </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="6">操作比例(%):</el-col>
              <el-col :span="6">{{ formResult.realProportion }} </el-col>
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
import { deepClone } from '@/api/util'
const resetForm = {
  code: '002415',
  price: 100,
  number: 100,
  platformFee: '0.015',
  makeMoney: '200',
  makePrice: 101,
  makeProportion: '2',
  tradingArea: 0,
  nameType: 0,
  type: 1
}
const resetformResult = {
  // 展示手续费
  buyCharge: '',
  buyTransferFee: '',
  buyCommunications: '',
  sellStampDuty: '',
  sellCharge: '',
  sellTransferFee: '',
  sellCommunications: '',
  totalBuyCharge: '',
  totalSellCharge: '',
  totalCharge: '',
  // 展示操作
  name: '',
  buyMoney: '',
  sellMoney: '',
  buyActualMoney: '',
  noSellMoney: '',
  destMoney: '',
  realMoney: '',
  realPrice: '',
  realProportion: ''
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
      this.form = deepClone(resetForm)
      this.formResult = deepClone(resetformResult)
      this.detailInfo = deepClone(detailInfo)
    },
    // 获取股票的信息
    getStockInfo() {
      stockCrawlerApi.getInfoNow(this.form.code).then(
        response => {
          this.form.price = response.data.nowPrice
          this.form.makePrice = response.data.nowPrice + 1
        }
      )
    },
    // 计算 Money
    calcMakeMoney() {
      this.form.type = 1
      this.calcAndShowResult()
    },
    // 计算 Price
    calcMakePrice() {
      this.form.type = 2
      this.calcAndShowResult()
    },
    // 计算 Proportion
    calcMakeProportion() {
      this.form.type = 3
      this.calcAndShowResult()
    },
    // 计算并展示结果
    calcAndShowResult() {
      toolApi.clearMoney(this.form).then(
        response => {
          this.formResult = response.data
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
