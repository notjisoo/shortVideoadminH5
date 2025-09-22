import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { withDrawOrderListList } from '@/api/types'
import { getWithdrawalOrderList } from '@/api/modules/widthdraw'

import mockWithdrawalList from '@/data/mockData' // 模拟数据

export const useWithDrawStore = defineStore('withDraw', () => {
  const withDrawTotal = ref<number>(0) // 总订单量
  // const withDrawList = ref<withDrawOrderListList[]>([]) //总数据
  // const pendingData = ref<withDrawOrderListList[]>([]) //待审核数据
  // const terminatedData = ref<withDrawOrderListList[]>([]) //审核终止数据
  const tabsKey = ref<string>('1')

  /**
   * 以下数据时模拟测试数据
   */

  const withDrawList = ref<withDrawOrderListList[]>(mockWithdrawalList)
  const pendingData = ref<withDrawOrderListList[]>([]) //待审核数据
  const terminatedData = ref<withDrawOrderListList[]>([]) //审核终止数据
  const searchResult = ref<withDrawOrderListList[] | null>(null)

  const getWithDrawList = async () => {
    // const res = await getWithdrawalOrderList({ page: 1, pageSize: 100 })
    // withDrawList.value = res.data.data.list
    // withDrawTotal.value = res.data.data.total

    // 测试
    withDrawList.value = withDrawList.value
    withDrawTotal.value = 200
  }

  //   根据用户传入id还是金额来搜索值
  const searchWithDrawList = (searchValType: string, searchVal: string) => {
    let list = []
    if (tabsKey.value === '1') {
      list = withDrawList.value.filter(item => item.orderState === 0)
    } else if (tabsKey.value === '2') {
      list = withDrawList.value.filter(item => item.orderState === 5)
    }
    if (searchValType === 'id') {
      searchResult.value = list.filter(
        item => item.accountId === Number(searchVal)
      )
    } else {
      searchResult.value = list.filter(
        item => item.amount === Number(searchVal)
      )
    }
  }

  // 根据状态返回数据
  const pendingItems = computed(() => {
    pendingData.value = withDrawList.value.filter(
      (item: withDrawOrderListList) => item.orderState === 0
    )
    if (tabsKey.value === '1' && searchResult.value) {
      return searchResult.value
    }
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

    if (tabsKey.value === '2' && searchResult.value) {
      return searchResult.value
    }
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
    withDrawList,
    searchResult
  }
})
