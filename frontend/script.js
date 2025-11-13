document.addEventListener('DOMContentLoaded', () => {
    const baseURL = window.location.origin;

// função para carregar produtos na tabela
    const carregarProdutos = async () => {
        const tbody = document.getElementById('produtos-tbody');
        try {
            const response = await fetch(`${baseURL}/produtos`);
            const produtos = await response.json();

            produtos.forEach(produto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${produto.nome}</td>
                    <td>${produto.marca}</td>
                    <td>${produto.volume}</td>
                    <td>${produto.tipo_embalagem}</td>
                    <td>${produto.aplicacao}</td>
                    <td>${produto.estoque}</td>
                    <td>${produto.estoque_minimo}</td>
                `;
                tbody.appendChild(row);
            });
        } catch (error) {
            tbody.innerHTML = '<tr><td colspan="7">Erro ao carregar produtos.</td></tr>';
        }
    };

// função para carregar alertas
    const carregarAlertas = async () => {
        const alertasContainer = document.getElementById('alertas-container');
        try {
            const response = await fetch(`${baseURL}/alertas`);
            const data = await response.json();

            if (data.alertas && data.alertas.length > 0) {
                data.alertas.forEach(alerta => {
                    const alertaDiv = document.createElement('div');
                    alertaDiv.className = 'alerta';
                    alertaDiv.innerHTML = `
                        <p><strong>Produto:</strong> ${alerta.nome}</p>
                        <p><strong>Estoque Atual:</strong> ${alerta.estoque}</p>
                        <p><strong>Estoque Mínimo:</strong> ${alerta.estoque_minimo}</p>
                    `;
                    alertasContainer.appendChild(alertaDiv);
                });
            } else {
                alertasContainer.innerHTML = '<p>Nenhum alerta disponível.</p>';
            }
        } catch (error) {
            console.error('Erro ao carregar alertas:', error);
            alertasContainer.innerHTML = '<p>Erro ao carregar alertas.</p>';
        }
    };

// função para registrar entrada no estoque
    const registrarEntrada = async (produtoId, quantidade) => {
        try {
            const response = await fetch(`${baseURL}/estoque/entrada`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ produto_id: produtoId, tipo: 'entrada', quantidade })
            });
            const result = await response.json();
            alert(result.msg);
        } catch (error) {
            alert('Erro ao registrar entrada no estoque.');
        }
    };

// funcão para registrar saida no estoque
    const registrarSaida = async (produtoId, quantidade) => {
        try {
            const response = await fetch(`${baseURL}/estoque/saida`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ produto_id: produtoId, tipo: 'saida', quantidade })
            });
            const result = await response.json();
            alert(result.msg);
        } catch (error) {
            alert('Erro ao registrar saída no estoque.');
        }
    };

// identificar a pagina atual e executar a função correspondente
    const path = window.location.pathname;
    if (path === '/Estoque') {
        carregarProdutos();
    } else if (path === '/Alertas') {
        carregarAlertas();
    }
});