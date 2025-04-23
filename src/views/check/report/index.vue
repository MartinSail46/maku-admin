<template>
	<!-- 查询条件 -->
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item prop="reportName">
				<el-input v-model="state.queryForm.reportName" placeholder="报告名称"></el-input>
			</el-form-item>
			<el-form-item prop="bank">
				<dict-select v-model="state.queryForm.bank" dict-type="bank" clearable placeholder="银行" />
			</el-form-item>
			<el-form-item prop="product">
				<el-input v-model="state.queryForm.product" placeholder="项目产品"></el-input>
			</el-form-item>
			<el-form-item prop="userId">
				<el-select v-model="state.queryForm.userId" placeholder="巡检人员">
					<el-option label="选择" value="0"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="startDate">
				<el-date-picker
					v-model="state.queryForm.dateRange"
					type="daterange"
					range-separator="至"
					start-placeholder="巡检开始日期"
					end-placeholder="巡检结束日期"
					@change="onDateRangeChange"
				/>
				<!--				<el-date-picker v-model="state.queryForm.startDate" type="daterange" value-format="yyyy-MM-dd"></el-date-picker>-->
				<!--			</el-form-item>-->
				<!--			<el-form-item prop="endDate">-->
				<!--				<el-date-picker v-model="state.queryForm.endDate" type="daterange" value-format="yyyy-MM-dd"></el-date-picker>-->
			</el-form-item>
			<el-form-item>
				<el-button icon="Search" type="primary" @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button icon="RefreshRight" @click="reset(queryRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>

	<!-- 列表 -->
	<el-card>
		<el-space>
			<el-space>
				<el-button v-auth="'check:report:save'" icon="Plus" type="primary" @click="addOrUpdateHandle()">新增 </el-button>
			</el-space>
			<el-space>
				<el-button v-auth="'check:report:delete'" icon="Delete" plain type="danger" @click="deleteBatchHandle()"> 批量删除 </el-button>
			</el-space>
			<el-space>
				<el-button v-auth="'check:report:save'" icon="Edit" plain type="primary" @click="detailHandle()"> 详情 </el-button>
			</el-space>
		</el-space>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border class="layout-table" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="id" label="主键id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="reportName" label="报告名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="bank" label="银行" header-align="center" align="center"></el-table-column>
			<el-table-column prop="product" label="项目产品" header-align="center" align="center"></el-table-column>
			<el-table-column prop="userId" label="巡检人员" header-align="center" align="center"></el-table-column>
			<el-table-column prop="startDate" label="巡检开始日期" header-align="center" align="center"></el-table-column>
			<el-table-column prop="endDate" label="巡检结束日期" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button v-auth="'check:report:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改 </el-button>
					<el-button v-auth="'check:report:delete'" type="primary" link @click="deleteBatchHandle(scope.row.id)">删除 </el-button>
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
	</el-card>
</template>

<script setup lang="ts" name="CheckReportIndex">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import AddOrUpdate from './add-or-update.vue'
import DictSelect from '@/components/dict/dict-select.vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useRouter } from 'vue-router'

const router = useRouter()

dayjs.extend(utc)
dayjs.extend(timezone)

const state: IHooksOptions = reactive({
	dataListUrl: '/check/report/page',
	deleteUrl: '/check/report',
	queryForm: {
		reportName: '',
		bank: '',
		product: '',
		userId: '',
		startDate: '',
		endDate: '',
		dateRange: ''
	}
})

const queryRef = ref()
const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}

// 打开详情页面
const detailHandle = () => {
	router.push('/check/report/detail')
}

// 监听日期范围变化
const onDateRangeChange = (val: [string, string]) => {
	if (val && val.length === 2) {
		// 将选择的日期转换为 UTC+8 时间
		const startDateUTC8 = dayjs(val[0]).tz('Asia/Shanghai').format('YYYY-MM-DD')
		const endDateUTC8 = dayjs(val[1]).tz('Asia/Shanghai').format('YYYY-MM-DD')

		state.queryForm.startDate = startDateUTC8
		state.queryForm.endDate = endDateUTC8
	} else {
		state.queryForm.startDate = ''
		state.queryForm.endDate = ''
	}
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle, reset } = useCrud(state)
</script>
