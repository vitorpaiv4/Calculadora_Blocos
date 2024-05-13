import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import CalculadoraPreco from './CalculadoraPreco';

function GerenciadorParedes() {
    const [paredes, setParedes] = useState([]);
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
        { id: 10, nome: 'M² de piso (8cm)', preco: 79.20, type: 'piso' }
    ];

    const adicionarParede = () => {
        setParedes([...paredes, { id: Date.now(), largura: '', altura: '' }]);
    };

    const removerParede = (id) => {
        setParedes(paredes.filter(parede => parede.id !== id));
    };

    const handleChange = (id, field, value) => {
        setParedes(paredes.map(parede => parede.id === id ? { ...parede, [field]: value } : parede));
    };

    const totalBlocos = () => {
        const produto = produtos.find(p => p.id === parseInt(produtoId));
        return paredes.reduce((acc, { largura, altura }) => {
            const area = largura * altura;
            const multiplicador = produto.tipo === 'canaleta' ? 2.5 : 12.5;
            return acc + area * multiplicador;
        }, 0);
    };

    const totalArea = () => {
        return paredes.reduce((acc, { largura, altura }) => acc + (largura * altura), 0);
    };

    return (
        <div className="max-w-4xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-2xl font-bold">Calculadora de Múltiplas Paredes</h1>

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

            {paredes.map((parede, index) => (
                <div key={parede.id} className="mt-4 p-4 bg-white rounded-md shadow">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Parede {index + 1}</h2>
                        <button onClick={() => removerParede(parede.id)} className="p-2 rounded-full bg-red-500 text-white">
                            <MinusIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="mt-2">
                        <label className="block">
                            <span className="text-gray-700">Largura (m):</span>
                            <input
                                type="text"
                                value={parede.largura}
                                onChange={e => handleChange(parede.id, 'largura', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                                placeholder="0"
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Altura (m):</span>
                            <input
                                type="text"
                                value={parede.altura}
                                onChange={e => handleChange(parede.id, 'altura', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                                placeholder="0"
                            />
                        </label>
                    </div>
                </div>
            ))}

            <button onClick={adicionarParede} className="flex items-center justify-center w-full px-6 py-3 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">
                <PlusIcon className="w-5 h-5 mr-2" />
                Adicionar Parede
            </button>

            {paredes.length > 0 && (
                <CalculadoraPreco 
                    numBlocos={totalBlocos()} 
                    area={totalArea()} 
                    produto={produtos.find(p => p.id === parseInt(produtoId))}
                />
            )}
        </div>
    );
}

export default GerenciadorParedes;
