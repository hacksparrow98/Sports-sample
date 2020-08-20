var bodyParser = require("body-parser"),
	express = require("express"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose"),
	app = express();

//	APP CONFIG
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/sportsVie", {useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false } );
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
// MONGOOSE CONFIG
var eventSchema = new mongoose.Schema({
	name : String,
	host : String,
	prize : Number,
	created : {type : Date, default: Date.now} 
});
var Events = mongoose.model("Events", eventSchema);

/*Events.create({
	name : "RSL",
	host : "RSL Association",
	prize : 5000
});*/

// RESTFUL ROUTES
app.get("/", function(req, res){
	res.redirect("/events");
});

//INDEX ROUTE
app.get("/events", function(req, res){
	Events.find({}, function(err, events){
		if(err){
			console.log("ERROR!!");
		}else{
			res.render("event-index", {events: events});
		}
	});
});

//NEW ROUTE
app.get("/events/new", function(req, res){
	res.render("event-new");
});

//CREATE ROUTE
app.post("/events", function(req, res){
	// console.log(req.body.)
	//create event
	Events.create(req.body.event, function(err, newEvent){
		if(err){
			res.render("new");
		}else{
			res.redirect("/events");
		}

	})
	//redirect
});

//SHOW ROUTE
app.get("/events/:id", function(req, res){
	Events.findById(req.params.id, function(err, foundEvent){
		if (err) {
			res.redirect("/events");
		}else{
			res.render("event-show", {event: foundEvent});
		}
	});
});

//EDIT ROUTE
app.get("/events/:id/edit", function(req, res){
	Events.findById(req.params.id, function(err, foundEvent){
		if (err) {
			res.redirect("/events");
		}else{
			res.render("event-edit", { event : foundEvent });
		}
	});
});

//UPDATE ROUTE
app.put("/events/:id", function(req, res){
	Events.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedEvent){
		if (err) {
			res.redirect("/events");
		}else{
			res.redirect("/events/"+req.params.id)
		}
	});
});

//DESTROY ROUTE
app.delete("/events/:id", function(req, res){
	Events.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			res.redirect("/events");
		}else{
			res.redirect("/events");
		}
	});
});

// console.log("Server is running a");


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
	console.log("Server webhook");
});
