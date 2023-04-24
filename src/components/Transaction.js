import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import DashboardContext from '../contexts/DashboardContext';

const Transaction = ({
  sTx,
  setShowDeleteWarning,
  showDeleteWarning,
  setDeleteTxID,
}) => {
  const {setShowEditTransactionForm, showEditTransactionForm, setEditFormData} =
    useContext(DashboardContext);

  const handleEditForm = () => {
    setEditFormData({
      id: sTx.id,
      date: sTx.date,
      amount: sTx.amount,
      send_receive: sTx.send_receive,
      action_by: sTx.action_by,
      remark: sTx.remark,
      deal_id: sTx.deal_id,
    });
    setShowEditTransactionForm(!showEditTransactionForm);
  };

  const handleDeleteForm = () => {
    setDeleteTxID(sTx.id);
    setShowDeleteWarning(!showDeleteWarning);
  };

  return (
    <View style={styles.containerSmall}>
      <View style={styles.row1}>
        <Text style={styles.dateSmall}>{sTx.date}</Text>
        <Text style={styles.amountSmall}>{sTx.amount}</Text>
        <Text
          style={[
            styles.sendReceiveSmall,
            {color: sTx.send_receive === 'Sent' ? 'red' : 'green'},
          ]}>
          {sTx.send_receive}
        </Text>
        <TouchableOpacity
          style={styles.editButtonSmall}
          onPress={handleEditForm}>
          <FontAwesomeIcon icon={faEdit} style={styles.editIconSmall} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButtonSmall}
          onPress={handleDeleteForm}>
          <FontAwesomeIcon icon={faTrash} style={styles.deleteIconSmall} />
        </TouchableOpacity>
      </View>
      <View style={styles.row2}>
        <View style={styles.row2Item}>
          <Text style={styles.boldText}>Action by:</Text>
          <Text style={styles.textValue}>{sTx.action_by}</Text>
        </View>
        <View style={styles.row2Item}>
          <Text style={styles.boldText}>Remark:</Text>
          <Text style={styles.textValue}>{sTx.remark}</Text>
        </View>
      </View>
    </View>
  );
};

Transaction.propTypes = {
  sTx: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setShowDeleteWarning: PropTypes.func.isRequired,
  showDeleteWarning: PropTypes.bool.isRequired,
  setDeleteTxID: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  containerSmall: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    marginLeft: 10,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dateSmall: {
    flex: 0.6,
    fontWeight: 800,
    color: 'gray',
  },
  amountSmall: {
    flex: 0.5,
    fontWeight: 800,
    color: 'gray',
  },
  sendReceiveSmall: {
    flex: 0.7,
    textAlign: 'center',
    // paddingLeft: 30,
    // marginRight: 10,
  },
  editButtonSmall: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  editIconSmall: {
    color: 'blue',
  },
  deleteButtonSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  deleteIconSmall: {
    color: 'red',
  },
  row2: {
    flexDirection: 'column',
  },
  row2Item: {
    flex: 1,
    flexDirection: 'row',
    // marginRight: 10,
  },
  boldText: {
    fontWeight: '900',
    marginRight: 10,
    color: 'gray',
  },
  textValue: {
    color: 'maroon',
    fontWeight: 'bold',
  },
});

export default Transaction;
