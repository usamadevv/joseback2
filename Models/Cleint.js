

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Clientdata = new Schema({


    username: {
        type: String,

    }
    ,
    email: {
        type: String,

    }
    ,
    departments: [{

        email: {
            type: String
        },

        password: {
            type: String
        },

        dept: {
            type: String
        },
    }],
    status: {
        type: String,

    }
    ,
    markup: {

        type: Number,
    },

    address: {
        type: String,
    },
    number: {
        type: String
    },
    weekend: {
        type: String
    },
    terms: {
        type: String
    },

    pending: {
        type: String
    },
    depts: [{

        email:{

            type: String
        },
        dept:{

            type: String
        },
        password:{

            type: String
        },
    }],

    invoicedata: [{

        by:{

            type: String
        },
        created:{

            type: String
        },

filename:{

    type: String
},
        weekno: {

            type: String
        },

        year: {

            type: String
        },
        
        status: {
            type: String
        },

        reporttype: {
            type: String
        },

        pdapplied: {
            type: String
        },

        date: {
            type: String
        },
        no: {

            type: String
        },

        due: {
            type: String
        },
        total: {

            type: String
        },
        paid: {

            type: String
        },

        balance: {

            type: String
        },
        invoicedetails: [
            {

                empname: {

                    type: String
                },
                taxes: {

                    type: String
                },

                date: {

                    type: String
                },

                skill: {

                    type: String
                },

                hrs: {

                    type: String
                },

                distance: {

                    type: String
                },


                days: {

                    type: String
                },

                onperdiem: {

                    type: String
                },
                perdiem: {

                    type: String
                },

                payrate: {

                    type: String
                },

                otpayrate: {

                    type: String
                },

                othrs: {

                    type: String
                },

                nc: {

                    type: String
                },

                deductions: {

                    type: String
                },
                net: {

                    type: String
                },
                total: {

                    type: String
                }


            }
        ]


    }]

});






const Client = mongoose.model('Clientdata', Clientdata);
module.exports = Client

