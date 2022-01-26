import React, { useEffect, useRef } from 'react';
import { barProps } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';



const Index: React.FC<barProps> = (props) => {
  const chartRef: any = useRef();
  let arrLength = props.data.length
  let newData: string[] = []
  for(let i=1;i<=arrLength;i++){
    let str = i+'班'
    newData.push(str)
  }
  
  function tofix(arr: number[],num: number | undefined){
    let newArr: string[] = []
    arr.forEach((element: number) => {
      newArr.push(element.toFixed(num))
    });
    return newArr
  }

  useEffect(() => {
    const chart = typeof (echarts.getInstanceByDom(chartRef.current)) ? echarts.init(chartRef.current) : echarts.getInstanceByDom(chartRef.current)
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis:[
        {
          type: 'category',
          data: newData,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value", 
          show:false
        },
      ],
      series: [
        {
          name: '分数',
          type: 'bar',
          barWidth: '60%',
          data: tofix(props.data,2)
        }
      ]
    };

    chart!.setOption(option);
  }, [props]);

  return <div ref={chartRef} className="BarChart"></div>
}

export default Index;
