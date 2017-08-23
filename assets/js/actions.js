(function(){

    var Pagination = {
        page: 1,
        data: null
    };

    var Request = null;

    // load images into preview
    window.onload = function() {
        Request   = new RestAPI;
        Request.url = 'https://api.giphy.com/v1/gifs/search?q=%query%&api_key=%apikey%&limit=%limit%&offset=%offset%';
        Request.apikey = '1f32c48393794199a8e8308c6dcec110';
        Request.query = 'racoons';
        Request.page = Pagination.page;

        Request.get(loadImagesToPage);

        setUpPaging();
    };


    /*
     * Load our image data after API call
     */
    function loadImagesToPage(response){
        Pagination.data = parseImageData(response.data);
        $('.images').innerHTML = "";
        var ul =  $('.images').appendElement('ul');
        $('.page').innerHTML = "Page: " + Pagination.page;

        forEach(response.data, function(data, index){
            var li = ul.appendElement('li');
            li.style.backgroundImage = "url('" + data.images.fixed_height.url + "' )";
            li.dataset.id = data.id;
            li.onclick = open;
        });
    }

    /*
     * Set up our paging actions for beck/next
     */
    function setUpPaging() {
        var controlls = $('.control')
        var back = controlls.find('back');
        var next = controlls.find('next');

        back.onclick = function(){
            Pagination.page = Pagination.page - 1;
            Request.page = Pagination.page
            Request.get(loadImagesToPage);
            if (Pagination.page <= 1) { $('.control').find('back').style.display='none'; }
        };

        next.onclick = function(){
            Pagination.page = Pagination.page + 1;
            Request.page = Pagination.page
            Request.get(loadImagesToPage);
            if (Pagination.page > 1) { $('.control').find('back').style.display='block'; }
        };
    }

    /*
     * Open our modal and load our image and data
     */
    function open(e) {
        e.preventDefault();
        $('#lightbox').find('image').src = null;
        populateLightbox( e.target );
        $('#lightbox').style.display='block';
        $('#lightbox_overlay').style.display='block';
    };

    /*
     * Close modal
     */
    function close(e) {
        e.preventDefault();
        $('#lightbox').style.display='none';
        $('#lightbox_overlay').style.display='none';
    };
    $('.close').onclick = close;

    /*
     * Helper function to populate out modal elements
     */
    function populateLightbox(elem) {
        var lightbox = $('#lightbox');
        var id = elem.dataset.id;

        // populate the lightbox element
        lightbox.find('url').html('Url: ' + Pagination.data[id].bitly_url);
        lightbox.find('created').html('Created: ' + Pagination.data[id].imported);
        lightbox.find('source').html('Source: ' + Pagination.data[id].source);
        lightbox.find('image').src = "";
        lightbox.find('image').src = Pagination.data[id].url

        // set next/back actions
        if (elem.previousElementSibling) {
            lightbox.find('back').style.display='block';
            lightbox.find('back').onclick = function() {
                elem.previousElementSibling.click();
            }
        } else {
            lightbox.find('back').style.display='none';
        }
        if (elem.nextElementSibling) {
            lightbox.find('next').style.display='block';
            lightbox.find('next').onclick = function() {
                elem.nextElementSibling.click();
            }
        } else {
            lightbox.find('next').style.display='none';
        }

    };

    /*
     * Once we get our API image data, parse it into useable hash
     */
    function parseImageData(data) {
        var results = {};
        var back = null;
        var next = null;
        forEach(data, function(data, index){
            results[data.id] = {
                bitly_url: data.bitly_url,
                source: data.source_tld,
                imported: data.import_datetime,
                url: data.images.original.url
            };
        });
        return results;
    };

})();