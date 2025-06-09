import express, { Request, Response ,RequestHandler} from 'express';
import Post from "./models/Post"
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './db'
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
connectToDB().then(() => {
  console.log('MongoDB Connected');
});
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the ArcCoders ');
});

app.get('/api/user', (req: Request, res: Response) => {
  res.json({
    name: "Aditya NoobCoder",
    age: 20,
    city: "Bhubaneswar"
  });
});

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello WGMI!');
});

app.get('/html', (req: Request, res: Response) => {
  res.send(`
    <html>
      <head><title>ArcCoders</title></head>
      <body>
        <h1>Hola WGMI</h1>
        <p>YO a Preview!!.</p>
      </body>
    </html>
  `);
});

app.get('/greet/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  res.render('greeting', { name });
});


app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'something wrong' });
  }
});
app.post('/posts',async (req,res)=>{
  try{
  const {title, description}= req.body;
  //writing the post request
  const newPost = new Post({title,description})
  await newPost.save();

  res.status(201).json({message: 'Post created',post:newPost})} catch(err){
  res.status(500).json({error:'Failed to create post'});
}
});
const myHandlerFunction: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err });
  }
};

app.put('/posts/:id', myHandlerFunction);

app.delete('/posts/:id',async(req,res):Promise<any>=>{
  const{id} = req.params;
  try{
  const deletedPost = await Post.findByIdAndDelete(id);
  if(!deletedPost){
    return res.status(404).json({message:'Post not found'})
  }
  return res.status(200).json({message:'Post deleted', deletedPost});
}catch(err){
  return res.status(500).json({message:'Failed to delete post',err})
}
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
