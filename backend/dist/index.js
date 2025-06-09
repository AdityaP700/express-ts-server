"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../views'));
app.get('/', (req, res) => {
    res.send('Welcome to the ArcCoders ');
});
app.get('/api/user', (req, res) => {
    res.json({
        name: "Aditya NoobCoder",
        age: 20,
        city: "Bhubaneswar"
    });
});
app.get('/hello', (req, res) => {
    res.send('Hello WGMI!');
});
app.get('/html', (req, res) => {
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
app.get('/greet/:name', (req, res) => {
    const { name } = req.params;
    res.render('greeting', { name });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
