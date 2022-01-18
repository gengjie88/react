
const setBgImg=(res:any,id:number)=>{
    console.log('res',res)
    console.log('res',id)
    let cl: any = []
    for (let index = 0; index < res.length; index++) {
        const i = res[index];
        if (i === 0) {
            cl.push('scatter_container')
        }
        if (i === 1) {
            cl.push('scatter_container_yellow ')
        }
        if (i === 2) {
            cl.push('scatter_container_red')
        }
        if (i === 3) {
            cl.push('scatter_container_gray ')
        }

    }
    return cl
}
export default setBgImg