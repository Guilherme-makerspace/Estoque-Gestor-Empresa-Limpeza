//instalando e utilizando pacotes

const express = require('express')
const app = express()
const mysql = require('mysql2/promise')
const path = require('path')

var PORT = 3001
app.listen(PORT, '0.0.0.0')

app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend')))

//criando features

const conn = mysql.createPool({
    host: "0.0.0.0", 
    user: "admin",
    password: "estoqueadmin123",
    database: "controle_de_estoque"
})

// Serve frontend 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/Cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/cadastro.html'));
});

app.get('/Alertas', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/alertas.html'));
});

app.get('/Estoque', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/estoque.html'));
});

//gets
app.get("/", (req, res) =>{
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
        const [rows] = await conn.query("SELECT * FROM produto WHERE estoque < estoque_minimo;");
        if (rows.length > 0) {
            res.json({ alertas: rows });
        } else {
            res.json({ msg: "Nenhum alerta disponível." });
        }
    } catch (error) {
        res.json({ msg: "Erro ao obter alertas." });
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