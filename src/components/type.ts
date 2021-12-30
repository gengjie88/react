// 给props添加类型检查
export interface IProps {
    title: string,          //图表的标题（为string类型）
    x1:number[],
    x2:number[],
}
export interface scatterProps {
    size:number,
    data:Array<number[]>
    color:Array<string>
}
export interface gaugeProps {
    data:number
}