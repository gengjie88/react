const data = {
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
const goOhterPage=(name:string)=>{
    if(name === 'qlc')
        return {...data,title:'全流程'}
    if(name === 'sxhxt')
        return {...data,title:'水循环系统'}
}

export default goOhterPage