<template>
  <div>
    <el-row :gutter='10'>
      <el-col :span="4">
        <el-card>
          <MTree :treeDataObj="treeDataObj" />
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card>
          <MTable
            :loading="true"
            :table-data="tableData"
            :table-label="tableLabel"
            :table-option="tableOption"
            :total="total"
            :currentPage="currentPage"
            :pageSizes="pageSizes"
            @handleButton="handleButton"
            @handleSelectionChange="handleSelectionChange"
            @currenChage="currenChage"
            @sizeChange="sizeChange"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MTree from '@/components/comTree.vue'
import MTable from '@/components/comTable'
export default {
  name: 'App',
  data () {
    return {
      loading: false,
      border: true,
      tableData: [
        {
          usr: 'yy',
          company: 'hahahha',
          email: 'find@allyum.com',
          registTime: '2019 8',
          status: '1'
        },
        {
          usr: 'aa',
          company: 'hahahha',
          email: 'find@allyum.com',
          registTime: '2019 8',
          status: '1'
        },
        {
          usr: 'c',
          company: 'hahahha',
          email: 'find@allyum.com',
          registTime: '2019 8',
          status: '1'
        },
        {
          usr: 'b',
          company: 'hahahha',
          email: 'find@allyum.com',
          registTime: '2019 8',
          status: '1'
        }
      ],
      total: 200,
      currentPage: 2,
      pageSizes: [1, 2, 3],
      tableLabel: [
        {
          label: '用户名',
          param: 'usr',
          align: 'center',
          sortable: false,
          show: true
        },
        {
          label: '公司名称',
          param: 'company',
          align: 'center',
          show: true,
          sortable: false
        },
        {
          label: '办公邮箱',
          param: 'email',
          align: 'center',
          width: '200',
          show: true
        },
        {
          label: '注册时间',
          param: 'registTime',
          lign: 'center',
          show: true,
          ortable: true
        },
        {
          label: '审核状态',
          param: 'status',
          align: 'center',
          show: true,
          render: row => {
            if (row.status === 0) {
              return '未审核'
            } else if (row.status === 1) {
              return '审核通过'
            } else if (row.status === 2) {
              return '审核不通过'
            } else {
              return '禁用'
            }
          }
        }
      ],
      tableOption: {
        label: '操作',
        width: '200',
        options: [
          {
            label: '预览',
            type: 'primary',
            icon: 'el-icon-view',
            methods: 'preview'
          },
          {
            label: '审核',
            type: 'primary',
            icon: 'el-icon-upload2',
            methods: 'audit'
          }
        ]
      },
      treeDataObj: {
        treeData: [
          {
            label: '一级 1',
            children: [
              {
                label: '二级 1-1',
                children: [
                  {
                    label: '三级 1-1-1'
                  }
                ]
              }
            ]
          },
          {
            label: '一级 2',
            children: [
              {
                label: '二级 2-1',
                children: [
                  {
                    label: '三级 2-1-1'
                  }
                ]
              },
              {
                label: '二级 2-2',
                children: [
                  {
                    label: '三级 2-2-1'
                  }
                ]
              }
            ]
          },
          {
            label: '一级 3',
            children: [
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1'
                  }
                ]
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    currenChage (val) {
      console.log(val)
    },
    sizeChange (val) {
      console.log(val)
    },
    handleButton (data) {
      switch (data.methods) {
        case 'preview':
          this.preview(data.row)
          break
        case 'audit':
          console.log('audit')
          break
      }
    },
    preview () {
      console.log('preview')
    },
    // 排序规则
    handleSortChange () {
      console.log('排序规则')
    },
    handleSelectionChange () {}
  },
  components: {
    MTree,
    MTable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
