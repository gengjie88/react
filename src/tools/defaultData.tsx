const defaultData = {
    name:'XXXX模式化监控',//项目名称
    id:1,
    title:'',//模型名称
    num:100,//设置散点图可以显示多少个散点
    formatter:{
        f1: '\n工况模式指数',
        f2: '\n预警时间',
        f3: '\n稳定指数',
    },//仪表盘名称
    size:15,//散点大小
    color: [
        "rgba(128, 128, 128, 0.7)",
        "rgba(255, 0, 0, 1)",
        "rgba(255, 242, 0, 1)",
        "rgba(25, 5, 247, 1)"
    ], //散点图展示点的默认颜色
    tag:1,//标记,定时器id，为0为历史，不为0为实时
    lineData:{
        Line1:{
            time:[],
            value:[]
        },
        Line2:{
            time:[],
            value:[]
        },
        Line3:{
            time:[],
            value:[]
        },
    },//折线图1

    gaugeData:{
        gkmszs:0,
        yjzs:0,
        wdzs:0
    },//仪表盘
    scatterData:{
        data:[[0,0]],
        x_h:0,//高限
        x_l:0,//低限
        y_h:0,
        y_l:0
    },//散点图
    mainData:{
        d1:0,
        d2:0            
    },//维度1、2
    tableData1:[
        // 表格1
        {
          value:'',
          key:0
        }
        
    ],
    tableData2:{ 
        //表格2
    },
    columns: [
        {
          title: '占比',
          dataIndex: 'value',
          className:'table_head',
          key: 'key',
        },
        
    ],
    timeSpan:[
      '1642539905', '1643440318'
    ],
    status:0
}
export default defaultData

