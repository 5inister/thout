//Import required modules.
var htmlparser = require('htmlparser'),
        select = require('soupselect').select,
           URI = require('URIjs'),
            fs = require('fs'),
       handler = new htmlparser.DefaultHandler(get_links), //Define the handler,
        parser = new htmlparser.Parser(handler); //and the parser.

//Defines the Node_parser class exported at the end of this file
function Node_parser(){
}

//Gets the filename (e.g. foo.html) for all the links(<a> tags) in a html file
//and returns them in an array
function get_links(error,dom){
    if(error)
	console.log(error);
    else{
    var files = [];
	//console.log("parsing started"); //for debugging
	//console.log(dom); //for debugging
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

//Reads and returns the content of a file
function load_file(file){
    try{
        var file_data = fs.readFileSync(file);
        console.log(file + " loaded");
        //console.log("file data:\n" + file_data); //for debugging
        return file_data;
    }catch(err){
        console.log(file + " not loaded: " + err);
        throw err; //TODO this statement may need changing for release
    }
}

Node_parser.prototype.load_file = load_file;
Node_parser.prototype.parser = parser;
module.exports = Node_parser;