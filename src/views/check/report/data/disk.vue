<template>
	<el-table :data="tableData" style="width: 100%" border highlight-current-row :header-cell-style="headerStyle">
		<el-table-column prop="fileSystem" label="文件系统" header-align="center" align="center">
			<template #default="scope">
				<el-input v-model="scope.row.fileSystem" clearable style="width: 180px" />
			</template>
		</el-table-column>
		<el-table-column prop="size" label="总大小" header-align="center" align="center">
			<template #default="scope">
				<el-input v-model="scope.row.size" clearable style="width: 180px" />
			</template>
		</el-table-column>
		<el-table-column prop="used" label="已用" header-align="center" align="center">
			<template #default="scope">
				<el-input v-model="scope.row.used" clearable style="width: 180px" />
			</template>
		</el-table-column>
		<el-table-column prop="avail" label="可用" header-align="center" align="center">
			<template #default="scope">
				<el-input v-model="scope.row.avail" clearable style="width: 180px" />
			</template>
		</el-table-column>
		<el-table-column prop="usage" label="使用率" header-align="center" align="center">
			<template #default="scope">
				<el-input v-model="scope.row.usage" clearable style="width: 180px" />
			</template>
		</el-table-column>
		<el-table-column prop="mountedOn" label="挂载点" header-align="center" align="center">
			<template #default="scope">
				<el-input v-model="scope.row.mountedOn" clearable style="width: 180px" />
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 自定义表头样式
const headerStyle = {
	background: '#0383c8', // 蓝色背景
	color: '#fff' // 白色字体
}

const tableData = ref([
	{
		fileSystem: '/dev/nvme0n1p3',
		size: '476G',
		used: '141G',
		avail: '329G',
		usage: '31%',
		mountedOn: '/'
	},
	{
		fileSystem: 'tmpfs',
		size: '16G',
		used: '0',
		avail: '16G',
		usage: '0%',
		mountedOn: '/dev/shm'
	},
	{
		fileSystem: 'efivarfs',
		size: '128K',
		used: '15K',
		avail: '109K',
		usage: '12%',
		mountedOn: '/sys/firmware/efi/efivars'
	},
	{
		fileSystem: '/dev/sdb1',
		size: '17T',
		used: '17T',
		avail: '68G',
		usage: '100%',
		mountedOn: '/media/hdd4'
	},
	{
		fileSystem: '/dev/sdb1',
		size: '17T',
		used: '17T',
		avail: '68G',
		usage: '100%',
		mountedOn: '/media/hdd4'
	},
	{
		fileSystem: '/dev/sdb1',
		size: '17T',
		used: '17T',
		avail: '68G',
		usage: '100%',
		mountedOn: '/media/hdd4'
	},
	{
		fileSystem: '/dev/sdb1',
		size: '17T',
		used: '17T',
		avail: '68G',
		usage: '100%',
		mountedOn: '/media/hdd4'
	},
	{
		fileSystem: '/dev/sdb1',
		size: '17T',
		used: '17T',
		avail: '68G',
		usage: '100%',
		mountedOn: '/media/hdd4'
	},
	{
		fileSystem: '/dev/sdb1',
		size: '17T',
		used: '17T',
		avail: '68G',
		usage: '100%',
		mountedOn: '/media/hdd4'
	}
])
</script>
