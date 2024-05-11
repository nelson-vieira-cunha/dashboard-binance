import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Icon from './icons/icon.png';

function CryptoTable({ trades, isConnected }) {
  const calcularPrecoUSDT = (precoCrypto, quantidadeCrypto) => {
    const taxaCambio = 1; // Example: 1 Crypto = 1 USDT
    return parseFloat(precoCrypto) * parseFloat(quantidadeCrypto) * taxaCambio;
  };

  return (
    <div>
      {isConnected ? (
        <table  className="table table-bordered" style={{borderColor: 'green'}}>
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

function App() {
  const [tradesBTC, setTradesBTC] = useState([]);
  const [tradesETH, setTradesETH] = useState([]);
  const [tradesSOL, setTradesSOL] = useState([]);
  const [tradesDOGE, setTradesDOGE] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const pairs = ['btcusdt', 'ethusdt', 'solusdt', 'dogeusdt'];

    const sockets = pairs.map(pair => {
      const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);

      socket.onopen = () => {
        console.log(`Conexão estabelecida para ${pair.toUpperCase()}.`);
        setIsConnected(true);
      };

      socket.onmessage = event => {
        const tradeData = JSON.parse(event.data);
        switch (pair) {
          case 'btcusdt':
            setTradesBTC(prevTrades => [tradeData, ...prevTrades.slice(0, 9)]);
            break;
          case 'ethusdt':
            setTradesETH(prevTrades => [tradeData, ...prevTrades.slice(0, 9)]);
            break;
          case 'solusdt':
            setTradesSOL(prevTrades => [tradeData, ...prevTrades.slice(0, 9)]);
            break;
          case 'dogeusdt':
            setTradesDOGE(prevTrades => [tradeData, ...prevTrades.slice(0, 9)]);
            break;
          default:
            break;
        }
      };

      socket.onclose = event => {
        console.log(`Conexão fechada para ${pair.toUpperCase()}:`, event);
        setIsConnected(false);
      };

      socket.onerror = error => {
        console.error(`Erro na conexão para ${pair.toUpperCase()}:`, error);
        setIsConnected(false);
      };

      return socket;
    });

    return () => {
      sockets.forEach(socket => socket.close());
      setIsConnected(false);
    };
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{Color: 'green'}}>Dashboard de Criptomoedas <img src={Icon} alt="Crypto Icon"  /></h1>
      <div className="row">
        <div className="col">
          <h2 className="mb-3">Bitcoin (BTC)</h2>
          <CryptoTable trades={tradesBTC} isConnected={isConnected} />
        </div>
        <div className="col">
          <h2 className="mb-3">Ethereum (ETH)</h2>
          <CryptoTable trades={tradesETH} isConnected={isConnected} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 className="mb-3">Solana (SOL)</h2>
          <CryptoTable trades={tradesSOL} isConnected={isConnected} />
        </div>
        <div className="col">
          <h2 className="mb-3">Dogecoin (DOGE)</h2>
          <CryptoTable trades={tradesDOGE} isConnected={isConnected} />
        </div>
      </div>
    </div>
  );
}

export default App;
