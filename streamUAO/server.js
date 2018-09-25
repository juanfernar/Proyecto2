const express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var User = require('./models/users');



const app = express();

//Socket
var http = require('http').Server(app);
var io = require('socket.io')(http);



io.on('connection', function(socket){

 //Para el Chat	
  socket.on('chat message', function(msg){
	    io.emit('chat message', "Holiiii");
	    console.log('a user connected');
  });



});



const port = 3000;

// determina el elemento raíz de los archivos estatics
app.use(express.static('../streamUAO/'));
app.use(express.static('public'));
//app.use(express.static(__dirname + 'img'));




// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 3000000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/home');
    } else {
        next();
    }    
};

// route for user's Home page 
app.get('/home', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/index.html');
    } else {
        res.redirect('/login');
    }
});


// route for user's Home page 
app.get('/conferencista', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/conferencista.html');
    } else {
        res.redirect('/login');
    }
});


// route for user's Home page 
app.get('/espectador', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/espectador.html');
    } else {
        res.redirect('/login');
    }
});


// route for user's Home page 
app.get('/', (req, res) => {
	console.log("ENTRO AL INDEX.HTML")
    if (req.session.user && req.cookies.user_sid) {
    	
        res.sendFile(__dirname + '/index.html');
    } else {
    	console.log("NOOO....ENTRO AL INDEX.HTML")
        res.redirect('/login');
    }
});


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
    	console.log("redirecting...")
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;
            
            var userExist = validateUser(username, password);
            if(userExist[0]){
            	req.session.user = userExist[1];
            	res.cookie('img', userExist[1].img);
            	res.cookie('firstName', userExist[1].firstName);
            	res.cookie('lastName', userExist[1].lastName);
            	

          		//Decide los perfiles
            	if(userExist[1].perfil == '1'){
            		res.redirect('/espectador');
            	}
            	if (userExist[1].perfil == '2') {
            		res.redirect('/conferencista');	
            	}

            }else{
            	res.redirect('/login');
            }

    });

    // route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        console.log("Borrando Session");
        res.clearCookie('user_sid');        
        res.redirect('/');
        
    } else {
    	
        res.redirect('/login');
    }
});

/*Valia los usuarios existentes*/
function validateUser(username, password){

		var exist = false;
		var dataUser = [];

		for(var key in User)
		{
			 if(username == User[key].email && password == User[key].password){
			 	exist = true;
			 	dataUser = User[key];
			 }
		}

		return [exist, dataUser];
}


// acceso a los archivos estáticos que se van a servir
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.listen(port, () => {
 console.info('listening on %d', port);
});