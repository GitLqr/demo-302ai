<template>
  <view class="index-container">
    <view class="img-box" @click="onPickImg">
      <view v-if="!img" class="add">+</view>
      <image v-if="img" class="img" :src="img.path" mode="aspectFit" />
    </view>
    <view class="gen-btn" @click="onGenImg">生成证件照</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const img = ref<ImgFile>();

function onPickImg() {
  uni.chooseImage({
    count: 1,
    sizeType: ["original", "compressed"],
    sourceType: ["album", "camera"],
    success: (res) => {
      if (res.tempFiles instanceof Array) {
        img.value = res.tempFiles[0] as any;
      } else {
        img.value = res.tempFiles as any;
      }
    },
    fail: (error) => {
      console.log(error);
      uni.showToast({
        title: "pick img fail",
        icon: "error",
        mask: true,
      });
    },
  });
}

function onGenImg() {}
</script>

<style lang="scss">
.index-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img-box {
    margin-top: 40rpx;
    width: 400rpx;
    height: 400rpx;
    background-color: #e7e7e7;
    .add {
      width: 100%;
      height: 100%;
      color: white;
      font-size: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .gen-btn {
    margin-top: 20rpx;
    width: 400rpx;
    height: 80rpx;
    border-radius: 10rpx;
    color: white;
    background-color: #22a5f1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
