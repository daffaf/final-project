import { Request, Response } from "express";
import orderModel from "@/models/order.model";
import ProductsModel from "@/models/products.model";
import * as Yup from 'yup'
import { IReqUser } from "@/utils/interface";

const validateOrderSchema = Yup.object().shape({
    grandTotal : Yup.number().required(),
    orderItems : Yup.array().of(
        Yup.object().shape({
            name : Yup.string().required(),
            productId : Yup.string().required(),
            price : Yup.string().required(),
            qty : Yup.number().required().min(1).max(5)
        })
    ).required()
})
export default {
    async create(req : Request, res : Response){
        try {
            const {grandTotal,orderItems} = req.body
            const userId = (req as IReqUser).user.id
            await validateOrderSchema.validate({grandTotal,orderItems})
            // const {grandTotal, orderItems} = req.body
            console.log({grandTotal,orderItems});
            
            for(const {name,productId,price,qty} of orderItems){
                const product = await ProductsModel.findById(productId)
                if(!product) res.status(404).json({message : `product ${productId} not found`})
                
            }
            const result = await orderModel.create({
                grandTotal,
                orderItems,
                createdBy : userId,
                status : 'pending'
            })
            
            res.status(201).json({
                data : result,
                message : "Success create order"
            })
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                return res.status(400).json({
                    message : "validation failed",
                    error : error.errors
                })
            }
            const err = error as Error;
            res.status(500).json({
                data : err.message,
                message : "Failed create order"
            })
        }
    },
    async getOrderHistory(req : Request, res : Response){
        try {
            const userId = (req as IReqUser).user.id
            if(!userId) res.status(401).json({message : "Unauthorized"})
            
            const orders = await orderModel.find({createdBy : userId}).populate('orderItems.productId')
            res.status(200).json({
                data : orders,
                message : "Success get all order"
            })
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                return res.status(400).json({
                    message : "validation failed",
                    error : error.errors
                })
            }
            const err = error as Error;
            res.status(500).json({
                data : err.message,
                message : "Failed get order"
            })
        }
    }
    // async findall (req : Request, res: Response){
    //     try {
    //         const result = await orderModel.find();
    //         res.status(201).json({
    //             data : result ,
    //             message : "Success get all order"
    //         })
    //     } catch (error) {
    //         const err = error as Error;
    //         res.status(500).json({
    //             data : err.message,
    //             message : "Failed get all order"
    //         });
    //     }
    // },
    // async findOne(req: Request, res:Response){
    //     try {
    //         const result = await orderModel.findOne({
    //             _id : req.params.id,
    //         })
    //         res.status(201).json({
    //             data : result,
    //             message : "Success get one order"
    //         })
    //     } catch (error) {
    //         const err = error as Error;
    //         res.status(500).json({
    //             data : err.message,
    //             message : "Failed get one order"
    //         });
    //     }
    // },
    // async update(req :Request , res:Response){
    //     try {
    //         const result = await orderModel.findOneAndUpdate(
    //             {_id : req.params.id},
    //             req.body,
    //             {
    //                 new : true,
    //             }
    //         )
    //         res.status(201).json({
    //             data : result ,
    //             message : "Success update order"
    //         })
    //     } catch (error) {
    //         const err = error as Error;
    //         res.status(500).json({
    //             data : err.message,
    //             message : "Failed update one order"
    //         });
    //     }
    // },
    // async delete(req : Request , res : Response){
    //     try {
    //         const result = await orderModel.findOneAndDelete(
    //             {_id : req.params.id},
    //         )
    //         res.status(201).json({
    //             data : result ,
    //             message  : `Success delete order`
    //         })
    //     } catch (error) {
    //         const err = error as Error;
    //         res.status(500).json({
    //             data : err.message,
    //             message : "Failed delete order"
    //         });
    //     }
    // }
}