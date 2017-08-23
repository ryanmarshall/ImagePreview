var $ = function (selector) {
    return document.querySelector(selector);
};

function forEach (obj, callback) {
    if (!isFunction(callback)) return
    if (isArray(obj)) {
        if (obj.forEach) return obj.forEach(callback)
        for (var i = 0; i < obj.length; ++i) {
            callback(obj[i], i)
        }
    }
    else if (isObject(obj)) {
        for (var key in obj) {
            obj.hasOwnProperty(key) && callback(obj[key], key)
        }
    }
}

function isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray (arr) {
    if (Array.isArray) return Array.isArray(arr)
    return arr instanceof Array
}

function isFunction (func) {
    return typeof func === 'function'
}

Object.prototype.appendElement = function(elem_string) {
    var elem  =  document.createElement(elem_string);
    this.appendChild(elem);
    return elem;
};

Object.prototype.find = function(elem_class) {
    var elem  =  this.getElementsByClassName(elem_class)[0];
    return elem;
};

Object.prototype.html = function(content) {
    var elem  =  this.innerHTML = content;
    return elem;
};