import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {fetchDeals, fetchTxs} from '../utils/apiCalls';
import DashboardContext from '../contexts/DashboardContext';
import Deals from './Deals';
import SideTransactions from './SideTransactions';
import Balance from '../layouts/Balance';
import SessionContext from '../contexts/SessionContext';
// import ExcelExport from '../components/ExportExcel';
// import CreateDeal from '../components/CreateDeal';
// import CreateTransaction from '../components/CreateTransaction';
// import EditTransaction from '../components/EditTransaction';

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
  const handleSwitch = e => {
    // console.log(e);
    setShowDeals(!showDeals);
    e.preventDefault();
  };
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
        // <Animated.View style={animatedStyles} />
        <Text style={[styles.dashboardMsg, {color: msgColor}]}>
          {apiMsg ? apiMsg : 'Api Msgs here'}
        </Text>
        // </Animated.View>
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
        <View style={styles.dealsTransactionsSwitchContainer}>
          <View style={styles.dealsTransactionsSwitch}>
            <TouchableOpacity
              style={[
                styles.switchButton,
                showDeals ? styles.activeButton : null,
              ]}
              onPress={handleSwitch}>
              <Text style={styles.switchButtonText}>
                Deals and Transactions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.switchButton,
                !showDeals ? styles.activeButton : null,
              ]}
              onPress={handleSwitch}>
              <Text style={styles.switchButtonText}>Other Transactions</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dealTransactionsContainer}>
            {showDeals ? <Deals /> : <SideTransactions />}
          </View>
        </View>
        {/* <TouchableOpacity
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardMsg: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    top: -20,
    left: 10,
    zIndex: 9999,
    width: 400,
    backgroundColor: 'white',
  },
  dealsTransactionsSwitchContainer: {
    width: 400,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealsTransactionsSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 80,
    height: 40,
    marginLeft: 140,
  },
  switchButton: {
    width: 220,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  switchButtonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 800,
    marginTop: 7,
    color: 'black',
  },
  activeButton: {
    backgroundColor: 'cyan',
  },
});

export default Dashboard;
