import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { withDrawOrderListList } from '@/api/types'
import { getWithdrawalOrderList } from '@/api/modules/widthdraw'

export const useWithDrawStore = defineStore('withDraw', () => {
  const withDrawTotal = ref<number>(0) // 总订单量
  const withDrawList = ref<withDrawOrderListList[]>([]) //总数据
  const pendingData = ref<withDrawOrderListList[]>([]) //待审核数据
  const terminatedData = ref<withDrawOrderListList[]>([]) //审核终止数据
  const tabsKey = ref<string>('1')

  const getWithDrawList = async () => {
    const res = await getWithdrawalOrderList({ page: 1, pageSize: 100 })
    withDrawList.value = res.data.data.list
    withDrawTotal.value = res.data.data.total
  }

  //   根据用户传入id还是金额来搜索值
  const searchWithDrawList = (searchVal: string) => {
    // 1.如果tabVal是1是在待审核
    if (tabsKey.value === '1') {
      if (searchVal === 'id') {
        pendingData.value = pendingData.value.filter(
          item => item.id === Number(searchVal)
        )
      } else {
        pendingData.value = pendingData.value.filter(
          item => item.amount === Number(searchVal)
        )
      }
    }
    // 2.如果是tabVal是2是终止审核
    if (tabsKey.value === '2') {
      if (searchVal === 'id') {
        terminatedData.value = terminatedData.value.filter(
          item => item.id === Number(searchVal)
        )
      } else {
        terminatedData.value = terminatedData.value.filter(
          item => item.amount === Number(searchVal)
        )
      }
    }
  }

  // 根据状态返回数据
  const pendingItems = computed(() => {
    pendingData.value = withDrawList.value.filter(
      (item: withDrawOrderListList) => item.orderState === 0
    )
    // 用来测试搜索效果，因为返回数据都是一样的用户和金额
    return pendingData.value.map(
      (item: withDrawOrderListList, index: number) => {
        return {
          ...item,
          accountId: item.accountId + index,
          amount: item.amount + index
        }
      }
    )
  })

  const terminatedItems = computed(() => {
    terminatedData.value = withDrawList.value.filter(
      (item: withDrawOrderListList) => item.orderState === 5
    )
    return terminatedData.value.map(
      (item: withDrawOrderListList, index: number) => {
        return {
          ...item,
          accountId: item.accountId + index,
          amount: item.amount + index
        }
      }
    )
  })

  return {
    getWithDrawList,
    searchWithDrawList,
    tabsKey,
    pendingItems,
    terminatedItems,
    withDrawTotal,
    withDrawList
  }
})
