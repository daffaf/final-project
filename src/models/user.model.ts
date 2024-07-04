import { encrypt } from "@/utils/encryption";
import { SECRET } from "@/utils/env";
import mail from "@/utils/mail/mail";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user",
        },
        profilePicture: {
            type: String,
            default: "default.jpg",
        },
    },
    {
        timestamps: true,
    }
);
userSchema.pre("save",function(next){
    const user = this;
    user.password = encrypt(SECRET, user.password);
    next()
})
userSchema.pre("updateOne", async function(next){
    const user = (this as unknown as {_update : any})._update
    user.password = encrypt (SECRET, user.password)
})
userSchema.methods.toJSON = function(){
    const user = this.toObject();
    delete user.password;
    return user;
}
userSchema.post("save", async function(doc,next){
    const user = doc
    console.log("send email to",user.email);
    // render content email
    const content = await mail.render("register-success.ejs",{
        username :user.username,
    })
    // send email
    await mail.send({
        to: user.email,
        subject : "Registration Success",
        content
    })
    next()
})
const UserModel = mongoose.model("User",userSchema)
export default UserModel