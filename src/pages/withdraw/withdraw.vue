<template>
  <view class="content">
    <a-tabs v-model:activeKey="activeKey" @change="handleSelect">
      <a-tab-pane key="1" tab="待审核">
        <view>
          <TopBar :totalData="withDrawTotal" />
        </view>
        <view>
          <!-- 卡片项 这里是v-for渲染状态是待审核的 -->
          <CardItem v-for="item in pendingItems" :key="item.id" :data="item" :status='+0' />
        </view>
      </a-tab-pane>

      <a-tab-pane key="2" tab="打款终止" force-render>
        <view>
          <TopBar :totalData="withDrawTotal" />
        </view>
        <view>
          <!-- 卡片项 这里是v-for渲染状态是打款终止的-->
          <!-- 使用虚拟列表 -->
          <CardItem v-for="item in terminatedItems" :data="item" :key="item.id" :status="+5" />
        </view>
      </a-tab-pane>
    </a-tabs>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
// import VirtualList from 'vue3-virtual-scroll-list'
import TopBar from '@/components/TopBar.vue'
import CardItem from '@/components/cardItem.vue'
import { getWithdrawalOrderList } from '@/api/modules/widthdraw';
import type { withDrawOrderListList } from '@/api/types'
import { useWithDrawStore } from '@/store/module/withdraw';

const withdrawStore = useWithDrawStore()
const activeKey = ref<string>('1');
const totalData = ref<number>(0)
// 使用计算属性来响应式地获取 store 中的数据
const withDrawTotal = computed(() => withdrawStore.withDrawTotal);
const pendingItems = computed(() => withdrawStore.pendingItems);
const terminatedItems = computed(() => withdrawStore.terminatedItems);

const ORDER_STATE_MAP = {
  0: '待打款',
  1: '已打款',
  2: '已完成',
  3: '打款终止',
  5: '终止打款'
}

onMounted(() => {
  // 在这里可以添加初始化逻辑，比如获取数据
  getWidthDrawListFunc();
})


async function getWidthDrawListFunc() {
  await withdrawStore.getWithDrawList()
}


function handleSelect() {
  console.log(`output-`, activeKey.value)
  // 在这里可以添加切换标签页时的逻辑，比如重新获取数据
  // fetchDataByTab(activeKey.value)
  // withdrawStore.searchWithDrawList(activeKey.value,)
  withdrawStore.tabsKey = activeKey.value
  withdrawStore.searchResult = null
}
</script>

<style scoped lang="less">
.virtual-list {
  height: 400px;
  /* Set a fixed height for the virtual list */
  overflow: auto;
}
</style>
