var catToAdd;
var imgQty = 5;

$('#resetBtn').on('click', function () {
    $('.catBtns').html('')
})

$('#addCat').on('click', function () {
    if ($('#addCatTxt').val() !== "") {
        $('<button>', {
            type: 'button',
            class: 'btn btn-primary btn-lg catBtn m-3',
            value: $('#addCatTxt').val(),
            text: $('#addCatTxt').val()
        }).prependTo('.catBtns')
    }
});
$('#addCatTxt').on('keyup', function (e) {
    if (e.keyCode == 13 && $('#addCatTxt').val() !== "") {
        $('<button>', {
            type: 'button',
            class: 'btn btn-primary btn-lg catBtn m-3',
            value: $('#addCatTxt').val(),
            text: $('#addCatTxt').val()
        }).prependTo('.catBtns')
    }
});
$('#imgQty').on('click', function () {
    if ($('#imgQtyTxt').val() !== "") {
        imgQty = $('#imgQtyTxt').val()
    }
});
$('#imgQtyTxt').on('keyup', function (e) {
    if (e.keyCode == 13 && $('#imgQtyTxt').val() !== "") {
        imgQty = $('#imgQtyTxt').val()
    }
});

$(document).on('click', '.catBtn', function () {
    getImages($(this).val(), imgQty)
});

var images = [];
var imgQty = 5;

function getImages(searchStr, imgQty) {
    $('body').html('');
    var queryURL =
        `https://api.giphy.com/v1/gifs/search?q=${searchStr}&api_key=ftLUZhl2anOyuYerdNiwMRgychZUjQ0a&limit=${imgQty}`;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        $('body').prepend($('<div>', {
            class: 'container'
        }).append($('<div>', {
            class: 'row'
        }).append($('<div>', {
            class: 'col',
            id: 'imgCol'
        }))))
        for (i in response.data) {
            var $b = $('<button>', {
                type: 'button',
                class: 'btn imgBtn',
                'data-width': response.data[i].images.original_still.width,
                'data-height': response.data[i].images.original_still.height,
                style: `height: ${response.data[i].images.original_still.height}px; width: ${response.data[i].images.original_still.width}px; background-image: url(${response.data[i].images.original_still.url})`,
                'data-urlStill': response.data[i].images.original_still.url,
                'data-url': response.data[i].images.original.url,
                'data-state': 'still',
            });
            var $p = $('<div>').html(
                `Title:${response.data[i].title} <br> Rating: ${response.data[i].rating} <br> Image Score: ${Math.floor(response.data[i]._score)}`
            );

            $('#imgCol').append($b, $p)
        }

    });
}

$(document).on('click', '.imgBtn', function searchCat() {
    // alert($(this).attr('data-state'))
    if ($(this).attr('data-state') == 'still') {
        $(this).attr('data-state', 'gif');
        $(this).attr('style',
            `height: ${$(this).attr('data-height')}px; width: ${$(this).attr('data-width')}px; background-image: url(${$(this).attr('data-url')})`
        );
    } else if ($(this).attr('data-state') == 'gif') {
        $(this).attr('data-state', 'still');
        $(this).attr('style',
            `height: ${$(this).attr('data-height')}px; width: ${$(this).attr('data-width')}px; background-image: url(${$(this).attr('data-urlStill')})`
        );
    }
});