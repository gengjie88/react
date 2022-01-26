import React, { useEffect, useRef } from 'react';
import { LineProps1 } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';
import moment from 'moment';
const Index: React.FC<LineProps1> = (props) => {
  const chartRef: any = useRef();
  let newTime: string[] = []
  props.time.forEach((element: moment.MomentInput) => {
    newTime.push(moment(element).format('YYYY-MM-DD HH:mm:ss'))
  })
  function tofix(arr: number[], num: number | undefined) {
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
          interval: (newTime.length-7)/6,
        },
        axisLine: {
          onZero: false
        },
        data: newTime
      },
      yAxis: [
        {
          type: "value",
          name: "稳定指数",
          min: -10,
          max: 110,
          interval: 30,
          splitNumber: 5,
          nameTextStyle: {
            color: "yellow"
          }
        },

      ],
      series: [
        {
          name: "稳定指数",
          type: "line",
          data: tofix(props.x, 2),
          smooth: true,
          symbol: "none",
          itemStyle:{
            normal:{
              lineStyle:{
                // color:'yellow'
              }
            }
          }
        },

      ]
    };

    chart!.setOption(option);
  }, [props]);

  return <div ref={chartRef} className="lineChart4"></div>
}

export default Index;


