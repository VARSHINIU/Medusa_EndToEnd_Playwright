import {test,expect} from "@playwright/test";
import {Register} from "../PAGES/Register.page";
import {userregister} from "../DATAs/Register.data";
import { faker } from '@faker-js/faker';

test.describe("Registration Validations",()=>{
    test("URL_Validation",async({page})=>{
        const RegisterPOM=new Register(page,expect)
        await RegisterPOM.open();
        await RegisterPOM.URL_Validation();  
    })

userregister.forEach((data, index) => {
    test(`Registration Test #${index} | valid=${data.valid}`, async ({ page }) => {
        const RegisterPOM = new Register(page, expect);
        await RegisterPOM.open();
        if (data.firstName === "RANDOM") {
            data.firstName = faker.person.firstName();
        }
        if (data.lastName === "RANDOM") {
            data.lastName = faker.person.lastName();
        }
        if (data.email === "RANDOM_MAIL") {
            data.email = faker.internet.email();
        }
        await RegisterPOM.Register_Functionality(
            data.firstName,
            data.lastName,
            data.email,
            data.phone,
            data.password,
            data.valid
        );
    });
});
})