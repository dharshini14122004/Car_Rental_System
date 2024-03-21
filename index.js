const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')  
const { CarDetails }= require('./schema.js')  

const app = express()
app.use(bodyParser.json())
app.use(cors())

async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://dharshini14122004:Maluravi123@cluster0.qspmkpe.mongodb.net/CRS?retryWrites=true&w=majority&appName=Cluster0')
        console.log("DB connection established")

        const port = process.env.PORT||9000
        app.listen(port, function(){
            console.log(`listen on port  ${port}...`)
        })         
    } 
    catch(error){
        console.log("DB connection failed");
    }
}

connectToDb()

app.get('/get-cars', async function(request,response){
    try{
     const carData = await CarDetails.find()   
     response.status(200).json(carData)
    }
    catch(error){
        response.status(500).json({  
            "status": "failure",
            "message": "details not fetched",
            "error": error
        })
    }
})

app.post('/add-car-reservation', async function(request,response){
    try{
    await CarDetails.create({
        "startDate": request.body.startDate,
        "endDate": request.body.endDate,
        "name": request.body.name,
        "email": request.body.email,
        "phone": request.body.phone,
        "car": request.body.car,
    })
    response.status(201).json({  
        "status": "success",
        "message": "rent reservation successful"
    })
}catch(error){
    response.status(500).json({  
        "status": "failure",
        "message": "reservation not created",
        "error": error
    })
}
})

app.delete('/delete-car-reservation/:id', async function(request, response) {
    try {
        const  rentalId= await CarDetails.findById(request.params.id)
        if(rentalId) {
            await CarDetails.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status" : "success",
                "message" : "car reservation deleted"
            })
        } else {
            response.status(404).json({
                "status" : "failure",
                "message" : "page not found"
            })
        }
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not delete car reservation",
            "error" : error
        })
    }
})

// Assuming you have the necessary imports for Express and Mongoose

// DELETE endpoint to delete a rental item
// app.delete('/delete-car-reservation/:id', async (req, res) => {
//     try {
//       const rentalId = req.params.id;
  
//       // Ensure that the rentalId is a valid MongoDB ObjectId
//       if (!mongoose.Types.ObjectId.isValid(rentalId)) {
//         return res.status(400).json({ message: 'Invalid rental ID' });
//       }
  
//       // Attempt to delete the rental item from the database
//       const deletedRental = await CarDetails.findByIdAndDelete(rentalId);
  
//       // Check if the rental item was found and deleted
//       if (!deletedRental) {
//         return res.status(404).json({ message: 'Rental item not found' });
//       }
  
//       // If the rental item was successfully deleted, send a success response
//       res.sendStatus(200);
//     } catch (error) {
//       console.error('Error deleting rental:', error);
//       res.status(500).json({ message: 'Failed to delete rental' });
//     }
//   });



app.patch('/edit-car-reservation/:id', async function(request, response) {
    try {
        const carRent = await CarDetails.findById(request.params.id)
        if(carRent) {
            await carRent.updateOne({
                // "amount" : request.body.amount,
                // "category" : request.body.category,
                // "date" : request.body.date
                "startDate": request.body.startDate,
                "endDate": request.body.endDate,
                "name": request.body.name,
                "email": request.body.email,
                "phoneNumber": request.body.phoneNumber                
            })
            response.status(200).json({
                "status" : "success",
                "message" : "entry updated"
            })
        } else {
            response.status(404).json({
                "status" : "failure",
                "message" : "entry not found"
            })
        }
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not update entry",
            "error" : error
        })
    }
})