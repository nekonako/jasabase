const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const syncAll = require('./model/sync-all.model')
const cookieParser = require('cookie-parser')
const app = express()
const siteConfig = require('./config/site.config')
const {routes} = require('./route/user.route')
// const { createProxyMiddleware }  = require('http-proxy-middleware')


// app.use('/api',createProxyMiddleware({
//    target : 'http://localhost:4000',
//    changeOrigin : true,
// }));
app.use(cors({
   origin: [
      'http://localhost:3000',
   ],
   credentials: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended : true
}
))
app.use(cookieParser());
syncAll()

app.get('/', (req,res) => {
   res.json({
      message : 'Welcome to jasabase API',
      _link : {
         services : {
            allServices : '/api/services',
            detailServices : '/api/services/:id',
            updateServices : '/api/services/:id',
            addProduct : '/api/services',
            deleteProduct : '/api/services/:id'
         },
         users : {
            allUsers : '/api/users',
            detailUsers : '/api/users/:id',
            updateUsername : '/api/users/username/:id',
            updatePassword : '/api/users/password/:id',
            addUsers : '/api/users',
            deleteUsers : '/api/users:id'
         }
      }
   })
})

require('./route/dev.route')(app)
require('./route/user.route')(app)
require('./route/public.route')(app)

app.listen(siteConfig.PORT, siteConfig.HOST, () => {
   console.log('server is rnning in ' + siteConfig.HOST + ':' + siteConfig.PORT)
})
