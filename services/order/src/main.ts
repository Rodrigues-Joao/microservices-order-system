import express from 'express';

const app = express();
const routes = express.Router();
app.use( express.json() );
routes.get( '/', ( req, res ) =>
{
    res.send( 'Order service is running' );
} )
app.use( routes );
app.listen( 3000, () =>
{
    console.log( 'Order service is running on port 3000' );
} )
