import { IReqOrder } from "@/utils/interface";
import mongoose, { mongo } from "mongoose";
import mail from '@/utils/mail/mail'
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
OrderSchema.post("save", async function(doc,next){
    const item = doc
    console.log(item);
    const user = await mongoose.model("User").findById(item.createdBy)
    
    const content = await mail.render("invoice.ejs",{
        grandTotal : item.grandTotal,
        customerName : user.username,
        orderItems : item.orderItems.map(item => ({
            name : item.name,
            quantity : item.qty,
            price : item.price
        })),
        contactEmail : "daffafadila00@gmail.com",
        companyName : "elescode",
        year : new Date().getFullYear()
    })
    await mail.send({
        to: user.email,
        subject : "Order Transaction",
        content
    })

    // content = await mail.render("invoice.ejs".{})
})
const orderModel = mongoose.model<IReqOrder>("Order", OrderSchema)
export default orderModel;