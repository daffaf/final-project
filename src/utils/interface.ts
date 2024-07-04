import { Request } from "express";
import mongoose from "mongoose";
export interface IReqUser extends Request{
    user : {
        role  : string[],
        id : string
    }
}
interface OrderItem {
    name: string;
    productId: mongoose.Schema.Types.ObjectId;
    price: number;
    quantity: number;
}
export interface IReqOrder extends Request{
    grandTotal: number;
    orderItems: OrderItem[];
    createdBy: mongoose.Schema.Types.ObjectId;
    status: 'pending' | 'completed' | 'cancelled';
}