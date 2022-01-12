import React, { useEffect, useRef } from 'react';
import { LineProps } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';
import moment from 'moment';
import defaultData from '../tools/defaultData';
// import {calMin,calMax} from '../tools/dataFormat'

const Index: React.FC<LineProps> = (props) => {

  const chartRef: any = useRef();
  let data: any
  function getDateList() {
    var time = new Date().getTime();
    time = time - 24 * 60 * 60 * 1000
    let categoryData = [];
    for (var i = 0; i <= 4; i++) {
      categoryData.push(moment(time).format('H:mm:ss'))
      time += 60 * 1000 / 4
    }
    return categoryData;
  }
  data = getDateList()
// console.log(getDateList())

  useEffect(() => {
    //定死，不需要动态变化
    // let Max1 = calMax(props.x1);
    // let Min1 = calMin(props.x1);
    // let Max2 = calMax(props.x2);
    // let Min2 = calMin(props.x2); 

    //  console.log(data,'data')
    const chart = echarts.init(chartRef.current);
    let option = {
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data
        // data:['before','','','','','now']
        // min: new Date(),
        // max: new Date(),
        // axisLabel: {

        // formatter: function (value: any) {
        //   var t_date = new Date(value);
        //   console.log([].join('-') + " "
        //   + [t_date.getHours(), t_date.getMinutes()].join(':'))
        //   // return [moment(t_date).format('H:mm:ss')]
        //   return [].join('-') + " "
        //     + [t_date.getHours(), t_date.getMinutes()].join(':');
        // }
        // }
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
          }
        },
        {
          type: "value",
          name: "预警时间",
          min: -2,
          max: 14,
          interval: 4,
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
          data: props.x2
        }
      ]
    };

    chart.setOption(option);
  }, [props]);

  return <div ref={chartRef} className="lineChart"></div>
}

export default Index;
