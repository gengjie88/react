import defaultData from "./defaultData";
import {scatterDataFormat,tableDataFormat} from './dataFormat'

const adapterCurData = (res:any)=>{
 


   
// 对折线图的实时数据进行适配
    let lineArray1 = defaultData.lineData1.x1;
    let lineArray2 = defaultData.lineData1.x2;
    let lineArray3 = defaultData.lineData2.x;
    if(lineArray1.length === 11 || lineArray2.length === 11 || lineArray3.length === 11){
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
    defaultData.scatterData.x_h = res[5]
    defaultData.scatterData.x_l = res[4]
    defaultData.scatterData.y_h = res[8]
    defaultData.scatterData.y_l = res[7]
    let x = res[3]
    let y = res[6]
    let arr = [x,y]
    if(defaultData.scatterData.data.length < defaultData.num){
        defaultData.scatterData.data.push(arr)
    }else{
        defaultData.scatterData.data.shift()
        defaultData.scatterData.data.push(arr)
    }

    //适配关键数据
    defaultData.mainData.d1 = res[3]
    defaultData.mainData.d2 = res[6]
    

    
    

    //1.传过来的参数为没处理的数据
    //2.对参数进行处理
    //3.对默认数据进行替换
}

export default adapterCurData