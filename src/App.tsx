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
import { SearchOutlined } from '@ant-design/icons';
import axios from './tools/request';
import moment from 'moment';
import statusToColor from './tools/statusToColor';
import statusXX from './tools/statusXX';
import pageCfg from './tools/pageCfg'
import { Link } from 'react-router-dom';





const { RangePicker } = DatePicker;



interface AppState {
  name: string,
  title: string,
  formatter: any,
  size: number,
  color: Array<string>,
  tag: any,
  lineData: any
  gaugeData: any,
  scatterData: any,
  mainData: any,
  tableData1: any,
  tableData2: any,
  columns: any,
  timeSpan: any,
  id: number,
  num: number,
  status: number,
  action: boolean,
  desc: string
}


export default class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      name: 'XXXX模式化监控',//项目名称
      id: 1,
      title: '',//模型名称
      num: 100,//设置散点图可以显示多少个散点
      formatter: {
        f1: '\n工况模式指数',
        f2: '\n预警时间',
        f3: '\n稳定指数',
      },//仪表盘名称
      size: 10,//散点大小
      color: [
        "#BABAFE",
        "#00001C",
        "#006ADB",
        "#6A6AD2",
        "#C8C8C8",
      ], //散点图展示点的默认颜色
      tag: 1,//标记,更新定时器id
      desc: '查询历史',//按钮名称
      action: true,// true为实时，false为历史
      lineData: {
        Line1: {
          time: [0],
          value: [0]
        },
        Line2: {
          time: [0],
          value: [0]
        },
        Line3: {
          time: [0],
          value: [0]
        },
      },//折线图1

      gaugeData: {
        gkmszs: 0,
        yjzs: 0,
        wdzs: 0
      },//仪表盘
      scatterData: {
        data: [[0, 0]],
        x_h: 0,//高限
        x_l: 0,//低限
        y_h: 0,
        y_l: 0
      },//散点图
      mainData: {
        d1: 0,
        d2: 0
      },//维度1、2
      tableData1: [
        // 表格1
        {
          value: '',
          key: 0
        }

      ],
      tableData2: {
        //表格2
      },
      columns: [
        {
          title: '占比-------当前值-----------描述',
          dataIndex: 'value',
          className: 'table_head',
          key: 'key',
        },

      ],
      timeSpan: [
        new Date().getTime() - 3600000, new Date().getTime()
      ],
      status: 0

    }
    // this.testclick = this.testclick.bind(this)
  }
  eChartsRef: any = React.createRef();



  componentDidMount() {
    this.firstQuery(1)
    this.allModelStatus()
    let timerId = setInterval(
      () => this.firstQuery(1),
      1000 * 60
    )
    this.setState({ tag: timerId })
  }
  componentWillUnmount() {
    clearInterval(this.state.tag);
  }
  TimeSpanSet(v: any) {
    this.setState({ timeSpan: [v![0]?.format('x'), v![1]?.format('x')] })
    // console.log('v', this.state.timeSpan)
  }
  queryHis(id: number) {
    let data = pageCfg()[id - 1]

    let startTime = this.state.timeSpan[0]
    let endTime = this.state.timeSpan[1]
    axios.post('/api/WormBox/GetModelHisData',
      {
        'ModelName': data.queryTag,
        "Start": startTime,
        "End": endTime
      }).then((res: any) => {
        if (res.Code === 200) {
          // let newObj = this.state
          this.setState({ mainData: res.ResultData.mainData })
          this.setState({ scatterData: res.ResultData.scatterData })
          this.setState({ gaugeData: res.ResultData.gaugeData })
          this.setState({ title: data.title })
          this.setState({ tableData1: res.ResultData.tableData1.rows })
          this.setState({ lineData: res.ResultData.lineData })
          this.setState({ status: res.ResultData.status })
          console.log('status', this.state.status)
          this.modelStatus()
        } else {
          console.log(res.ResultMessage)
        }
      })



  }

  firstQuery = (id: number) => {
    let data = pageCfg()[id - 1]
    axios.post('/api/WormBox/GetModelRtData', { 'ModelName': data.queryTag }).then((res: any) => {
      if (res.Code === 200) {
        this.setState({ mainData: res.ResultData.mainData })
        this.setState({ scatterData: res.ResultData.scatterData })
        this.setState({ gaugeData: res.ResultData.gaugeData })
        this.setState({ title: data.title })
        this.setState({ tableData1: res.ResultData.tableData1.rows })
        this.setState({ lineData: res.ResultData.lineData })
        this.setState({ status: res.ResultData.status })
        this.modelStatus()
      } else {
        alert(res.ResultMessage)
      }
    })
  }
  modelStatus = () => {
    let bgImg = document.getElementById('scatter_container')
    switch (this.state.status) {
      case 0:
        bgImg!.className = 'scatter_container'
        break;
      case 1:
        bgImg!.className = 'scatter_container_yellow '
        break;
      case 2:
        bgImg!.className = 'scatter_container_red'
        break;
      case 3:
        bgImg!.className = 'scatter_container_gray'
        break;
    }
    const ele1 = document.getElementById('tag_1')
    const ele2 = document.getElementById('tag_2')
    const ele3 = document.getElementById('tag_3')
    const ele4 = document.getElementById('tag_4')
    statusXX(this.state.status, [ele1, ele2, ele3, ele4])
  }
  changeHisAndCur = () => {
    let action = this.state.action
    if (action) {
      //切换历史，清除更新定时器，查询历史，给按钮赋值’切换实时‘
      clearInterval(this.state.tag)
      this.queryHis(this.state.id)
      this.setState({ desc: '切换实时' })
      this.setState({ action: !action })
      console.log('现在是历史', this.state.action)
    } else {
      //切换实时，创建更新定时器，查下实时，给按钮赋值’查询历史‘
      this.firstQuery(this.state.id)
      let timerId = setInterval(
        () => this.firstQuery(this.state.id),
        1000 * 60
      )
      this.setState({ tag: timerId })
      this.setState({ desc: '查询历史' })
      this.setState({ action: !action })

      console.log('现在是实时', this.state.action)
    }
  }
  goOtherPage = (id: number) => {
    if (this.state.action) {
      this.firstQuery(id)
    } else {
      this.queryHis(id)
    }
  }
  allModelStatus = () => {
    axios.post('/api/WormBox/GetAllModelStatus', { Models: ['PVC\\YQQG', 'PVC\\YQQG', 'PVC\\JLDT', 'PVC\\DTCC', 'PVC\\VCMQG'] }).then((res: any) => {
      // console.log(res)
      let colorList = statusToColor(res.ResultData.Status)
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
    }

    )
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
                      <div><Tag color="#f50">维度1:{this.state.mainData.d1.toFixed(2)}</Tag></div><br />
                      <div><Tag color="#f50">维度2:{this.state.mainData.d2.toFixed(2)}</Tag></div>
                    </div>
                    <div className='button_group'>
                      <div ><Button className='btn_1' id='1' onClick={() => this.goOtherPage(1)} >乙醛气柜</Button></div>
                      <div><Button className='btn_1' id='2' onClick={() => this.goOtherPage(2)}>精馏高塔</Button></div>
                      <div><Button className='btn_1' id='3' onClick={() => this.goOtherPage(3)}>精馏低塔</Button></div>
                      <div><Button className='btn_1' id='4' onClick={() => this.goOtherPage(4)}>DTCC</Button></div>
                      <div><Button className='btn_1' id='4' onClick={() => this.goOtherPage(5)}>VCMQG</Button></div>
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
                        {!this.state.action ? (
                          <><RangePicker
                            onChange={(v) => this.TimeSpanSet(v)}
                            showTime
                            showNow
                            defaultValue={[moment(new Date(), 'YYYY-MM-DD'), moment(new Date(), 'YYYY-MM-DD')]} /><Button type="primary" icon={<SearchOutlined />} onClick={() => this.queryHis(this.state.id)}>查询</Button></>
                        ) : []}

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
                    x1={this.state.lineData.Line1.value}
                    x2={this.state.lineData.Line2.value}
                    time={this.state.lineData.Line1.time}
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
                    x={this.state.lineData.Line2.value}
                    time={this.state.lineData.Line2.time}
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
                    <Table
                      dataSource={this.state.tableData1}
                      columns={this.state.columns}
                      pagination={false}
                      scroll={{ y: 260 }}
                    // rowKey={i=>i.value}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='buttom'>
              <Link to={'/'}  >上一页</Link>
              <Button ghost >上一页</Button>
              <Button ghost >暂停</Button>
              <Button ghost >下一页</Button>
              <Button ghost onClick={() => this.changeHisAndCur()}>{this.state.desc}</Button>

            </div>
          </div>
        </div>
      </>
    )
  }
}


