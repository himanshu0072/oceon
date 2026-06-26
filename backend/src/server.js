const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const b2bRoutes = require("./routes/b2bRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/warehouse", require("./routes/warehouseRoutes"));
app.use("/api/fc", require("./routes/fcRoutes"));
app.use("/api/transfers", require("./routes/transferRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/b2b", b2bRoutes);

app.get("/", (req, res) => res.json({ message: "OCEON API Running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`OCEON Server running on port ${PORT}`));
