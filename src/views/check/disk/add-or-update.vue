<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
			<el-form-item label="报告id" prop="reportId">
				<el-input v-model="dataForm.reportId" placeholder="报告id"></el-input>
			</el-form-item>
			<el-form-item label="报告名称" prop="reportName">
				<el-input v-model="dataForm.reportName" placeholder="报告名称"></el-input>
			</el-form-item>
			<el-form-item label="文件系统" prop="fileSystem">
				<el-input v-model="dataForm.fileSystem" placeholder="文件系统"></el-input>
			</el-form-item>
			<el-form-item label="总大小" prop="size">
				<el-input v-model="dataForm.size" placeholder="总大小"></el-input>
			</el-form-item>
			<el-form-item label="已用" prop="used">
				<el-input v-model="dataForm.used" placeholder="已用"></el-input>
			</el-form-item>
			<el-form-item label="可用" prop="avail">
				<el-input v-model="dataForm.avail" placeholder="可用"></el-input>
			</el-form-item>
			<el-form-item label="使用率" prop="usage">
				<el-input v-model="dataForm.usage" placeholder="使用率"></el-input>
			</el-form-item>
			<el-form-item label="挂载点" prop="mountedOn">
				<el-input v-model="dataForm.mountedOn" placeholder="挂载点"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useDiskApi, useDiskSubmitApi } from '../../../../../maku-admin/src/api/check/disk'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	reportId: '',
	reportName: '',
	fileSystem: '',
	size: '',
	used: '',
	avail: '',
	usage: '',
	mountedOn: '',
	version: '',
	deleted: '',
	creator: '',
	createTime: '',
	updater: '',
	updateTime: ''
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	if (id) {
		getDisk(id)
	}
}

const getDisk = (id: number) => {
	useDiskApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useDiskSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>
