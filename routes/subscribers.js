const express=require('express')
const router=express.Router()
const Subscriber=require('../models/subscriber')

//Getting All subscribers
router.get('/', async (req,res)=>{
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//One 
router.get('/:id',getSubscriber,(req,res)=>{
    res.send(res.subscriber)

})
//Creating one Subscriber
router.post('/',async(req,res)=>{
    const subscriber=new Subscriber({
        name:req.body.name,
        subscriberToChannel:req.body.subscriberToChannel
    })

    try{
        const newSubscriber = await subscriber.save()
        //201 means object successfully create
        res.status(201).json(newSubscriber)
    }catch(err){
        //200 means something wrong with the user input not with the server.
        res.status(400).json({message:err.message})
    }
})
//Updating one subscriber
//--If we use PUT it updates all the subscribers,but here we want to update just one which user wanna update.
router.patch('/:id',getSubscriber, async (req,res)=>{
    if(req.body.name!=null){
        res.subscriber.name=req.body.name
    }
    if(req.body.subscriberToChannel !=null){
        res.subscriber.subscriberToChannel=req.body.subscriberToChannel
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
    }catch(err){
        res.status(400).json({message:err.message})        
    }

})
//Deleting one subscriber
router.delete('/:id',getSubscriber,async(req,res)=>{
    try{
        await res.subscriber.remove
        res.json({message:'deleted subscriber'})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

async function getSubscriber(req,res,next){
    let subscriber
    try{
        subscriber=await Subscriber.findById(req.params.id)
        if(subscriber==null){
            return res.status(404).json({message:'cannot find subscriber'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.subscriber=subscriber
    next()

}

module.exports=router