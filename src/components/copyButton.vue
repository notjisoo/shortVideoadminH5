<template>
    <button @click="copyText" :disabled="isCopied">
        {{ isCopied ? "已复制" : "复制" }}
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = defineProps({
    text: {
        type: String,
        required: true
    }
});

const isCopied = ref(false);

const copyText = async () => {
    try {
        await navigator.clipboard.writeText((text.text as string));
        isCopied.value = true;
        // 复制成功后重置状态
        setTimeout(() => {
            isCopied.value = false;
        }, 1000); // 2秒后恢复按钮文本
    } catch (err) {
        console.error("复制失败", err);
    }
};
</script>


<style scoped lang="less">
button {
    border: none !important;
    background-color: transparent;
    color: #1890ff;
    cursor: pointer;
    font-size: 12px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

button:hover {
    background-color: rgba(24, 144, 255, 0.1);
}
</style>
