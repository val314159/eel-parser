// parser.js
function parser(s,symbol){
    var state=0;
    var n,ch;
    var ret=[];
    var stack=[];
    var keyword="";
    function push(){
	ws();
	stack.push( ret );
	ret=[];
    }
    function pop(){
	ws();
	var x = stack.pop();
	x.push( ret );
	ret = x;
    }
    function ws(){
	if(keyword){
	    var num=Number(keyword);
	    if (!Number.isNaN(num))
		ret.push(num);
	    else
		ret.push(Symbol(keyword));
	}
	keyword="";
    }
    function str(){
	ret.push(keyword);
	keyword="";
    }
    function add(){
	keyword+=ch;
    }
    s=String(s);
    for(n=0;n<s.length;n++){
	ch=s[n];
	switch(state){
	case 0:
	    switch(ch){
	    case '\v': case '\r':
	    case '\n': case '\t':
	    case ' ':   ws(); break;
	    case '(': push(); break;
	    case ')':  pop(); break;
	    case ';':   ws(); state=9; break;
	    case '"':   ws(); state=1; break;
	    default :  add(); break;
	    }
	    break;
	case 1:
	    switch(ch){
	    case '"':  str(); state=0; break;
	    case '\\': add(); state=2; break;
	    default :  add(); break;
	    }
	    break;
	case 2:
	    switch(ch){
	    default :  add(); state=1; break;
	    }
	    break;
	case 9:
	    switch(ch){
	    case '\v': case '\r':
	    case '\n': state=0; break;
	    }
	}
    }
    ws();
    return ret;
}
module.exports=parser;
