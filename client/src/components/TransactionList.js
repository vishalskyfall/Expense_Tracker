import React,{useContext, useEffect} from 'react'
import {GlobalContext} from '../context/GlobalState';
import {Transaction} from './Transaction';

export const TransactionList = () => {

  const {transactions,getTransactions} = useContext(GlobalContext)
  
  //if you make http kinda req you should do it in useEffect
  useEffect(()=>{
    getTransactions();  //learn this later on : eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) //empty array otherwise infinite loop
  return (<>
    <h3>History</h3>
      <ul  className="list">
        {transactions.map(transaction=>(<Transaction key={transaction.id} transaction={transaction}/>))}
        
      </ul></>
  )
}

// export default TransactionList