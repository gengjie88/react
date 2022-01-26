import React, { useEffect, useRef } from 'react';
import { gaugeProps } from "./type";
import * as echarts from "echarts";
import '../assets/style/components.css';


const Index: React.FC<gaugeProps> = (props) => {

    const chartRef:any = useRef();  

    
    useEffect(()=>{
        

      const chart = typeof(echarts.getInstanceByDom(chartRef.current)) ?echarts.init(chartRef.current):echarts.getInstanceByDom(chartRef.current) 
        let option = {   
          series: [
              {
                min:0,
                max:100,
                type: "gauge",
                axisLabel:{
                  show:false
                },
                axisLine:{
                  show:false
                },
                axisTick:{
                  show:false
                },
                splitLine:{
                  show:false
                },
                detail: {
                  valueAnimation: true,
                  formatter:"\n\n{value}" + props.formatter,
                  color: "inherit",
                  fontSize: 12
                },
                // data: [{ value: props.data }]
                data: [{ value: props.data.toFixed(2) }]
              }
            ]
      };
        if(props.id === 0){
          option.series[0].min = -2
          option.series[0].max = 14
        }  
       

        chart!.setOption(option);
    }, [props]);

    return <div ref={chartRef} className="gaugeChart"></div>
}

export default Index;
