import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import DashboardContext from '../contexts/DashboardContext';
import {getBalance} from '../helper_functions/helperMethods';
import {fetchTxs} from '../utils/apiCalls';

const Balance = () => {
  const {
    txs,
    setTxs,
    setApiMsg,
    setShowMessage,
    setMsgColor,
    setShowApiMsgLoader,
  } = useContext(DashboardContext);
  const [balance, setBalance] = useState(0.0);

  useEffect(() => {
    getBalance(txs, setBalance);
  }, [txs]);

  const handleClick = e => {
    fetchTxs(
      setTxs,
      setApiMsg,
      setShowMessage,
      setMsgColor,
      setShowApiMsgLoader,
    );
    // getBalance(txs, setBalance);
    e.preventDefault();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        balance < 0 ? styles.redBackground : styles.greenBackground,
      ]}
      onPress={handleClick}>
      <Text style={styles.label}>Balance:</Text>
      <Text style={styles.balanceText}>INR {balance.toLocaleString()}/-</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    alignItems: 'center',
    width: 325,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 130,
    marginTop: 10,
    marginBottom: 10,
  },
  redBackground: {
    backgroundColor: 'red',
  },
  greenBackground: {
    backgroundColor: 'green',
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  balanceText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Balance;
