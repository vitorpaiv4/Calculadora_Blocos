import React, { useState } from 'react';
import { CalculatorIcon } from '@heroicons/react/24/outline';
import CalculadoraPreco from './CalculadoraPreco';

function CalculadoraBlocos() {
  const [larg, setLarg] = useState('');
  const [alt, setAlt] = useState('');
  const [metroLinear, setMetroLinear] = useState('');
  const [produtoId, setProdutoId] = useState(1);
  const [resultado, setResultado] = useState({ numBlocos: 0, area: 0, show: false });

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

  const calculaBlocos = () => {
    if (produtoSelecionado.tipo === 'canaleta') {
      const numBlocos = parseFloat(metroLinear) * 2.5 || 0;
      setResultado({ numBlocos, area: parseFloat(metroLinear), show: true, produto: produtoSelecionado });
    } else {
      const largura = parseFloat(larg) || 0;
      const altura = parseFloat(alt) || 0;
      const area = largura * altura;
      const numBlocos = area * 12.5; // Ajuste conforme a necessidade real
      setResultado({ numBlocos, area, show: true, produto: produtoSelecionado });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl font-bold">Calculadora de Blocos</h1>

      <div className="mt-2">
        <label className="block">
          <span className="text-gray-700">Selecione o Produto:</span>
          <select
            value={produtoId}
            onChange={e => {
              setProdutoId(e.target.value);
              setLarg('');
              setAlt('');
              setMetroLinear('');
            }}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
          >
            {produtos.map(produto => (
              <option key={produto.id} value={produto.id}>{produto.nome}</option>
            ))}
          </select>
        </label>
      </div>

      {produtoSelecionado.tipo === 'canaleta' ? (
        <div className="space-y-4 mt-4">
          <label className="block">
            <span className="text-gray-700">Metro linear:</span>
            <input
              type="text"
              value={metroLinear}
              onChange={e => setMetroLinear(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              placeholder="0"
            />
          </label>
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          <label className="block">
            <span className="text-gray-700">Largura da parede (m):</span>
            <input
              type="text"
              value={larg}
              onChange={e => setLarg(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              placeholder="0"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Altura da parede (m):</span>
            <input
              type="text"
              value={alt}
              onChange={e => setAlt(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              placeholder="0"
            />
          </label>
        </div>
      )}

      <button
        onClick={calculaBlocos}
        className="flex items-center justify-center w-full px-6 py-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
      >
        <CalculatorIcon className="w-5 h-5 mr-2" />
        Calcular
      </button>

      {resultado.show && (
        <CalculadoraPreco numBlocos={resultado.numBlocos} area={resultado.area} produto={resultado.produto} />
      )}
    </div>
  );
}

export default CalculadoraBlocos;
