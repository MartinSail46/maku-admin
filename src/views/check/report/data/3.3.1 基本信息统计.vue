<template>
	<el-row>
		<h1>1、服务器型号：</h1>
		<h4>IBM 小型</h4>
	</el-row>
	<el-row>
		<h1>2、操作系统：</h1>
		<h4>MacOS</h4>
	</el-row>
	<el-row>
		<h1>3、服务器基本配置情况：</h1>
	</el-row>
	<el-table :data="tableData" border highlight-current-row :header-cell-style="headerStyle" style="width: 100%">
		<el-table-column prop="item" label="指标" />
		<el-table-column prop="size" label="配置容量">
			<template #default="scope">
				<el-input v-model="scope.row.size" clearable style="width: 100%" />
			</template>
		</el-table-column>
		<el-table-column prop="usage" label="使用率">
			<template #default="scope">
				<el-input v-model="scope.row.usage" clearable style="width: 240px" />
			</template>
		</el-table-column>
	</el-table>

	<el-row style="margin-top: 20px">
		<h1>结论：</h1>
		<h4>系统CPU、没存使用良好，有较大剩余。</h4>
	</el-row>
	<el-row>
		<h1>4、文件系统使用情况：</h1>
	</el-row>

	<el-table :data="fileSystem" border highlight-current-row :header-cell-style="headerStyle" style="width: 100%">
		<el-table-column prop="fileSystem" label="文件系统" />
		<el-table-column prop="size" label="总大小">
			<template #default="scope">
				<el-input v-model="scope.row.size" clearable style="width: 100%" />
			</template>
		</el-table-column>
		<el-table-column prop="used" label="已用">
			<template #default="scope">
				<el-input v-model="scope.row.used" clearable style="width: 100%" />
			</template>
		</el-table-column>
		<el-table-column prop="avail" label="可用">
			<template #default="scope">
				<el-input v-model="scope.row.avail" clearable style="width: 100%" />
			</template>
		</el-table-column>
		<el-table-column prop="usage" label="使用率">
			<template #default="scope">
				<el-input v-model="scope.row.usage" clearable style="width: 100%" />
			</template>
		</el-table-column>
		<el-table-column prop="mountedOn" label="挂载点">
			<template #default="scope">
				<el-input v-model="scope.row.mountedOn" clearable style="width: 100%" />
			</template>
		</el-table-column>
	</el-table>
	<el-row style="margin-top: 20px">
		<h1>结论：</h1>
		<h4>文件系统使用正常。</h4>
	</el-row>
</template>

<script setup lang="ts" name="BasicInfo">
const tableData = [
	{
		item: '系统内存',
		size: '110G',
		usage: '20%'
	},
	{
		item: '系统CPU',
		size: '2core\n' + 'Intel(R) Xeon(R) CPU E5-2407 v2 @ 2.40GHz',
		usage: '10%'
	}
]

const fileSystem = [
	{
		fileSystem: '/dev/mapper/vg_supdb-lv_root',
		size: '50G',
		used: '12G',
		avail: '36G',
		usage: '25%',
		mountedOn: '/'
	},
	{
		fileSystem: 'tmpfs',
		size: '56G',
		used: '0G',
		avail: '56G',
		usage: '0%',
		mountedOn: '/dev/shm'
	},
	{
		fileSystem: '/dev/sda1',
		size: '477M',
		used: '58M',
		avail: '395M',
		usage: '13%',
		mountedOn: '/boot'
	},
	{
		fileSystem: '/dev/mapper/vg_supdb-lv_home',
		size: '863G',
		used: '142G',
		avail: '677G',
		usage: '18%',
		mountedOn: '/home'
	}
]

// 自定义表头样式
const headerStyle = {
	background: '#0383c8', // 蓝色背景
	color: '#fff' // 白色字体
}
</script>

<style scoped lang="scss"></style>
