import React, { useEffect, useRef } from 'react';
import { gaugeProps } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';


const Index: React.FC<gaugeProps> = (props) => {

    const chartRef:any = useRef();  

    
    useEffect(()=>{
        

        const chart = echarts.init(chartRef.current);  
        let option = {   
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
                    distance: 15,
                    fontSize: 8
                  },
                  detail: {
                    valueAnimation: true,
                    formatter: props.formatter,
                    color: "inherit",
                    fontSize: 12
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
