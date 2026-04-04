export const userLogin=[
    {   
        email:"john@gmail.com",
        password:"12345",
        testId:"TC_LGN-005",
        payload: 
        {
            email:"john@gmail.com",
            password:"12345"
        },
        expectedstatus:200,
        expectedBody:null,
        expectedSchema:{
            token:{type:"string"}
        }

    },
    {   
        email:"john@gmail.com",
        password:"",
        testId:"TC_LGN-002",
        payload: 
        {
            email:"john@gmail.com",
            password:""
        },
        expectedstatus:401,
        expectedBody:{
            type: "unauthorized",
            message: "Password should be a string"
        },
        expectedSchema:{
            type:{type:"string"},
            message:{type:"string"}
        }
    },
      {
        email:"",
        password:"1234",
        testId:"TC_LGN-003",
        payload: 
        {
            email:"",
            password:"12345"
        },
        expectedstatus:401,
        expectedBody:{
            type: "unauthorized",
            message: "Email should be a string"
        },
        expectedSchema:{
            type:{type:"string"},
            message:{type:"string"}
        }
    },
    {
        email:"invalid@invalid.com",
        password:"12",
        testId:"TC_LGN-004",
        payload: 
        {
            email:"invalid@invalid.com",
            password:"12345"
        },
        expectedstatus:401,
        expectedBody:{
            type: "unauthorized",
            message: "Invalid email or password"
        },
        expectedSchema:{
            type:{type:"string"},
            message:{type:"string"}
        }
    },
        {
            email:"",
            password:"",
            testId:"TC_LGN-005",
            payload: 
            {
                email:"",
                password:""
            },
            expectedstatus:401,
            expectedBody:{
                type: "unauthorized",
                message: "Password should be a string"
            },
            expectedSchema:{
                type:{type:"string"},
                message:{type:"string"}
            }
    }
]