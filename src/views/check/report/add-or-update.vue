<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
			<el-form-item label="报告名称" prop="reportName">
				<el-input v-model="dataForm.reportName" placeholder="报告名称"></el-input>
			</el-form-item>
			<el-form-item label="银行" prop="bank">
				<dict-select v-model="dataForm.bank" dict-type="bank" clearable placeholder="银行" />
			</el-form-item>
			<el-form-item label="项目产品" prop="product">
				<el-input v-model="dataForm.product" placeholder="项目产品"></el-input>
			</el-form-item>
			<el-form-item label="巡检人员" prop="userId">
				<dict-select v-model="dataForm.userId" dict-type="user_name" clearable placeholder="巡检人员" />
			</el-form-item>
			<el-form-item label="巡检日期" prop="checkDate">
				<el-date-picker
					v-model="dataForm.checkDate"
					type="daterange"
					range-separator="至"
					start-placeholder="巡检开始日期"
					end-placeholder="巡检结束日期"
					@change="onDateRangeChange"
				/>
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
import { useReportApi, useReportSubmitApi } from '@/api/check/report'
import DictSelect from '@/components/dict/dict-select.vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	reportName: '',
	bank: '',
	product: '',
	userId: '',
	startDate: '', // 开始日期
	endDate: '', // 结束日期
	checkDate: [] as string[],
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
		getReport(id)
	}
}

const getReport = (id: number) => {
	useReportApi(id).then(res => {
		Object.assign(dataForm, res.data)
		// 回填日期范围
		if (res.data.startDate && res.data.endDate) {
			dataForm.checkDate = [res.data.startDate, res.data.endDate]
		}
	})
}

const dataRules = ref({
	reportName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	bank: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	product: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	userId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	startDate: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	endDate: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 监听日期范围变化
const onDateRangeChange = (val: [string, string]) => {
	if (val && val.length === 2) {
		// 将选择的日期转换为 UTC+8 时间
		const startDateUTC8 = dayjs(val[0]).tz('Asia/Shanghai').format('YYYY-MM-DD')
		const endDateUTC8 = dayjs(val[1]).tz('Asia/Shanghai').format('YYYY-MM-DD')

		// console.log('Start Date (UTC+8):', startDateUTC8)
		// console.log('End Date (UTC+8):', endDateUTC8)

		dataForm.startDate = startDateUTC8
		dataForm.endDate = endDateUTC8
	} else {
		dataForm.startDate = ''
		dataForm.endDate = ''
	}
}

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useReportSubmitApi(dataForm).then(() => {
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
