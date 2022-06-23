var i, images = document.getElementsByTagName("img");

for(i = 0; i < images.length; i++) {
    var parentElement = images[i].parentElement;
    var innerHTML = parentElement.innerHTML;
    var imageSource = images[i].src
    parentElement.innerHTML = '<a href="' + imageSource + '">' + innerHTML + '</a>';
    }
