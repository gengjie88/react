export interface LineProps {
    x1:number[],
    x2:number[],
}
export interface LineProps1 {
    x:number[],
}
export interface scatterProps {
    size:number,
    data:Array<number[]>
    color:Array<string>
}
export interface gaugeProps {
    data:number,
    formatter:string
}