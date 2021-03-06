<template>
  <div>
    <!--
    @param tableData 父组件传值
    @param loading [Boolean] 加载提示
    @param border [Boolean] table边框
  -->
  <el-table
      ref="table"
      :data="tableData"
      element-loading-text="Loading"
      :border="border"
      fit
      highlight-current-row
      tooltipEffect="dark"
      style="width:100%"
      @sortChange="handleSortChange"
      @selectionChange="handleSelectionChange">
        <!--
          @name 展开查看详情
          @param tableLabel 父组件传值
          @param label [string] 名称
          @param render 配置格式化数据
         -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form
            class="table-expand"
            >
              <el-form-item
                v-for="(item,index) in tableLabel"
                :key="index"
                :label="item.label">
                <span v-if="item.render">
                  {{item.render(scope.row)}}
                </span>
                <span v-else>{{scope.row[item.param]}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type='selection' width='55'></el-table-column>
        <!--
          @name 操作
          @param tableOption 父组件传值
          @param label [string] 名称
          @param width [string] 宽度
          @param options [array] 按钮数组
          @param type 按钮类型
          @param icon 按钮图标
          @param handleButton 按钮方法
         -->
        <el-table-column
          v-if="tableOption.label"
          :width="tableOption.width"
          :label="tableOption.label"
          align="center"
          className="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
            v-for="(item,index) in tableOption.options"
            :key="index"
            :type="item.type"
            :icon="item.icon"
            @click="handleButton(item.methods,scope.row,scope.$index)"
            size="mini">
              {{item.label}}
            </el-button>
          </template>
        </el-table-column>
        <!--
          @name 标题+表格数据显示
          @param tableLabel 父组件传值
          @param width 【string】宽度
          @param align 【string】对齐方式
          @param label [string] 名称
          @param sortable [Boolean] 排序
          @param render 配置格式化数据
        -->
        <template
          v-for="(item,index) in tableLabel"
          >
          <el-table-column
            :key="index"
            :show-overflow-tooltip='true'
            v-if="item.show"
            :width="item.width ? item.width : ''"
            :align="item.align"
            :label="item.label"
            :prop="item.param"
            :sortable="item.sortable ? 'custom' : false">
            <template slot-scope="scope">
              <span v-if="item.render">
                {{item.render(scope.row)}}
              </span>
              <span v-else>{{scope.row[item.param]}}</span>
            </template>
          </el-table-column>
        </template>

    </el-table>
    <el-pagination
      background
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :currentPage="currentPage"
      :pageSizes="pageSizes"
      :layout="layout"
      :total="total">
    </el-pagination>
  </div>

</template>

<script>
/**
 * @name 表格封装
 * @export TableElement
 * @param total [Number] 总条数
 * @param layout [String] 分页布局
 * @param currentPage [Number] 当前页数
 * @param pageSizes [Araray] 每页条数个数选项
 * @param loading [Boolean] 配置加载提示
 * @param tableData [Array] 数据
 * @param tableMain [Array] 数据详情
 * @param tableLabel [Array] 配置表格头部
 * @param tableOption [Object] 操作按钮
 * @param border [Boolean] 配置边框
 */
export default {
  props: {
    total: {
      type: Number,
      default: 400
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: () => [100, 200, 300, 400]
    },
    loading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableMain: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableOption: {
      type: Object,
      default: () => {
        return {}
      }
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCurrentChange (val) { // 页数发生变化
      this.$emit('currenChage', val)
    },
    handleSizeChange (val) { // 每页条数发生变化
      this.$emit('sizeChange', val)
    },
    // methods:按钮名称 row：同一行的数据 index：第几行（0开始）
    handleButton (methods, row) { // 按钮事件
      this.$emit('handleButton', { methods: methods, row: row })
    },
    handleSortChange (val) { // 排序
      this.$emit('handleSortChange', val)
    },
    handleSelectionChange (val) { // 选择
      this.$emit('handleSelectionChange', val)
    }
  }

}
</script>

<style scoped>
  .table-expand {
    font-size: 0;
    display: flex;
    flex-wrap: wrap;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .pagination{
    margin-top: 20px
  }
</style>
