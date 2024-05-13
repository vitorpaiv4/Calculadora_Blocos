import React, { useState } from 'react';

function OpcoesPagamento({ precoTotal }) {
  const [formaPagamento, setFormaPagamento] = useState('avista');

  const calculaPrecoFinal = () => {
    if (formaPagamento === 'avista') {
      return precoTotal * 0.95; // 5% de desconto
    } else if (formaPagamento === 'credito') {
      return precoTotal; // Sem alteração, pagamento parcelado
    }
    return precoTotal;
  };

  const precoFinal = calculaPrecoFinal();
  const parcelas = formaPagamento === 'credito' ? 4 : 1;
  const valorParcela = precoFinal / parcelas;

  return (
    <div className="mt-4 p-4 bg-white rounded-md shadow">
      <h2 className="text-lg font-semibold">Opções de Pagamento</h2>
      
      <div className="mt-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="formaPagamento"
            value="avista"
            checked={formaPagamento === 'avista'}
            onChange={() => setFormaPagamento('avista')}
            className="form-radio"
          />
          <span className="ml-2">À vista (5% de desconto)</span>
        </label>
        
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            name="formaPagamento"
            value="credito"
            checked={formaPagamento === 'credito'}
            onChange={() => setFormaPagamento('credito')}
            className="form-radio"
          />
          <span className="ml-2">Cartão de Crédito (4x sem juros)</span>
        </label>
      </div>
      
      <p className="mt-4 text-gray-800">Preço Final: R$ {precoFinal.toFixed(2)}</p>
      <p className="text-gray-800">Parcelas: {parcelas}</p>
      <p className="text-gray-800">Valor por Parcela: R$ {valorParcela.toFixed(2)}</p>
    </div>
  );
}

export default OpcoesPagamento;
