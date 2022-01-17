// "data\\line1", "data\\line2",
//  "data\\line3", "data\\gauge1", 
//  "data\\gauge2", "data\\gauge3", 
//  "data\\scatter1", "data\\scatter1.EULO",
//   "data\\scatter1.EUHI", "data\\scatter2", 
//   "data\\scatter2.EULO", "data\\scatter2.EUHI",
//  "data\\tag9", "data\\tag10"
// 1  工况模式指数  QXL1\R1301_ALMIND.H5
// 2  预警指数      QXL1\R1301_ALMIND.PV
// 3  稳定指数      QXL1\R1301_ALMIND.H4
//    散点图
    //  x: 维度1
    // 4  QXL1\R1301_PC1.PV   5 低限:QXL1\R1301_X2.PV   6 高限：QXL1\R1301_X1.PV
    //  y: 维度2
    // 7  QXL1\R1301_PC2.PV   8 低限：QXL1\R1301_Y2.PV  9 高限：QXL1\R1301_Y1.PV



//  10  星星状态  QXL1\R1301_STATUS.H3 0（没有），
// 1（右上），2（左上），3（左下），4（右下）- 主视图 （XY）
// 5（右上），6（左上），7（左下），8（右下）- 俯视图 （XZ）
// 9（右上），10（左上），11（左下），12（右下）- 侧视图 （YZ）

// 模型状态  QXL1\R1301_STATUS.PV 0 运行无报警（绿），1 运行有预警（黄），2 运行有报警（红） 3 非运行状态 （灰）
const requestData = (name:any)=>{
    let str = `${name}_ALMIND.H5,${name}_ALMIND.PV,${name}_ALMIND.H4,${name}_PC1.PV,${name}_X2.PV,${name}_X1.PV,${name}_PC2.PV,${name}_Y2.PV,${name}_Y1.PV,${name}_STATUS.H3`
    let arr = str.split(",")
    // console.log(arr)
    arr.forEach(i=>{
       // console.log(i)
    })
    return arr 
}
// requestData('QXL1\\R1301')

export default requestData