export class LoginAPI{
    constructor(request){
        this.request = request;
    }

    async UserLogin(payload){
        if(payload == null){
            return await this.request.post(`${process.env.API_BASEURL}/auth/customer/emailpass`,
                {
                    headers:{"Content-Type":"application/json"},
                    data:""
                }
            );
        }else{
           return await this.request.post(`${process.env.API_BASEURL}/auth/customer/emailpass`,
                {
                    headers:{"Content-Type":"application/json"},
                    data:payload
                }
            )
            
        }
    }
}