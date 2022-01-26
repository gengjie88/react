export interface LineProps {
    x1:number[],
    x2:number[],
    time:any
}
export interface LineProps2 {
    x1:number[],
    x2:number[],
    x3:number[],
    time:any
}
export interface LineProps1 {
    x:number[],
    time:any
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
export interface scatterProps1 {
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
export interface barProps {
    data:number[],
   
}