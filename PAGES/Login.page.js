export class Login {
    constructor(page, expect) {
            this.page = page,
            this.expect = expect,
            this.emailInput = "//input[@title='Enter a valid email address.']",
            this.passwordInput = "//input[@name='password']",
            this.signin = "//button[normalize-space()='Sign in']"
            this.error = "//span[normalize-space()='Error: Invalid email or password']"
            this.profileButton = "//a[contains(text(),'Profile')]"
           
        
    }

    async open() {
        await this.page.goto("/account");
        await this.page.waitForLoadState("load");
    }

    async URL_Validation() {
        await this.expect(this.page).toHaveURL(/.*\/account/)
    }

    async login_functionality(email, password) {
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.passwordInput).fill(password);

        await this.page.locator(this.signin).click({ force: true });

        if (email && password) {
            if (email == process.env.EMAIL && password == process.env.PASSWORD) {
                await this.page.waitForTimeout(5000);
                await this.page.waitForSelector(this.profileButton, { state: "visible" })
                await this.expect(this.page.locator(this.profileButton)).toBeVisible();
            }else{
                await this.expect(this.page.locator(this.error)).toBeVisible();
            }
        }else{
            if (!email) {
                const message = await this.page.locator(this.emailInput)
                    .evaluate(el => el.validationMessage);
                await this.expect(message).toBe("Please fill out this field.")
            } else if (!password) {
                const message = await this.page.locator(this.passwordInput)
                    .evaluate(el => el.validationMessage);
                await this.expect(message).toBe("Please fill out this field.")
            }
        }
         
        }


        async validateSchema(actualResponseBody, expectedSchema) {
            const keys = Object.keys(expectedSchema);

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const expectedType = expectedSchema[key].type;
                const actualType = typeof actualResponseBody[key];

                await this.expect(actualResponseBody).toHaveProperty(key);
                await this.expect(actualType).toBe(expectedType);
            }
        }

        async validateBody(actualResponseBody, expectedBody) {
            const keys = Object.keys(expectedBody);

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const expectedValue = expectedBody[key];
                const actualValue = actualResponseBody[key];

                await this.expect(actualValue).toBe(expectedValue);
            }
        }
        async backendValidationResponse(responseStatusCode, actualResponseBody, expectedBody, expectedSchema) {

            if (responseStatusCode === 200) {
                await this.validateSchema(actualResponseBody, expectedSchema);
            } else {
                await this.validateBody(actualResponseBody, expectedBody);
                await this.validateSchema(actualResponseBody, expectedSchema);
            }
        }

        async DBuserexists(client,email){
            if(email==process.env.EMAIL){
                const result = await client.query(
                'SELECT * FROM customer WHERE email=$1',[email]
                );
                await this.expect(result.rowCount).toBe(1);
            }
            
        }

       
}