// Creating HTML using javascript
/*
var tech = ["Home", "About", "Contact"]
function createHTMLwithJS(items)
{
    var menu = document.createElement("ul");
    menu.classList.add("menu");
    items.forEach(function (element){
        var menuitem = document.createElement("li");
        menuitem.classList.add("menu-item");
        var anchor = document.createElement("a");
        var divtag = document.createElement("div");
        divtag.classList.add("menu-item-info");
        var divtext = document.createTextNode("This is "+element+" Content")
        var textNode = document.createTextNode(element);
        anchor.appendChild(textNode);
        divtag.appendChild(divtext);
        menuitem.appendChild(anchor);
        menuitem.appendChild(divtag);
        menuitem.append();
        menu.appendChild(menuitem);
    });
    var cb = document.createElement("div");
    cb.classList.add("cf");
    menu.appendChild(cb);
    document.body.appendChild(menu);
}

createHTMLwithJS(tech);
*/



// Adding event listner to our menu items using javascript
/*
var $menuLinks = document.querySelectorAll(".menu-item");

function getInfoPanel(element)
{
    return element.parentNode.querySelector(".menu-item-info");
}

function displayInfoPanel(event){
    var $anchor = event.target;
    getInfoPanel($anchor).classList.add("is_visible");
}
function hideInfoPanel(event){
    var $anchor = event.target;
    getInfoPanel($anchor).classList.remove("is_visible");
}

for(i=0; i<$menuLinks.length; i++)
{
    $menuLinks[i].addEventListener("mouseover", displayInfoPanel);
    $menuLinks[i].addEventListener("mouseout", hideInfoPanel);
}
*/




// Adding event listner to our menu items using jQuery
$(function(){
    $("body").append("<ul class='menu'></ul>");
    var $container = $('.menu');

    function handleMenu(){
        function toggleInfoPanel(event){
            $(this).siblings('.menu-item-info').toggleClass("is_visible");
        }
        
        $(".menu-item > a").on("mouseover mouseout", toggleInfoPanel);
    }


    //Creating HTML using jQuery
    function buildMenuItem(data)
    {
        var $el;
        var $infoPanel;

        $el = $("<li class='menu-item'>"
        +"<a href='#'>"+data.title+"</a>"
        +"<div class='menu-item-info'>"+"</div>"
        +"</li>"
        );
        if(data.infoPanel && data.infoPanel.length)
        {
            $infoPanel = $("div.menu-item-info", $el);
            data.infoPanel.forEach(function(entry){
                $infoPanel.append("<img src='"+entry.image+"'>");
            });
        }
        return $el;
    }
    $.get("/api/menu.json", function(data){
        $container.empty();
        data.forEach(function(menuitem){
            $container.append(buildMenuItem(menuitem));
        });
        $container.append("<div class='cf'></div>")
        handleMenu();
    }, 'json');
});
