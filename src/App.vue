<template>
  <div>
    <div style="margin: 10px">
      <el-button type="primary" @click="getProducts">Refresh</el-button>
    </div>
    <div>{{ tableData.length }}</div>
    <div style="height: 400px">
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
    </div>
    <!-- <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="500"
      lazy
      ref="multipleTableRef"
      @selection-change="handleSelectionChange"
      v-el-table-infinite-scroll="loadMore"
      :infinite-scroll-distance="300"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" label="流水號" width="50" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="phone" label="Phone" />
      <el-table-column prop="email" label="Email" />
      <el-table-column label="選項1">
        <template #default="scope">
          <el-select
            v-model="scope.row.value"
            class="m-2"
            placeholder="Select"
            v-memo="['scope.row.value']"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="選項2">
        <template #default="scope">
          <el-select v-model="scope.row.value" class="m-2" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="選項3">
        <template #default="scope">
          <el-select v-model="scope.row.value" class="m-2" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="選項4">
        <template #default="scope">
          <el-select v-model="scope.row.value" class="m-2" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script lang="jsx" setup>
import { onMounted, ref, unref } from 'vue'
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

const multipleTableRef = ref(null)
const multipleSelection = ref([])
const tableData = ref([])
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')

const loadMore = async () => {
  console.log('hello')
  await getProducts()
}

const getProducts = async () => {
  // tableData.value = []
  const { data } = await axios.get('http://localhost:3000/api/products')
  tableData.value = tableData.value.concat(data.data)
}

const handleSelectionChange = (items) => {}

const generateColumns = (length = 10, prefix = 'column-', props) => {
  console.log('zzz', Array.from({ length }))
  return Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }))
}

const generateData = (columns, length = 200, prefix = 'row-') =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    )
  })

const SelectionCell = ({ value, intermediate = false, onChange }) => {
  return (
    <ElCheckbox
      onChange={onChange}
      modelValue={value}
      indeterminate={intermediate}
    />
  )
}
const columns = [
  {
    key: 'name',
    title: 'Name',
    dataKey: 'name',
    width: 150,
    align: 'center',
    cellRenderer: ({ cellData: name }) => {
      return <span>{name}</span>
    },
  },
  {
    key: 'select1',
    title: '选项1',
    cellRenderer: ({ rowData }) => {
      const onChange = (value) => {
        rowData.value1 = value
      }
      return (
        <el-select
          class="m-2"
          placeholder="Select"
          onChange={onChange}
          model-value={rowData.value1}
        >
          {options.map((item) => (
            <el-option key={item.value} label={item.label} value={item.value} />
          ))}
        </el-select>
      )
    },
    width: 150,
    align: 'center',
  },
  {
    key: 'select2',
    title: '选项2',
    cellRenderer: ({ rowData }) => {
      const onChange = (value) => {
        rowData.value2 = value
      }
      return (
        <el-select
          class="m-2"
          placeholder="Select"
          onChange={onChange}
          model-value={rowData.value2}
        >
          {options.map((item) => (
            <el-option key={item.value} label={item.label} value={item.value} />
          ))}
        </el-select>
      )
    },
    width: 150,
    align: 'center',
  },
  {
    key: 'select3',
    title: '选项3',
    cellRenderer: ({ rowData }) => {
      const onChange = (value) => {
        rowData.value3 = value
      }
      return (
        <el-select
          class="m-2"
          placeholder="Select"
          onChange={onChange}
          model-value={rowData.value3}
        >
          {options.map((item) => (
            <el-option key={item.value} label={item.label} value={item.value} />
          ))}
        </el-select>
      )
    },
    width: 150,
    align: 'center',
  },
]
columns.unshift({
  key: 'selection',
  width: 50,
  cellRenderer: ({ rowData }) => {
    const onChange = (value) => (rowData.checked = value)
    return <SelectionCell value={rowData.checked} onChange={onChange} />
  },
  headerCellRenderer: () => {
    const _data = unref(data)
    const onChange = (value) =>
      (data.value = _data.map((row) => {
        row.checked = value
        return row
      }))
    const allSelected = _data.every((row) => row.checked)
    const containsChecked = _data.some((row) => row.checked)

    return (
      <SelectionCell
        value={allSelected}
        intermediate={containsChecked && !allSelected}
        onChange={onChange}
      />
    )
  },
})
const data = ref(generateData(columns, 1000))

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
