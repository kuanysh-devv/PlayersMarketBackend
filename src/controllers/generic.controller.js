const boom = require('boom')

const genericCrud = (model) => ({
    async get({ params: { id } }, req, res){
        try {
            const item = await model.findById(id)
            return res.status(200).send(item)   
        } catch (err) {
            const error = boom.boomify(err);
            return res.status(400).send(error);
        }
    },
    async getAll(req, res){
        try {
            const items = await model.find()
            return res.status(200).send(items);  
        } catch (err) {
            const error = boom.boomify(err);
            return res.status(400).send(error);
        }
    },
    async create({ body }, res){ // title: Contrlo
        try {
            const item = new model(body)
            const newItem = await item.save()
            return res.status(200).send(newItem);  
        } catch (err) {
            const error = boom.boomify(err);
            return res.status(400).send(error);
        }
    },
    async update({ params: { id }, body }, res){ //title: Control
        try {
            const item = await model.findByIdAndUpdate(id, body, { new: true })
            return res.status(200).send(item);     
        } catch (err) {
            const error = boom.boomify(err);
            return res.status(400).send(error);
        }
    },
    async delete({ params: { id } }, res){
        try {
            await model.findByIdAndDelete(id)
            return res.status(200).send({ status: 'OK', message: 'Продукт удален' }); 
        } catch (err) {
            const error = boom.boomify(err);
            return res.status(400).send(error);
        }
    }
})

module.exports = genericCrud