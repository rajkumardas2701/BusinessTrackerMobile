import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Transaction from '../components/Transaction';
import DashboardContext from '../contexts/DashboardContext';
import DeleteWarning from '../layouts/DeleteWarning';
import {filterSideTxs} from '../helper_functions/helperMethods';

const SideTransactions = () => {
  const {txs} = useContext(DashboardContext);
  const [sTxs, setSTxs] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteTxID, setDeleteTxID] = useState(0);
  useEffect(() => {
    setSTxs(filterSideTxs(txs));
  }, [txs]);

  return (
    <View style={styles.sideTransactionsContainer}>
      <View style={styles.sideTransactionsTableHead}>
        <View style={styles.sideTransactionsTableHeadContent}>
          <Text style={styles.transactionFirstFour}>Date</Text>
          <Text style={styles.transactionFirstFour}>Amount</Text>
          <Text style={styles.transactionFirstFourSentReceive}>
            Sent/Received
          </Text>
          <Text style={styles.editDelete}>Edit</Text>
          <Text style={styles.editDelete}>Delete</Text>
        </View>
      </View>
      <ScrollView style={styles.sideTransactionsList}>
        <View style={styles.sideTransactionsTableBody}>
          {sTxs && sTxs.length ? (
            sTxs.map(sTx => (
              <Transaction
                key={sTx.id}
                sTx={sTx}
                setShowDeleteWarning={setShowDeleteWarning}
                showDeleteWarning={showDeleteWarning}
                setDeleteTxID={setDeleteTxID}
              />
            ))
          ) : (
            <View>
              <Text style={styles.noTransactionsText}>
                There's no other transactions to show now
              </Text>
            </View>
          )}
        </View>
        {showDeleteWarning && (
          <DeleteWarning fn={setShowDeleteWarning} deleteTxID={deleteTxID} />
        )}
      </ScrollView>
    </View>
  );
};

const {height} = Dimensions.get('window');
const vh = height / 100;

const styles = StyleSheet.create({
  sideTransactionsContainer: {
    width: 430,
    marginLeft: 135,
    paddingRight: 5,
  },
  sideTransactionsList: {
    height: 78 * vh,
    postion: 'absolute',
    top: 30,
  },
  sideTransactionsTableHead: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignContent: 'center',
    paddingTop: 5,
    position: 'absolute',
    width: '100%',
    height: 30,
    zIndex: 999,
  },
  sideTransactionsTableHeadContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  transactionFirstFour: {
    flex: 1.2,
    fontWeight: 900,
    width: 5,
    textAlign: 'center',
    color: 'blue',
  },
  transactionFirstFourSentReceive: {
    // Add styles for transaction-first-four-sent-receive
    flex: 2,
    fontWeight: 900,
    textAlign: 'center',
    color: 'blue',
  },
  transactionFirstFourSmall: {
    // Add styles for transaction-first-four-small
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  transactionsRemarkSmall: {
    // Add styles for transactions-remark-small
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  editDelete: {
    // Add styles for edit-delete
    flex: 0.6,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 14,
    color: 'blue',
  },
  sideTransactionsTableBody: {
    // height: 700,
  },
  noTransactionsText: {
    // Add styles for noTransactionsText
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'gray',
  },
});

export default SideTransactions;
