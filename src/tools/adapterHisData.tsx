import defaultData from "./defaultData";
import {scatterDataFormat,tableDataFormat} from './dataFormat'
const adapterHisData = (res:any)=>{
    // let lineArray1 = defaultData.lineData1.x1;
    // let lineArray2 = defaultData.lineData1.x2;
    // let lineArray3 = defaultData.lineData2.x;
    defaultData.lineData1.x1 = res[0]
    defaultData.lineData1.x2 = res[1]
    defaultData.lineData2.x = res[2]
    // console.log(defaultData.lineData1,'line1')
    defaultData.gaugeData.gkmszs = res[0][res.length-1]
    defaultData.gaugeData.yjzs = res[1][res.length-1]
    defaultData.gaugeData.wdzs = res[2][res.length-1]

    defaultData.scatterData.data = scatterDataFormat(res)
    console.log(defaultData.scatterData.data,'scd')

    defaultData.mainData.d1 = res[8][res.length-1]
    defaultData.mainData.d2 = res[9][res.length-1]
}
export default adapterHisData