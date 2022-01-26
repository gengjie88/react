import axios from './request'
import pageCfg from './pageCfg'
import adapterData from './adapterData'


const fetch =(id:number)=>{
    let data = pageCfg()[id-1].queryTag
    return new Promise(async (resolve,rejects)=>{
        const res:any =  axios.post('/api/WormBox/GetModelRtData',{'ModelName':data})
        if((await res).Code === 200){
            resolve (adapterData((await res).ResultData))
        }
      })
    // axios.post('/api/WormBox/GetModelRtData',{'ModelName':data}).then((res:any)=>{
    //     if(res.Code === 200){
    //         adapterData(res.ResultData)
    //         console.log(res.ResultData,'res')
    //     }else{
    //         console.log(res.ResultMessage)
    //     }
    // })
}





export default fetch