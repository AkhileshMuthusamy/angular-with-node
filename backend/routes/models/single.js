const data = require('../../data.json');

module.exports = (req, res) => {
    const modelId = +req.params.modelId;
    const model = data.models.find(m => m.id === modelId);
    if(!model) {
        res.status(404).json({
            error: 'Model not found'
        });
    } else {
        res.status(200).json({
            model
        });
    }   
};