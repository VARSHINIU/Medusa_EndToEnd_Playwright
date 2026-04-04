export class Register {
    constructor(page, expect) {
            this.page = page;
            this.expect = expect;
            this.firstname = "//input[@name='first_name']",
            this.lastname = "//input[@name='last_name']",
            this.email = "//input[@name='email']",
            this.phone = "//input[@name='phone']",
            this.password = "//input[@name='password']",
            this.joinButton = "//input[@name='password']",
            this.profileButton="//a[contains(text(),'Profile')]",
            this.error="//span[normalize-space()='Error: Identity with email already exists']"
            this.joinusButton="//button[normalize-space()='Join us']"
        }
    async open(){
        await this.page.goto("/account");
        await this.page.waitForLoadState("load");
    }
    async URL_Validation() {
        await this.page.locator(this.joinusButton).click();
        await this.expect(this.page).toHaveURL(/.*\/account/)
    }

    async Register_Functionality(fname, lname, email, phone, password, valid) {
        await this.page.locator(this.joinusButton).click();

        await this.page.waitForSelector(this.firstname,{state:"visible"})
        await this.page.locator(this.firstname).fill(fname);

        await this.page.waitForSelector(this.lastname,{state:"visible"})
        await this.page.locator(this.lastname).fill(lname);

        await this.page.waitForSelector(this.email,{state:"visible"})
        await this.page.locator(this.email).fill(email);

        await this.page.waitForSelector(this.phone,{state:"visible"})
        await this.page.locator(this.phone).fill(phone);

        await this.page.waitForSelector(this.password,{state:"visible"})
        await this.page.locator(this.password).fill(password);

        await this.page.locator(this.joinButton).click({force:true});

        if (valid) {
            await this.page.waitForTimeout(5000);
            await this.page.waitForSelector(this.profileButton,{state:"visible"})
            await this.expect(this.page.locator(this.profileButton)).toBeVisible();
        }else{
            if(!(fname)){
                const message = await this.page.locator(this.firstname)
                .evaluate(el => el.validationMessage);
                await this.expect(message).toBe("Please fill out this field.")               
            }else if(!(lname)){
                const message = await this.page.locator(this.lastname)
                .evaluate(el => el.validationMessage);
                await this.expect(message).toBe("Please fill out this field.") 
            }else if(!(email)){
                const message = await this.page.locator(this.email)
                .evaluate(el => el.validationMessage);
                await this.expect(message).toBe("Please fill out this field.") 
            }else if(!(phone)){
                const message = await this.page.locator(this.password)
                .evaluate(el => el.validationMessage);
                await this.expect(message).toBe("Please fill out this field.") 
            }else if(!(password)){
                const message = await this.page.locator(this.password)
                .evaluate(el => el.validationMessage);
                await this.expect(message).toBe("Please fill out this field.") 
            }else if(email=="john"){
                const message = await this.page.locator(this.email)
                .evaluate(el => el.validationMessage);
                await this.expect(message).toBe("Please include an '@' in the email address. 'john' is missing an '@'.") 
            }else if(password=="123"){
                  const message = await this.page.locator(this.password)
                .evaluate(el => el.validationMessage);
                await this.expect(message).toBe("Please include  numbers and special char") 
            }else{
                await this.expect(this.page.locator(this.error)).toBeVisible();
       
            }
        }


    }
}