<template>
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item prop="reportName">
				<el-input v-model="state.queryForm.reportName" placeholder="报告名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="Search" type="primary" @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button icon="RefreshRight" @click="reset(queryRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>

	<el-card>
		<el-space>
			<el-space>
				<el-button v-auth="'check:disk:save'" icon="Plus" type="primary" @click="addOrUpdateHandle()">新增 </el-button>
			</el-space>
			<el-space>
				<el-button v-auth="'check:disk:delete'" icon="Delete" plain type="danger" @click="deleteBatchHandle()"> 批量删除 </el-button>
			</el-space>
			<el-space>
				<!-- 前置页面按钮 -->
				<el-button v-auth="'check:disk:save'" icon="Upload" type="primary" plain @click="uploadDropHandle()"> 上传文件 </el-button>
			</el-space>
		</el-space>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border class="layout-table" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="id" label="主键id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="reportName" label="报告名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="fileSystem" label="文件系统" header-align="center" align="center"></el-table-column>
			<el-table-column prop="size" label="总大小" header-align="center" align="center"></el-table-column>
			<el-table-column prop="used" label="已用" header-align="center" align="center"></el-table-column>
			<el-table-column prop="avail" label="可用" header-align="center" align="center"></el-table-column>
			<el-table-column prop="usage" label="使用率" header-align="center" align="center"></el-table-column>
			<el-table-column prop="mountedOn" label="挂载点" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button v-auth="'check:disk:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改 </el-button>
					<el-button v-auth="'check:disk:delete'" type="primary" link @click="deleteBatchHandle(scope.row.id)">删除 </el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			:current-page="state.page"
			:page-sizes="state.pageSizes"
			:page-size="state.limit"
			:total="state.total"
			layout="total, sizes, prev, pager, next, jumper"
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
		>
		</el-pagination>

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>
		<upload-drop ref="uploadDropRef"></upload-drop>
	</el-card>
</template>

<script setup lang="ts" name="CheckDiskIndex">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import AddOrUpdate from './add-or-update.vue'
import UploadDrop from '@/components/upload/upload-drop.vue'

const state: IHooksOptions = reactive({
	dataListUrl: '/check/disk/page',
	deleteUrl: '/check/disk',
	queryForm: {
		reportName: ''
	}
})

const queryRef = ref()

//新增/修改窗口
const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}

//上传文件
const uploadDropRef = ref()
const uploadDropHandle = () => {
	uploadDropRef.value.open()
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle, reset } = useCrud(state)
</script>
