export class ProductAPI{
    constructor(request){
        this.request = request;
    }

    async GetSingleProduct(productID){
        return await this.request.get(`${process.env.API_BASEURL}/store/products/${productID}`,
            {
                    headers:{"Content-Type":"application/json"},
                    headers:{"x-publishable-api-key":`${process.env.API_KEY}`}
            }
        )
    }
}