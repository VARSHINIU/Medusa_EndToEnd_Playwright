import { error } from "node:console";

export class Store {
    constructor(page,expect){
        this.page=page,
        this.expect=expect,
        this.ProductImageList='//div[@data-testid="product-wrapper"]/descendant::img',
        this.ProductNameList='//p[@data-testid="product-title"]',
        this.ProductPrceList='//p[@data-testid="price"]'
    }

    async open(){
        await this.page.goto("/store");
        await this.page.waitForLoadState("load");
    }
    async URL_Validation() {
        await this.expect(this.page).toHaveURL(/.*\/store/)
    } 

    async ProductDetailsVisibility(){
        const Images = await this.page.locator(this.ProductImageList);
        const names=await this.page.locator(this.ProductNameList);
        const prices=await this.page.locator(this.ProductPrceList);

        const count = await Images.count();

            for (let i = 0; i < count; i++) {
                const ImageValue = Images.nth(i);
                const nameValue = names.nth(i);
                const priceValue = prices.nth(i);

                await this.expect(ImageValue).toBeVisible();
                await this.expect(nameValue).toBeVisible();
                await this.expect(priceValue).toBeVisible();
             }
    }

    async backendValidation(statuscode, ActualBody,ajv,schema){
        if(statuscode == 200){
             const validate = ajv.compile(schema);
             const isValid = validate(ActualBody);
              if (!isValid) {
                    console.error('Schema validation errors:', validate.errors);
                }
                await this.expect(isValid).toBe(true);
        }else{
            throw new error("Backend response code for Get all products= ",statuscode)
        }
    }

    async DBProductExists(client , responseBody){
        const Images = await this.page.locator(this.ProductImageList);
        const count = await Images.count();

        for(let i=0;i<count;i++){
            const result = await client.query(
                'SELECT * FROM product WHERE title=$1',[responseBody.products[i].title]
                );
                await this.expect(result.rowCount).toBe(1);
        }
                
            
    }
   
}