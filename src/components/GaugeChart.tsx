import React, { useEffect, useRef } from 'react';
import { gaugeProps } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';


const Index: React.FC<gaugeProps> = (props) => {

    const chartRef:any = useRef();  //拿到DOM容器

    // 每当props改变的时候就会实时重新渲染
    useEffect(()=>{
        

        const chart = echarts.init(chartRef.current);   //echart初始化容器
        let option = {  //配置项(数据都来自于props)
            series: [
                {
                  type: "gauge",
                  axisLine: {
                    lineStyle: {
                      width: 3,
                      color: [
                        [0.3, "#67e0e3"],
                        [0.7, "#37a2da"],
                        [1, "#fd666d"]
                      ]
                    }
                  },
                  pointer: {
                    itemStyle: {
                      color: "inherit"
                    }
                  },
                  splitLine: {
                    show: false,
                    distance: -30,
                    length: 3,
                    lineStyle: {
                      color: "#fff",
                      width: 2
                    }
                  },
                  axisLabel: {
                    color: "inherit",
                    distance: 10,
                    fontSize: 8
                  },
                  detail: {
                    valueAnimation: true,
                    formatter: "\n{value}\n工况模式指数",
                    color: "inherit",
                    fontSize: 8
                  },
                  data: [{ value: props.data }]
                }
              ]
        };

        chart.setOption(option);
    }, [props]);

    return <div ref={chartRef} className="gaugeChart"></div>
}

export default Index;
