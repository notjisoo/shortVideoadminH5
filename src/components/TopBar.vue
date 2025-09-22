<template>
    <!-- 下拉-搜索框-搜索按钮 -->
    <a-flex gap="middle" justify="center" align="center">
        <a-select defaultValue="id" @change="handleSelect">
            <!-- 默认展示用户id -->
            <a-select-option value="id">用户ID</a-select-option>
            <a-select-option value="money">提现金额</a-select-option>
        </a-select>

        <!-- 搜索输入框 -->
        <a-input-number id="searchNumber" v-model:value.trim="searchValue" :placeholder="placeholderVal"
            style="width: 100%;" />


        <!-- 搜索按钮 -->
        <a-button type="default" @click="handleSearch">搜索</a-button>
    </a-flex>

    <!-- 显示总订单量：231 条 -->
    <div :style="{ margin: '20rpx 0', color: '#2b56f6' }">
        总订单量：<span>{{ totalData }}</span>
    </div>
</template>

<script setup lang='ts'>
import { useWithDrawStore } from '@/store/module/withdraw';
import { ref } from 'vue';


const withdrawStore = useWithDrawStore() // 获得提现store
const searchValue = ref<string>(''); // 搜索value
const placeholderVal = ref<string>("请输入用户ID"); // 搜索placeholder
const userSelectWhich = ref<string>("id"); // 用户选择的搜索条件



const handleSelect = (val: string) => {
    if (val === 'money') {
        placeholderVal.value = "请输入金额";
        userSelectWhich.value = "money";
    } else {
        placeholderVal.value = "请输入用户ID";
        userSelectWhich.value = "id";
    }
}

// 根据搜索条件查询订单
const handleSearch = () => {
    if (userSelectWhich.value === 'money') {

    }
    if (userSelectWhich.value === 'id') {

    }
    // 根据userSelectWhich的值进行筛选，可以判断用户输入的是用户id还是金额来搜索。

};



defineProps<{
    totalData: number
}>()
</script>

<style></style>