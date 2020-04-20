const express = require('express')
const app = express()

const port = process.env.PORT || 3001

let db = []

// start refresh timer
setInterval( _ => {
  db = db.filter( item => {
    const now = Date.now()
    return item.created_at + 30000 > now
  })
  console.log( db )
}, 5000)

// REST routing
app.use( express.json() )

app.get('/', ( req, res ) => {
  res.send('It works!')
})

app.post('/channels/:channelId', (req, res) => {
  const channelId = req.params.channelId

  db = db.filter( item => {
    return !(item.channelId === channelId && item.peerId === req.body.peerId)
  })
  db.push( Object.assign( {}, req.body, {
    channelId,
    'created_at': Date.now()
  } ) )
  res.send('ok')
})

app.get('/channels', ( req, res ) => {
  res.json(
    db.reduce((accum, curr) => {
      const channelId = curr.channelId
      if( !accum[channelId] ) accum[channelId] = []
      accum[channelId].push({ peerId: curr.peerId, created_at: curr.created_at })
      return accum
    }, {})
  )
})

app.listen( port, _ => {
  console.info('server listening on', port )
})

