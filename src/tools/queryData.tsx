

import axios from './request'

const queryData=(tag:number,data:any)=>{
    let url = '/api/DbComm/GetData'
        if(tag === 0){
            url = '/api/DbComm/GetHisData'
        }
  

        //TODO   0.判断请求的处理类型
        //        1.折线图实时（单点push进数组）
        //        2.历史（查7个点，新的进旧的出）
        //        3.散点图实时（新的进旧的出，根据散点图显示最大点数）
        //        4.散点图历史（需要dataformatter处理）
        //        5.仪表盘历史（以endtime为准）

    return new Promise(async (resolve,rejects)=>{
      const res =  axios.post(url,data)
      if((await res).status === 200){
          console.log(res,'query')
          resolve ((await res).data)
      }
    })

}

export default queryData