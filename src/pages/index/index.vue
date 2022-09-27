<template>
  <view class="content flex">
    <!-- <image class="logo" src="/static/logo.png"></image> -->
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <u-button @click="setName">setName : {{ name }}</u-button>
    <u-button @click="setCounter(++counter)">counter is : {{ counter }}</u-button>
    <u-button @click="setCounter(0)">重置</u-button>
  </view>
</template>

<script setup>
  import { ref } from 'vue';
  import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
  import { useMainStore } from '@/store/index';
  import { storeToRefs } from 'pinia';
  
  const title = ref('');

  const main = useMainStore();
  const { counter, name, accessToken } = storeToRefs(main);

  function setName() {
    main.setState('name', 'newName');
  }

  function setCounter(num) {
    main.setState('counter', num);
  }

  onLoad((options) => {
    console.log('onLoad - options', options);
    main.setToken('1234567890123');
  });

  onShow(() => {
    title.value = 'Hello world';
  });

  onHide(() => {
    title.value = 'see you';
  });
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
