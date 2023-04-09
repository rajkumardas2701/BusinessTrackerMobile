const getBalance = (sTxs, setBalance) => {
  const val = sTxs.reduce((acc, tx) => {
    let newacc;
    if (tx.send_receive === 'Sent') {
      newacc = acc - parseFloat(tx.amount);
    } else {
      newacc = acc + parseFloat(tx.amount);
    }
    return newacc;
  }, 0);
  setBalance(val);
};

const calulateBalance = deal => {
  const farExp =
    (parseFloat(deal.f_quantiy) - parseFloat(deal.f_choot)) *
    parseFloat(deal.f_rate);
  const dealExp =
    (parseFloat(deal.d_quantity) - parseFloat(deal.d_choot)) *
    parseFloat(deal.d_rate);
  const final =
    dealExp -
    farExp -
    parseFloat(deal.labour_charge) -
    parseFloat(deal.vehicle_fare);
  return [final, farExp, dealExp];
};

const filterDealTransactions = (txs, id) => txs.filter(tx => tx.deal_id === id);
const filterSideTxs = txs => txs.filter(tx => tx.deal_id === null);
const fetchDealName = (dealID, deals = []) => {
  const deal = deals.filter(d => d.id === dealID);
  return deal.length === 0
    ? 'No Deal selected'
    : deal[0] && deal[0].vehicle_date;
};

export {
  getBalance,
  filterDealTransactions,
  fetchDealName,
  filterSideTxs,
  calulateBalance,
};
