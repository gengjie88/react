const defaultData = {
    name:'淮河化工模式化监控',//项目名称
    title:'xx',//模型名称
    formatter:{
        f1: '\n\n工况模式指数',
        f2: '\n\n预警时间',
        f3: '\n\n稳定指数',
    },//仪表盘名称
    size:10,//散点大小
    color: [
        "rgba(128, 128, 128, 0.7)",
        "rgba(255, 0, 0, 1)",
        "rgba(255, 242, 0, 1)",
        "rgba(25, 5, 247, 1)"
    ], //散点图展示点的默认颜色
    tag:0,//标记,定时器id，为0为历史，不为0为实时
    lineData1:{
        x1:[],
        x2:[]
    },//折线图1
    lineData2:{
        x:[]
    },//折线图2
    gaugeData:{
        gkmszs:0,
        yjsj:0,
        wdzs:0
    },//仪表盘
    scatterData:{
        data:[],
        x_h:0,//高限
        x_l:0,//低限
        y_h:0,
        y_l:0
    },//散点图
    mainData:{
        d1:0,
        d2:0            
    },//维度1、2
    tableData1:{
        //表格1
    },
    tableData2:{
        //表格2
    },
    
}
export default defaultData