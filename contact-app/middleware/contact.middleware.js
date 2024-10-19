const create = (req , res , next ) => {
    const { name,phone ,email}  = req.body;
    if (!name || !phone || !email) {
        res.status(404).json({
            error: true,
            message: 'Name, phone and email are required'
        });
        return;
    }
    next();
}

const sort = (req , res , next) => {
    const { key , order } = req.query;
    if (!key) {
        res.status(404).json({
            error: true, 
            message: 'Key is required for sorting' 
        });
        return;
    }

    if( order && (order !== 'asc' && order !== 'desc')) {
        res.status(404).json({
            error: true, 
            message: 'Invalid order. Only asc or desc are accepted' 
        });
        return;
    }
    req.query.order = order ?? 'asc';
    next();
}

module.exports = create;