const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data'); // Import FormData explicitly
const { log } = require('console');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const MINDEE_API_KEY = 'ecfb13fab7829e4758fb2f89c787a5c7';
const MINDEE_API_URL = 'https://api.mindee.net/v1/products/mindee/invoices/v4/predict';

router.post('/parse', upload.single('file'), (req, res) => {
  const file = req.file.path;

  const formData = new FormData();
  formData.append('document', fs.createReadStream(file));

  axios.post(MINDEE_API_URL, formData, {
    headers: {
      'Authorization': `Token ${MINDEE_API_KEY}`,
      ...formData.getHeaders() // Remove this line
    }
  })
  .then(response => {
      const date = response.data.document.inference.pages[0].prediction.date.value;  
      const invoiceNumber= response.data.document.inference.pages[0].prediction.invoice_number.value;  
      const supplier_name= response.data.document.inference.pages[0].prediction.supplier_name.value;  
      const total_amount = response.data.document.inference.pages[0].prediction.total_amount.value;  
      
      const line_items = response.data.document.inference.pages[0].prediction.line_items;
      const items = [];
      line_items.map((item) => {
          items.push({description:item.description,quantity:item.quantity,total_amount:item.total_amount,unit_price:item.unit_price})
      })
  res.json({
          supplier_name,
          date,
          total_amount,
          invoiceNumber,
          items
    });
  })
  .catch(error => {
    // fs.unlinkSync(file); // Clean up uploaded file if there's an error
    console.error(error);
    res.status(500).json({ error: error.message });
  });
});

module.exports = router;
