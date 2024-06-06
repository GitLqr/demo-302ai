<template>
  <view class="index-container">
    <view class="img-box" @click="onPickImg">
      <view v-if="!img" class="add">+</view>
      <image v-if="img" class="img" :src="img.path" mode="aspectFit" />
    </view>
    <view class="gen-btn" @click="onGenImg">生成证件照</view>
    <PhotoDialog ref="photoDialog" />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as ai302Api from "@/api/ai302";
import PhotoDialog from "@/components/photo-dialog/photo-dialog.vue";

const img = ref<ImgFile>();
const photoDialog = ref();

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

async function onGenImg() {
  // if (true) {
  //   return showResImg(
  //     "https://file.302.ai/gpt/imgs/20240605/7862f8b44a18430caf4e2df69f1cf0b2.png"
  //   );
  // }

  if (!img.value) {
    return uni.showToast({
      title: "please pick img first",
      icon: "none",
    });
  }

  try {
    uni.showLoading({
      title: "loading",
    });

    // 超时响应：
    // {
    //     "completed_at": "",
    //     "created_at": "2024-06-05T16:20:39.444Z",
    //     "error": "",
    //     "id": "17176044394419",
    //     "model": "removebg",
    //     "output": "",
    //     "started_at": "",
    //     "status": "starting"
    // }

    // 正常响应：
    // {
    //     "completed_at": "2024-06-05T16:23:23.111283Z",
    //     "created_at": "2024-06-05T16:20:39.444Z",
    //     "error": "",
    //     "id": "17176044394419",
    //     "model": "removebg",
    //     "output": "https://file.302.ai/gpt/imgs/20240605/7862f8b44a18430caf4e2df69f1cf0b2.png",
    //     "started_at": "2024-06-05T16:23:12.501563Z",
    //     "status": "succeeded"
    // }

    let res = await ai302Api.removeBg(img.value);
    console.log("removeBg res: ", res);
    // 说明 30s 内没有生成成功，执行 fetch 查询
    if (res.status == "starting") {
      console.log("removeBg timeout, startFetchTimer");
      res = await startFetchTimer(res.id);
      console.log("fetch res: ", res);
    }
    uni.hideLoading();

    if (isAiResSuccess(res)) {
      // 显示最终结果
      showResImg(res.output);
    } else {
      // 说明最终结果没有成功
      uni.showToast({
        title: "removeBg fail",
        icon: "error",
      });
    }
  } catch (error) {
    console.log(error);
    uni.hideLoading();
    uni.showToast({
      title: "error happen..",
      icon: "error",
    });
  }
}

function startFetchTimer(id: string): Promise<AiTaskResult> {
  // ai302Api.fetchTaskResult("17176044394419");
  const intervalTime = 5000;
  const fetchMaxCount = 20;
  let fetchCount = 0;

  return new Promise((resolve, reject) => {
    // 开启定时器，每5s查询一次
    const intervalId = setInterval(async () => {
      try {
        const res = await ai302Api.fetchTaskResult(id);
        console.log(`fetch success, fetchCount = ${fetchCount}, res = `, res);
        if (isAiResSuccess(res) || fetchCount >= fetchMaxCount) {
          // 结果成功，或者 达到查询最大次数，就把结果返回，关闭定时器
          clearInterval(intervalId);
          resolve(res);
        } else {
          // 结果还未成功，继续查询
          fetchCount++;
        }
      } catch (error) {
        console.log(`fetch error, fetchCount = ${fetchCount}, error = `, error);
        // 报错了，关闭定时器
        clearInterval(intervalId);
        reject(error);
      }
    }, intervalTime);
  });
}

function isAiResSuccess(res: AiTaskResult): boolean {
  return res != null && res.status == "succeeded";
}

function showResImg(resImg: string) {
  console.log(`showResImg, resImg = ${resImg}`);
  photoDialog.value?.show(resImg);
}
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
