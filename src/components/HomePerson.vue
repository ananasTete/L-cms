<template>
  <div class="home-person h-full">
    <header class="header">
      <main class="search">
        <div class="search-item">
          <div class="search-label">账号</div>
          <el-input class="search-input" v-model="searchData.value.name" />
        </div>
        <div class="search-item">
          <div class="search-label">权限</div>
          <el-select
            v-model="searchData.value.permission"
            placeholder="请选择权限"
          >
            <el-option label="超级管理员" value="0" />
            <el-option label="管理员" value="1" />
            <el-option label="客服人员" value="2" />
          </el-select>
        </div>
      </main>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button type="primary" @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleNew">添加</el-button>
    </header>

    <el-table class="el-table" :data="data.data" stripe style="width: 100%">
      <el-table-column label="权限" align="center">
        <template #default="scope">
          <span v-if="scope.row.permission === '0'">超级管理员</span>
          <span v-if="scope.row.permission === '1'">管理员</span>
          <span v-if="scope.row.permission === '2'">客服人员</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="账号" align="center" />
      <el-table-column prop="createAt" label="创建时间" align="center">
        <template #default="scope">
          {{ utcFormat(scope.row.createAt) }}
        </template>
      </el-table-column>

      <el-table-column prop="updateAt" label="编辑时间" align="center">
        <template #default="scope">
          {{ utcFormat(scope.row.updateAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <div class="operation">
            <el-button type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      @close="handleDialogClose"
      v-model="dialogVisible"
      title="编辑商品"
      width="30%"
    >
      <main class="main">
        <el-form
          label-position="right"
          label-width="100px"
          :model="managerInfo.value"
          style="max-width: 460px"
        >
          <el-form-item label="账号">
            <el-input v-model="managerInfo.value.name" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="managerInfo.value.password" />
          </el-form-item>
          <el-form-item label="权限">
            <el-select
              v-model="managerInfo.value.permission"
              placeholder="请选择权限"
            >
              <el-option label="超级管理员" value="0" />
              <el-option label="管理员" value="1" />
              <el-option label="客服人员" value="2" />
            </el-select>
          </el-form-item>
        </el-form>
      </main>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmitCLick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  getAllManager,
  newManager,
  editManager,
  deleteManager,
  searchManager
} from '@/api/manager'
import { reactive, ref } from 'vue'
import { utcFormat } from '../utils/data-format'

const mode = ref('')

// 请求管理员数据
const data = reactive({ data: [] })
function getManagerInfo() {
  getAllManager().then((res) => {
    data.data = res
    console.log(res)
  })
}
getManagerInfo()

// 编辑及新建商品弹出框
const dialogVisible = ref(false)
let managerInfo = reactive({
  value: {
    name: '',
    password: '',
    permission: '',
    createAt: '',
    updateAt: ''
  }
})
const originGoodInfo = { ...managerInfo.value }
function handleSubmitCLick() {
  if (mode.value === 'new') newManager(managerInfo.value)
  if (mode.value === 'edit') editManager(managerInfo.value)
  dialogVisible.value = false
  getManagerInfo()
}
function handleDialogClose() {
  getManagerInfo()
  managerInfo.value = originGoodInfo
}

// 操作商品
function handleNew() {
  mode.value = 'new'
  dialogVisible.value = true
}
function handleEdit(info) {
  mode.value = 'edit'
  dialogVisible.value = true
  managerInfo.value = info
  managerInfo.value.password = ''
}
function handleDelete(id) {
  deleteManager(id)
  getManagerInfo()
}

// 搜索及重置商品信息
const searchData = reactive({
  value: {
    name: '',
    permission: ''
  }
})
const originSearchData = { ...searchData.value }
function handleSearch() {
  searchManager(searchData.value).then((res) => {
    console.log('res', res)
    data.data = res
  })
}
function handleReset() {
  getManagerInfo()
  searchData.value = originSearchData
}
</script>

<style scoped lang="less">
.home-person {
  width: 95%;
  margin: 0 auto;
  background: #fff;
  overflow: auto;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px #e8e8e8 solid;
    padding: 10px 30px;

    .search {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .search-item {
        width: 360px;
        display: flex;
        align-items: center;
        margin-right: 30px;
        .search-label {
          width: 100px;
          font-size: 20px;
          text-align: right;
          margin-right: 5px;
        }
        .search-input {
          width: 200px;
          height: 30px;
        }
        .search-textarea {
          width: 200px;
          height: 100px;
          resize: none;
        }
      }
    }
  }
  .el-table {
    width: auto;
  }
  .img {
    width: 80px;
  }
}
</style>
