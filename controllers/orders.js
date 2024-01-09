const ordersRouter = require('express').Router();
const base = "https://api-m.sandbox.paypal.com";
const { v4 } = require('uuid');


//*FUNCIONES:
//Generar token de acceso:
const generateAccessToken = async () => {

    try {
      if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
      }
      const auth = Buffer.from(
        process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_CLIENT_SECRET,
      ).toString("base64");
      const response = await fetch(`${base}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
  
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Failed to generate Access Token:", error);
    }
};
  

//Crear la orden:
const createOrder = async (cart, total) => {
    
    console.log(cart, total);

    const id = v4();

    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
      intent: "CAPTURE",
          purchase_units: [ 
              { 
                  reference_id: id,
                  amount: 
                      { 
                          currency_code: "USD",
                          value: total 
                      } 
                } 
            ], 
                        
    };
  
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
  
    return handleResponse(response);
};
  

//Capturar la orden:
const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
    });
  
    return handleResponse(response);
};

//Manejar las respuestas:
async function handleResponse(response) {
    try {
      const jsonResponse = await response.json();
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
}


//*RUTAS:
//Para enviar la nueva orden:
ordersRouter.post('/', async (req, res) => {
    try {
      
      const { cart, total } = req.body;
      const { jsonResponse, httpStatusCode } = await createOrder(cart, total);
      res.status(httpStatusCode).json(jsonResponse);

    } catch (error) {

      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order." });

    }
});

//Para capturar la orden:
ordersRouter.post('/:orderID/capture', async (req, res) => {
    try {

      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
      res.status(httpStatusCode).json(jsonResponse);

    } catch (error) {

      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order." });
      
    }
});



module.exports = ordersRouter;