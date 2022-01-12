import defaultData from "./defaultData";
import {scatterDataFormat,tableDataFormat} from './dataFormat'

const adapterCurData = (res:any)=>{
 
// 0    曲线1
// 1    曲线2
// 2    曲线3
// 0    仪表盘1
// 1    仪表盘2
// 2    仪表盘3
// 6    散点图1值
// 7    散点图1低限        散点图值2
// 8    散点图1高限        表格1数据/关键数据
// 9    散点图2值          表格2数据/关键数据
// 10   散点图2低限
// 11   散点图2高限
// 12   表格1数据/关键数据
// 13   表格2数据/关键数据

   
// 对折线图的实时数据进行适配
    let lineArray1 = defaultData.lineData1.x1;
    let lineArray2 = defaultData.lineData1.x2;
    let lineArray3 = defaultData.lineData2.x;
    if(lineArray1.length === 7 || lineArray2.length === 7 || lineArray3.length === 7){
        lineArray1.shift();
        lineArray1.push(res[0]);
        lineArray2.shift();
        lineArray2.push(res[1]);
        lineArray3.shift();
        lineArray3.push(res[2]);
    }
    defaultData.lineData1.x1 = lineArray1
    defaultData.lineData1.x2 = lineArray2
    defaultData.lineData2.x = lineArray3

    //对仪表盘实时数据进行适配
    defaultData.gaugeData.gkmszs = res[0]
    defaultData.gaugeData.yjzs = res[1]
    defaultData.gaugeData.wdzs = res[2]

    //对散点图实时数据进行适配
    //先适配上下限
    defaultData.scatterData.x_h = res[8]
    defaultData.scatterData.x_l = res[7]
    defaultData.scatterData.y_h = res[11]
    defaultData.scatterData.y_l = res[10]
    let x = res[6]
    let y = res[9]
    let arr = [x,y]
    if(defaultData.scatterData.data.length < defaultData.num){
        defaultData.scatterData.data.push(arr)
    }else{
        defaultData.scatterData.data.shift()
        defaultData.scatterData.data.push(arr)
    }

    //适配关键数据
    defaultData.mainData.d1 = res[12]
    defaultData.mainData.d2 = res[13]
    

    
    

    //1.传过来的参数为没处理的数据
    //2.对参数进行处理
    //3.对默认数据进行替换
}

export default adapterCurData