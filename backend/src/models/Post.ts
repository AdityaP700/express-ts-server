import mongoose, { Schema, Document ,Model} from 'mongoose';
export interface IPost extends Document{
    title: string;
    description: string;
}

const PostSchema: Schema = new Schema({
    title: {type : String,required: true},
    description :{ type : String, required: true}
},
//Adds createdAT and UpdatedAT 
{timestamps : true}
);
const Post : Model<IPost> = mongoose.model<IPost>("Post", PostSchema);
export default Post;