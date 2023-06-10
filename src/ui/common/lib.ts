export const dateReturn =(date:string)=>{
    const year = date.slice(0,4)
    const month = date.slice(5,7)
    const day = date.slice(8,10)
    return day+'.'+month+'.'+year
}
export const timeReturn =(date:string)=>{
    let fullDate = new Date(date)
    let hour = fullDate.getHours()<10? '0'+fullDate.getHours() : fullDate.getHours().toString()
    let min = fullDate.getMinutes()<10? '0'+fullDate.getMinutes() : fullDate.getMinutes().toString()
    return hour+':'+min
}