//Import required modules.

var Node_parser = require('html_parser_test');
var node_parser = new Node_parser("Dave");

function Mapper(path){
    /*Turns the html files in the path folder into a forest of trees. Each file
    in the path is treated as a node and each link from one file to another as 
    an edge. This creates a series of diagraphs representing all the files and 
    links in the path directory.
    */
    //Store the content of path in files
    var fs = require("fs");
    var files = fs.readdirSync(path);
    var nodes = [];
    var files_copy = files;
    //Iterate on the file list,
    while (files_copy.length > 0){
        current_file=files_copy.splice(0,1);
        //get the links in current file,
        for (var link in node[current_file].out_neighbours){
            //Check if the out_neighbours are in path,
            if (link in files_copy) //TODO use only the *.html part of the link (i.e. no http://www.server...).
                nodes[current_file].out_neighbours.push(link);//TODO nodes needs to be a global variable! Maybe?
            //or if the current file is an in_neighbour to another node
            else if(link in nodes)
                nodes[link].in_neighbours.push(current_file);
        }
    }
}

//Looks for all the <a> tags in an html file and returns a list of the URLs 
//they're pointing at.
function parse_links(html_file){
    node_parser.parser.parseComplete(node_parser.load_file(html_file));
    var url_list = [];
    //TODO Load HTML.
    //TODO Iterate through the lines of the file looking for links (using html_parser_test).
    return url_list;
}

//check if a link points to a file in the directory being mapped
//and returns the filename, otherwise returns FALSE
function is_node(link,files){
    var link_array = link.split("/");
    var filename = link_array[-1];
    if (filename in files){
        return filename;
    }else{
        return false;
    }
}
//TODO if the URL has anything after the filename
//returns FALSE rather than the filename

function Noderiser(){
    //TODO What goes here?
    //TODO its methods use a nodes array that is not being passed yet
}

//create the nodes entry for a given file
function init(file){
    this.nodes[file] = {
        in_neighbours: [],
        out_neighbours: out_neighbours(file), //TODO assigned list not implemented
        indegree: undefined,
        outdegree: undefined,
        links:parse_links(file) //TODO assigned list not implemented
    }
}

//register a given file in the nodes entries of its out_neighbours
function register(file){
    for (var neighbour in this.nodes[file].out_neighbours){
        this.nodes[neighbour].in_neighbours.push(file);
    }
}

//complete the file's nodes entry by calculating its indegree and outdegree
function finish(file){
    this.nodes[file].indegree = this.nodes[file].in_neighbours.length;
    this.nodes[file].outdegree = this.nodes[file].out_neighbours.length;
}

Noderiser.prototype.init = init;
Noderiser.prototype.register = register;
Noderiser.prototype.finish = finish;

parse_links("index.html");