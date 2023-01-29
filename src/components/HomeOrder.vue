<template>
  <div class="home-order">
    <!-- 2. 表单 -->
    <el-table class="el-table" :data="data.data" stripe style="width: 100%">
      <el-table-column align="center" label="商品图片" width="150">
        <template #default="scope">
          <el-image
            v-if="scope.row.img_url"
            class="img"
            :src="scope.row.img_url"
            :initial-index="0"
          />
          <p v-else>暂无图片</p>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="商品名称" align="center" />

      <el-table-column prop="inventory" label="库存" align="center" />

      <el-table-column prop="price" label="商品价格" align="center" />
      <el-table-column prop="name" label="操作" width="180">
        <template #default="scope">
          <div class="operation">
            <el-button type="primary" @click="handleEdit(scope.row.id)"
              >发货</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { getAllOrders, putGoods } from '../api/goods'
import { reactive } from 'vue'
const data = reactive({ data: [] })
getAllOrders()
  .then((res) => {
    data.data = res
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

function handleEdit(id) {
  putGoods(id)
    .then((res) => {
      data.data = res
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped lang="less">
.home-order {
  width: 95%;
  margin: 0 auto;
  background: #fff;
  overflow: auto;
  .el-table {
    width: auto;
  }
}
</style>
