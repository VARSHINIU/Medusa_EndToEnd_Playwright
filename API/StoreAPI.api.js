export class StoreAPI{
    constructor(request){
        this.request = request;
    }

    async GetallProducts(){
        return await this.request.get(`${process.env.API_BASEURL}/store/products`,
            {
                    headers:{"Content-Type":"application/json"},
                    headers:{"x-publishable-api-key":`${process.env.API_KEY}`}
            }
        )
    }
}