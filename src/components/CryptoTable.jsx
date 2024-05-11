import React from 'react';

function CryptoTable({ trades, isConnected }) {
  const calcularPrecoUSDT = (precoCrypto, quantidadeCrypto) => {
    const taxaCambio = 1; // Exemplo: 1 Crypto = 1 USDT
    return parseFloat(precoCrypto) * parseFloat(quantidadeCrypto) * taxaCambio;
  };

  return (
    <div>
      {isConnected ? (
        <table className="table table-bordered" style={{ borderColor: 'green' }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Preço</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Preço em USDT</th>
              <th scope="col">Hora</th>
            </tr>
          </thead> 
          <tbody>
            {trades.map((trade, index) => (
              <tr key={index}>
                <td>{parseFloat(trade.p).toFixed(2)}</td>
                <td>{parseFloat(trade.q).toFixed(5)}</td>
                <td>{calcularPrecoUSDT(trade.p, trade.q).toFixed(2)}</td>
                <td>{new Date(trade.T).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Aguardando conexão...</div>
      )}
    </div>
  );
}

export default CryptoTable;
