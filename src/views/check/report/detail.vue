<template>
	<el-card style="margin-bottom: 10px">
		<el-page-header @back="goBack">
			<template #content>
				<span class="text-large font-600 mr-3"> 巡检测试报告 </span>
			</template>
			<template #extra>
				<div class="flex items-center">
					<el-button @click="preview">预览</el-button>
					<el-button type="primary">下载</el-button>
				</div>
			</template>
		</el-page-header>
	</el-card>

	<el-row :gutter="10">
		<el-col :span="5">
			<el-card>
				<el-tree
					style="max-width: 600px"
					:data="data"
					:props="defaultProps"
					highlight-current
					default-expand-all
					node-key="id"
					@node-click="handleNodeClick"
				/>
			</el-card>
		</el-col>
		<el-col :span="19">
			<el-card style="height: 78vh">
				<el-button type="primary" style="margin-bottom: 20px">保存</el-button>
				<!-- 右侧内容 -->
				<div class="content">
					<component :is="currentComponent" v-if="currentComponent" />
					<div v-else>{{ message }}</div>
				</div>
				<!--				<component :is="Component" :key="route.fullPath" />-->
			</el-card>
		</el-col>
	</el-row>

	<!--	<embed v-if="pdfUrl" :src="pdfUrl" width="100%" height="800px" type="application/pdf" />-->

	<!-- <embed> 标签来展示 PDF 文件 -->
	<!--	<embed v-if="pdfUrl" ：src="pdfUrl" width="100%" height="800px" type="application/pdf" />-->
</template>

<script setup lang="ts">
import { router } from '@/router'
import { ref } from 'vue' // 异步导入页面组件
// import JVM from './data/3.3.2 JVM信息统计.vue'
// import ConnectionPool from './data/3.3.3 连接池信息统计.vue'
// import BasicInfo from './data/3.3.1 基本信息统计.vue'
import cpu from './data/cpu.vue'
import memory from './data/memory.vue'
import disk from './data/disk.vue'
import network from './data/network.vue'
import OS from './data/OS.vue'
import java from './data/java.vue'

import { ElMessage } from 'element-plus'

// 定义树形节点的接口
interface TreeNode {
	id: string
	label: string
	component?: string // 右侧对应的页面组件名，可选
	children?: TreeNode[] // 子节点数组
}

// 组件映射表
const components: Record<string, any> = {
	// BasicInfo,
	// JVM,
	// ConnectionPool
	cpu,
	memory,
	disk,
	network,
	OS,
	java
}

// const pdfUrl = ref('') // 用于存储 PDF 文件的 URL

// // 加载 PDF 文件
// const preview = async () => {
// 	try {
// 		// 将二进制数据转换为 Blob 对象
// 		const blob = new Blob([(await usePreviewPdfApi()).data], { type: 'application/pdf' })
//
// 		// 创建 PDF 的 URL
// 		pdfUrl.value = URL.createObjectURL(blob)
// 	} catch (error) {
// 		console.error('Error loading PDF:', error)
// 	}
// }

const goBack = () => {
	router.push('/check/report/index')
}

// 当前选中的组件名
const currentComponent = ref<string | null>(null)

// 默认显示的提示信息
const message = ref<string>('请选择一个菜单项')
// 节点点击事件
const handleNodeClick = (node: TreeNode) => {
	if (!node.children || node.children.length === 0) {
		if (node.component && components[node.component]) {
			// 设置当前组件
			currentComponent.value = components[node.component]
			message.value = ''
		} else {
			// 显示错误提示
			currentComponent.value = null
			message.value = '该节点没有页面内容'
			ElMessage.warning('该节点没有页面内容')
		}
	}
}

// // 点击按钮时更新 PDF 的 URL
// const loadPdf = () => {
//     // 设置需要加载的 PDF 文件的 URL
//     pdfUrl.value = "/preview-pdf?filePath=/path/to/your/file.pdf"; // 这里的路径应替换为实际文件路径
// };

