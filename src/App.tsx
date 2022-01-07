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
import defaultData from './tools/defaultData';
const { RangePicker } = DatePicker;



interface AppState {
 name:string,
 title:string,
 formatter:any,
 size:number,
 color:Array<string>,
 tag:number,
 lineData1:any,
 lineData2:any,
 gaugeData:any,
 scatterData:any,
 mainData:any,
 tableData1:any,
 tableData2:any,
 columns:any
}


export default class App extends React.Component<{},AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      ...defaultData,
      
    }
    this.testclick = this.testclick.bind(this)
  }
  eChartsRef: any = React.createRef();



  componentDidMount() {
    const timerID: any = setInterval(
      () => this.testclick(),
      1000
    );
    this.setState({ tag: timerID })
  }

  componentWillUnmount() {
    clearInterval(this.state.tag);
  }
  testclick() {
    console.log(this.state.tag,'tag')
    queryData(this.state.tag,["data\\line1", "data\\line2","data\\line3", "data\\gauge1","data\\gauge2", "data\\gauge3", "data\\scatter1"  , "data\\scatter1.EULO","data\\scatter1.EUHI", "data\\scatter2", "data\\scatter2.EULO","data\\scatter2.EUHI","data\\tag9","data\\tag10"
  ]).then((res)=>{
      adapterData(res)
        this.setState(defaultData)
        console.log(this.state.scatterData.data,'scatterdata')
      })
  }
  // goOhterPage(name:string){
  //   console.log("dd",name)
  // }
  goOhterPage = (name: string) => {
      // console.log(goOtherPage(name))  

    // console.log(this.state.name,'state')

    //查询历史数据示例
    // queryData(0, {
    //   tags: ["data\\line1", "data\\line2", "data\\line3", "data\\gauge1", "data\\gauge2", "data\\gauge3", "data\\scatter1", "data\\scatter2", "data\\tag9"],
    //   stime: 1641454831000,
    //   etime: 1641455317000,
    //   count: 10,
    // }).then((res) => {
    //   console.log(res, 'app')
    //   adapterData(res)
    // })



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
                      <div><Tag color="#f50">维度1:{this.state.mainData.d1}</Tag></div><br />
                      <div><Tag color="#f50">维度2:{this.state.mainData.d2}</Tag></div>
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
                        <ScatterChart
                          size={this.state.size}
                          data={this.state.scatterData.data}
                          color={this.state.color}
                          x_h={this.state.scatterData.x_h}
                          x_l={this.state.scatterData.x_l}
                          y_h={this.state.scatterData.y_h}
                          y_l={this.state.scatterData.y_l}
                        />
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
                      <div><Tag color="#f50">维度1:{this.state.mainData.x1}</Tag></div><br />
                      <div><Tag color="#f50">维度2:{this.state.mainData.x2}</Tag></div>
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
                    x1={this.state.lineData1.x1}
                    x2={this.state.lineData1.x2}
                  />
                </div>
                <div>
                  <Row className='gauge'>
                    <Col span={12}>
                      <GaugeChart data={this.state.gaugeData.gkmszs} formatter={this.state.formatter.f1} />
                    </Col>
                    <Col span={12}>
                      <GaugeChart data={this.state.gaugeData.yjzs} formatter={this.state.formatter.f2} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12} className='value'>
                      <span>{this.state.gaugeData.gkmszs}</span>
                    </Col>
                    <Col span={12} className='value'>
                      <span>{this.state.gaugeData.yjzs}</span>
                    </Col>
                  </Row>
                </div>
                <div className='table'>
                  <span className='buttom_title'>工况分析列表</span>
                  <div className='table_container'>
                    <Table
                      dataSource={this.state.tableData1}
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
                    x={this.state.lineData2.x}
                  />
                </div>
                <div>
                  <Row className='gauge'>
                    <GaugeChart data={this.state.gaugeData.wdzs} formatter={this.state.formatter.f3} />
                  </Row>
                  <Row >
                    <Col span={24} className='value'>
                      <span>{this.state.gaugeData.wdzs}</span>
                    </Col>
                  </Row>
                </div>
                <div className='table'>
                  <span className='buttom_title_other'>稳定分析列表</span>
                  <div className='table_container'>
                    <Table
                      dataSource={this.state.tableData1}
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
        </div>
      </>
    )
  }
}


