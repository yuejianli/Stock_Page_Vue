<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;margin-bottom:30px;"
        type="primary"
        icon="el-icon-add"
        @click="handleCreate">添加规则</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="规则条件编号" width="200">
        <template slot-scope="scope">
          {{ scope.row.conditionName }}
        </template>
      </el-table-column>
      <el-table-column label="比较类型" width="100">
        <template slot-scope="scope">
          {{ scope.row.ruleValueType | ruleValueTypeFormatter }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="规则对应值"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.ruleValue }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="交易股票数"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.tradeNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="交易差值类型"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.tradeValueType | ruleValueTypeFormatter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="交易差值"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.tradePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="规则类型"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.ruleType | ruleTypeFormatter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="状态"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFormatter">{{
            scope.row.status | statusFormatter
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="更新时间"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-setting"
            @click="handlerUpdate(scope.row)">修改</el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-setting"
            @click="deleteData(scope.row)">删除</el-button>
          <br>
          <br>
          <el-button
            v-if="scope.row.status != 1"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="enable(scope.row)">启用</el-button>
          <el-button
            v-if="scope.row.status != 0"
            type="danger"
            size="mini"
            icon="el-icon-edit"
            @click="disable(scope.row)">禁用</el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-setting"
            @click="config(scope.row)">应用股票</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination
      :total="total"
      :current-page="currentPage"
      :page-sizes="[5, 10, 50, 100, 500]"
      :page-size="pagesize"
      style="padding:30px 0; text-align: center;"
      layout="total, prev, pager, next,sizes, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <el-dialog :visible.sync="dialogFormVisible" title="维护规则">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        style="width:400px; margin-left:50px;"
      >
        <!--开始添加元素-->
        <el-form-item label="规则名称:" prop="name">
          <el-col :span="18"><el-input v-model="temp.name"/></el-col>
        </el-form-item>
        <!--select 框-->
        <el-form-item label="选择条件:">
          <el-select v-model="temp.conditionId" class="filter-item">
            <el-option
              v-for="item in conditions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="对应类型:">
          <el-select v-model="temp.ruleValueType" class="filter-item">
            <el-option
              v-for="item in ruleValueTypeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="对应关系值:" prop="ruleValue">
          <el-col :span="18"> <el-input v-model="temp.ruleValue"/></el-col>
        </el-form-item>
        <el-form-item label="交易股票数:" prop="tradeNum">
          <el-col :span="18">
            <el-input-number
              v-model="temp.tradeNum"
              :step="100"
              :min="100"
              step-strictly
          /></el-col>
        </el-form-item>
        <el-form-item label="交易差值类型:">
          <el-select v-model="temp.tradeValueType" class="filter-item">
            <el-option
              v-for="item in ruleValueTypeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="交易差值:" prop="tradePrice">
          <el-col :span="18"> <el-input v-model="temp.tradePrice"/></el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()">确认</el-button
        >
      </div>
    </el-dialog>
    <el-dialog :visible.sync="applyDialogFormVisible" title="配置适用股票信息">
      <el-form
        ref="dataForm"
        label-position="left"
        style="width:400px; margin-left:50px;"
      >
        <el-table
          ref="multipleTable"
          :data="applyAllList"
          border
          fit
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <!--开始添加元素-->
          <el-table-column type="selection" width="55" value="true" />
          <el-table-column prop="stockCode" label="股票编码" />
          <el-table-column prop="stockName" label="股票名称" />
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="applyDialogFormVisible = false">取消</el-button>
        <el-button type="success" @click="applyConfig()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import buyruleApi from '@/api/tradeconfig/buyrule'
