<template>
  <div>
    <div style="margin: 10px">
      <el-button type="primary" @click="getProducts">Refresh</el-button>
    </div>
    <div>{{ tableData.length }}</div>
    <!-- <div style="height: 400px">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :columns="columns"
            :data="data"
            :width="width"
            :height="height"
            fixed
          />
        </template>
      </el-auto-resizer>
    </div> -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="500"
      lazy
      :load="loadMore1"
      v-el-table-infinite-scroll="loadMore"
      :infinite-scroll-distance="300"
    >
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="phone" label="Phone" />
      <el-table-column prop="email" label="Email" />
      <el-table-column label="選項1">
        <el-select v-model="value1" class="m-2" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-table-column>
      <el-table-column label="選項2">
        <el-select v-model="value2" class="m-2" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { default as vElTableInfiniteScroll } from 'el-table-infinite-scroll'

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
const tableData = ref([])
const value1 = ref('')
const value2 = ref('')

const loadMore1 = (row, treeNode, resolve) => {
  // console.log(row)
  // console.log(treeNode)
}
const loadMore = async () => {
  console.log('hello')
  await getProducts()
}

const getProducts = async () => {
  // tableData.value = []
  const { data } = await axios.get('http://localhost:3000/api/products')
  tableData.value = tableData.value.concat(data.data)
}

onMounted(async () => {
  await getProducts()
})
</script>

<style scoped>
.table {
  overflow-anchor: none;
  height: 100%;
}
</style>
