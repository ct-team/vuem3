<template>
    <div>
        <!-- nav bar -->
        <van-nav-bar title="demo"
                     left-text="back"
                     left-arrow
                     @click-left="onClickLeft"
                     @click-right="onClickRight">
            <van-icon name="search"
                      slot="right" />
        </van-nav-bar>

        <!-- swpie -->
        <van-swipe>
            <van-swipe-item>
                <van-image :src="require('../../../assets/img/swipe_1.jpg')" />
            </van-swipe-item>
            <van-swipe-item>
                <van-image :src="require('../../../assets/img/swipe_2.jpg')" />
            </van-swipe-item>
            <van-swipe-item>
                <van-image :src="require('../../../assets/img/swipe_3.jpg')" />
            </van-swipe-item>
        </van-swipe>

        <!-- 全局组件 -->
        <test-global-comp />

        <!-- submit bar -->
        <van-submit-bar :price="3050"
                        button-text="提交订单"
                        @submit="onSubmit">
            <van-checkbox v-model="checked">全选</van-checkbox>
            <span slot="tip">
                你的收货地址不支持同城送, <span>修改地址</span>
            </span>
        </van-submit-bar>

        <!-- sku -->
        <van-sku v-model="show"
                 :sku="sku"
                 :goods="goods"
                 :goods-id="111"
                 :quota="222"
                 :quota-used="1"
                 :hide-stock="sku.hide_stock"
                 :message-config="messageConfig"
                 @buy-clicked="onBuyClicked"
                 @add-cart="onAddCartClicked" />
    </div>
</template>

<script>
import { NavBar, Icon, Swipe, SwipeItem, Image, SubmitBar, Checkbox, Sku } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Image.name]: Image,
        [SubmitBar.name]: SubmitBar,
        [Checkbox.name]: Checkbox,
        [Sku.name]: Sku
    },
    data() {
        return {
            checked: true,
            show: false,
            sku: {
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [
                    {
                        k: '颜色', // skuKeyName：规格类目名称
                        v: [
                            {
                                id: '30349', // skuValueId：规格值 id
                                name: '红色', // skuValueName：规格值名称
                                imgUrl: 'https://img.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img.yzcdn.cn/1p.jpg' // 用于预览显示的规格类目图片
                            },
                            {
                                id: '1215',
                                name: '蓝色',
                                imgUrl: 'https://img.yzcdn.cn/2.jpg',
                                previewImgUrl: 'https://img.yzcdn.cn/2p.jpg'
                            }
                        ],
                        k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    }
                ],
                // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                list: [
                    {
                        id: 2259, // skuId，下单时后端需要
                        price: 100, // 价格（单位分）
                        s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 110 // 当前 sku 组合对应的库存
                    }
                ],
                price: '99999.11', // 默认价格（单位元）
                stock_num: 1234, // 商品总库存
                collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                none_sku: false, // 是否无规格商品
                messages: [
                    {
                        // 商品留言
                        datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                        multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                        name: '留言', // 留言名称
                        type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                        required: '1', // 是否必填 '1' 表示必填
                        placeholder: '' // 可选值，占位文本
                    },
                    {
                        // 商品留言
                        datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                        multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                        name: '电话', // 留言名称
                        type: 'tel', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                        required: '1', // 是否必填 '1' 表示必填
                        placeholder: '' // 可选值，占位文本
                    },
                    {
                        // 商品留言
                        datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                        multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                        name: '身份证', // 留言名称
                        type: 'id_no', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                        required: '1', // 是否必填 '1' 表示必填
                        placeholder: '' // 可选值，占位文本
                    },
                    {
                        // 商品留言
                        datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                        multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                        name: '日期', // 留言名称
                        type: 'date', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                        required: '1', // 是否必填 '1' 表示必填
                        placeholder: '' // 可选值，占位文本
                    },
                    {
                        // 商品留言
                        datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                        multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                        name: '时间', // 留言名称
                        type: 'time', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                        required: '1', // 是否必填 '1' 表示必填
                        placeholder: '' // 可选值，占位文本
                    },
                    {
                        // 商品留言
                        datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                        multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                        name: '邮箱', // 留言名称
                        type: 'email', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                        required: '1', // 是否必填 '1' 表示必填
                        placeholder: '' // 可选值，占位文本
                    }
                ],
                hide_stock: false // 是否隐藏剩余库存
            },
            initialSku: {
                // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                // 值：skuValueId（规格值 id）
                s1: '30349',
                s2: '1193',
                // 初始选中数量
                selectedNum: 3
            },
            goods: {
                // 商品标题
                title: '测试商品',
                // 默认商品 sku 缩略图
                picture: 'https://img.yzcdn.cn/1.jpg'
            },
            messageConfig: {
                // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
                uploadImg: () => {
                    return new Promise(resolve => {
                        setTimeout(
                            () =>
                                resolve(
                                    'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'
                                ),
                            1000
                        );
                    });
                },
                // 最大上传体积 (MB)
                uploadMaxSize: 3,
                // placeholder 配置
                placeholderMap: {
                    text: '请输入留言',
                    tel: '请输入电话'
                }
            }
        };
    },
    created() {
        this.httpTest();
    },
    methods: {
        /**
         * Yapi测试接口
         */
        httpTest() {
            this.$Http
                .ajax({
                    method: 'post',
                    url: this.$Interfaces.testPost,
                    data: {
                        Id: '007'
                    }
                })
                .then(res => {
                    if (res.Code === 0) {
                        console.log('🍔: post -> res.Data', res.Data);
                    }
                });

            this.$Http
                .ajax({
                    url: this.$Interfaces.testGet,
                    data: {
                        Id: '008'
                    }
                })
                .then(res => {
                    if (res.Code === 0) {
                        console.log('🍔: get -> res.Data', res.Data);
                    }
                });
        },

        onClickLeft() {
            console.log('back');
        },
        onClickRight() {
            console.log('search');
        },
        onSubmit() {
            this.show = true;
        },
        onBuyClicked() {},
        onAddCartClicked() {}
    }
};
</script>

<style lang="scss">
.van-image {
    width: 100%;
    height: 100%;
}
</style>
