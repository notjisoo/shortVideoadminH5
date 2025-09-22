<template>
	<view class="container">
		<h3 style="margin: 20rpx 0 30rpx 0">
			{{ defaultData.status === 'pending' ? '待审核' : '已审核' }}
		</h3>

		<!-- 用户ID -->
		<hr style="margin: 20rpx  0;">
		<a-card :bordered="false" style="width: 100%;  margin-bottom: 35rpx">
			<a-flex justify="start">
				<!-- 信息展示 -->
				<a-flex gap="middle" justify="around" vertical>
					<view class="userId">
						用户ID:&nbsp;
						<span>{{ defaultData.userId }}</span>
						&nbsp;
						<!-- 封装一个复制功能按钮 -->
						<CopyButton :text="defaultData.userId" />
					</view>
					<view>
						订单ID：&nbsp;<span>{{ defaultData.orderId }}</span>
					</view>
					<view>
						提现金额: &nbsp;<span>{{ defaultData.amount }}</span>
					</view>
					<view>
						进去审核原因: &nbsp;<span>{{ defaultData.reason }}</span>
					</view>

					<!-- 时间格式化成年月日时分秒 -->
					<view>
						创建时间:&nbsp;<span>{{ defaultData.createTime }}</span>
					</view>
				</a-flex>
			</a-flex>
		</a-card>


		<hr style="margin: 40rpx 0;">
		<!-- 用户基础数据 -->
		<a-card :bordered="false" style="width: 100%; margin-bottom: 30rpx">
			<hr style="margin: 0 0 20rpx 0;">
			<!-- 信息展示 -->
			<a-flex gap="middle" vertical>
				<span style="font-weight: 700;font-size: 0.9rem;">用户基础数据</span>
				<view>
					设备ID：&nbsp;<span>{{ 16416446354163461431 }}</span>
				</view>
				<view>
					标签：&nbsp;<span>所有提现进入审核，不要发送奖励</span>
				</view>
				<view>
					用户创造广告价值: &nbsp;<span>{{
						19.5153 + '元'
					}}</span>
				</view>
				<view>
					用户累积三方平台获取奖励: &nbsp;<span>{{
						1.2 + '元'
					}}</span>
				</view>
				<view>
					已领取邀请奖励:&nbsp;<span>{{
						43.15 + '元'
					}}</span>
				</view>
				<view>
					邀请人数量:&nbsp;<span>{{ 43.17 + '元' }}</span>
				</view>
				<view>
					用户累计获取奖励:&nbsp;<span>{{
						43.17 + '元'
					}}</span>
				</view>
				<view>
					用户累计提现:&nbsp;<span>{{ 43.17 + '元' }}</span>
				</view>
				<view>
					累积使用时长:&nbsp;<span>{{ 51 + '分' + 32 + '秒' + '毫秒' }}</span>
				</view>
				<view class="profitLost">
					应用盈亏:&nbsp;<span>{{ 12.3 + '元' }}</span>
				</view>
			</a-flex>
		</a-card>
		<hr style="margin: 40rpx 0;">


		<!-- 用户广告数据 -->
		<a-card :bordered="false" style="width: 100%; margin-bottom: 30rpx;">
			<view>
				<a-table :columns="columns" :data-source="data" :pagination="false" row-key="key"
					:scroll="{ x: 500, y: 300 }">
					<template #bodyCell="{ column, text, record }">
						<!-- 可以进行自定义渲染 -->
						<template v-if="column.dataIndex === 'date'">
							<span style="font-weight: bold;">{{ text }}</span>
							<span> (Key: {{ record.key }})</span>
						</template>
					</template>
				</a-table>
			</view>
		</a-card>

		<hr style="margin: 40rpx 0;">
		<!-- 审核数据 -->
		<a-card :bordered="false" style="width: 100%;">
			<a-flex gap="middle" vertical>
				<span style="font-weight: 700;font-size: 0.9rem;">用户基础数据</span>
				<view>
					已通过该用户提现订单: &nbsp;<span>{{
						3 + '笔'
					}}</span>
				</view>
				<view>
					已拒绝该用户提现订单: &nbsp;<span>{{
						2 + '笔'
					}}</span>
				</view>
				<view>
					待审核该用户订单:&nbsp;<span>{{
						1 + '笔'
					}}</span>
				</view>
			</a-flex>
		</a-card>



		<hr style="margin: 40rpx 0;">
		<!-- 拒绝通过按钮 -->
		<a-flex gap="middle" justify="space-evenly" class="button-group">
			<a-button type="text" :block="true" size="large">拒绝</a-button>
			<view class="wire"></view>
			<a-button type="text" :block="true" size="large">通过</a-button>
		</a-flex>
	</view>
</template>

<script setup lang="ts">
import CopyButton from '@/components/copyButton.vue'
import type { TableColumnsType } from 'ant-design-vue';
import { ref, computed } from 'vue'



const detailData = ref({})
// 定义 props 类型
export interface ItemData {
	id: number
	userId: string
	orderId: string
	amount: string
	reason: string
	createTime: string
	status: 'pending' | 'terminated'
}
interface detailData {
	deviceId: string
}

interface DataItem {
	key: number;
	date: string;
	chinese: string;
	math: string,
	english: string
}

const props = defineProps<{
	data?: ItemData
	status?: 'pending' | 'terminated'
}>()

// 使用传入的数据，如果没有则使用默认值
const defaultData = computed(() => {
	return (
		props.data || {
			id: 1,
			userId: '415662',
			orderId: '456452',
			amount: '10元',
			reason: '提现金额大于500分',
			createTime: '2025-09-17 12:00:00',
			status: 'pending'
		}
	)
})

const data: DataItem[] = [
	{
		key: 1,
		date: '2025-09-17 12:00:01',
		chinese: "82",
		english: "12",
		math: '32'
	},
	{
		key: 2,
		date: '2025-09-17 12:00:02',
		chinese: "72",
		english: "52",
		math: '22'
	},
	{
		key: 3,
		date: '2025-09-17 12:00:03',
		chinese: "42",
		english: "55",
		math: '333'
	}
];

// 1 82 52 333

const columns: TableColumnsType = [
	{ title: '日期', dataIndex: 'date', key: 'date', width: 100, fixed: 'left' },
	{ title: '三方平台奖励', dataIndex: 'chinese', key: '1', width: 100 },
	{ title: '创造广告价值', dataIndex: 'english', key: '2', width: 100 },
	{ title: '用户获取奖励', dataIndex: 'math', key: '3', width: 100 },
	// 总宽度: 150 + 200 + 250 + 200 = 800px
];


// 复制用户ID
function onCopy(certB64: string) {
	let oInput = document.createElement('input')
	oInput.value = certB64
	document.body.appendChild(oInput)
	oInput.select() // 选择对象
	document.execCommand('Copy') // 执行浏览器复制命令
	oInput.remove()
}
</script>

<style scoped lang="less">
.container {
	padding: 0 !important;
}

// card样式
:deep(.ant-card .ant-card-body) {
	padding: 0;
}

:deep(.ant-card:not(.ant-card-bordered)) {
	box-shadow: none;
}


// 拒绝和通过按钮样式
:deep(.ant-btn-text:not(:disabled):hover) {
	// background-color: #fff;
}

.userId {
	font-weight: 700;
	font-size: 0.9rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.profitLost {
	color: #95ec69;
	font-weight: 700;
}

.button-group {
	border-top: 1rpx solid #ccc;
	border-bottom: 1rpx solid #ccc;

	.wire {
		border: 1rpx solid #ccc;

	}
}
</style>
