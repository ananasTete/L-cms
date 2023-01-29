<template>
  <div class="home-category">
    <!-- 分类表 -->
    <div class="category">
      <div class="nav">
        <h3 class="title">分类</h3>
        <el-button type="primary" @click="handleNewCateGory"
          >新建分类</el-button
        >
      </div>

      <el-table
        class="el-table"
        :data="categoryData.value"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="name" label="分类名称" align="center" />

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

        <el-table-column prop="name" label="操作" width="180">
          <template #default="scope">
            <div class="operation">
              <el-button
                type="danger"
                @click="handleCategoryDelete(scope.row.id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 标签表 -->
    <div class="label">
      <div class="nav">
        <h3 class="title">标签</h3>
        <el-button type="primary" @click="handleNewLabel">新建标签</el-button>
      </div>

      <el-table
        class="el-table"
        :data="labelData.value"
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" label="所属分类">
          <template #default="scope">
            <p>{{ getCategoryName(scope.row.categoryId) }}</p>
          </template>
        </el-table-column>

        <!-- <el-table-column align="center" label="标签图片">
          <template #default="scope">
            <el-image
              class="img"
              :src="scope.row.img_url[0]"
              :preview-src-list="scope.row.img_url"
              :initial-index="0"
              fit="fit"
              :preview-teleported="true"
            />
          </template>
        </el-table-column> -->

        <el-table-column prop="name" label="标签名称" align="center" />

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
        <el-table-column prop="name" label="操作" width="180">
          <template #default="scope">
            <div class="operation">
              <el-button type="danger" @click="handleLabelDelete(scope.row.id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 3. 分类表弹出框 -->
    <el-dialog
      @close="handleDialogClose"
      v-model="categoryDialogVisible"
      title="新建分类"
      width="30%"
    >
      <main class="main">
        <el-form
          label-position="right"
          label-width="100px"
          :model="categoryInfo.value"
          style="max-width: 460px"
        >
          <el-form-item label="分类名称">
            <el-input v-model="categoryInfo.value.name" />
          </el-form-item>
        </el-form>
      </main>
      <template #footer>
        <span>
          <el-button @click="categoryDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleCategorySubmitCLick"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 3. 标签表弹出框 -->
    <el-dialog
      @close="handleDialogClose"
      v-model="labelDialogVisible"
      title="新建标签"
      width="30%"
    >
      <main class="main">
        <el-form
          label-position="right"
          label-width="100px"
          :model="labelInfo.value"
          style="max-width: 460px"
        >
          <el-form-item label="所属分类">
            <el-input v-model="labelCate" />
          </el-form-item>
          <el-form-item label="标签名称">
            <el-input v-model="labelInfo.value.name" />
          </el-form-item>
        </el-form>
      </main>
      <template #footer>
        <span>
          <el-button @click="labelDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleLabelSubmitCLick"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { utcFormat } from '../utils/data-format'
import {
  getAllCategory,
  newCategory,
  deleteCategory,
  deleteLabel,
  newLabel
} from '../api/goods'
import { h } from 'vue'
import { ElMessage } from 'element-plus'

const categoryData = reactive({
  value: []
})
const labelData = reactive({
  value: []
})

function refreshData() {
  categoryData.value = []
  labelData.value = []
  // 请求数据
  getAllCategory().then((res) => {
    console.log('分类信息', res)
    categoryData.value = res
    res.forEach((item) => {
      if (item.labels) {
        item.labels.forEach((label) => {
          label.categoryId = item.id
          labelData.value.push(label)
        })
      }
    })
  })
}
refreshData()

// 弹出框
const categoryDialogVisible = ref(false)

// 1. 弹出框-分类信息
let categoryInfo = reactive({
  value: {
    name: ''
  }
})
const originGoodInfo = { ...categoryInfo.value }
function handleDialogClose() {
  categoryInfo.value = originGoodInfo
  labelInfo.value = originLabelInfo
  labelCate.value = ''
}
function handleCategorySubmitCLick() {
  newCategory(categoryInfo.value)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log('新建分类失败', err)
    })
  categoryDialogVisible.value = false
  refreshData()
  handleDialogClose()
}

function handleNewCateGory() {
  categoryDialogVisible.value = true
}

function handleCategoryDelete(id) {
  deleteCategory(id)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log('删除分类失败', err)
    })
  refreshData()
}

function getCategoryName(index) {
  const result = categoryData.value.find((item) => {
    return item.id === index
  })
  return result.name
}

// 2. 弹出框-标签信息

const labelDialogVisible = ref(false)

let labelInfo = reactive({
  value: {
    name: ''
  }
})
const labelCate = ref('')
const originLabelInfo = { ...labelInfo.value }
function handleNewLabel() {
  labelDialogVisible.value = true
}
function handleLabelDelete(id) {
  deleteLabel(id, labelInfo.value)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log('删除标签失败', err)
    })
  refreshData()
}
function handleLabelSubmitCLick() {
  const cate = categoryData.value.find((item) => {
    return item.name === labelCate.value
  })
  if (!cate) {
    ElMessage({
      message: h('p', null, [
        h('span', null, '分类不存在'),
        h('i', { style: 'color: teal' }, 'VNode')
      ])
    })
    return
  }
  newLabel(cate.id, labelInfo.value)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log('创建标签失败', err)
    })
  labelDialogVisible.value = false
  refreshData()
  handleDialogClose()
}
</script>

<style scoped lang="less">
.home-category {
  height: 100%;
  width: 95%;
  margin: 0 auto;
  background: #fff;
  overflow: auto;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .el-table {
    width: auto;
  }
}
</style>
