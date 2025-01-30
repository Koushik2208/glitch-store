import { model, models, Schema, Types } from "mongoose";

export interface IInventory {
  product: Types.ObjectId;
  stock: number;
  updatedAt: Date;
}

const InventorySchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  stock: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const Inventory =
  models?.Inventory || model<IInventory>("Inventory", InventorySchema);

export default Inventory;
