import express, { Request, Response} from 'express';
import path from 'path';
import cors from 'cors';


const app = express();
const port = 3000;
app.use(cors());
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the ArcCoders ');
});

app.get('/api/user', (req: Request, res: Response) => {
  res.json({
    name:"Aditya NoobCoder",
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
