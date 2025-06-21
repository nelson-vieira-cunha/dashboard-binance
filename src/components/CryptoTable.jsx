import React from 'react';
import './CryptoTable.css';

function CryptoTable({ trades, isConnected }) {
  const calcularPrecoUSDT = (precoCrypto, quantidadeCrypto) => {
    return parseFloat(precoCrypto) * parseFloat(quantidadeCrypto);
  };

  return (
    <div className="crypto-table-container">
      {isConnected ? (
        <div className="table-wrapper">
          <table className="crypto-table">
            <thead>
              <tr>
                <th>💰 Preço</th>
                <th>📊 Quantidade</th>
                <th>💵 Preço em USDT</th>
                <th>⏰ Hora</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <tr key={index}>
                  <td>${parseFloat(trade.p).toFixed(2)}</td>
                  <td>{parseFloat(trade.q).toFixed(5)}</td>
                  <td>${calcularPrecoUSDT(trade.p, trade.q).toFixed(2)}</td>
                  <td>{new Date(trade.T).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="status-message">🔌 Aguardando conexão...</div>
      )}
    </div>
  );
}

export default CryptoTable;
