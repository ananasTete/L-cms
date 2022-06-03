<template>
  <div class="home-pool h-full">
    <!-- 1. 搜索 -->
    <header class="header">
      <main class="search">
        <div class="search-item">
          <div class="search-label">商品名称</div>
          <el-input class="search-input" v-model="searchData.value.name" />
        </div>
        <div class="search-item">
          <div class="search-label">商品价格</div>
          <el-input class="search-input" v-model="searchData.value.price" />
          -
          <el-input class="search-input" v-model="searchData.value.priceH" />
        </div>
        <div class="search-item">
          <div class="search-label">旧价格</div>
          <el-input class="search-input" v-model="searchData.value.oldPrice" />
          -
          <el-input class="search-input" v-model="searchData.value.oldPriceH" />
        </div>
        <div class="search-item">
          <div class="search-label">销量</div>
          <el-input class="search-input" v-model="searchData.value.soldCount" />
          -
          <el-input
            class="search-input"
            v-model="searchData.value.soldCountH"
          />
        </div>
        <div class="search-item">
          <div class="search-label">花语</div>
          <el-input
            class="search-textarea"
            type="textarea"
            v-model="searchData.value.language"
          />
        </div>
        <div class="search-item">
          <div class="search-label">材料</div>
          <el-input
            class="search-textarea"
            type="textarea"
            v-model="searchData.value.material"
          />
        </div>
        <div class="search-item">
          <div class="search-label">分类与标签</div>
          <el-cascader
            :value="labelValue"
            :options="labelOptions.value"
            :props="{ expandTrigger: 'hover' }"
            @change="handleLabelOptionsChange"
          />
        </div>
      </main>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button type="primary" @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleNew">添加</el-button>
    </header>

    <!-- 2. 表单 -->
    <el-table class="el-table" :data="data.data" stripe style="width: 100%">
      <el-table-column align="center" label="商品图片" width="150">
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
      </el-table-column>

      <el-table-column
        prop="name"
        label="商品名称"
        width="180"
        align="center"
      />

      <el-table-column
        prop="price"
        label="商品价格"
        width="90"
        align="center"
      />

      <el-table-column
        prop="oldPrice"
        label="旧价格"
        width="90"
        align="center"
      />

      <el-table-column
        prop="soldCount"
        label="销量"
        width="90"
        align="center"
      />

      <el-table-column prop="language" label="花语" align="center" />
      <el-table-column prop="material" label="材料" align="center" />

      <el-table-column label="标签" align="center">
        <template #default="scope">
          <div v-for="item in scope.row.labels" :key="item">
            {{ item }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="上传图片" align="center">
        <template #default="scope">
          <el-upload
            method="post"
            name="flower"
            :action="uploadAction"
            :headers="requestHeaders"
            :on-success="uploadSuccess"
            multiple
            :limit="4"
            :show-file-list="false"
            :disabled="scope.row.img_url.lenght >= 4"
          >
            <template #trigger>
              <el-button
                @click="beforeUpload"
                type="primary"
                :disabled="scope.row.img_url.length >= 4"
                >上传</el-button
              >
            </template>
          </el-upload>
        </template>
      </el-table-column>

      <el-table-column
        prop="createAt"
        label="创建时间"
        align="center"
        width="180"
      >
        <template #default="scope">
          {{ utcFormat(scope.row.createAt) }}
        </template>
      </el-table-column>

      <el-table-column
        prop="updateAt"
        label="编辑时间"
        align="center"
        width="180"
      >
        <template #default="scope">
          {{ utcFormat(scope.row.updateAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
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

    <!-- 3. 弹出框 -->
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
          :model="goodInfo.value"
          style="max-width: 460px"
        >
          <el-form-item label="商品名称">
            <el-input v-model="goodInfo.value.name" />
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input type="number" v-model="goodInfo.value.price" />
          </el-form-item>
          <el-form-item label="旧价格">
            <el-input type="number" v-model="goodInfo.value.oldPrice" />
          </el-form-item>
          <el-form-item label="销量">
            <el-input type="number" v-model="goodInfo.value.soldCount" />
          </el-form-item>
          <el-form-item label="花语">
            <el-input type="textarea" v-model="goodInfo.value.language" />
          </el-form-item>
          <el-form-item label="材料">
            <el-input type="textarea" v-model="goodInfo.value.material" />
          </el-form-item>
          <el-form-item label="分类及标签">
            <el-tag
              v-for="tag in goodInfo.value.labels"
              :key="tag"
              class="mx-1"
              closable
              :disable-transitions="false"
              @close="handleTagClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-cascader
              :value="labelValue"
              :options="labelOptions.value"
              :props="{ expandTrigger: 'hover' }"
              @change="handleDialogCascaderChange"
            />
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
  getAllFlower,
  editFlower,
  deleteFlower,
  newFlower,
  searchFlower,
  getAllCategory
} from '../api/goods'
import { reactive, ref, computed } from 'vue'
import { utcFormat } from '../utils/data-format'
import localCache from '../utils/cache'

const mode = ref('')

// 请求商品数据数据
const data = reactive({ data: [] })
function getFlowerInfo() {
  getAllFlower().then((res) => {
    data.data = res
    console.log(data.data)
  })
}
getFlowerInfo()

// 编辑及新建商品弹出框
const dialogVisible = ref(false)
let goodInfo = reactive({
  value: {
    name: '',
    price: 0,
    oldPrice: 0,
    soldCount: 0,
    language: '',
    material: '',
    labels: []
  }
})
const originGoodInfo = { ...goodInfo.value }

function handleSubmitCLick() {
  goodInfo.value.price = Number(goodInfo.value.price)
  goodInfo.value.oldPrice = Number(goodInfo.value.oldPrice)
  goodInfo.value.soldCount = Number(goodInfo.value.soldCount)
  goodInfo.value.labels = [...goodInfo.value.labels]
  if (mode.value === 'new') newFlower(goodInfo.value)
  if (mode.value === 'edit') editFlower(goodInfo.value)
  dialogVisible.value = false
  getFlowerInfo()
}
function handleDialogClose() {
  goodInfo.value = originGoodInfo
}
function handleDialogCascaderChange(value) {
  goodInfo.value.labels.add(value[1])
}
function handleTagClose(tag) {
  goodInfo.value.labels.delete(tag)
  console.log(goodInfo.value.labels, tag)
}

// 操作商品
function handleNew() {
  mode.value = 'new'
  goodInfo.value.labels = new Set()
  dialogVisible.value = true
}
function handleEdit(data) {
  mode.value = 'edit'
  dialogVisible.value = true
  goodInfo.value = { ...data }
  goodInfo.value.labels = new Set([...goodInfo.value.labels])
  goodInfo.value.img_url = new Set([...goodInfo.value.img_url])
}
function handleDelete(id) {
  deleteFlower(id)
  getFlowerInfo()
}

// 搜索及重置商品信息
const searchData = reactive({
  value: {
    name: '',
    price: 0,
    priceH: 0,
    oldPrice: 0,
    oldPriceH: 0,
    soldCount: 0,
    soldCountH: 0,
    language: '',
    material: '',
    label: []
  }
})
const originSearchData = { ...searchData.value }
const labelOptions = reactive({ value: [] })
getAllCategory().then((res) => {
  labelOptions.value = res.map((item) => {
    return {
      label: item.name,
      value: item.name,
      children: item.labels.map((item) => {
        return {
          label: item.name,
          value: item.name
        }
      })
    }
  })
})
const labelValue = ref([])

function handleLabelOptionsChange(value) {
  searchData.value.label = value[1]
}
function handleSearch() {
  searchData.value.price = Number(searchData.value.price)
  searchData.value.priceH = Number(searchData.value.priceH)
  searchData.value.oldPrice = Number(searchData.value.oldPrice)
  searchData.value.oldPriceH = Number(searchData.value.oldPriceH)
  searchData.value.soldCount = Number(searchData.value.soldCount)
  searchData.value.soldCountH = Number(searchData.value.soldCountH)

  searchFlower(searchData.value).then((res) => {
    console.log('res', res)
    data.data = res
  })
}
function handleReset() {
  getFlowerInfo()
  searchData.value = originSearchData
}

/** 文件上传 */
const uploadAction = ref('')
const requestHeaders = computed(() => {
  return {
    Authorization: localCache.getCache('token')
  }
})
const uploadSuccess = () => {
  getFlowerInfo()
}
function beforeUpload(id) {
  uploadAction.value = `/api/upload/flower/${id}/img`
}
</script>

<style scoped lang="less">
.mx-1 {
  margin: 5px 3px;
}
.home-pool {
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
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 30px;
        .search-label {
          width: 100px;
          font-size: 20px;
          text-align: right;
          margin-right: 5px;
        }
        .search-input {
          width: 150px;
          height: 30px;
        }
        .search-textarea {
          width: 200px;
          resize: none;
        }
      }
    }
  }
  .upload-demo {
    margin-left: 100px;
  }
  .el-table {
    width: auto;
  }
  .img {
    width: 80px;
  }
}
</style>
