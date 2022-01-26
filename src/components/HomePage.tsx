
import '../assets/style/HomePage.css';
import React from 'react';
import { Button, Col, DatePicker, Row } from 'antd';
import LineChart2 from './LineChart2'
import ScatterChart1 from './ScatterChart1';
import GaugeChart from './GaugeChart';
import BarChart from './BarChart';
import LineChart3 from './LineChart3';
import LineChart4 from './LineChart4';
import axios from '../tools/request';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import ScatterChart2 from './ScatterChart2';
import ScatterChart3 from './ScatterChart3';
import ScatterChart4 from './ScatterChart4';
import { Link } from 'react-router-dom';
const { RangePicker } = DatePicker;

interface AppState {
  name: string,
  formatter: any,
  lineData: any,
  lineData1: any,
  gaugeData: any,
  gaugeData1: any,
  scatterData: any,
  scatterData1: any,
  scatterData2: any,
  scatterData3: any,
  barData: any,
  action: boolean,
  teamNum: number,
  tag: any,
  desc: string,
  timeSpan: any,
  allSt: any,
}
export default class HomePage extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      name: '模式化监控系统',
      formatter: {
        f1: '\n工况模式指数',
        f2: '\n预警时间',
        f3: '\n稳定指数',
      },//仪表盘名称
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
      lineData1: {
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
      },//折线图集合2
      gaugeData: {
        gkmszs: 10,
        yjzs: 10,
        wdzs: 10
      },//仪表盘
      gaugeData1: {
        gkmszs: 10,
        yjzs: 10,
        wdzs: 10
      },//仪表盘
      scatterData: {
        data: [[0, 0]],
        x_h: 0,//高限
        x_l: 0,//低限
        y_h: 0,
        y_l: 0
      },//散点图左上角
      scatterData1: {
        data: [[0, 0]],
        x_h: 0,//高限
        x_l: 0,//低限
        y_h: 0,
        y_l: 0
      },//散点图
      scatterData2: {
        data: [[0, 0]],
        x_h: 0,//高限
        x_l: 0,//低限
        y_h: 0,
        y_l: 0
      },//散点图
      scatterData3: {
        data: [[0, 0]],
        x_h: 0,//高限
        x_l: 0,//低限
        y_h: 0,
        y_l: 0
      },//散点图
      barData: [],
      action: true,
      teamNum: 0,
      tag: 0,
      desc: '查询历史',
      timeSpan: [
        new Date().getTime() - 3600000, new Date().getTime()
      ],
      allSt: {
        status: [],
        sysStatus: 1,
        comStatus: 1,
        totalModels: 0,
        offLineModels: 0,
        alarmModels: 0,
        preAlamrModels: 0,
      }
    }

  }
  eChartsRef: any = React.createRef();



  componentDidMount() {
    this.firstQuery()
    this.queryPlantScore()
    this.queryRunSt()
    this.ref()
    let timerId = setInterval(
      () => { this.firstQuery(); this.queryPlantScore(); this.queryRunSt(); this.ref() },
      1000 * 60
    )
    this.setState({ tag: timerId })
  }
  componentWillUnmount() {
  }
  TimeSpanSet(v: any) {
    this.setState({ timeSpan: [v![0]?.format('x'), v![1]?.format('x')] })

  }
  firstQuery = () => {

    axios.post('/api/WormBox/GetModelRtData', { 'ModelName': 'PVC\\FULL' }).then((res: any) => {
      if (res.Code === 200) {
        this.setState({ scatterData: res.ResultData.scatterData })
        this.setState({ gaugeData: res.ResultData.gaugeData })
        this.setState({ lineData: res.ResultData.lineData })
      } else {
        alert(res.ResultMessage)
      }
    })
    axios.post('/api/WormBox/GetModelRtData', { 'ModelName': 'PVC\\SAFE' }).then((res: any) => {
      if (res.Code === 200) {
        this.setState({ scatterData1: res.ResultData.scatterData })
        this.setState({ scatterData2: res.ResultData.scatterData1 })
        this.setState({ scatterData3: res.ResultData.scatterData2 })

        this.setState({ gaugeData1: res.ResultData.gaugeData })
        this.setState({ lineData1: res.ResultData.lineData })
      } else {
        alert(res.ResultMessage)
      }
    })


  }
  queryPlantScore = () => {
    axios.post('/api/WormBox/GetPlantScoreRt', {
      "Plants": [
        "PVC"
      ]
    }).then((res: any) => {
      // console.log('res',)
      this.setState({ barData: res.ResultData.scores[0].scores })
      this.setState({ teamNum: res.ResultData.scores[0].shifNum })
    })
  }
  queryPlantScoreHis = () => {
    let endTime = this.state.timeSpan[1]
    axios.post('/api/WormBox/GetPlantScoreHis', {
      "Plants": [
        "PVC"
      ],
      "TimeStamp": endTime
    }).then((res: any) => {
      // console.log('res',)
      this.setState({ barData: res.ResultData.scores[0].scores })
      this.setState({ teamNum: res.ResultData.scores[0].shifNum })
    })
  }
  queryHis = () => {
    let startTime = this.state.timeSpan[0]
    let endTime = this.state.timeSpan[1]
    axios.post('/api/WormBox/GetModelHisData',
      {
        'ModelName': 'PVC\\FULL',
        "Start": startTime,
        "End": endTime
      }).then((res: any) => {
        if (res.Code === 200) {
          this.setState({ scatterData: res.ResultData.scatterData })
          this.setState({ gaugeData: res.ResultData.gaugeData })
          this.setState({ lineData: res.ResultData.lineData })
        } else {
          alert(res.ResultMessage)
        }
      })
    axios.post('/api/WormBox/GetModelHisData',
      {
        'ModelName': 'PVC\\SAFE',
        "Start": startTime,
        "End": endTime
      }).then((res: any) => {
        if (res.Code === 200) {
          this.setState({ scatterData1: res.ResultData.scatterData })
          this.setState({ scatterData2: res.ResultData.scatterData1 })
          this.setState({ scatterData3: res.ResultData.scatterData2 })
          this.setState({ gaugeData1: res.ResultData.gaugeData })
          this.setState({ lineData1: res.ResultData.lineData })
        } else {
          alert(res.ResultMessage)
        }
      })
    this.queryPlantScoreHis()
    this.queryRunStHis()
  }
  changeHisAndCur = () => {
    let action = this.state.action
    if (action) {
      //切换历史，清除更新定时器，查询历史，给按钮赋值’切换实时‘
      clearInterval(this.state.tag)
      this.queryHis()
      // this.queryPlantScoreHis()
      this.setState({ desc: '切换实时' })
      this.setState({ action: !action })
      console.log('现在是历史', this.state.action)
    } else {
      //切换实时，创建更新定时器，查下实时，给按钮赋值’查询历史‘
      this.firstQuery()
      this.queryPlantScore()
      this.ref()
      let timerId = setInterval(
        () => { this.firstQuery(); this.queryPlantScore() },
        1000 * 60
      )
      this.setState({ tag: timerId })
      this.setState({ desc: '查询历史' })
      this.setState({ action: !action })

      console.log('现在是实时', this.state.action)
    }
  }
  queryRunSt = () => {
    axios.post('/api/WormBox/GetPlantRunStatusRt', {
      "Models": [
        "PVC\\FULL"
      ],
      "Plant": "PVC"
    }).then((res: any) => {
      if (res.Code === 200) {
        this.setState({ allSt: res.ResultData })
      } else {
        alert(res.ResultMessage)
      }
    })
  }
  queryRunStHis = () => {
    let endTime = this.state.timeSpan[1]
    axios.post('/api/WormBox/GetPlantRunStatusRt', {
      "Models": [
        "PVC\\FULL"
      ],
      "Plant": "PVC",
      "TimeStamp": endTime,
    }).then((res: any) => {
      if (res.Code === 200) {
        this.setState({ allSt: res.ResultData })
      } else {
        alert(res.ResultMessage)
      }
    })
  }
  ref = () => {
    let xitongNode = document.getElementById("xitong");
    let tongxunNode = document.getElementById("tongxun");
    let yujNode = document.getElementById('yuj')
    let baojNode = document.getElementById('baoj')
    if (this.state.allSt.sysStatus !== 1) {
      xitongNode!.style.backgroundColor = "yellow";
      // animation: fade 1000ms infinite;
    } else {
      xitongNode!.style.backgroundColor = "green";
    }
    if (this.state.allSt.comStatus !== 1) {
      tongxunNode!.style.backgroundColor = "yellow";
    } else {
      tongxunNode!.style.backgroundColor = "green";
    }

    if (this.state.allSt.alarmModels !== 0) {
      // console.log('!!',this.state.allSt.alarmModels)
      yujNode!.className = 'yjc'
    } else {
      // console.log('!!',this.state.allSt.alarmModels)

      yujNode!.className = 'yj'
    }
    if (this.state.allSt.preAlamrModels !== 0) {
      console.log('!!',this.state.allSt.preAlamrModels)
      baojNode!.className = 'bjc'
    } else {
      console.log('!!',this.state.allSt.preAlamrModels)
      baojNode!.className = 'bj'

    }
  }
  render() {
    return (
      <>
        <div className='screen-wrapper' >
          <div className="screen1" id="screen">
            <Row className='RowTitle'>
              <Col span={8}></Col>
              <Col span={8}>
                <span className='span_title'>{this.state.name}</span>
              </Col>
              <Col span={8}></Col>
            </Row>
            <div className='content'>
              <Row className='top'>
                <Col className='qlc' span={7} >
                  <Row className='title_1'>
                    <div className='text'>全流程</div>
                  </Row>
                  <Row className='cintent_1'>
                    <Col span={10}>
                      <div className='scatter_container3' id=''>
                        <div className='scatter_container4' id=''>
                          <ScatterChart1
                            x_h={this.state.scatterData.x_h}
                            x_l={this.state.scatterData.x_l}
                            y_l={this.state.scatterData.y_l}
                            y_h={this.state.scatterData.y_h}
                            color={[
                              "#BABAFE",
                              "#00001C",
                              "#006ADB",
                              "#6A6AD2",
                              "#C8C8C8",
                            ]}
                            size={8}
                            data={this.state.scatterData.data}
                          />
                        </div>
                      </div>

                    </Col>
                    <Col span={14}>
                      <LineChart2
                        x1={this.state.lineData.Line1.value}
                        x2={this.state.lineData.Line2.value}
                        x3={this.state.lineData.Line3.value}
                        time={this.state.lineData.Line1.time}
                      />
                    </Col>
                  </Row>
                  <Row className='btm_1'>
                    <Col span={8}>
                      <GaugeChart
                        data={this.state.gaugeData.gkmszs}
                        formatter={this.state.formatter.f1}
                        id={1}
                      />
                    </Col>
                    <Col span={8}>
                      <GaugeChart
                        data={this.state.gaugeData.yjzs}
                        formatter={this.state.formatter.f2}
                        id={0}
                      />
                    </Col>
                    <Col span={8}>
                      <GaugeChart
                        data={this.state.gaugeData.wdzs}
                        formatter={this.state.formatter.f3}
                        id={1}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col className='yxmt' span={10} >
                  <Row className='title_1'>
                    <Col span={4} offset={3}>
                      <div className='text'>运行模态</div>
                    </Col>
                    <Col span={12} offset={5} className='mx'>
                      <Row className='span'>
                        <span className='mxzl'></span>
                        <span className='lx'></span>
                        <span className='zc'></span>
                        <span className='yj' id='yuj'></span>
                        <span className='bj' id='baoj'></span>
                      </Row>
                      <Row className='wenzi'>
                        <span className="wenzi1">总量</span>
                        <span className="wenzi1">离线</span>
                        <span className="wenzi1">正常</span>
                        <span className="wenzi1">预警</span>
                        <span className="wenzi1">报警</span>
                      </Row>
                      <Row className='wenzi3'>
                        <span className="wenzi2">{this.state.allSt.totalModels}</span>
                        <span className="wenzi2">{this.state.allSt.offLineModels}</span>
                        <span className="wenzi2">{this.state.allSt.totalModels - this.state.allSt.offLineModels - this.state.allSt.alarmModels - this.state.allSt.preAlamrModels}</span>
                        <span className="wenzi2">{this.state.allSt.alarmModels}</span>
                        <span className="wenzi2">{this.state.allSt.preAlamrModels}</span>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Row className='st'>
                      <Col span={6} offset={18} className='stc'>
                        <div>
                          <span className='wenzi1'>系统状态：</span>
                          <div className="xiaoyuandian" id="xitong"></div>
                          <br />
                          <span className='wenzi1'>通讯状态：</span>
                          <div className="xiaoyuandian" id="tongxun"></div>
                        </div>
                      </Col>
                    </Row>
                  </Row>
                </Col>
                <Col className='yxpg' span={7} >
                  <Row className='title_3'>
                    <div className='text'>运行评估</div>
                    <div className='banzu'>当前班组：{this.state.teamNum}班</div>
                  </Row>
                  <Row className='content_3'>
                    <BarChart
                      data={this.state.barData} />
                  </Row>
                  <Row className='btm_3'></Row>
                </Col>
              </Row>
              <Row className='mid' >
                <Col span={6} >
                  <LineChart3
                    x1={this.state.lineData1.Line1.value}
                    x2={this.state.lineData1.Line2.value}
                    time={this.state.lineData1.Line1.time}
                  />
                </Col>
                <Col span={2} className='mid_30'>
                  <Row>
                    <GaugeChart
                      data={this.state.gaugeData1.gkmszs}
                      formatter={this.state.formatter.f1}
                      id={1}
                    />
                  </Row>
                  <Row>
                    <GaugeChart
                      data={this.state.gaugeData1.yjzs}
                      formatter={this.state.formatter.f2}
                      id={0}
                    />
                  </Row>
                </Col>
                <Col span={8} className='TC'>
                  <div className='leftC'>
                    <ScatterChart3
                      x_h={this.state.scatterData2.x_h}
                      x_l={this.state.scatterData2.x_l}
                      y_l={this.state.scatterData2.y_l}
                      y_h={this.state.scatterData2.y_h}
                      color={[
                        "#BABAFE",
                        "#00001C",
                        "#006ADB",
                        "#6A6AD2",
                        "#C8C8C8",
                              "#C8C8C8", 
                        "#C8C8C8",
                      ]}
                      size={8}
                      data={this.state.scatterData2.data}
                    />
                  </div>
                  <div className='mainC'>
                    <ScatterChart2
                      x_h={this.state.scatterData1.x_h}
                      x_l={this.state.scatterData1.x_l}
                      y_l={this.state.scatterData1.y_l}
                      y_h={this.state.scatterData1.y_h}
                      color={[
                        "#BABAFE",
                        "#00001C",
                        "#006ADB",
                        "#6A6AD2",
                        "#C8C8C8",
                              "#C8C8C8", 
                        "#C8C8C8",
                      ]}
                      size={8}
                      data={this.state.scatterData1.data}
                    />
                  </div>
                  <div className='topC'>
                    <ScatterChart4
                      x_h={this.state.scatterData3.x_h}
                      x_l={this.state.scatterData3.x_l}
                      y_l={this.state.scatterData3.y_l}
                      y_h={this.state.scatterData3.y_h}
                      color={[
                        "#BABAFE",
                        "#00001C",
                        "#006ADB",
                        "#6A6AD2",
                        "#C8C8C8",
                              "#C8C8C8", 
                        "#C8C8C8",
                      ]}
                      size={8}
                      data={this.state.scatterData3.data}
                    />
                  </div>
                </Col>
                <Col span={2} className='mid_100'>
                  <GaugeChart
                    data={this.state.gaugeData1.wdzs}
                    formatter={this.state.formatter.f3}
                    id={0}
                  />
                </Col>
                <Col span={6}>
                  <LineChart4
                    x={this.state.lineData1.Line3.value}
                    time={this.state.lineData1.Line3.time}
                  />
                </Col>

              </Row>
              <Row className='btm'>
                <div className='picker_container'>
                  {!this.state.action ? (
                    <><RangePicker
                      onChange={(v) => this.TimeSpanSet(v)}
                      showTime
                      showNow
                      defaultValue={[moment(new Date(), 'YYYY-MM-DD'), moment(new Date(), 'YYYY-MM-DD')]} /><Button type="primary" icon={<SearchOutlined />} onClick={() => this.queryHis()}>查询</Button></>
                  ) : []}

                </div>
                <div className='buttomGp'>
                  <Button ghost >首页</Button>
                  <Link to={{pathname:'/about'}}  >上一页</Link>
                  <Button ghost >暂停</Button>
                  <Button ghost >下一页</Button>
                  <Button ghost onClick={() => this.changeHisAndCur()}>{this.state.desc}</Button>
                </div>
              </Row>
            </div>

          </div>
        </div>
      </>
    )
  }
}