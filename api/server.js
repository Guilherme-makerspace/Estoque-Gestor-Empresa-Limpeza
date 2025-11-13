//instalando e utilizando pacotes

const express = require('express')
const app = express()
const session = require('express-session')
const mysql = require('mysql2/promise')
const path = require('path')

// CREATE USER 'admin'@'%' IDENTIFIED BY 'estoqueadmin123';
// GRANT ALL PRIVILEGES ON controle_de_estoque.* TO 'admin'@'%';
// FLUSH PRIVILEGES;

var PORT = 3001
app.listen(PORT, '0.0.0.0')

app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend')))
app.use(session({
    secret: '56fa8e92acf04b00bb5b98e4a94c65f4578b92ef439e7d4849322648c95246ae',
    resave: false,
    saveUninitialized: false,
}))

//criando features

const conn = mysql.createPool({
    host: "0.0.0.0", 
    user: "admin",
    password: "estoqueadmin123",
    database: "controle_de_estoque"
})

// Serve frontend

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});


app.get('/', (req, res) => {
    if (req.session && req.session.usuario) {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    } else {
        res.redirect("/login");
    }
});

app.get('/Cadastro', (req, res) => {
    if (req.session && req.session.usuario) {
        res.sendFile(path.join(__dirname, '../frontend/cadastro.html'));
    } else {
        res.redirect("/login");
    }
});

app.get('/Alertas', (req, res) => {
    if (req.session && req.session.usuario) {
        res.sendFile(path.join(__dirname, '../frontend/alertas.html'));
    } else {
        res.redirect("/login");
    }
});

app.get('/Estoque', (req, res) => {
    if (req.session && req.session.usuario) {
        res.sendFile(path.join(__dirname, '../frontend/estoque.html'));
    } else {
        res.redirect("/login");
    }
});

//gets
app.get("/api", (req, res) =>{
    res.json({
        "/":"GET - Obtem todas as rotas disponiveis"
    })
})
app.get("/produtos", async (req, res) => {
    const [rows] = await conn.query("SELECT * FROM produto;");
        res.json(rows);
})
app.get("/alertas", async (req, res) => {
    try {
        const [rows] = await conn.query("SELECT nome, estoque, estoque_minimo FROM produto WHERE estoque < estoque_minimo;");
        res.json({ alertas: rows });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao obter alertas." });
    }
});

//posts

//cadastrar produto
app.post("/produtos", async (req, res) => {
    const { nome, marca, volume, tipo_embalagem, aplicacao, estoque, estoque_minimo } = req.body;
    const cadastrar = "INSERT INTO produto (nome, marca, volume, tipo_embalagem, aplicacao, estoque, estoque_minimo) VALUES (?, ?, ?, ?, ?, ?, ?);";

    try{
    await conn.query(cadastrar, [nome, marca, volume, tipo_embalagem, aplicacao, estoque, estoque_minimo]);
        res.json({msg:"Cadastro Efetuado"})
    } catch (error) {
        res.json({msg: "Cadastro não efetuado"})
    }
})

//puts

//entrada - para registrar entrada
app.put("/estoque/entrada", async (req, res) => {
    const { produto_id, tipo, quantidade } = req.body;
    const adicionar = "UPDATE produto SET estoque = estoque + ? WHERE produto_id = ?;";
    const registrarMovimentacao = "INSERT INTO movimentacao (produto_id, tipo, quantidade) VALUES (?, ?, ?);";

    try {
        await conn.query(adicionar, [quantidade, produto_id]);
        await conn.query(registrarMovimentacao, [produto_id, tipo, quantidade]);
        res.json({ msg: "Entrada registrada com sucesso." });
    } catch (error) {
        res.json({ msg: "Erro ao registrar entrada." });
    }
});

//saida - para registrar saida
app.put("/estoque/saida", async (req, res) => {
    const { produto_id, tipo, quantidade } = req.body;
    const diminuir = "UPDATE produto SET estoque = estoque - ? WHERE produto_id = ?;";
    const registrarMovimentacao = "INSERT INTO movimentacao (produto_id, tipo, quantidade) VALUES (?, ?, ?);";

    try {
        await conn.query(diminuir, [quantidade, produto_id]);
        await conn.query(registrarMovimentacao, [produto_id, tipo, quantidade]);
        res.json({ msg: "Saída registrada com sucesso." });
    } catch (error) {
        res.json({ msg: "Erro ao registrar saída." });
    }
});

//Login
app.post("/login", (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario == 'admin@gmail.com' && senha == 'estoqueadmin123') {
        req.session.usuario = usuario;
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
})

app.post("/logout", (req, res) =>{
    req.session.destroy()
    res.redirect("/login")
})
