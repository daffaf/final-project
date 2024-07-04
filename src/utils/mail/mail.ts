import nodemailer from 'nodemailer'
import { ZOHO_USERNAME,ZOHO_PASSWORD } from '@/utils/env'
import ejs from 'ejs'
import path from 'path'
const transporter = nodemailer.createTransport({
    service : "Zoho",
    host : "smtp.zoho.com",
    port : 465,
    secure : true,
    auth : {
        user : ZOHO_USERNAME,
        pass : ZOHO_PASSWORD
    },
    requireTLS : true,
})
const send = async({to,subject,content}:{
    to : string | string[],
    subject : string,
    content : string
})=>{
    const result = await transporter.sendMail({
        from : ZOHO_USERNAME,
        to,
        subject,
        html : content
    })
}
const render = async(template : string, data : any) =>{
    const content = await ejs.renderFile(
        path.join(__dirname, `template/${template}`),
        data
    )
    return content as string
}
export default {
    send,render
}