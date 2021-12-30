const calMax = (arr:Array<number>)=>{
    let max = Math.max(...arr);
    let maxint = Math.ceil(max / 9.5); // 不让最高的值超过最上面的刻度
    let maxval = maxint * 10; // 让显示的刻度是整数

    // 为了防止数据为0时，Y轴不显示，给个最大值
    if (maxval === 0) {
        maxval = 1;
    }
    return maxval;
} //计算折线图y轴最大值，用于多条y轴合并

const calMin = (arr:Array<number>)=>{
    let min = Math.min(...arr);
    let minint = Math.floor(min / 10);
    let minval = minint * 10; //让显示的刻度是整数
    return minval;
} //计算折线图y轴最小值，用于多条y轴合并

const scatterDataFormat=(arr:Array<string>) =>{
    //将后台取到的数据进行处理
    let x = arr[0];
    let y = arr[1];
    let newArr = [];
    let length = x.length;
    for (let index = 0; index < length; index++) {
        let i = [x[index], y[index]];
        newArr.push(i);
    }
    return newArr;
} //用于处理散点图数据的函数

const tableDataFormat=(arr:Array<string>, t:number) => {
    let tableData = []
    if (t === 0) {
        tableData = [];
        for (let o = 0; o <= arr.length - 3; o += 3) {
            let obj = {
                col1: arr[o],
                col2: arr[o + 1],
                col3: arr[o + 2],
            };
            tableData.push(obj);
        }
    } else {
        tableData = [];
        let arr1 = arr[0];
        for (let index = 0; index < arr.length; index += 3) {
            for (let i = 0; i < arr1.length; i++) {
                let x = {
                    col1: `tag1`,
                    col2: arr[index][i],
                    col3: "测试点1",
                };
                let y = {
                    col1: `tag2`,
                    col2: arr[index + 1][i],
                    col3: "测试点2",
                };
                let z = {
                    col1: `tag3`,
                    col2: arr[index + 2][i],
                    col3: "测试点3",
                };
                tableData.push(x);
                tableData.push(y);
                tableData.push(z);
            }
        }
    }

    return tableData;
} //用于处理表格数据的函数

export  {calMin,calMax,scatterDataFormat,tableDataFormat}