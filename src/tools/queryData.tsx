
import axios from './request'

const queryData=(tag:number,data:any)=>{
    let url = '/api/DbComm/GetData'
        if(tag === 0){
            url = '/api/DbComm/GetHisData'
        }
    return new Promise(async (resolve,rejects)=>{
      const res =  axios.post(url,data)
      if((await res).status === 200){
          resolve ((await res).data)
      }
    })

}

export default queryData