import defaultData from "./defaultData";
import {scatterDataFormat,tableDataFormat} from './dataFormat'

const adapterData = (res:any)=>{
let newScatterData = scatterDataFormat(res)
console.log(newScatterData,'newScatterData')
    // console.log(res,'ada')
    //1.传过来的参数为没处理的数据
    //2.对参数进行处理
    //3.对默认数据进行替换
}

export default adapterData