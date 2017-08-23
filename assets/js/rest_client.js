/*
 * Author: Ryan Marshall
 *
 * This is a very simple RestAPI Client
 */

// GIFY API KEY 1f32c48393794199a8e8308c6dcec110

class RestAPI {

    /*
     * API constructor
     */
    constructor() {
        this.url = null;
        this.page = 1;
        this.apikey = null;
        this.query = '';
        this.offset = 0;
        this.limit = 5;
        this.defaults = {
            type: "json"
        }
    }

    /*
     * setup our url from our class settings
     */
    populateUri(url) {
        url = url.replace(/%apikey%/, this.apikey);
        url = url.replace(/%query%/, this.query);
        url = url.replace(/%limit%/, this.limit);
        url = url.replace(/%offset%/, ( this.limit * (this.page - 1) ));
        return url
    }

    /*
     * Send GET request
     */
    get(callback) {
        return this._request( this.populateUri( this.url ), 'GET', callback);
    }

    /*
     * Send REST request
     */
    _request (url, method, callback) {
        var async     = true;
        // create XMLHttpRequest
        var http = this.xhr();
        http.open(method, url, async);

        function send (resolve, reject) {
            function isFunc (func) {
                return typeof func === 'function'
            }

            http.onreadystatechange = function () {
                // complete
                if (http.readyState === 4) {
                    http.body = http.response

                    if (http.status >= 100 && http.status < 400 ) {
                        var json = JSON.parse(http.response);
                        isFunc(callback) && callback( json )
                    }

                }
            }
            http.send();
        }

        if (typeof Promise !== "undefined") return new Promise(send)
        send();
    }

    xhr() {
        if (typeof ActiveXObject !== 'undefined') return new ActiveXObject('Microsoft.XMLHTTP')
        if (typeof XMLHttpRequest !== 'undefined') return new XMLHttpRequest()
        return null
    }
}