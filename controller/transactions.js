//bring model
const Transaction = require('../models/Transaction')


//@desc get all transactions
//@route get /api/v1/transactions
//@access public

exports.getTransactions = async (req,res,next)=>{ //will return promise so async await
    // res.send("GET transactions")
    try {
        const transactions = await Transaction.find() //promise so await
        return res.status(200).json({
            success:true,
            count : transactions.length,
            data:transactions //this json depends on you how you want to send
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            error:'Server Error'
        })
    }
}

//@desc Add transaction
//@route post /api/v1/transactions
//@access public

exports.addTransaction = async (req,res,next)=>{
    // res.send("POST transaction")
    try {
    const {text,amount}  =req.body;
    const transactions = await Transaction.create(req.body);
 
    return res.status(201).json({ //diff between send and status
     success:true,
     data:transactions 
    })
        
    } catch (err) {
        if(err.name==='ValidationError'){
            //pull out message from error
            const msg = Object.values(err.errors).map(val=>val.message)
            return res.status(400).json({
                success:false,
                error: msg 
            }) //400 because it will send err to client 
        }else{
            return res.status(500).json({
                success:false,
                error:'Server Error'
            })
        }
    }
   
}

//@desc delete transactions
//@route delete /api/v1/transactions/:id
//@access public

exports.deleteTransactions = async (req,res,next)=>{
    // res.send("DELETE transactions")
    try {
        const transaction = await Transaction.findById(req.params.id); //method called on model
        if(!transaction){
            return res.status(404).json({
                success:false,
                error:'No Transaction Found'
            })
        }

        await transaction.remove(); //method called on resource 
        return res.status(200).json({
            success:true,
            data:{}
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            error:'Server Error'
        })
    }
}