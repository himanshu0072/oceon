const mongoose = require("mongoose");

const B2BClientSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true
    },

    ownerName: {
      type: String,
      required: true
    },

    mobile: {
      type: String,
      required: true,
      unique: true
    },

    alternateMobile: String,

    email: String,

    gstNumber: {
      type: String,
      uppercase: true
    },

    panNumber: String,

    businessType: {
      type: String,
      enum: [
        "Kirana Store",
        "Restaurant",
        "Hotel",
        "Caterer",
        "Distributor",
        "Supermarket",
        "Other"
      ]
    },

    address: String,

    city: String,

    state: String,

    pincode: String,

    creditLimit: {
      type: Number,
      default: 0
    },

    outstandingAmount: {
      type: Number,
      default: 0
    },

    paymentTerms: {
      type: String,
      enum: ["Cash", "7 Days", "15 Days", "30 Days"],
      default: "Cash"
    },

    salesperson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },

    notes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("B2BClient", B2BClientSchema);