import conditionApi from '@/api/tradeconfig/condition'
import stockruleApi from '@/api/tradeconfig/stockrule'
const ruleValueTypeOptions = [
  { id: '1', name: '金额' },
  { id: '2', name: '比例' }
]
export default {
  filters: {
    ruleValueTypeFormatter(value) {
      return value === 1 ? '金额' : '比例'
    },
    ruleTypeFormatter(value) {
      return value === 1 ? '买入' : '卖出'
    },
    statusFormatter(value) {
      return value === 1 ? '正常' : '禁用'
    }
  },
  // 定义数据模型
  data() {
    return {
      listLoading: true,
      list: null,
      // 追加分页相关的数据信息
      searchObj: {
        'mockType': 1,
        'ruleType': 2
      }, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0, // 总记录数,
      temp: {
        id: null,
        name: '',
        conditionId: '',
        ruleValueType: '',
        ruleValue: '',
        tradeNum: 100,
        tradeValueType: '',
        tradePrice: '',
        ruleType: '2',
        mockType: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      conditions: null,
      ruleValueTypeOptions,
      // 配置适用的股票列表
      applyDialogFormVisible: false,
      applyAllList: null,
      applyList: [],
      multipleSelection: [],
      clickRuleId: null
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.listLoading = true
    this.fetchData(this.currentPage, this.pagesize)
    // 处理 查询条件
    this.findConditions()
  },
  methods: {
    fetchData(currentPage = 1, pagesize = 10) {
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      buyruleApi.getPageList(this.currentPage, this.pagesize, this.searchObj).then(
        response => {
          this.list = response.data.list
          // 添加响应数
          this.total = response.data.total
          this.listLoading = false
        }
      ).catch(error => {
        // 请求失败，则打印错误
        console.log(error)
      })
    },
    findConditions() {
      conditionApi.getPageList(1, 100, null).then(
        response => {
          this.conditions = response.data
        }
      ).catch(error => {
        // 请求失败，则打印错误
        console.log(error)
      })
    },
    // 页码控制
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage, this.pagesize)
    },
    // 页数控制
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      this.fetchData(this.currentPage, this.pagesize)
    },
    resetTemp() {
      this.temp = {
        id: null,
        name: '',
        conditionId: '',
        ruleValueType: '',
        ruleValue: '',
        tradeNum: 100,
        tradeValueType: '',
        tradePrice: '',
        ruleType: '2',
        mockType: 1
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    handlerUpdate(row) {
      // 复制数据
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
    },
    disable(row) {
      buyruleApi.disable({ id: row.id }).then(() => {
        this.$message({
          type: 'success',
          message: '禁用规则成功!'
        })
        this.fetchData()
      })
    },
    enable(row) {
      buyruleApi.enable({ id: row.id }).then(() => {
        this.$message({
          type: 'success',
          message: '启用规则成功!'
        })
        this.fetchData()
      })
    },
    config(row) {
      // 进行查询
      this.clickRuleId = row.id
      this.applyDialogFormVisible = true
      stockruleApi.applyList({ id: row.id }).then(
        response => {
          this.applyAllList = response.data.allList
          let applyList = response.data.applyList || []
          if (applyList.length > 0) {
            for (let i = 0; i < applyList.length; i++) {
              this.applyList.push(applyList[i].stockCode)
            }
            this.$nextTick(() => {
              for (let i = 0; i < this.applyAllList.length; i++) {
                if (this.applyList.includes(this.applyAllList[i].stockCode)) {
                  this.$refs.multipleTable.toggleRowSelection(this.applyAllList[i], true)
                }
              }
            })
          }
        })
    },
    applyConfig() {
      let stockCodeList = []
      // 遍历数组得到每个id值，设置到idList里面
      for (let i = 0; i < this.multipleSelection.length; i++) {
        var obj = this.multipleSelection[i]
        stockCodeList.push(obj.stockCode)
      }
      if (stockCodeList.length < 1) {
        this.$message({
          type: 'warning',
          message: '请配置股票!'
        })
        return
      }
      stockruleApi.apply({ id: this.clickRuleId, applyCodeList: stockCodeList }).then(
        response => {
          this.applyDialogFormVisible = false
          this.$message({
            type: 'success',
            message: '配置成功!'
          })
          this.fetchData()
        }
      )
    },
    deleteData(row) {
      console.log('删除规则')
      this.$confirm('是否要删除该规则?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        buyruleApi.delete({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除规则成功!'
          })
          this.fetchData()
        })
      })
    },
    updateData() {
      buyruleApi.update(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '更新规则成功!'
        })
        this.fetchData()
      })
    },
    createData() {
      buyruleApi.add(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '添加规则成功!'
        })
        this.fetchData()
      })
    },
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    }
  }
}
</script>
