<template>
    <div class="mt-5">
        <el-card shadow="never">
            <template #header>
                <div class="flex justify-between">
                    <span class="text-sm">订单统计</span>
                    <div>
                        <el-check-tag
                            v-for="(item, index) in options"
                            :key="index"
                            :checked="current == item.value"
                            @click="handleChoose(item.value)"
                            >{{ item.text }}
                        </el-check-tag>
                    </div>
                </div>
            </template>
            <!-- card body -->
            <div ref="el" id="chart" style="width: 100%; height: 300px"></div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { useResizeObserver } from "@vueuse/core";
import { getStatistics3 } from "~/api/index.js";

const current = ref("week");
const options = [
    {
        text: "近一个月",
        value: "month",
    },
    {
        text: "近一周",
        value: "week",
    },
    {
        text: "近24小时",
        value: "hour",
    },
];

const handleChoose = (type) => {
    current.value = type;
    getData();
};

var myChart = null;
onMounted(() => {
    var chartDom = document.getElementById("chart");
    if (chartDom) {
        myChart = echarts.init(chartDom);
        getData();
    }
});

onBeforeUnmount(() => {
    if (myChart) {
        // 销毁实例
        echarts.dispose(myChart);
    }
});

// 获取数据
function getData() {
    let option = {
        // 横坐标
        xAxis: {
            type: "category",
            data: [],
        },
        // 纵坐标
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: [],
                type: "bar",
                showBackgroundStyle: {
                    color: "rgba(180, 180, 180, 0.2)",
                },
            },
        ],
    };
    // 获取数据之前显示loading
    myChart.showLoading();
    getStatistics3(current.value)
        .then((res) => {
            // console.log(res);
            option.xAxis.data = res.x;
            option.series[0].data = res.yAxis;
            option && myChart.setOption(option);
        })
        .finally(() => {
            myChart.hideLoading();
        });

    // 销毁页面的时候，释放掉 myChart 变量，否则会出现白屏的情况
}

const el = ref(null);
useResizeObserver(el, (entries) => {
    myChart.resize();
});
</script>
