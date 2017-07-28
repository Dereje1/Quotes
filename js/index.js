var minlength = Math.min(window.innerWidth,window.innerHeight);
$(document).ready(function() {
    //dynamically set font-size for different screen widths
    var dynamicFontSize = (minlength/20).toString()+"px";
    $("#quotearea, #authorarea").css("font-size",dynamicFontSize)
    //first contact of api for when page loads/refreshes
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data){
            onNewQuoteClick(data);
    });
  //on button click
    $("#quotefetcher").on("click", function(){
 //second contact of api for when New quote clicked
        $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data){
            onNewQuoteClick(data);
        });
    });
  });
//Function that does everything when newquote is clicked or when document first loads
function onNewQuoteClick(data){
     //clear all contents in quore and author area
     $('#quotearea').empty();
     $('#authorarea').empty();
     //contain new quote and author obtained from api in variables
     var quote = data.quoteText;
     var author = data.quoteAuthor;
     //if author is blank -->improvise
     if(author==""){author="author unknown"};
     //add new quote and author into appropriate area in pages
     $("#quotearea").append("\" "+quote+"\"");
     $("#authorarea").append("<strong>-- " + author +"</strong>");
     //construct link to tweet 
     var tweetConstruct="http://twitter.com/home?status="+quote+"-"+author+"#quote";
     //Set attributes of the tweet button
     $("#tweet").attr('href',tweetConstruct);
     $("#tweet").attr('target',"_blank");
     $("#tweet").attr('role',"button");
     $("#tweet").attr('data-toggle',"tooltip");
     $("#tweet").attr('title',"Tweet this quote!");
     //set font - size for different window sizes
    
}