import React, { useEffect, useRef } from 'react';
import { LineProps1 } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';
// import {calMin,calMax} from '../tools/dataFormat'

const Index: React.FC<LineProps1> = (props) => {

    const chartRef:any = useRef();  


    useEffect(()=>{

        const chart = echarts.init(chartRef.current);   
        let option = {     
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: ["before", "", "", "", "", "", "now"]
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
                    color: "blue"
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
