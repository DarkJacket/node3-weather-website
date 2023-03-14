const request=require('request')

const geocode=(address,callback)=>{
    const url='http://api.positionstack.com/v1/forward?access_key=b0cb48e26a5ae96b8ba322303e2d6e01&query='+encodeURIComponent(address)+'&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error) 
        {
            callback('Unable to contact GeoLocation services!')
        }
        else if(body.error||!body.data[0])
        {
            callback('Unable to find location! Try new location.')
        }
        else
        {
            callback(undefined,{
                latitude:body.data[0].latitude,
                longitude:body.data[0].longitude,
                location:body.data[0].name
                
            })
        }
    })
}

module.exports=geocode