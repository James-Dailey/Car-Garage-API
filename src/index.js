//require framework/instantiate
const fastify = require('fastify')({
    logger: true
})
//declare route
fastify.get('/', async(_request, _reply)=>{
    return {lets: 'dance'}
})
//require external modules
const mongoose= require('mongoose')

//import routes
const routes =require('./routes')

//import swagger options
const swagger = require('.config/swagger')

// register swagger
fastify.register(require('fastify-swagger'), swagger.options)

// connect to mongodb
mongoose.connect('mongodb://localhost/mycargarage')
.then(() => console.log('mongoDB connected...'))
.catch(err => console.log(err))

// loop over route
routes.forEach((route, _index) => {
    fastify.route(route)
});

// run server
const start = async()=> {
    try {
        await fastify.listen(3000, '0.0.0.0')
        fastify.swagger()
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) { 
        fastify.log.error(err)
        process.exit(1)
    }
}
start()