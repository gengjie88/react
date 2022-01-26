import React, { useEffect, useRef } from 'react';
import { LineProps } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';
import moment from 'moment';
import defaultData from '../tools/defaultData';

const Index: React.FC<LineProps> = (props) => {
  const chartRef: any = useRef();
  let newTime: string[] = []
  props.time.forEach((element: moment.MomentInput) => {
    newTime.push(moment(element).format('YYYY-MM-DD HH:mm:ss'))
   
  })
  console.log((newTime.length-7)/6)
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
        trigger: 'axis'
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          formatter:function(val: string){
            return val.split(" ")[1]
          },
          // interval: 9,
          // minInterval:1,
          interval:(newTime.length-7)/6,
          //  rotate:15
        },
        axisLine: {
          onZero: false
        },
        data: newTime
      },
      yAxis: [
        {
          type: "value",
          name: "工况模式指数",
          min: -10,
          max: 110,
          interval: 30,
          splitNumber: 5,
          nameTextStyle: {
            color: "yellow"
          },
          // offset:-5,
          axisLine:{
            show:true,
            lineStyle:{
              color: 'yellow',
                    width: 2
            },
          },
          
        },
        {
          type: "value",
          name: "预警时间",
          min: -2,
          max: 14,
          interval: 4,
          splitNumber: 5,
        
          nameTextStyle: {
            color: "green",
          },
          nameLocation:'start',
          position:'left',
          offset:25,
          // axisTick: {
          //   inside: true,
              //y轴标记朝向
          // },
          // axisLabel: {
          //   inside: true,
           
          // },
          axisLine:{
            show:true,
            lineStyle:{
              color: 'green',
                    width: 2
            },
           
           
          },
        }
      ],
      series: [
        {
          name: "工况模式指数",
          type: "line",
          data: tofix(props.x1,2),
          yAxisIndex:0,
          smooth: true,
          symbol: "none",
          itemStyle:{
            normal:{
              lineStyle:{
                color:'yellow'
              }
            }
          }
        },
        {
          name: "预警时间",
          type: "line",
          data: tofix(props.x2,2),
          yAxisIndex:1,
          smooth: true,
          symbol: "none"
        }
      ]
    };

    chart!.setOption(option);
  }, [props]);

  return <div ref={chartRef} className="lineChart"></div>
}

export default Index;
