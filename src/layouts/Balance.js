import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DashboardContext from '../contexts/DashboardContext';
import {getBalance} from '../helper_functions/helperMethods';

const Balance = () => {
  const {txs} = useContext(DashboardContext);
  const [balance, setBalance] = useState(0.0);

  useEffect(() => {
    getBalance(txs, setBalance);
  }, [txs]);

  return (
    <View
      style={[
        styles.container,
        balance < 0 ? styles.redBackground : styles.greenBackground,
      ]}>
      <Text style={styles.label}>Balance:</Text>
      <Text style={styles.balanceText}>INR {balance.toLocaleString()}/-</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    alignItems: 'center',
    width: 350,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 140,
    marginTop: 5,
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
