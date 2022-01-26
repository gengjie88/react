import defaultData from "./defaultData";
const adapterData =(res:any)=>{
    defaultData.status = res.status
    defaultData.mainData= res.mainData
    defaultData.lineData = res.lineData
    defaultData.scatterData = res.scatterData
    defaultData.gaugeData = res.gaugeData
    defaultData.tableData1 = res.rows
    console.log('defaultData',defaultData)
}
export default adapterData