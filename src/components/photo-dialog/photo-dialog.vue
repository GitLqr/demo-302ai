<template>
  <uni-popup ref="popup" type="dialog">
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

function show(resImg: string) {
  popup.value.open();
  img.value = resImg;
}

function dismiss() {
  popup.value.close();
  img.value = undefined;
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
}
</style>
