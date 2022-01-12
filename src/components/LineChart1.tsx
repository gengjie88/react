import React, { useEffect, useRef } from 'react';
import { LineProps1 } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';
import moment from 'moment';
// import {calMin,calMax} from '../tools/dataFormat'

const Index: React.FC<LineProps1> = (props) => {
  //1.右边当前时间
  //2.新数据放最后、超过长度了的从前剔除
  const chartRef:any = useRef();  
  function getDateList() {
    var time = new Date().getTime()
    console.log('time',time)
    console.log('timex',moment(time).format('H:mm:ss'))
    time = time - 24 * 60 * 60 * 1000
    console.log('timed',moment(time).format('H:mm:ss'))
    console.log('time1',time)   
    let categoryData = [];
    for (var i = 0; i <= 4; i++) {
      categoryData.push(moment(time).format('H:mm:ss'))
      time += 60 * 1000 / 4
    }
    console.log('timec',categoryData)
    return categoryData;
  }
  let  data = getDateList()
    useEffect(()=>{

        const chart = echarts.init(chartRef.current);   
        let option = {     
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: data
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
                  data: props.x
                },
                
              ]
        };

        chart.setOption(option);
    }, [props]);

    return <div ref={chartRef} className="lineChart"></div>
}

export default Index;
