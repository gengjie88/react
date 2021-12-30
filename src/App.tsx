import { Button, Col, Layout, Row } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import React, { PureComponent,useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import * as eCharts from "echarts";
import LineChart from "./components/LineChart";
import ScatterChart from "./components/ScatterChart";
import GaugeChart from "./components/GaugeChart";
import axios from './tools/request';


// import ReactEchartsCore from 'echarts-for-react/lib/core';

// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';


// function PageHome(props:any) {
//   return (
//     <div className='App'>
//       {/* <Row className='RowTitle'>
//        <Col span={8}></Col>
//        <Col span={8}>
//          <span className='StyleName'>{props.name}</span>
//        </Col>
//        <Col span={8}></Col>
//      </Row> */}
//      <ReactEchartsCore
//       style={{ background: '#fff', height: '376px' }}
//       echarts={echarts}
//       option={getOption()}
//     />
//     </div>
     
   
//   );
// }
// const getOption = () => {
//   return {
//     title: {
//       text: '热门知识点统计图',
//       subtext: '统计前7名热门知识点',
      
//     },
//     grid: {
//       y: 70,
//       x: 78,
//     },
//     xAxis: {
//       type: 'value',
//       show: false,
//     },
//     yAxis: {
//       type: 'category',
     
//       // ...SetyAxis, 这是我自己定义的纵轴，在另外一个文件
//     },
//     series: [
//       {
//         type: 'bar',
//         barWidth: 20,
//         data: {}, //这是我定义的渲染数据
//         itemStyle: {
//           normal: {
//             color: '#5B8FF9',
//           },
//         },
//         label: {
//           color: '#f6f6f6',
//           show: true,
//           position: 'insideLeft',
//         },
//       },
//     ],
//     tooltip: {},
//   };
// };

// export default PageHome;
interface AppState{
  data:any;
  timerId:number
}


export default class App extends React.Component<{}, AppState> {
  
  constructor(props:any){
    super(props);
    this.state = {
      data:0,
      timerId:0
    }
    this.testclick = this.testclick.bind(this)
  }
  eChartsRef: any = React.createRef();
  //state = {
    //data:40
    // lineChartData: {
    //   //折线图模拟数据
    //  x1:[20,40,50,70,15,15,15],
    //  x2:[10,30,60,80,25,15,15],
    // },
    // scatterChartData:{
    //   data:[[10,20],[50,80],[52,40],[60,86],[30,60],[60,70],[56,81]],
    //   size:5,
    //   color: [
    //     "rgba(128, 128, 128, 0.7)",
    //     "rgba(255, 0, 0, 1)",
    //     "rgba(255, 242, 0, 1)",
    //     "rgba(25, 5, 247, 1)"
    //   ] //散点图展示点的默认颜色
    // }
 // };


 componentDidMount() {
  const timerID:any = setInterval(
    () => this.testclick(),
    1000
  );
  this.setState({timerId:timerID})
}

componentWillUnmount() {
  clearInterval(this.state.timerId);
}
 testclick(){
  axios.post("/api/DbComm/GetData",["data\\tag5"]).then(res=>{
    console.log(res.data[0],'res')
    this.setState({data:res.data[0]})
  })
}
  
  render() {
    return (
      <>
      <div className='App' >
        {/* <LineChart
            title="折线图模拟数据"
            x1={this.state.lineChartData.x1}
            x2={this.state.lineChartData.x2}
          /> */}
          {/* <ScatterChart
              size={this.state.scatterChartData.size}
              data={this.state.scatterChartData.data}
              color={this.state.scatterChartData.color}
          /> */}
          <GaugeChart data={this.state.data}/>
          {/* {this.state.data} */}
          
          
      </div>
      <Button onClick={this.testclick}>fetch</Button>
          
      </>
    )
  }
}

