<template>
    <div class="test-comp">
        <van-divider content-position="left"
                     :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            全局注册组件-start
        </van-divider>

        <van-tag>标签</van-tag>
        <van-tag type="primary">标签</van-tag>
        <van-tag type="success">标签</van-tag>
        <van-tag type="danger">标签</van-tag>
        <van-tag type="warning">标签</van-tag>

        <van-divider content-position="right"
                     :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            全局注册组件-end
        </van-divider>

        <div class="test-px-rem">
            这是一段文字
        </div>
    </div>
</template>

<script>
import { Divider, Tag } from 'vant';

export default {
    components: {
        [Divider.name]: Divider,
        [Tag.name]: Tag
    }
};
</script>

<style lang="scss">
.test-comp {
    .test-px-rem {
        font-size: 40px;
    }
}
</style>
