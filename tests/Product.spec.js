import { test, expect,request } from "@playwright/test";
import { Product } from "../PAGES/Product.page";
import { ProductAPI } from "../API/ProductAPI.api";
import { productData } from "../DATAs/product.data";
import Ajv from "ajv";
import SingleProduct from "../SCHEMAS/SingleProduct.json";
import InvalidSingleproduct from "../SCHEMAS/InvalidSingleproduct.json";


test.describe("Product  Functionality", () => {
    let productAPI;
    test.beforeAll(async () => {
        const context = await request.newContext();
        productAPI = new ProductAPI(context);

    })


    test("OutOfStock disability check", async ({ page }) => {
        const ProductPOM = new Product(page, expect);
        //frontend
        await ProductPOM.openpage();
        await ProductPOM.OutOfStockDisability();

        //backend
        productData.forEach(async(data) => {
            const response = await productAPI.GetSingleProduct(data.productId);
            const responseBody = await response.json();
            const ajv = new Ajv();
            if(response.status()==200){
                  await ProductPOM.BackendValidation(response.status(), responseBody, ajv, SingleProduct);
            }else{
                      await ProductPOM.BackendValidation(response.status(), responseBody, ajv, InvalidSingleproduct);
           
            }
          
        })

    })

    test("Add to cart Button should be enabled",async({page})=>{
        const ProductPOM = new Product(page, expect);
        await ProductPOM.openpage();
        await ProductPOM.AddToCartActive();
    });

    test("Addtocart must add item to cart",async({page})=>{
        const ProductPOM = new Product(page, expect);
        await ProductPOM.openpage();
        await ProductPOM.ValidateCartitems();
    })

  
})