import mongoose, { Schema, Document } from "mongoose";

interface IBank extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
}

const BankSchema: Schema = new Schema(
  {
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    website: { type: String },
    logo: { type: String },
  },
  {
    timestamps: true,
  }
);

const Bank = mongoose.models.Bank || mongoose.model<IBank>("Bank", BankSchema);

export default Bank;
