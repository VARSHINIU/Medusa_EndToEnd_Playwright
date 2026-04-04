import {test, expect,request} from "@playwright/test";
import {Store} from "../PAGES//Store.page";
import Ajv from "ajv";
import ListProducts from "../SCHEMAS/ListProducts.json";
import {StoreAPI} from "../API/StoreAPI.api";
import{connectDB, DisconnectDB,client} from "../DB/dbConnection";


test.describe("Store Page VAlidations",()=>{
    let storeAPI;
    test.beforeAll(async()=>{
        const context=await request.newContext();
        storeAPI = new StoreAPI(context);
        await connectDB();
    })

    test.afterAll(async()=>{
        await DisconnectDB();
    })

    test("URL Vaaldation",async({page})=>{
        const StorePOM =new Store(page,expect);
        await StorePOM.open();
        await StorePOM.URL_Validation();
    })

    test.only("Product Details",async({page})=>{
            const StorePOM =new Store(page,expect);
            //frontend
            await StorePOM.open();
            await StorePOM.ProductDetailsVisibility();

            //backend
            const response = await storeAPI.GetallProducts();
             const responseBody = await response.json();
            const ajv = new Ajv(); 
            await StorePOM.backendValidation(response.status(),responseBody,ajv,ListProducts);

            //database
              await StorePOM.DBProductExists(client,responseBody)
               
           

    })
})