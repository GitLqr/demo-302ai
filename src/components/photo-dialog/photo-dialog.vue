<template>
  <uni-popup ref="popup" type="dialog" @maskClick="dismiss">
    <view class="photo-dialog">
      <!-- 证件照 -->
      <!-- <image
        :src="img"
        mode="scaleToFill"
        :style="{
          backgroundColor: imgBg,
        }"
      /> -->

      <canvas
        :style="{
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
        }"
        :canvas-id="canvasId"
        :id="canvasId"
        @error="onCanvasError"
      />
      <!-- 颜色列表 -->
      <view class="color-list">
        <view
          class="color-item"
          v-for="item in colorList"
          :style="{
            backgroundColor: `${item}`,
          }"
          @click="onColorClick(item)"
        />
      </view>
      <!-- 保存按钮 -->
      <view class="save-btn" @click="onSaveClick">保存</view>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, watch } from "vue";
const props = defineProps();

const popup = ref();
const currentInstance = getCurrentInstance();

const canvasId = "imgCanvas";
const canvasWidth = uni.upx2px(400);
const canvasHeight = uni.upx2px(500);
const colorList = ref(["#FF0000", "#438EDB", "#FFFFFF"]);
const img = ref();
const imgBg = ref(colorList.value[0]);
watch([img, imgBg], () => {
  // console.log(`watch img = ${img.value}, bg = ${imgBg.value}`);
  if (img.value && imgBg.value) {
    // 需要延时保证 canvas 加载完成
    setTimeout(() => {
      loadImgCanvas();
    }, 500);
  }
});

function loadImgCanvas() {
  const bgColor = imgBg.value;
  console.log(
    `loadImgCanvas(), bgColor = ${bgColor}, canvasSize = (${canvasWidth}, ${canvasHeight})`
  );
  const ctx = uni.createCanvasContext(canvasId, currentInstance);
  // 绘制背景
  ctx.setFillStyle(bgColor);
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  // 绘制人像
  ctx.drawImage(img.value, 0, 0, canvasWidth, canvasHeight);
  // 画
  ctx.draw();
}

function onCanvasError(e: any) {
  console.error(e.detail.errMsg);
}

function onColorClick(color: string) {
  imgBg.value = color;
}

function onSaveClick() {
  uni.canvasToTempFilePath({
    canvasId: canvasId,
    success: (res) => {
      // 除了H5 操作
      // #ifndef H5
      uni.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          uni.showToast({
            title: "保存成功",
            icon: "none",
          });
        },
        fail(err) {
          uni.showToast({
            title: "保存失败",
            icon: "none",
          });
          console.log("err", err);
        },
      });
      // #endif
      // #ifdef H5
      var arr = res.tempFilePath.split(",");
      var bytes = atob(arr[1]);
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      var blob = new Blob([ab], {
        type: "application/octet-stream",
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = new Date().valueOf() + ".png";
      var e = document.createEvent("MouseEvents");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
      URL.revokeObjectURL(url);
      // #endif
    },
    fail: (res) => {
      uni.showToast({
        title: "save fail",
        icon: "none",
      });
    },
  });
}

function show(resImg: string) {
  popup.value.open();
  img.value = resImg;
}

function dismiss() {
  img.value = undefined;
  popup.value.close();
}

defineExpose({
  show,
  dismiss,
});
</script>

<style lang="scss" scoped>
.photo-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 300rpx;
    height: 400rpx;
  }
  .color-list {
    margin-top: 20rpx;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .color-item {
      width: 100rpx;
      height: 100rpx;
    }
  }
  .save-btn {
    margin-top: 20rpx;
    width: 400rpx;
    height: 60rpx;
    color: white;
    background-color: #22a5f1;
    border-radius: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
