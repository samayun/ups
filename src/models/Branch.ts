import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Branch",
    },
    accNumber: {
      type: String,
      required: true,
      unique: true,
    },
    accType: {
      type: String,
      required: true,
      enum: ["savings", "current"],
    },
    currency: {
      type: String,
      default: "BDT",
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Branch = mongoose.models.Branch || mongoose.model("Branch", BranchSchema);

export default Branch;
