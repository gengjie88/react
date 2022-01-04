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
        let Min2 = calMin(props.x2); 

        const chart = echarts.init(chartRef.current);   
        let option = {  
          // grid: {
          //   x: 50,
          //   //  y: 10,
          //    x2: 50,
          //   // y2: 10
          // },       
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: ["before", "", "", "", "", "", "now"]
            },
            yAxis: [
                {
                  type: "value",
                  name: "工况模式指数",
                  min: Min1,
                  max: Max1,
                  interval: (Max1 - Min1) / 5,
                  splitNumber: 5,
                  nameTextStyle: {
                    color: "blue"
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
                    color: "green"
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
