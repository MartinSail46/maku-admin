<template>
	<el-table :data="tableData" border highlight-current-row :header-cell-style="headerStyle" style="width: 100%">
		<el-table-column prop="name" label="数据源连接池名称">
			<template #default="scope">
				<el-input v-model="scope.row.name" clearable style="width: 240px" />
			</template>
		</el-table-column>
		<el-table-column prop="size" label="容量">
			<template #default="scope">
				<el-input v-model="scope.row.size" clearable style="width: 240px" />
			</template>
		</el-table-column>
		<el-table-column prop="used" label="使用量">
			<template #default="scope">
				<el-input v-model="scope.row.used" clearable style="width: 240px" />
			</template>
		</el-table-column>
	</el-table>
	<el-row style="margin-top: 20px">
		<h1>结论：</h1>
		<h4>中间件连接池使用正常，当前连接数设置合理。</h4>
	</el-row>
</template>

<script setup lang="ts" name="ConnectionPool">
const tableData = [
	{
		name: 'Jdbc/als',
		size: '10',
		used: '0'
	},
	{
		name: 'default',
		size: '10',
		used: '2'
	}
]
// 自定义表头样式
const headerStyle = {
	background: '#0383c8', // 蓝色背景
	color: '#fff' // 白色字体
}
</script>

<style scoped lang="scss"></style>
