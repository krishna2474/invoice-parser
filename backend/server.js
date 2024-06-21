const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const invoiceRoutes = require('./routes/invoice');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/invoice', invoiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
