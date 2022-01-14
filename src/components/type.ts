export interface LineProps {
    x1:number[],
    x2:number[],
    startTime:any,
    endTime:any,
    status:number
}
export interface LineProps1 {
    x:number[],
    startTime:any,
    endTime:any,
    status:number
}
export interface scatterProps {
    size:number,
    data:Array<number[]>,
    color:Array<string>,
    x_h:number,
    x_l:number,
    y_h:number,
    y_l:number,

}
export interface gaugeProps {
    data:number,
    formatter:string,
    id:number
}