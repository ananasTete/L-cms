<template>
  <div class="login">
    <!-- 1 -->
    <!-- <img class="bg" src="~@/assets/img/login-bg.svg" alt="" /> -->

    <!-- 2 -->

    <main class="main">
      <h4>在线花店后台管理系统</h4>

      <div class="form">
        <span>账号：</span>
        <el-input
          class="input"
          type="text"
          v-model="userInfo.name"
          placeholder="请输入您的账号"
        />
      </div>

      <div class="form">
        <span>密码：</span
        ><el-input
          class="input"
          type="password"
          v-model="userInfo.password"
          placeholder="请输入您的账号"
        />
      </div>

      <el-button class="btn" type="primary" @click="onLoginClick"
        >登陆</el-button
      >
    </main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { login } from '../api/login'
import localCache from '../utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()

const userInfo = reactive({ name: '', password: '' })

function onLoginClick() {
  login(userInfo).then((res) => {
    const { userInfo, permission } = res
    localCache.setCache('userInfo', userInfo)
    localCache.setCache('token', userInfo.token)
    localCache.setCache('permission', permission[0])
    router.push('/home')
  })
}
</script>

<style scoped lang="less">
.login {
  .bg {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  }
  .main {
    z-index: 999;

    margin: 0 auto;
    margin-top: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 25%;
    min-width: 300px;
    height: 25%;
    min-height: 350px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

    border-radius: 10px;
    .form {
      margin: 15px 0;
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;

      .input {
        width: 60%;
      }
    }
    .btn {
      margin-top: 30px;
      width: 80%;
    }
  }
}
</style>
