const express = require('express')
const upload = require('../middleware/upload')
const router = express.Router()
const path = require('path')
const WorkSchema = require('../models/work')

//upload work
router.get('/' , (req,res) =>{
    res.send('connected')
})
router.post('/newwork',async (req,res)=>{
    const {workTitle , links,workPhotos, workDescribtion} = req.body
    console.log(req.body)
    try {
        const newWork = await WorkSchema.create({
            workTitle ,
            workPhotos,
            workDescribtion,
            links
        })
        res.status(201).json({message : 'successfully added' , work : newWork})
    } catch (error) {
        res.status(400).json(error)
    }
})
//get work

router.post('/imageupload' , upload.array('photo') , async(req,res) =>{
    console.log(req.files)
    res.status(201).json(req.files)
})

router.get('/images/:id',(req,res) => {
    res.sendFile(path.join(path.dirname(require.main.filename) , 'images' , req.params.id))
})

//get all
router.get('/allwork',async(req,res) =>{
    try {
        const work = await WorkSchema.find()
        res.status(200).json(work)
    } catch (error) {
        res.status(500).json(error)
    }

})

//get one
router.get('/singlework/:id' , getWork,(req,res) =>{
    res.status(200).json(res.work)
})

//delete work
router.delete('/singlework/:id' , getWork,async (req,res) =>{
    const work = res.work
    try {
       const removedWork =  await work.remove()
       res.status(200).json({message : 'deleted successfully' , removedWork})
    } catch (error) {
        console.log(error)
    }
})

//patch work

router.patch('/singlework/:id' , getWork,async (req,res) =>{
    const {workTitle , workPhotos,links ,workDescribtion} = req.body
    try {
        const patchedWork = await res.work.update({$set : {workTitle,links , workDescribtion , workPhotos}})
        res.status(200).json({message : 'successfully patched', patchedWork})
    } catch (error) {
        res.status(400).json(error)
    }
    
})

async function getWork(req,res,next){
    const work = await WorkSchema.findById(req.params.id)
    if(work === null){
        return res.status(404).json({message : 'work isn\'t found'})
    }
    res.work = work
    next()
}

module.exports = router