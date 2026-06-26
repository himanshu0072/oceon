const mongoose = require("mongoose");
require("dotenv").config();

const B2BClient = require("../models/B2BClient");
const Purchase = require("../models/Purchase");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Optional: Clear old dummy data

    await Purchase.deleteMany({});
    await B2BClient.deleteMany({});

    console.log("Old data removed");

    // ================= CLIENTS =================

    const clients = await B2BClient.insertMany([
      {
        businessName: "Sharma Kirana Store",
        ownerName: "Rajesh Sharma",
        mobile: "9876543210",
        alternateMobile: "9876543211",
        email: "sharma@gmail.com",
        address: "Sector 56",
        city: "Gurugram",
        state: "Haryana",
        pincode: "122011",
        gstNumber: "06ABCDE1234F1Z5",
        status: "Active",
      },

      {
        businessName: "Gupta Wholesale Mart",
        ownerName: "Ankit Gupta",
        mobile: "9812345678",
        email: "gupta@gmail.com",
        address: "DLF Phase 3",
        city: "Gurugram",
        state: "Haryana",
        pincode: "122002",
        gstNumber: "06XYZAB1234L1Z2",
        status: "Active",
      },

      {
        businessName: "Fresh Daily Super Store",
        ownerName: "Aman Verma",
        mobile: "9999988888",
        email: "fresh@gmail.com",
        address: "Sushant Lok",
        city: "Gurugram",
        state: "Haryana",
        pincode: "122001",
        gstNumber: "06QWERT1234P1Z9",
        status: "Inactive",
      },
    ]);

    console.log("Clients Created");

    // ================= PURCHASES =================

    await Purchase.insertMany([
      {
        client: clients[0]._id,

        invoiceNumber: "INV-1001",

        items: [
          {
            quantity: 20,
            price: 650,
          },
          {
            quantity: 15,
            price: 1200,
          },
        ],

        finalAmount: 31000,
        paidAmount: 25000,
        dueAmount: 6000,
        paymentMode: "UPI",
        remarks: "Regular customer",
      },

      {
        client: clients[0]._id,

        invoiceNumber: "INV-1002",

        items: [
          {
            quantity: 50,
            price: 80,
          },
        ],

        finalAmount: 4000,
        paidAmount: 4000,
        dueAmount: 0,
        paymentMode: "Cash",
      },

      {
        client: clients[1]._id,

        invoiceNumber: "INV-1003",

        items: [
          {
            quantity: 10,
            price: 1800,
          },
        ],

        finalAmount: 18000,
        paidAmount: 10000,
        dueAmount: 8000,
        paymentMode: "Bank Transfer",
      },

      {
        client: clients[2]._id,

        invoiceNumber: "INV-1004",

        items: [
          {
            quantity: 30,
            price: 900,
          },
        ],

        finalAmount: 27000,
        paidAmount: 27000,
        dueAmount: 0,
        paymentMode: "Cash",
      },
    ]);

    console.log("Purchases Created");

    console.log("Dummy Data Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seed();
