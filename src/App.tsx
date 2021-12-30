import { Col, Layout, Row } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
// import logo from './logo.svg';
import './App.css';
// import * as eCharts from "echarts";
import LineChart from "./components/LineChart";
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



export default class App extends PureComponent {

  eChartsRef: any = React.createRef();
  state = {
    lineChartData: {
      //折线图模拟数据
      xData: [
        "2021/08/13",
        "2021/08/14",
        "2021/08/15",
        "2021/08/16",
        "2021/08/17",
        "2021/08/18",
      ],
      seriesData: [22, 19, 88, 66, 5, 90],
    },
  };


  componentDidMount() {
    
  }

  render() {
    return (
      <div className='App' >
        <LineChart
            
            title="折线图模拟数据"
            xData={this.state.lineChartData.xData}
            seriesData={this.state.lineChartData.seriesData}
          />
      </div>
          
       
    )
  }
}

