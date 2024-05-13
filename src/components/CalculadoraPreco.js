import React, { useState } from 'react';
import OpcoesPagamento from './OpcoesPagamento';

function CalculadoraPreco({ numBlocos, area }) {
  const [produtoId, setProdutoId] = useState(1);

  const produtos = [
    { id: 1, nome: 'Bloco Estrutural 19x19x39', preco: 6.80, tipo: 'bloco' },
    { id: 2, nome: 'Bloco Estrutural 14x19x39', preco: 4.95, tipo: 'bloco' },
    { id: 3, nome: 'Bloco de Vedação 9x19x39', preco: 3.40, tipo: 'bloco' },
    { id: 4, nome: 'Bloco de Vedação 14x19x39', preco: 4.30, tipo: 'bloco' },
    { id: 5, nome: 'Meio Bloco 14x19x19', preco: 2.50, tipo: 'bloco' },
    { id: 6, nome: 'Meio Bloco 9x19x19', preco: 2.00, tipo: 'bloco' },
    { id: 7, nome: 'Canaleta 9x19x39', preco: 4.60, tipo: 'canaleta' },
    { id: 8, nome: 'Canaleta 14x19x39', preco: 5.50, tipo: 'canaleta' },
    { id: 9, nome: 'M² de piso (6cm)', preco: 75.00, tipo: 'piso' },
    { id: 10, nome: 'M² de piso (8cm)', preco: 79.20, tipo: 'piso' }
  ];

  const produtoSelecionado = produtos.find(produto => produto.id === parseInt(produtoId)) || produtos[0];

  const calculaPrecoTotal = () => {
    if (!numBlocos || !produtoSelecionado) return 0;

    switch (produtoSelecionado.tipo) {
      case 'bloco':
        return area * produtoSelecionado.preco;
      case 'canaleta':
        return (area / 2.5) * produtoSelecionado.preco;
      case 'piso':
        return area * produtoSelecionado.preco;
      default:
        return 0;
    }
  };

  const precoTotal = calculaPrecoTotal();

  return (
    <div className="mt-4 p-4 bg-white rounded-md shadow">
      <h2 className="text-lg font-semibold">Calcular Preço Total</h2>
      
      <div className="mt-2">
        <label className="block">
          <span className="text-gray-700">Selecione o Produto:</span>
          <select
            value={produtoId}
            onChange={e => setProdutoId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
          >
            {produtos.map(produto => (
              <option key={produto.id} value={produto.id}>{produto.nome}</option>
            ))}
          </select>
        </label>
      </div>
      
      <p className="mt-4 text-gray-800">Quantidade de Blocos/M²: {numBlocos ? numBlocos.toFixed(2) : "0.00"}</p>
      <p className="text-gray-800">Área Total: {area ? area.toFixed(2) : "0.00"} m²</p>
      <p className="text-gray-800">Preço por Unidade: R$ {produtoSelecionado.preco.toFixed(2)}</p>
      <p className="text-gray-800 font-bold">Preço Total: R$ {precoTotal.toFixed(2)}</p>

      <OpcoesPagamento precoTotal={precoTotal} />
    </div>
  );
}

export default CalculadoraPreco;
