const initialState = {
    tradesBTC: [],
    tradesETH: [],
    tradesSOL: [],
    tradesDOGE: [],
    isConnected: false,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TRADES_BTC':
        return { ...state, tradesBTC: action.payload };
      case 'SET_TRADES_ETH':
        return { ...state, tradesETH: action.payload };
      case 'SET_TRADES_SOL':
        return { ...state, tradesSOL: action.payload };
      case 'SET_TRADES_DOGE':
        return { ...state, tradesDOGE: action.payload };
      case 'SET_CONNECTION_STATUS':
        return { ...state, isConnected: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;