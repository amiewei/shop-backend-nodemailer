const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", function (req, res, next) {
    res.send(":) Up and running 🏃‍♀️");
});

// -----------handle requests from contact form-----------
router.post("/contact", (req, res) => {
    console.log("contact form");
    const { firstname, lastname, email, subject, message } = req.body;

    //- `firstname` and `lastname` are optional.`email` is required. Either `subject` or `message` is required, but not both.
    if ((!firstname && !lastname) || !email || (!subject && !message)) {
        return res
            .status(400)
            .json({ status: res.statusCode, message: "fields are required" });
    }

    const mail = {
        from: `${firstname} ${lastname}`,
        to: process.env.CONTACT_EMAIL,
        subject: "CONTACT FORM: " + subject,
        html: `<p>Name: ${firstname} ${lastname}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
    };

    // ------------- nodemailer setup and send Email ---------------
    const contactEmail = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.CONTACT_EMAIL,
            pass: process.env.CONTACT_EMAIL_APP_PW,
        },
    });

    contactEmail.sendMail(mail, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ status: res.statusCode, message: error });
        } else {
            console.log(info);
            res.status(200).json({
                status: res.statusCode,
                message: info.response,
            });
        }
    });
});

// -----------TODO - handle order fulfillment----------
//TBD whether to have this here separately or as part of the fulfillment function
//stripe.com/docs/payments/checkout/fulfill-orders
router.post("/stripe-order-fufill", (req, res) => {
    console.log("/stripe-order-fufill");

    //fulfilmment info
    const mail = {
        from: `${firstname} ${lastname}`,
        to: process.env.CONTACT_EMAIL,
        subject: "ORDER FULFILLMENT: " + subject,
        html: `<p>Name: ${firstname} ${lastname}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
    };

    // ------------- nodemailer setup and send Email ---------------
    const contactEmail = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.CONTACT_EMAIL,
            pass: process.env.CONTACT_EMAIL_APP_PW,
        },
    });

    contactEmail.sendMail(mail, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ status: res.statusCode, message: error });
        } else {
            console.log(info);
            res.status(200).json({
                status: res.statusCode,
                message: info.response,
            });
        }
    });
});

module.exports = router;
