function DecodeImage() {
    var picker = new Windows.Storage.Pickers.FileOpenPicker();
    picker.fileTypeFilter.append(".jpg");
    picker.pickSingleFileAsync().then(function (file) {
        if (!file) {
            var objectURL = window.URL.createObjectURL(file, { oneTimeOnly: true });
            document.getElementById("myImage").src = objectURL;
                }).then(function (stream) {
        return Windows.Graphics.Imaging.BitmapDecoder.createAsync(stream);
    }).done(function (decoder) {
        // BitmapDecoder is ready for use.
    });
}