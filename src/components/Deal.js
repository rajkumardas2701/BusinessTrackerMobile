import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import EditDeal from './EditDeal';
import {calulateBalance} from '../helper_functions/helperMethods';

const Deal = ({deal, setDealID, showDeleteWarning, setShowDeleteWarning}) => {
  const [showEditDeal, setShowEditDeal] = useState(false);
  const [dealBalance, setDealBalance] = useState(0.0);
  const [farmerAmount, setFarmerAmount] = useState(0.0);
  const [dealerAmount, setDealerAmount] = useState(0.0);

  useEffect(() => {
    const [a, b, c] = calulateBalance(deal);
    setDealBalance(a);
    setFarmerAmount(b);
    setDealerAmount(c);
  }, [deal]);

  const handleDealClick = () => {
    setDealID(deal.id);
  };

  const handleEditForm = () => {
    setShowEditDeal(!showEditDeal);
  };

  const handleDeleteForm = () => {
    setShowDeleteWarning(!showDeleteWarning);
    setDealID(deal.id);
  };

  return (
    <View style={styles.dealContainer}>
      {showEditDeal && (
        <EditDeal deal={deal} setShowEditDeal={setShowEditDeal} />
      )}
      <TouchableOpacity onPress={handleDealClick} style={styles.dealButton}>
        <View style={styles.dealHead}>
          <Text style={styles.dealHeadText}>
            {`${deal.vehicle_date
              .slice(0, -8)
              .toUpperCase()} | ${deal.vehicle_date.slice(
              -8,
              -4,
            )}-${deal.vehicle_date.slice(-4, -2)}-${deal.vehicle_date.slice(
              -2,
            )}`}
          </Text>
          <View style={styles.dealHeadIconsContainer}>
            <FontAwesomeIcon
              icon={faEdit}
              style={[styles.dealHeadIcon, {color: 'blue'}]}
              onPress={handleEditForm}
            />
            <FontAwesomeIcon
              icon={faTrash}
              style={[styles.dealHeadIcon, {color: 'red'}]}
              onPress={handleDeleteForm}
            />
          </View>
        </View>

        <View style={styles.dealRow}>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Farmer:</Text>
            <Text style={styles.dealContentValue}>{deal.f_name}</Text>
          </View>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Dealer:</Text>
            <Text style={styles.dealContentValue}>{deal.d_name}</Text>
          </View>
        </View>

        <View style={styles.dealRow}>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Qty (in KG):</Text>
            <Text style={styles.dealContentValue}>{deal.f_quantiy} KG</Text>
          </View>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Qty (in KG):</Text>
            <Text style={styles.dealContentValue}>{deal.d_quantity} KG</Text>
          </View>
        </View>

        <View style={styles.dealRow}>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Discount (in KG):</Text>
            <Text style={styles.dealContentValue}>{deal.f_choot} KG</Text>
          </View>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Discount (in KG):</Text>
            <Text style={styles.dealContentValue}>{deal.d_choot} KG</Text>
          </View>
        </View>

        <View style={styles.dealRow}>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Rate:</Text>
            <Text style={styles.dealContentValue}>{deal.f_rate}</Text>
          </View>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Rate:</Text>
            <Text style={styles.dealContentValue}>{deal.d_rate}</Text>
          </View>
        </View>

        <View style={styles.dealRow}>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Amount:</Text>
            <Text style={styles.dealContentValue}>{farmerAmount}</Text>
          </View>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Amount:</Text>
            <Text style={styles.dealContentValue}>{dealerAmount}</Text>
          </View>
        </View>

        <View style={styles.dealRow}>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Transport:</Text>
            <Text style={styles.dealContentValue}>{deal.vehicle_fare}</Text>
          </View>
          <View style={styles.dealContent}>
            <Text style={styles.dealContentLabel}>Labour:</Text>
            <Text style={styles.dealContentValue}>{deal.labour_charge}</Text>
          </View>
        </View>
        <View style={styles.balanceRow}>
          <View
            style={[
              styles.dealBalanceStyle,
              {backgroundColor: dealBalance < 0 ? 'red' : 'green'},
            ]}>
            <Text style={[styles.dealText, styles.dealLabel]}>Balance:</Text>
            <Text style={styles.dealText}>
              {dealBalance.toLocaleString()}/-
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

Deal.propTypes = {
  deal: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setDealID: PropTypes.func.isRequired,
  // setShowDeleteWarning: PropTypes.func.isRequired,
  // showDeleteWarning: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  dealContainer: {
    width: 400,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 15,
  },
  dealButton: {
    width: '100%',
    borderRadius: 10,
  },
  dealButtonHover: {
    backgroundColor: 'aquamarine',
  },
  dealRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  dealButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  dealContent: {
    display: 'flex',
    flexDirection: 'row',
    width: '49%',
    justifyContent: 'space-between',
  },
  dealHeadIconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 50,
    justifyContent: 'space-between',
  },
  dealContentParagraph: {
    marginBottom: 0,
  },
  dealHeadText: {
    fontWeight: 900,
    color: 'brown',
  },
  dealContentValue: {
    fontFamily: 'serif',
    color: 'black',
  },
  dealHead: {
    justifyContent: 'space-around',
    alignItems: 'center',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  dealBalanceParagraph: {
    alignContent: 'center',
    margin: 5,
  },
  dealContentLastParagraph: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  dealBalance: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 'large',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'green',
    color: 'white',
  },
  dealContentLabel: {
    fontWeight: 'bold',
    color: 'gray',
  },
  dealBalanceStyle: {
    width: '80%',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    marginHorizontal: 30,
    borderRadius: 5,
  },
  dealText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  dealLabel: {
    marginRight: 5,
  },
  balanceRow: {
    justifyContent: 'center',
  },
});

export default Deal;
