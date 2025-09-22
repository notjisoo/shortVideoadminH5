<template>
	<view class="container">
		<a-flex gap="middle" vertical align="center">
			<view>账号密码登录</view>

			<a-form :model="ruleForm" :rules="rules">
				<!-- 账号输入框 -->
				<a-form-item name="username">
					<a-input v-model:value="ruleForm.username" placeholder="账号"></a-input>
				</a-form-item>
				<!-- 密码输入框 -->
				<a-form-item name="password">
					<a-input v-model:value="ruleForm.password" placeholder="密码" prop="password"
						type="password"></a-input>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" html-type="submit" block @click="login(ruleForm)"
						:loading="loading">登录</a-button>
				</a-form-item>
			</a-form>
		</a-flex>
	</view>
</template>

<script setup>
import { loginapi } from '@/api/modules/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

// 用户数据
const ruleForm = ref({
	username: 'laibaoxin',
	password: 'lbx123456',
	captchaId: 'dad231321',
	captcha: '5521321dwsad',
	soruce: 'mobile'
})


// 校验规则
const rules = {
	username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const loading = ref(false)

// 登录功能
async function login(value) {
	const res = await loginapi(value, '/api/login', 'post')
	const token = JSON.stringify(res.data.data.token)
	localStorage.setItem('token', token)
	router.push("/pages/index/index");
}
</script>

<style scoped>
.container {
	padding: 5rem;
}
</style>
