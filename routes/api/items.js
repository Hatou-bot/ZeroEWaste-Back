const router = require('express').Router()
const itemsModel = require('../../models/items')

//GET /api/items
router.get('/', async (req, res) => {
    try {
        const rows = await itemsModel.getAll()
        res.json(rows)
    } catch(err) {
        //con esto estamos devolviendo un codigo http 500 para indicar que la petición no ha ido bien
        res.status(500).json({error: err.message})
    }
})

router.get('/:itemId', async(req, res) => {
    try {
        const row = await itemsModel.getById(req.params.itemId)
        res.json(row)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
    
})

router.get('/by-cat/:catName', async(req, res) =>{
    try{
        const row = await itemsModel.getByCat(req.params.catName)
        res.json(row)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

router.get('/by-name-asc/:nombre', async(req, res) => {
    try {
        const rows = await itemsModel.getByNameAsc(req.params.nombre)
        res.json(rows)
    } catch(err){
        res.status(500).json({error: err.message})
    }
})

router.get('/by-name-desc/:nombre', async(req, res) => {
    try {
        const rows = await itemsModel.getByNameDesc(req.params.nombre)
        res.json(rows)
    } catch(err){
        res.status(500).json({error: err.message})
    }
})

router.get('/by-date/:nombre', async(req, res) => {
    try {
        const rows = await itemsModel.getByRegDate(req.params.nombre)
        res.json(rows)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

router.get('/by-user/:nombre', async(req, res) => {
    try{
        const rows = await itemsModel.getByUser(req.params.nombre)
        res.json(rows)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

//POST http://localhost:3000/api/items
router.post('/', async(req, res) => {
   try{
        const result = await itemsModel.create(req.body)
        if(result.affectedRows >= 1){
            res.json({success: 'Item was created'})
        }else{
            res.json({error: 'Create failed'})
        }
   }catch(err) {
        res.status(500).json({error: err.message})
    }
})

//PUT http://localhost:3000/api/items/:id
router.put('/:itemId', async (req, res) => {
    try{
        const result = await itemsModel.updateById(req.params.itemId, req.body)
        if(result.affectedRows >= 1 ){
            res.json({success: 'item was updated'})
        }else{
            res.json({error: 'item was not updated'})
        }
    }catch(err) {
        res.status(500).json({error: err.message})
    }
})



//DELETE http://localhost:3000/api/items
router.delete('/:itemId', async(req, res) =>{
    try{
        const result = await itemsModel.remove(req.params.itemId)
        if(result.affectedRows >= 1 ){
            res.json({success: 'item was deleted'})
        }else{
            res.json({error: 'item was not deleted'})
        }
    }catch(err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router //comentario para hacer commi