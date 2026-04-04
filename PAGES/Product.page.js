

export class Product{
    constructor(page,expect){
        this.page=page,
        this.expect=expect,
        this.FirstProduct="//p[normalize-space()='Medusa Sweatshirt']",
        this.OutOfStockBtn="//button[normalize-space()='Out of stock']",
        this.Msize="//button[normalize-space()='M']",
        this.AddToCart="//button[normalize-space()='Add to cart']",
        this.cart="//a[normalize-space()='Cart (1)']",
        this.cartitem='//tbody[@class="border-ui-border-base border-b"]/child::tr'
    }

    async   openpage(){
        await this.page.goto("/store");
        await this.page.waitForLoadState("load");
        await this.page.locator(this.FirstProduct).click();
         await this.page.waitForLoadState("load");
    
    }
    async OutOfStockDisability(){
        await this.expect(this.page).toHaveURL(/.*\/sweatshirt/)
        await this.expect(this.page.locator(this.OutOfStockBtn)).toBeDisabled(); 
    }

    async BackendValidation(statusCode,ActualBody,ajv,schema){
        if(statusCode==200){
            const validate = ajv.compile(schema);
             const isValid = validate(ActualBody);
              if (!isValid) {
                    console.error('Schema validation errors:', validate.errors);
                }
                await this.expect(isValid).toBe(true);
       
        }else{
            await this.expect(statusCode).toBe(404);
            const validate = ajv.compile(schema);
             const isValid = validate(ActualBody);
              if (!isValid) {
                    console.error('Schema validation errors:', validate.errors);
                }
                await this.expect(isValid).toBe(true);
       
        }

    }

    async AddToCartActive(){
        await this.page.locator(this.Msize).click();
        await this.expect(this.page.locator(this.AddToCart)).toBeEnabled();
    }

    async ValidateCartitems(){
         await this.page.locator(this.Msize).click();
         await this.page.locator(this.AddToCart).click();
        await this.page.locator(this.cart).click();
        await this.page.waitForLoadState("load");
        await this.expect(this.page.locator(this.cartitem)).toHaveCount(1);
        
    }

}