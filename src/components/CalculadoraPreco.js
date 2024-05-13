import React from 'react';
import OpcoesPagamento from './OpcoesPagamento';

function CalculadoraPreco({ numBlocos, area, produto }) {
    const calculaPrecoTotal = () => {
        if (!numBlocos || !produto) return 0;
        return numBlocos * produto.preco;
    };

    const precoTotal = calculaPrecoTotal();

    return (
        <div className="mt-4 p-4 bg-white rounded-md shadow">
            <h2 className="text-lg font-semibold">Calcular Preço Total</h2>
            
            <p className="mt-4 text-gray-800">Produto Selecionado: {produto ? produto.nome : 'N/A'}</p>
            <p className="text-gray-800">Quantidade de {produto && produto.tipo === 'canaleta' ? 'Canaletas' : 'Blocos'}: {numBlocos.toFixed(2)}</p>
            <p className="text-gray-800">Área Total: {area.toFixed(2)} m²</p>
            <p className="text-gray-800">Preço por Unidade: R$ {produto ? produto.preco.toFixed(2) : '0.00'}</p>
            <p className="text-gray-800 font-bold">Preço Total: R$ {precoTotal.toFixed(2)}</p>

            <OpcoesPagamento precoTotal={precoTotal} />
        </div>
    );
}

export default CalculadoraPreco;
