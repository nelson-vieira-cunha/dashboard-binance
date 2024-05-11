export const setTradesBTC = (trades) => ({
    type: 'SET_TRADES_BTC',
    payload: trades,
  });
  
  export const setTradesETH = (trades) => ({
    type: 'SET_TRADES_ETH',
    payload: trades,
  });
  
  export const setTradesSOL = (trades) => ({
    type: 'SET_TRADES_SOL',
    payload: trades,
  });
  
  export const setTradesDOGE = (trades) => ({
    type: 'SET_TRADES_DOGE',
    payload: trades,
  });
  
  export const setConnectionStatus = (status) => ({
    type: 'SET_CONNECTION_STATUS',
    payload: status,
  });