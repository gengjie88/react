import React, { useEffect, useRef } from 'react';
import { LineProps1 } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';
import moment from 'moment';
// import {calMin,calMax} from '../tools/dataFormat'
function getDateList() {
  var time = new Date().getTime();
  time = time - 24 * 60 * 60 * 1000
  let categoryData = [];
  for (var i = 0; i <= 10; i++) {
    categoryData.unshift(moment(time).format('H:mm:ss'))
    time -= 60 * 1000 / 4
  }
  // categoryData = categoryData.fill('',1,-1)
  console.log('ttt',categoryData)
  return categoryData;
}
let xtimeData:any;
const Index: React.FC<LineProps1> = (props) => {
  //1.右边当前时间
  //2.新数据放最后、超过长度了的从前剔除
  const chartRef:any = useRef();  
  if(props.status !== 0){
    xtimeData = getDateList()
  }else{
     xtimeData = [moment(props.startTime*1000).format('H:mm:ss'),'','','','','','','','','',moment(props.endTime*1000).format('H:mm:ss')]
     console.log('?',xtimeData)
     console.log('?',moment(props.startTime*1000).format('H:mm:ss'))
  }

    useEffect(()=>{

        const chart = echarts.init(chartRef.current);   
        let option = {   
          tooltip:{
            trigger: 'axis'
          },
            xAxis: {
                type: "category",
                boundaryGap: false,
                axisLabel:{
                  interval:9,
                
                },
                axisLine:{
                  onZero:false
                },
                data: xtimeData
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
