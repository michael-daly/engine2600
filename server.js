const path = require ('path');

const express = require ('express');
const app     = express ();
const server  = require ('http').Server (app);

const PORT = 3000;


app.use ('/', express.static (path.join (__dirname)));

app.get ('/*', ( req, res ) =>
{
	res.sendFile ('index.html', { root: path.join (__dirname) });
});

server.listen (PORT, '127.0.0.1', () =>
{
	console.log ('Listening on port %d', PORT);
});
