const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BClient",
      required: true,
    },

    invoiceNumber: {
      type: String,
      unique: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: Number,

        price: Number,

        total: Number,
      },
    ],

    subtotal: Number,

    discount: {
      type: Number,
      default: 0,
    },

    gst: {
      type: Number,
      default: 0,
    },

    finalAmount: Number,

    paymentStatus: {
      type: String,
      enum: ["Paid", "Partial", "Pending"],
      default: "Pending",
    },

    amountPaid: {
      type: Number,
      default: 0,
    },

    dueAmount: {
      type: Number,
      default: 0,
    },

    deliveryStatus: {
      type: String,
      enum: ["Pending", "Packed", "Dispatched", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("B2BPurchase", PurchaseSchema);
