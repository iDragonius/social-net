import moment from "moment"

export default function time (date) {
    const data  = date.split('-')
    const year =parseInt(data[2])
    const month =parseInt(data[0])
    const day =parseInt(data[1])
    const hour =parseInt(data[3])
    const minute =parseInt(data[4])
    const second =parseInt(data[5])
    const dateNow = moment().format('MM-DD-YYYY-HH-mm-ss')
    const dataNow  = dateNow.split('-')
    const yearNow =parseInt(dataNow[2])
    const monthNow =parseInt(dataNow[0])
    const dayNow =parseInt(dataNow[1])
    const hourNow =parseInt(dataNow[3])
    const minuteNow =parseInt(dataNow[4])
    const secondNow =parseInt(dataNow[5])
    const time = second + minute*60 + hour*60*60 + day*24*60*60 + month*30*24*60*60 + year*12*30*24*60*60
    const timeNow = secondNow + minuteNow*60 + hourNow*60*60 + dayNow*24*60*60 + monthNow*30*24*60*60 + yearNow*12*30*24*60*60
    if(timeNow-time <60){
      return 'Now'
    }
    if(timeNow-time >59 && timeNow-time<3600 ){
      if(minuteNow < minute){
        return `${minuteNow - minute+60} minutes ago`
      }else{
        return `${minuteNow - minute} minutes ago`
      }
      
    }
    if(timeNow-time > 3599 && timeNow-time < 3600*6 ){
      if(hourNow <hour){
        return `${hourNow -hour+24} hours ago`
      } else{
        return `${hourNow -hour} hours ago`
      }
    }
    if(timeNow-time > 3600*6 && dayNow - day ===0 ){
      return `Today at ${data[3]}:${data[4]}`
    }
    if(timeNow-time > 3600*6 && dayNow - day ===1 ){
      return `Yesterday at ${data[3]}:${data[4]}`
    }
    if(timeNow-time > 3600*24){
      if(dayNow-day<0){
        return `${dayNow - day +30} days ago`

      }
      return `${dayNow - day} days ago`
    }
}