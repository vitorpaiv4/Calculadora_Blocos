import React, { useState } from 'react';
import { CalculatorIcon } from '@heroicons/react/24/outline';
import CalculadoraPreco from './CalculadoraPreco';

function CalculadoraBlocos() {
  const [larg, setLarg] = useState('');
  const [alt, setAlt] = useState('');
  const [resultado, setResultado] = useState({ numBlocos: 0, area: 0, show: false });

  const calculaBlocos = () => {
    const largura = parseFloat(larg) || 0;
    const altura = parseFloat(alt) || 0;
    const area = largura * altura;
    const numBlocos = area * 12.5;
    setResultado({ numBlocos, area, show: true });
  };

  return (
    <div className="max-w-md mx-auto mt-4 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl font-bold">Calculadora de Blocos</h1>
      
      <div className="space-y-4">
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

      <button
        onClick={calculaBlocos}
        className="flex items-center justify-center w-full px-6 py-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
      >
        <CalculatorIcon className="w-5 h-5 mr-2" />
        Calcular
      </button>

      {resultado.show && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Quantidade de Blocos: {resultado.numBlocos.toFixed(2)}</p>
          <CalculadoraPreco numBlocos={resultado.numBlocos} area={resultado.area} />
        </div>
      )}
    </div>
  );
}

export default CalculadoraBlocos;
