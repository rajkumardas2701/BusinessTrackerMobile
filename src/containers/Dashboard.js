import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {fetchDeals, fetchTxs} from '../utils/apiCalls';
import DashboardContext from '../contexts/DashboardContext';
import Deals from './Deals';
import SideTransactions from './SideTransactions';
import Balance from '../layouts/Balance';
import SessionContext from '../contexts/SessionContext';
// import ExcelExport from '../components/ExportExcel';
import CreateDeal from '../components/CreateDeal';
import CreateTransaction from '../components/CreateTransaction';
import EditTransaction from '../components/EditTransaction';

const Dashboard = () => {
  const [deals, setDeals] = useState([]);
  const [apiMsg, setApiMsg] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [msgColor, setMsgColor] = useState('');
  const [sTxs, setSTxs] = useState([]);
  const [txs, setTxs] = useState([]);
  const [showEditTransactionForm, setShowEditTransactionForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const {setSessionDetails} = useContext(SessionContext);
  const [showApiMsgLoader, setShowApiMsgLoader] = useState(false);
  const [showDeals, setShowDeals] = useState(false);
  const [showCreateDeal, setShowCreateDeal] = useState(false);
  const [showCreateTransaction, setShowCreateTransaction] = useState(false);
  useEffect(() => {
    fetchDeals(
      setDeals,
      setApiMsg,
      setShowMessage,
      setMsgColor,
      setSessionDetails,
      setShowApiMsgLoader,
    );
    fetchTxs(
      setTxs,
      setApiMsg,
      setShowMessage,
      setMsgColor,
      setShowApiMsgLoader,
    );
  }, [setSessionDetails]);
  // const handleSwitch = e => {
  //   setShowDeals(!showDeals);
  //   e.preventDefault();
  // };
  // const handleCreateDeal = e => {
  //   setShowCreateDeal(!showCreateDeal);
  //   e.preventDefault();
  // };
  // const handleCreateTransaction = e => {
  //   setShowCreateTransaction(!showCreateTransaction);
  //   e.preventDefault();
  // };
  return (
    <View style={styles.dashboardContainer}>
      {(showMessage || showApiMsgLoader) && apiMsg !== '' && (
        <Text style={[styles.dashboardMsg]}>{apiMsg}</Text>
      )}
      <DashboardContext.Provider
        value={{
          deals,
          setDeals,
          apiMsg,
          setApiMsg,
          setShowMessage,
          setMsgColor,
          sTxs,
          setSTxs,
          showEditTransactionForm,
          setShowEditTransactionForm,
          editFormData,
          setEditFormData,
          txs,
          setTxs,
          showApiMsgLoader,
          setShowApiMsgLoader,
          setShowDeals,
        }}>
        <Balance />
        {/* {console.log(typeof styles.msgApiColor.msg_err)} */}
        {/* <View style={styles.dealTransactionsSwitchContainerSmall}>
          <View style={styles.dealsTransactionsSwitch}>
            <TouchableOpacity
              style={[
                styles.showDealsButton,
                {
                  backgroundColor: !showDeals ? 'blue' : 'white',
                  borderWidth: !showDeals ? 0 : 1,
                },
              ]}
              onPress={handleSwitch}>
              <Text
                style={[
                  styles.showDealsButtonText,
                  {color: !showDeals ? 'white' : 'blue', fontWeight: 'bold'},
                ]}>
                Deals and Transactions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.showDealsButton,
                {
                  backgroundColor: showDeals ? 'blue' : 'white',
                  borderWidth: showDeals ? 0 : 1,
                },
              ]}
              onPress={handleSwitch}>
              <Text
                style={[
                  styles.showDealsButtonText,
                  {color: showDeals ? 'white' : 'blue', fontWeight: 'bold'},
                ]}>
                Other Transactions
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dealTransactionsContainer}>
            {showDeals ? <Deals /> : <SideTransactions />}
          </View>
        </View>
        <TouchableOpacity
          onPress={handleCreateDeal}
          style={styles.createDealButton}>
          <Text style={styles.createDealButtonText}>Create Deal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCreateTransaction}
          style={styles.createTransactionButton}>
          <Text style={styles.createTransactionButtonText}>
            Enter Transaction
          </Text>
        </TouchableOpacity>
        <View style={styles.excelExport}>
          <ExcelExport excelData={txs} fileName={new Date().toISOString()} />
        </View>
        {showCreateDeal && <CreateDeal setShowCreateDeal={setShowCreateDeal} />}
        {showCreateTransaction && (
          <CreateTransaction
            setShowCreateTransaction={setShowCreateTransaction}
          />
        )}
        {showEditTransactionForm && <EditTransaction />} */}
      </DashboardContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardMsg: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
  dealTransactionsLarge: {
    flexDirection: 'row',
    width: '100%',
    height: '50%',
  },
  dealTransactionsSwitchContainerSmall: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealsTransactionsSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '10%',
    marginTop: 10,
  },
  showDealsFalse: {
    width: '50%',
    height: '100%',
    backgroundColor: '#fff',
    color: 'blue',
    fontWeight: 'bold',
    borderWidth: 0,
  },
  showDealsTrue: {
    width: '50%',
    height: '100%',
    backgroundColor: '#fff',
    color: 'blue',
    fontWeight: 'bold',
    borderWidth: 0,
  },
  dealTransactionsContainer: {
    width: '100%',
    height: '40%',
    marginTop: 10,
  },
  createDeal: {
    backgroundColor: '#fff',
    color: 'blue',
    fontWeight: 'bold',
    width: '100%',
    height: 40,
    marginVertical: 10,
    borderWidth: 0,
  },
  createTransaction: {
    backgroundColor: '#fff',
    color: 'blue',
    fontWeight: 'bold',
    width: '100%',
    height: 40,
    marginVertical: 10,
    borderWidth: 0,
  },
  excelExport: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgApiColor: {
    msg_ok: 'green',
    msg_err: 'red',
    msg_load: 'orange',
  },
});

export default Dashboard;
