<template>
  <div class="home-service">
    <main class="chat">
      <div class="title">{{ titleStatus }}</div>
      <div class="content">
        <template v-for="(item, index) in infoList" :key="index">
          <div class="chat-message" :class="item.position">
            {{ item.info }}
          </div>
        </template>
      </div>
    </main>
    <div class="text">
      <el-input
        class="text-row input"
        placeholder="请输入"
        v-model="currentInfo"
      >
      </el-input>
      <div class="text-row">
        <el-button type="primary" @click="oSendMsgClick">发送</el-button>
        <el-button type="primary" @click="oSendClearClick">清空信息</el-button>
      </div>
      <div class="text-row">
        <el-button type="primary" @click="onOnlineClick">双击上线</el-button>
        <el-button type="danger" @click="onOffLineClick">下线</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { io } from 'socket.io-client'

const titleStatus = ref('离线中')
const currentInfo = ref('')
const infoList = reactive([])
let socket

function onOnlineClick() {
  socket = io('ws://localhost:8000')

  socket.on('connect', () => {
    console.log('连接成功')
    titleStatus.value = '在线中'
    socket.emit('servantOnLine', 'servant1')
  })

  socket.on('connect_error', () => {
    console.log('连接失败')
  })

  socket.on('disconnect', () => {
    console.log('断开连接')
  })

  socket.on('greeting', (info) => {
    infoList.push({ position: 'left', info: info })
  })

  socket.on('chatMessageU', (message) => {
    infoList.push({ position: 'left', info: message })
  })

  socket.on('statusMessage', (message) => {
    infoList.push({ position: 'center', info: message })
  })
}
function onOffLineClick() {
  if (socket) {
    socket.emit('servantOffLine')
    socket.disconnect()
    titleStatus.value = '离线中'
  }
}
function oSendMsgClick() {
  if (socket) {
    socket.emit('servantChatMessage', currentInfo.value)
    infoList.push({ position: 'right', info: currentInfo.value })
  }
}
function oSendClearClick() {
  infoList.splice(0, infoList.length)
}
</script>

<style scoped lang="less">
.home-service {
  width: 95%;
  margin: 0 auto;
  background: #fff;
  overflow: auto;
  border: 1px blue solid;
  display: flex;
  .chat {
    width: 600px;
    height: 800px;
    overflow: auto;
    .title {
      height: 40px;
      line-height: 40px;
      background: pink;
      text-align: center;
      color: #fff;
    }
    .content {
      background: #fdedec;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 15px;
      .chat-message {
        width: auto;
        height: auto;
        padding: 10px;
        background: #fff;
        border-radius: 20px;
        font-size: 16px;
        color: red;
        margin: 5px 0;
      }
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    padding-top: 100px;
    padding-left: 50px;
    .text-row {
      margin: 20px 0;
    }
    .input {
      width: 400px;
      height: 31px;
    }
  }
}
.left {
  align-self: flex-start;
}
.right {
  align-self: flex-end;
}
.center {
  align-items: center;
  margin: 20px 0;
  padding: 5px 0;
  width: 100%;
  text-align: center;
  border-radius: 0px;
  background: #fdedec;
  color: #f1948a;
  letter-spacing: 2px;
}
</style>
