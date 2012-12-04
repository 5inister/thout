//Import required modules.
var htmlparser = require('htmlparser'),
        select = require('soupselect').select,
           URI = require('URIjs'),
            fs = require('fs'),
       handler = new htmlparser.DefaultHandler(get_links), //Define the handler,
        parser = new htmlparser.Parser(handler); //and the parser.

function Node_parser(name){
    this.name = name;
    console.log("Hello" + name + ", my Node_parser is online now.");
}

//Gets the filename (e.g. foo.html) for all the links(<a> tags) in a html file.
function get_links(error,dom){
    if(error)
	console.log(error);
    else{
	console.log("parsing started");
	console.log(dom);
	var a_tags = select(dom,'a');
	a_tags.forEach(get_filename);
    }
}

//Returns the filenames (e.g. foo.html) for an array of links. 
//Meant to be called back from the get_links function.
function get_filename(a_tag){
    var currentTag = new URI(a_tag.attribs.href);
    var filename = currentTag.filename();
    console.log(filename);
    return filename
}

function load_file(file){
    try{
        var file_data = fs.readFileSync(file);
        console.log(file + " loaded");
        console.log("file data:\n" + file_data);
        return file_data;
    }catch(err){
        console.log(file + " not loaded: " + err);
        throw err; //TODO this statement may need changing for release
    }
}

var rawHtml = "<html><head>You are what you is</head><body><a href='http://www.google.com/index.html#algo'>blabla</a><a href='http://www.yahoo.com/mail.html'>yahoo</a><a href='http://foo.com/bar.html#wtf'</a></body></html>";
//parser.parseComplete(load_file("index.html"));
Node_parser.prototype.load_file = load_file;