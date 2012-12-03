//Import required modules.
var htmlparser = require('htmlparser'),
           sys = require('sys'),
        select = require('soupselect').select,
           URI = require('URIjs'),
       handler = new htmlparser.DefaultHandler(get_links), //Define the handler,
        parser = new htmlparser.Parser(handler); //and the parser.

//Gets the filename (e.g. foo.html) for all the links(<a> tags) in a html file.
function get_links(error,dom){
    if(error)
	console.log(error);
    else{
	var a_tags = select(dom,'a');
	a_tags.forEach(get_filename);
    }
}

//Returns the filenames (e.g. foo.html) for an array of links. Must be the callback for an array.forEach(callback).
function get_filename(a_tag){
    var currentTag = new URI(a_tag.attribs.href);
    var filename = currentTag.filename();
    console.log(filename);
    return filename
}

var rawHtml = "<html><head>You are what you is</head><body><a href='http://www.google.com/index.html#algo'>blabla</a><a href='http://www.yahoo.com/mail.html'>yahoo</a><a href='http://foo.com/bar.html#wtf'</a></body></html>";
parser.parseComplete(rawHtml);

