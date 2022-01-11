import React, { useEffect, useRef } from 'react';
import { LineProps1 } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';
import moment from 'moment';
// import {calMin,calMax} from '../tools/dataFormat'

const Index: React.FC<LineProps1> = (props) => {

    const chartRef:any = useRef();  
  function getDateList() {
    var time = new Date().setMinutes(0);
    time = time - 24 * 60 * 60 * 1000
    let categoryData = [];
    for (var i = 0; i <= 4; i++) {
      categoryData.push(moment(time).format('H:mm:ss'))
      time += 60 * 1000 / 4
    }
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
