import React, { useEffect, useRef } from 'react';
import { scatterProps } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';


const Index: React.FC<scatterProps> = (props) => {

    const chartRef:any = useRef();  //拿到DOM容器

    // 每当props改变的时候就会实时重新渲染
    useEffect(()=>{
        

        const chart = echarts.init(chartRef.current);   //echart初始化容器
        let option = {  //配置项(数据都来自于props)
            xAxis: {
                min: 0,
                max: 100,
                show: false
              },
              yAxis: {
                min: 0,
                max: 100,
                show: false
              },
              grid: {
                x: 10,
                y: 10,
                x2: 10,
                y2: 10
              },
              series: [
                {
                  symbolSize: props.size,
                  data: props.data,
                  type: "scatter",
                  itemStyle: {
                    normal: {
                      color: function(params:any) {
                        let colorList = props.color;
                        if (params.dataIndex > props.data.length - colorList.length) {
                          return colorList[props.data.length - params.dataIndex];
                        }
                        return colorList[0];
                      }
                    }
                  }
                }
              ]
        };

        chart.setOption(option);
    }, [props]);

    return <div ref={chartRef} className="scatterChart"></div>
}

export default Index;
