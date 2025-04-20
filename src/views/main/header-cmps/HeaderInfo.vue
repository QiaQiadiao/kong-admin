<template>
  <div class="box">
    <div class="items">
      <div class="chat">
        <el-icon size="20px"><ChatRound /></el-icon>
      </div>
      <div class="search">
        <el-icon size="20px"><Search /></el-icon>
      </div>
      <div class="mes">
        <div id="dot"></div>
        <el-icon size="20px"><Message /></el-icon>
      </div>
    </div>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="35" src="src\assets\img\头像.avif" />
        <span class="name">RayLin </span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitLogin">
            <el-icon><Close /></el-icon>
            <span>退出系统</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><Lock /></el-icon>
            <span>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><InfoFilled /></el-icon>
            <span>个人信息</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleExitLogin = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped lang="less">
.box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .items {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .chat,
    .mes,
    .search {
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .chat:hover,
    .mes:hover,
    .search:hover {
      background-color: #ccc;
      transition: background-color 0.3s ease;
    }
    .mes {
      position: relative;
      #dot {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: red;
        z-index: 10;
        top: 6px;
        right: 6px;
      }
    }
  }

  .el-dropdown-link {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 15px;
    .name {
      margin: 0 5px;
    }
    :global(.el-dropdown-menu__item) {
      line-height: 36px;
      padding: 6px 22px;
      --el-dropdown-menuItem-hover-color: none;
      --el-dropdown-menuItem-hover-fill: #ccc;
      transition: all 0.3s ease;
    }
  }
}
.el-tooltip__trigger:focus-visible {
  // 解决下拉菜单出现黑框问题
  outline: unset;
}
</style>
