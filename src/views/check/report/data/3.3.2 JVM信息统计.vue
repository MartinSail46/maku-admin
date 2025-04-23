<template>
	<el-table :data="tableData" border highlight-current-row :header-cell-style="headerStyle" style="width: 100%">
		<el-table-column prop="item" label="项目" />
		<el-table-column prop="value" label="数值">
			<template #default="scope">
				<el-input v-model="scope.row.value" clearable style="width: 240px" />
			</template>
		</el-table-column>
	</el-table>
	<el-row style="margin-top: 20px">
		<h1>结论：</h1>
		<h4>JVM设置正常</h4>
	</el-row>
</template>

<script setup lang="ts">
const tableData = [
	{
		item: 'JDK版本',
		value: '1.6.0'
	},
	{
		item: 'JVM编译器',
		value: 'j9jit24'
	},
	{
		item: 'JVM版本',
		value: 'IBM J9 VM'
	},
	{
		item: '堆内存大小',
		value: '2048M/2048M'
	}
]
// 自定义表头样式
const headerStyle = {
	background: '#0383c8', // 蓝色背景
	color: '#fff' // 白色字体
}
</script>

<style scoped lang="scss"></style>
