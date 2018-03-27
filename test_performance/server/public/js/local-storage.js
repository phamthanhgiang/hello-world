var LOCAL_STORAGE = {};

var _fileKey = 'key-file';

LOCAL_STORAGE.setFile = function (file) {
    localStorage.setItem(_fileKey, file);
};

LOCAL_STORAGE.getFile = function () {
    var file = localStorage.getItem(_fileKey);
    return file;
};

LOCAL_STORAGE.removeFile = function () {
    localStorage.removeItem(_fileKey);
};