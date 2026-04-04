import {test,expect,request} from "@playwright/test";
import {Login} from "../PAGES/Login.page";
import {userLogin} from "../DATAs/loginAPI.data";
import {LoginAPI} from "../API/LoginAPI.api";
import{connectDB, DisconnectDB,client} from "../DB/dbConnection";


test.describe("Customer Login Validations",()=>{
    let loginAPI;
    test.beforeAll(async()=>{
        const context=await request.newContext();
        loginAPI = new LoginAPI(context);
        await connectDB();
    })

    test.afterAll(async()=>{
        await DisconnectDB();
    })

    test("URL_Validation",async({page})=>{
        const LoginPOM=new Login(page,expect)
        await LoginPOM.open();
        await LoginPOM.URL_Validation();  
    })
    
    userLogin.forEach((data, index) => {
    test(`Login  Test #${index}`, async ({ page }) => {
        const LoginPOM = new Login(page, expect);
        await LoginPOM.open();
        //Frontend
        await LoginPOM.login_functionality(data.email,data.password);

        //backend
        const response = await loginAPI.UserLogin(data.payload);
        const responseBody = await response.json();
        await LoginPOM.backendValidationResponse(response.status(),responseBody,data.expectedBody,data.expectedSchema)

        //database
        await LoginPOM.DBuserexists(client,data.email)
    });
});
})