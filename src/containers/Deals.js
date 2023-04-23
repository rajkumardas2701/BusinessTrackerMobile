import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import DashboardContext from '../contexts/DashboardContext';
import Deal from '../components/Deal';
// import DealTransactions from './DealTransactions';
import {
  filterDealTransactions,
  fetchDealName,
} from '../helper_functions/helperMethods';
// import DeleteWarning from '../layouts/DeleteWarning';

const Deals = () => {
  const {deals, txs} = useContext(DashboardContext);
  const [dealTransacts, setDealTransacts] = useState([]);
  const [dealName, setDealName] = useState('');
  // const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [dealID, setDealID] = useState(0);

  useEffect(() => {
    setDealTransacts(filterDealTransactions(txs, dealID));
    setDealName(fetchDealName(dealID, deals));
  }, [txs, dealID, deals]);

  return (
    <View style={styles.container}>
      <View style={styles.dealsContainer}>
        <ScrollView style={styles.dealsList} horizontal={true}>
          {deals && deals.length ? (
            deals.map(deal => (
              <Deal
                key={deal.id}
                deal={deal}
                setDealID={setDealID}
                // showDeleteWarning={showDeleteWarning}
                // setShowDeleteWarning={setShowDeleteWarning}
              />
            ))
          ) : (
            <View style={styles.loader}>
              <Text>No Deals to show yet</Text>
            </View>
          )}
        </ScrollView>
      </View>
      {/* <View style={styles.transactionsContainer}>
        <DealTransactions dealTransacts={dealTransacts} dealName={dealName} />
      </View>
      {showDeleteWarning && <DeleteWarning fn={setShowDeleteWarning} dealID={dealID} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 430,
    marginLeft: 135,
    paddingRight: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  dealsContainer: {
    // marginBottom: 10,
  },
  dealsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  dealsList: {
    // display: 'flex',
    // flexDirection: 'row',
    // // flexWrap: 'wrap',
    // overflow: 'scroll',
    // hieght: 200,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionsContainer: {
    marginBottom: 20,
  },
});

export default Deals;
