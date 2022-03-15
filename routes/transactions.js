const express = require('express');
const router = express.Router();
const {getTransactions,addTransaction,deleteTransactions} =require("../controller/transactions")

// router.get("/",(req,res)=>{
//     res.send("Hello ")
// })

router.route('/')
.get(getTransactions)
.post(addTransaction);

router.route('/:id').delete(deleteTransactions)
module.exports=router;