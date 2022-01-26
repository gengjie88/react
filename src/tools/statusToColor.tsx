
const statusToColor = (code: Array<any>) => {
   
    let cl: any = []
    for (let index = 0; index < code.length; index++) {
        const i = code[index];
    
        if (i === 0) {
            cl.push('white')
        }
        if (i === 1) {
            cl.push('yellow')
        }
        if (i === 2) {
            cl.push('red')
        }
        if (i === 3) {
            cl.push('gray')
        }

    }
  
    return cl

}
export default statusToColor 