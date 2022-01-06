import { Button, Col, Layout, List, Row, Table, Tag, DatePicker } from 'antd';

import { Content, Footer, Header } from 'antd/lib/layout/layout';
import React, { PureComponent, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import * as eCharts from "echarts";
import LineChart from "./components/LineChart";
import LineChart1 from "./components/LineChart1";
import ScatterChart from "./components/ScatterChart";
import GaugeChart from "./components/GaugeChart";
import {
  SettingFilled
} from '@ant-design/icons';
import axios from './tools/request';
import goOtherPage from './tools/goOtherPage'
import queryData from './tools/queryData'
import adapterData from './tools/adapterData';
import moment from 'moment';
const { RangePicker } = DatePicker;


interface AppState {
  data: any;
  timerId: number
  name: string
  title: string
  lineChartData: any
  formatter: any
  dataSource: any
  columns: any
  scatterChartData: any
  data1: any
}


export default class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      data1: [
        {
          title: 'Ant Design Title 1',
        },
        {
          title: 'Ant Design Title 2',
        },
        {
          title: 'Ant Design Title 3',
        },
        {
          title: 'Ant Design Title 4',
        },
      ],
      data: 50,
      timerId: 0,
      name: '淮河化工 模式化监控',
      title: '气化炉水系统',
      formatter: {
        f1: '\n\n工况模式指数',
        f2: '\n\n预警时间',
        f3: '\n\n稳定指数',
      },
      lineChartData: {
        //折线图模拟数据
        x1: [20, 40, 50, 70, 15, 15, 15],
        x2: [10, 30, 60, 80, 25, 15, 15],
      },
      scatterChartData: {
        data: [[0, 0], [50, 80], [52, 40], [60, 86], [30, 60], [60, 70], [100, 100]],
        size: 15,
        color: [
          "rgba(128, 128, 128, 0.7)",
          "rgba(255, 0, 0, 1)",
          "rgba(255, 242, 0, 1)",
          "rgba(25, 5, 247, 1)"
        ] //散点图展示点的默认颜色
      },

      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        }, {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        }, {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },

      ],
      columns: [
        {
          title: '占比',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '当前值',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '描述',
          dataIndex: 'address',
          key: 'address',
        },
      ]
    }
    this.testclick = this.testclick.bind(this)
  }
  eChartsRef: any = React.createRef();



  componentDidMount() {
    const timerID: any = setInterval(
      () => this.testclick(),
      1000
    );
    this.setState({ timerId: timerID })
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }
  testclick() {
  }
  // goOhterPage(name:string){
  //   console.log("dd",name)
  // }
  goOhterPage = (name: string) => {
    //   console.log(goOtherPage(name))  
    //   queryData(1,["data\\line1", "data\\line2","data\\line3", "data\\gauge1","data\\gauge2", "data\\gauge3", "data\\scatter1"  , "data\\scatter1.EULO","data\\scatter1.EUHI", "data\\scatter2", "data\\scatter2.EULO","data\\scatter2.EUHI","data\\tag9"
    // ]).then((res)=>{
    //       console.log(res,'res')
    //       adapterData(res)
    //     })

    queryData(0, {
      tags: ["data\\line1", "data\\line2", "data\\line3", "data\\gauge1", "data\\gauge2", "data\\gauge3", "data\\scatter1", "data\\scatter2", "data\\tag9"],
      stime: 1641454831000,
      etime: 1641455317000,
      count: 10,
    }).then((res) => {
      console.log(res, 'app')
      adapterData(res)
    })



  }


  render() {
    return (
      <>
        <div className='screen-wrapper' >
          <div className="screen" id="screen">
            <Row className='RowTitle'>
              <Col span={8}></Col>
              <Col span={8}>
                <span className='span_title'>{this.state.name}</span>
              </Col>
              <Col span={8}></Col>
            </Row>

            <Row className='RowTitle'>
              <Col span={8}>
                <span className='span_title_other'>工况分析</span>
              </Col>
              <Col span={8}>
                <span className='span_title'>{this.state.title}</span>
              </Col>
              <Col span={8}>
                <span className='span_title_other_right'>稳态分析</span>
              </Col>
            </Row>
            <div className='container'>
              <div className='main'>
                <Row className='main_content'>
                  <Col span={5} >
                    <div className='main_data'>
                      <div><Tag color="#f50">维度1:{this.state.data}</Tag></div><br />
                      <div><Tag color="#f50">维度2:{this.state.data}</Tag></div>
                    </div>
                    <div className='button_group'>
                      <div><Button className='btn_1' onClick={() => this.goOhterPage('qlc')} >全流程</Button></div>
                      <div><Button className='btn_1' onClick={() => this.goOhterPage('sxhxt')}>水循环系统</Button></div>
                      <div><Button className='btn_1' onClick={() => this.goOhterPage('bhl1')}>变换炉1</Button></div>
                      <div><Button className='btn_1' onClick={() => this.goOhterPage('bhl2')}>变换炉2</Button></div>
                      <div><Button className='btn_1' onClick={() => this.goOhterPage('bhqlc')}>变换全流程</Button></div>
                      <div><Button className='btn_1' onClick={() => this.goOhterPage('tlt1')}>脱硫塔1</Button></div>
                      <div><Button className='btn_1' onClick={() => this.goOhterPage('tlt2')}>脱硫塔2</Button></div>
                    </div>



                  </Col>
                  <Col span={14} >
                    <div className='scatter_container'>
                      <div className='scatter_container2'>
                        {/* TODO */}
                        {/* 散点图新增了高低限 */}
                        {/* <ScatterChart
                          size={this.state.scatterChartData.size}
                          data={this.state.scatterChartData.data}
                          color={this.state.scatterChartData.color}
                        /> */}
                      </div>
                      <div className='picker_container'>
                        <RangePicker
                        onChange={value=>console.log(value![0]?.format('X'))} 
                        showTime
                        defaultValue={[moment('2015-06-06', 'YYYY-MM-DD'), moment('2015-06-06', 'YYYY-MM-DD')]}
                         />
                      </div>
                    </div>

                  </Col>
                  <Col span={5} >
                    <div className='main_data'>
                      <div><Tag color="#f50">维度1:{this.state.data}</Tag></div><br />
                      <div><Tag color="#f50">维度2:{this.state.data}</Tag></div>



                    </div>
                    <div className='button_group'>
                      <div ><Button className='btn_1' onClick={() => this.goOhterPage('aq')} >安全</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOhterPage('psa')}>PSA</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOhterPage('ysja')}>压缩机A</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOhterPage('ysjb')}>压缩机B</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOhterPage('hcxt')}>合成系统</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOhterPage('bj')}>冰机</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOhterPage('agq')}>氨罐区</Button></div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className='left'>
                <div >
                  <LineChart
                    x1={this.state.lineChartData.x1}
                    x2={this.state.lineChartData.x2}
                  />
                </div>
                <div>
                  <Row className='gauge'>
                    <Col span={12}>
                      <GaugeChart data={this.state.data} formatter={this.state.formatter.f1} />
                    </Col>
                    <Col span={12}>
                      <GaugeChart data={this.state.data} formatter={this.state.formatter.f2} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12} className='value'>
                      <span>{this.state.data}</span>
                    </Col>
                    <Col span={12} className='value'>
                      <span>{this.state.data}</span>
                    </Col>
                  </Row>
                </div>
                <div className='table'>
                  <span className='buttom_title'>工况分析列表</span>
                  <div className='table_container'>
                    <Table
                      dataSource={this.state.dataSource}
                      columns={this.state.columns}
                      pagination={false}
                      scroll={{ y: 260 }}

                    />
                  </div>



                </div>

              </div>
              <div className='right'>
                <div >
                  <LineChart1
                    x={this.state.lineChartData.x1}
                  />
                </div>
                <div>
                  <Row className='gauge'>

                    <GaugeChart data={this.state.data} formatter={this.state.formatter.f3} />

                  </Row>
                  <Row >
                    <Col span={24} className='value'>
                      <span>{this.state.data}</span>
                    </Col>


                  </Row>
                </div>
                <div className='table'>
                  <span className='buttom_title_other'>稳定分析列表</span>
                  <div className='table_container'>
                    <Table
                      dataSource={this.state.dataSource}
                      columns={this.state.columns}
                      pagination={false}
                      scroll={{ y: 260 }}


                    />
                  </div>



                </div>
              </div>
            </div>
            <div className='buttom'>


              <Button ghost type="link">首页</Button>
              <Button ghost type="link">上一页</Button>
              <Button ghost type="link">暂停</Button>
              <Button ghost type="link">下一页</Button>
              <Button ghost type="link">查询历史</Button>
              <Button ghost icon={<SettingFilled />} type="link" />
            </div>
          </div>




          {/* {this.state.data} */}


        </div>
        {/* <Button onClick={this.testclick}>fetch</Button> */}

      </>
    )
  }
}