const preview = () => {
	// pdfUrl.value = "/preview?filePath=/path/to/your/file.pdf"; // 这里的路径应替换为实际文件路径

	// 创建一个隐藏的链接，点击后打开 PDF
	// const link = document.createElement('a')
	// link.href = '/check/report/preview' // 这里是你后端接口的 URL
	// link.target = '_blank' // 在新窗口中打开 PDF
	// link.click()

	const pdfUrl = 'http://localhost:3000/check/report/preview?filePath=/path/to/your/file.pdf' // 后端接口路径
	window.open(pdfUrl, '_blank') // 在新标签页中打开 PDF

	// usePreviewPdfApi().then(res => {
	// 	console.log(res.data)
	// })
}
// const data = ref<TreeNode[]>([
// 	{
// 		id: '1',
// 		label: '1 本次巡检主要问题汇总'
// 	},
// 	{
// 		id: '2',
// 		label: '2 主要问题及建议解决方案'
// 	},
// 	{
// 		id: '3',
// 		label: '3 巡检项目',
// 		children: [
// 			{
// 				id: '3.1',
// 				label: '3.1 系统基础运行环境',
// 				children: [
// 					{
// 						id: '3.1.1',
// 						label: '3.1.1 应用系统网络拓扑图',
// 						component: 'JVM'
// 					},
// 					{
// 						id: '3.1.2',
// 						label: '3.1.2 网络连通性检测情况',
// 						component: 'JVM'
// 					}
// 				]
// 			},
// 			{
// 				id: '3.2',
// 				label: '3.2 数据库服务器检测情况',
// 				children: [
// 					{
// 						id: '3.2.1',
// 						label: '3.2.1 基本信息统计',
// 						component: 'JVM'
// 					},
// 					{
// 						id: '3.2.2',
// 						label: '3.2.2 数据库内存配置分析',
// 						component: 'JVM'
// 					},
// 					{
// 						id: '3.2.3',
// 						label: '3.2.3 数据库文件信息分析',
// 						component: 'JVM'
// 					},
// 					{
// 						id: '3.2.4',
// 						label: '3.2.4 表空间信息分析',
// 						component: 'JVM'
// 					},
// 					{
// 						id: '3.2.5',
// 						label: '3.2.5 数据库用户安全性分析',
// 						component: 'JVM'
// 					},
// 					{
// 						id: '3.2.6',
// 						label: '3.2.6 应用系统主要数据表容量分析',
// 						component: 'JVM'
// 					},
// 					{
// 						id: '3.2.7',
// 						label: '3.2.7 数据库AWR报告分析',
// 						component: 'JVM'
// 					},
// 					{
// 						id: '3.2.8',
// 						label: '3.2.8 数据库日志信息分析',
// 						component: 'JVM'
// 					}
// 				]
// 			},
// 			{
// 				id: '3.3',
// 				label: '3.3 应用服务器检测情况',
// 				children: [
// 					{
// 						id: '3.3.1',
// 						label: '3.3.1 基本信息统计',
// 						component: 'BasicInfo'
// 					},
// 					{
// 						id: '3.3.2',
// 						label: '3.3.2 JVM信息统计',
// 						component: 'JVM'
// 					},
// 					{
// 						id: '3.3.3',
// 						label: '3.3.3 连接池信息统计',
// 						component: 'JVM'
// 					}
// 				]
// 			},
// 			{
// 				id: '3.4',
// 				label: '3.4 应用系统检测情况',
// 				children: [
// 					{
// 						id: '3.4.1',
// 						label: '3.4.1 应用日志分析',
// 						children: [
// 							{
// 								id: '3.4.1.1',
// 								label: '3.4.1.1 应用日志中TOP Sql简要分析',
// 								component: 'JVM'
// 							},
// 							{
// 								id: '3.4.1.2',
// 								label: '3.4.1.2 应用日志中耗时较长页面分析',
// 								component: 'JVM'
// 							},
// 							{
// 								id: '3.4.1.3',
// 								label: '3.4.1.3 应用日志中重点错误分析',
// 								component: 'JVM'
// 							}
// 						]
// 					},
//
// 					{
// 						id: '3.4.2',
// 						label: '3.4.2 批量运行情况分析',
// 						component: 'JVM'
// 					},
// 					{
// 						id: '3.4.3',
// 						label: '3.4.3 安硕维护团队任务计划和分工',
// 						component: 'JVM'
// 					},
// 					{
// 						id: '3.4.4',
// 						label: '3.4.4 定时或周期性任务情况分析',
// 						component: 'JVM'
// 					}
// 				]
// 			}
// 		]
// 	},
// 	{
// 		id: '4',
// 		label: '信息安全巡检'
// 	}
// ])

const data = ref<TreeNode[]>([
	{
		id: '1',
		label: '系统基本状态检测',
		children: [
			{
				id: 'cpu',
				label: 'CPU',
				component: 'cpu'
			},
			{
				id: 'memory',
				label: '内存',
				component: 'memory'
			},
			{
				id: 'disk',
				label: '磁盘',
				component: 'disk'
			},
			{
				id: 'network',
				label: '网络',
				component: 'network'
			},
			{
				id: 'OS',
				label: '操作系统',
				component: 'OS'
			}
		]
	},
	{
		id: '2',
		label: '应用和服务状态检测',
		children: [
			{
				id: 'java',
				label: 'java进程',
				component: 'java'
			}
		]
	}
])

// 定义树形菜单属性映射
const defaultProps = {
	children: 'children',
	label: 'label'
}
</script>

<style scoped lang="scss"></style>
