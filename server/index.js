//this file is use for making server

const express = require('express')
const connectDB = require('./db.js')
const cors = require('cors')
const mongoose = require('mongoose')
const userTable = require('./model/campaignTable.js')
const campaignTable = require('./model/campaignTable.js')
const customerTable = require('./model/customerTable.js')
const purchaseTable = require('./model/purchaseTable.js')
const warehouseTable = require('./model/warehouseTable.js')

const app = express()
app.use(express.json());
app.use(cors())
connectDB()
const port = 5000
app.listen(port,()=>{
    console. log(`app is running on ${port}`)
})

// get req on add-campaign
// to get the books data from database
app.get('/Add-campaign', async(req,res)=>{
    try {
        console.log("start of res")
        const allData = await warehouseTable.find({})
        res.json({status:"ok",data:allData})
        console.log("res send")
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})


// post request on add-campaign

app.post('/Add-campaign', async(req,res)=>{
    const books  = req.body.books; // Expecting an array of books with bookId and quantity

    
    const camp= req.body;
    console.log("books ",books);
    console.log("camp ",camp)
    try {
        for (const { bookId, quantity } of books) {
            const book = await warehouseTable.findOne({ bookId });
            if (book) {
                book.stockQuantity -= quantity;
                await book.save();
            } else {
                console.log(`Book with ID ${bookId} not found`);
            }
        }

        
        
        const newCamp = new campaignTable(camp)
        await newCamp.save();
        res.json({ message: 'Inventory updated successfully' });


    } catch(error){
        console.log(error)
        res.status(500).json({message: "Error occured ",error:error.message})
    }
}) 


// get req on /campaign 
app.get("/Campaign", async(req,res)=>{
    
    try {
        console.log("start of res")
        const allData = await campaignTable.find({})
        res.json({status:"ok",data:allData})
        console.log("res send")
    } catch (error) {
        res.send(error)
        console.log(error)
    }
    
})


// get req on individual camp

app.get(`/Campaign/:campaignId`, async(req,res)=>{
    try {
         // Extract campaignId from the URL parameters
         const { campaignId } = req.params;

         // Fetch the campaign from the database using campaignId
         const campaign = await campaignTable.findOne({ campaignId: campaignId });
         // Check if the campaign exists
         if (!campaign) {
             return res.status(404).json({ message: 'Campaign not found' });
            }
            
            const customer = await customerTable.find({})
           const purchase = await purchaseTable.find({})

           console.log("customers",customer)
         // Send the campaign data as JSON
         res.json({status:"ok",data:{campaign,customer,purchase}});
    } catch (error) {
        console.log("err in ind camp ",error)
    }
}) 


// post req from individual campaign

app.post(`/Campaign/:campaignId`, async (req,res)=>{
    const {name,
        phone,
        custAdd,
        mail,
        books,
        totalAmount,
    } = req.body;


        const session = await mongoose.startSession();
        session.startTransaction();
        const  campaignId = Number(req.params.campaignId);
        // const newcampaignId = Number(campaignId)
        console.log(campaignId)
        console.log("books",books)
    
        try {
        
            // Check if the customer exists
            let existingCustomer = await customerTable.findOne({ phoneNumber: phone }).session(session);
    
            // If customer does not exist, create a new one
            if (!existingCustomer) {
                existingCustomer = new customerTable({
                    name: name,
                    email: mail,
                    address:custAdd,
                    phoneNumber:phone,

                });
                console.log("exit cust",existingCustomer)
                await existingCustomer.save({ session });
            }else{
                console.log("customer already exist")
            }
    
            // Create a new purchase entry
            const purchase = new purchaseTable({
                customerId: existingCustomer.customerId,
                campaignId: campaignId, 
                books: books,
                totalAmount: totalAmount,
            });
            await purchase.save({ session });

            // update the campaign inventory

            const campaign = await campaignTable.findOne({campaignId:campaignId}).session(session);
        
            if (campaign) {
                books.forEach((book) => {
                    const bookInCampaign = campaign.books.find((item) => item.bookId === book.bookId);
                    if (bookInCampaign) {
                        // Reduce the book quantity in the campaign based on purchase
                        bookInCampaign.quantity -= book.order;
                        if (bookInCampaign.quantity < 0) bookInCampaign.quantity = 0; // Ensure non-negative quantity
                    }
                });
    
                // Save the updated campaign data
                await campaign.save({ session });
            } else {
                throw new Error("Campaign not found");
            }
    
    
            // Commit the transaction
            await session.commitTransaction();
            session.endSession();
    
            res.status(200).json({ message: 'Purchase recorded successfully', purchase });


        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            res.status(500).json({ message: 'Failed to record purchase', error: error.message });
        }


})