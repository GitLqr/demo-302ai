<template>
  <uni-popup ref="popup" type="dialog">
    <view class="photo-dialog">
      <!-- 证件照 -->
      <image
        :src="img"
        mode="scaleToFill"
        :style="{
          backgroundColor: imgBg,
        }"
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
import { ref } from "vue";
const props = defineProps();

const popup = ref();

const colorList = ref(["#FF0000", "#438EDB", "#FFFFFF"]);
const img = ref();
const imgBg = ref(colorList.value[0]);

function onColorClick(color: string) {
  imgBg.value = color;
}

function show(resImg: string) {
  img.value = resImg;
  popup.value.open();
}

function dismiss() {
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
}
</style>
