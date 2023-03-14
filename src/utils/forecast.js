const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=2924b6746dccb31d356183e4be5aeb8b&query='+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to contact forecast services!')
        }
        else if(body.error)
        {
            callback('Unable to find location for forecast')
        }
        else{
             callback(undefined,body.current.weather_descriptions+'. Temperature is '+body.current.temperature+'. Temperature feels like '+body.current.feelslike)

        }
    })
}

module.exports=forecast