<template>
	<a-tabs v-model:activeKey="activeKey" type="card" style="padding-top: 2rem">
		<!-- 当日选择 -->
		<a-tab-pane key="1" tab="日">
			<a-flex justify="center" gap="20">
				<a-button type="primary" @tap="preDay">前一天</a-button>
				<a-config-provider :locale="zhCN">
					<a-date-picker v-model:value="dayTime" @change="getDayData" :disabled-date="disabledDay"
						type="date" />
				</a-config-provider>
				<a-button type="primary" @tap="nextDay" :disabled="lastDay">
					后一天
				</a-button>
			</a-flex>
			<a-card style="
					margin-top: 1rem;
					width: 100%;
					border: 1px solid #266fff;
					margin-bottom: 30rpx;
				">
				<view class="main-box">
					<view v-for="item in totalData" :key="item.channelId" class="main-box-item">
						<h3>{{ item.name }}</h3>
						<span>{{ item.value }}</span>
					</view>
				</view>
			</a-card>
		</a-tab-pane>
		<!-- 月份选择 -->
		<a-tab-pane key="2" tab="月" force-render><a-flex justify="center" gap="20">
				<a-button type="primary" @tap="preMonth">前一月</a-button>
				<a-config-provider :locale="zhCN">
					<a-date-picker v-model:value="monthTime" picker="month" :disabled-date="disabledMonth"
						@change="getMonthData" />
				</a-config-provider>
				<a-button type="primary" @tap="nextMonth" :disabled="lastMonth">后一月</a-button>
			</a-flex>
			<a-card style="
					margin-top: 1rem;
					width: 100%;
					border: 1px solid #266fff;
					margin-bottom: 30rpx;
				">
				<view class="main-box">
					<view v-for="item in totalData" :key="item.channelId" class="main-box-item">
						<h3>{{ item.name }}</h3>
						<span>{{ item.value }}</span>
					</view>
				</view>
			</a-card>
		</a-tab-pane>
	</a-tabs>
</template>

<script lang="ts" setup>
import { ref, defineComponent, onMounted } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs, { Dayjs } from 'dayjs'

const activeKey = ref('1')
const today = ref(dayjs())
const dayTime = ref(dayjs())
const monthTime = ref(dayjs())
const lastDay = ref(true)
const lastMonth = ref(true)

interface dataItem {
	name: string
	value: number
	channelId: number
}

//请求首页数据 
onMounted(() => {

})

// TODO 增加一个 元 的显示
const totalData = ref<dataItem[]>([
	{ name: '预期广告收益', value: 0, channelId: 1 },
	{ name: '实际广告收益', value: 0, channelId: 2 },
	{ name: '今日提现发起金额', value: 0, channelId: 3 },
	{ name: '今日提现到账金额', value: 0, channelId: 4 },
	{ name: '预计毛利', value: 0, channelId: 5 },
	{ name: '实际毛利', value: 0, channelId: 6 },
	{ name: '活跃用户', value: 0, channelId: 7 },
	{ name: '今日新增用户', value: 0, channelId: 8 }
])

// 设置不可选的时间
const disabledDay = (current: Dayjs) => {
	return current && current > dayjs().endOf('day')
}
const disabledMonth = (current: Dayjs) => {
	return current && current > dayjs().endOf('month')
}

// 月份改变发请求
function getMonthData() {
	checkIsLastDayOrMonth(monthTime.value, today.value, 'month')
}

// 日改变发请求
function getDayData() {
	checkIsLastDayOrMonth(dayTime.value, today.value, 'day')
}

function preDay() {
	dayTime.value = dayTime.value.subtract(1, 'day')
	checkIsLastDayOrMonth(dayTime.value, today.value, 'day')
	getData()
}
function nextDay() {
	dayTime.value = dayTime.value.add(1, 'day')
	getData()
	checkIsLastDayOrMonth(dayTime.value, today.value, 'day')
}
function preMonth() {
	monthTime.value = monthTime.value.subtract(1, 'month')
	checkIsLastDayOrMonth(monthTime.value, today.value, 'month')
	getData()
}
function nextMonth() {
	monthTime.value = monthTime.value.add(1, 'month')
	checkIsLastDayOrMonth(monthTime.value, today.value, 'month')
	getData()
}

/**
 * 判断当前日期是否为最后一天或最后一个月，从而禁用按钮
 * @param {Object} seletTime
 * @param {Object} currentTime
 * @param {Object} type
 */
function checkIsLastDayOrMonth(seletTime: any, currentTime: any, type: any) {
	if (type === 'day') {
		lastDay.value = !(seletTime.$D < currentTime.$D)
	} else if (type === 'month') {
		lastMonth.value = !(seletTime.$M < currentTime.$M)
	}
}
</script>

<style scoped lang="less">
.main-box {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;
}

.main-box-item {
	display: flex;
	flex-direction: column;
}
</style>
