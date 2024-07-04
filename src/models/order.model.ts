import { IReqOrder } from "@/utils/interface";
import mongoose from "mongoose";
import { number } from "yup";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        grandTotal : Number,
        orderItems : [
            {
                name : {
                    type : String,
                    required : true,
                },
                productId : {
                    type :  mongoose.Schema.Types.ObjectId,
                    required : true,
                    ref : "Products"
                },
                price : {
                    type : Number,
                    required : true
                },
                qty : {
                    type : Number,
                    required : true,
                    min : 1,
                    max : 5,
                },
            }
        ],
        createdBy : [
            {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : "User"
            }

        ],
        status: {
            type: String,
            enum: ['pending', 'completed', 'cancelled'],
            default: 'pending' 
        }
    },{
        timestamps : true,
    }
)

const orderModel = mongoose.model<IReqOrder>("Order", OrderSchema)
export default orderModel;