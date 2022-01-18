import { Button, Col, Layout, List, Row, Table, Tag, DatePicker, Card } from 'antd';

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
import adapterCurData from './tools/adapterCurData';
import adapterHisData from './tools/adapterHisData';
import moment from 'moment';
import defaultData from './tools/defaultData';
import statusToColor from './tools/statusToColor';
import requestData from './tools/requestData';
import statusXX from './tools/statusXX';
import pageCfg from './tools/pageCfg'
import goOhterPage from './tools/goOtherPage';
import setBgImg from './tools/setBgImg';
const { RangePicker } = DatePicker;



interface AppState {
  name: string,
  title: string,
  formatter: any,
  size: number,
  color: Array<string>,
  tag: number,
  lineData1: any,
  lineData2: any,
  gaugeData: any,
  scatterData: any,
  mainData: any,
  tableData1: any,
  tableData2: any,
  columns: any,
  timeSpan: any,

}


export default class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      ...defaultData,

    }
    // this.testclick = this.testclick.bind(this)
  }
  eChartsRef: any = React.createRef();



  componentDidMount() {
    this.goOtherPage(1)
  }
  componentWillUnmount() {
    clearInterval(this.state.tag);
  }
  TimeSpanSet(v: any) {
    this.setState({ timeSpan: [v![0]?.format('X'), v![1]?.format('X')] })
  }
  queryHis() {
    // // ?三次才实现，一次tag不变，第二次tag变、页面没变
    // let startTime = this.state.timeSpan[0]
    // let endTime = this.state.timeSpan[1]
    // clearInterval(this.state.tag);
    // this.setState({tag:0})

    // // console.log('tag',this.state.tag)
    // queryData(this.state.tag, {
    //   tags: ["data\\line1", "data\\line2", "data\\line3", "data\\gauge1", "data\\gauge2", "data\\gauge3", "data\\scatter1", "data\\scatter2", "data\\tag9", "data\\tag10"],
    //   stime: 1641454831000,
    //   etime: 1641455317000,
    //   count: 11,
    // }).then((res) => {
    //   console.log(res, 'app')
    //   adapterHisData(res)
    // })
  }
  goOtherPage = async (id: any) => {
    let cfg = pageCfg()[id - 1]
    this.queryStatus()
    this.clearBoth()
    let timerID: any = setInterval(
      () => this.queryCurData(cfg),
      1000
    );
    defaultData.tag = timerID
    defaultData.id = id

  }
  queryStatus = () => {
    //TODO:需要封装,模型状态颜色
    queryData(1, [
      "QXL1\\R1301_STATUS.PV",
      "QXL1\\V1303_STATUS.PV",
      "QXL1\\V1501_STATUS.PV",
      "QXL1\\V1503_STATUS.PV",
      "QXL1\\V1504_STATUS.PV",
    ]).then((res: any) => {
      let colorList = statusToColor(res)
      let bgList = setBgImg(res, defaultData.id)
      let bgImg = document.getElementById('scatter_container')
      switch (defaultData.id) {
        case 1:
          bgImg!.className = bgList[0]
          break;
        case 2:
          bgImg!.className = bgList[1]
          break;
        case 3:
          bgImg!.className = bgList[2]
          break;
        case 4:
          bgImg!.className = bgList[3]
          break;
      }
      // if(defaultData.id === 1){
      //   bgImg!.style.backgroundImage = bgList[0]
      // }
      const ele = document.getElementById("1")
      ele!.style.color = colorList[0]
      const ele1 = document.getElementById("2")
      ele1!.style.color = colorList[1]
      const ele2 = document.getElementById("3")
      ele2!.style.color = colorList[2]
      const ele3 = document.getElementById("4")
      ele3!.style.color = colorList[3]
      const ele4 = document.getElementById("5")
      ele4!.style.color = colorList[4]

    })

  }
  queryCurData = (cfg: any) => {
    let data = requestData(cfg.queryTag)
    queryData(this.state.tag, data
    ).then((res) => {
      // TODO:需要封装
      const ele1 = document.getElementById('tag_1')
      const ele2 = document.getElementById('tag_2')
      const ele3 = document.getElementById('tag_3')
      const ele4 = document.getElementById('tag_4')
      statusXX(res, [ele1, ele2, ele3, ele4])
      adapterCurData(res)
      this.setState({ ...defaultData, title: cfg.title })
    })
  }
  clearBoth = () => {
    //切换页面时，清除掉数据
    defaultData.lineData1.x1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    defaultData.lineData1.x2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    defaultData.lineData2.x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    defaultData.scatterData.data = [[0, 0]]
    //再清除掉旧的定时器

    clearInterval(this.state.tag)
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

                      <div ><Button className='btn_1' id='1' onClick={() => this.goOtherPage(1)} >R1301</Button></div>
                      <div><Button className='btn_1' id='2' onClick={() => this.goOtherPage(2)}>V1303</Button></div>
                      <div><Button className='btn_1' id='3' onClick={() => this.goOtherPage(3)}>V1501</Button></div>
                      <div><Button className='btn_1' id='4' onClick={() => this.goOtherPage(4)}>V1503</Button></div>
                      <div><Button className='btn_1' id='4' onClick={() => this.goOtherPage(5)}>V1504</Button></div>
                    </div>
                  </Col>
                  <Col span={14} >
                    <div className='scatter_container' id='scatter_container'>
                      <Row>
                        <Col span={2}>
                          <div className='tag_2' id='tag_2'></div></Col>
                        <Col offset={20} span={2}>
                          <div className='tag_1' id='tag_1'></div></Col>


                      </Row>


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
                      <Row className='noname'>
                        <Col span={2}>
                          <div className='tag_3' id='tag_3'></div></Col>
                        <Col offset={20} span={2}>
                          <div className='tag_4' id='tag_4'></div></Col>


                      </Row>
                      <div className='picker_container'>
                        <RangePicker
                          onChange={(v) => this.TimeSpanSet(v)}
                          showTime
                          showNow
                          defaultValue={[moment('2022-01-01', 'YYYY-MM-DD'), moment('2022-01-01', 'YYYY-MM-DD')]}
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
                      {/* <div ><Button className='btn_1' onClick={() => this.goOtherPage('8')} >安全</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOtherPage('9')}>PSA</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOtherPage('10')}>压缩机A</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOtherPage('11')}>压缩机B</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOtherPage('12')}>合成系统</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOtherPage('13')}>冰机</Button></div>
                      <div ><Button className='btn_1' onClick={() => this.goOtherPage('14')}>氨罐区</Button></div> */}
                    </div>
                  </Col>
                </Row>
              </div>
              <div className='left'>
                <div >
                  <LineChart
                    x1={this.state.lineData1.x1}
                    x2={this.state.lineData1.x2}
                    startTime={this.state.timeSpan[0]}
                    endTime={this.state.timeSpan[1]}
                    status={this.state.tag}
                  />
                </div>
                <div>
                  <Row className='gauge'>
                    <Col span={12}>
                      <GaugeChart data={this.state.gaugeData.gkmszs} formatter={this.state.formatter.f1} id={1} />
                    </Col>
                    <Col span={12}>
                      <GaugeChart data={this.state.gaugeData.yjzs} formatter={this.state.formatter.f2} id={0} />
                    </Col>
                  </Row>
                </div>
                <div className='table'>
                  <span className='buttom_title'>工况分析列表</span>
                  <div className='table_container'>
                    {/* <Table
                      dataSource={this.state.tableData1}
                      columns={this.state.columns}
                      pagination={false}
                      scroll={{ y: 260 }}
                    /> */}
                  </div>
                </div>
              </div>
              <div className='right'>
                <div >
                  <LineChart1
                    x={this.state.lineData2.x}
                    startTime={this.state.timeSpan[0]}
                    endTime={this.state.timeSpan[1]}
                    status={this.state.tag}
                  />
                </div>
                <div>
                  <Row className='gauge'>
                    <GaugeChart data={this.state.gaugeData.wdzs} formatter={this.state.formatter.f3} id={1} />
                  </Row>
                </div>
                <div className='table'>
                  <span className='buttom_title_other'>稳定分析列表</span>
                  <div className='table_container'>
                    {/* <Table
                      dataSource={this.state.tableData1}
                      columns={this.state.columns}
                      pagination={false}
                      scroll={{ y: 260 }}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='buttom'>
              <Button ghost type="link">首页</Button>
              <Button ghost type="link">上一页</Button>
              <Button ghost type="link">暂停</Button>
              <Button ghost type="link">下一页</Button>
              <Button ghost type="link" onClick={() => this.queryHis()}>查询历史</Button>
              {/* <Button ghost icon={<SettingFilled />} type="link" /> */}
            </div>
          </div>
        </div>
      </>
    )
  }
}


