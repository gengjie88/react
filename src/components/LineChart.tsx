import React, { useEffect, useRef } from 'react';
import { IProps } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';
import {calMin,calMax} from '../tools/dataFormat'

const Index: React.FC<IProps> = (props) => {

    const chartRef:any = useRef();  //拿到DOM容器

    // 每当props改变的时候就会实时重新渲染
    useEffect(()=>{
        let Max1 = calMax(props.x1);
        let Min1 = calMin(props.x1);
        let Max2 = calMax(props.x2);
        let Min2 = calMin(props.x2); //用于对齐双y轴

        const chart = echarts.init(chartRef.current);   //echart初始化容器
        let option = {  //配置项(数据都来自于props)
            title: {
                text: props.title ? props.title : "加载中...",
            },
            // xAxis: {
            //     type: 'category',
            //     data: props.xData,
            // },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: ["before", "", "", "", "", "", "now"]
            },
            // yAxis: {
            //     type: 'value'
            // },
            yAxis: [
                {
                  type: "value",
                  name: "工况模式指数",
                  min: Min1,
                  max: Max1,
                  interval: (Max1 - Min1) / 5,
                  splitNumber: 5,
                  nameTextStyle: {
                    color: "yellow"
                  }
                },
                {
                  type: "value",
                  name: "预警时间",
                  min: Min2,
                  max: Max2,
                  interval: (Max2 - Min2) / 5,
                  splitNumber: 5,
                  nameTextStyle: {
                    color: "red"
                  }
                }
              ],
              series: [
                {
                  name: "工况模式指数",
                  type: "line",
                  data: props.x1
                },
                {
                  name: "预警时间",
                  type: "line",
                //   yAxisIndex: 1,
                  data: props.x2
                }
              ]
            // series: [{
            //     data: props.seriesData,
            //     type: 'line'
            // }]
        };

        chart.setOption(option);
    }, [props]);

    return <div ref={chartRef} className="lineChart"></div>
}

export default Index;
