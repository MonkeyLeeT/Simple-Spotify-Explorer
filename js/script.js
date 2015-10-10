window.onload = function () {
    var templateSource = $('#results-template').html(),
        template = Handlebars.compile(templateSource),
        resultsPlaceholder = $('#results'),
        playingCssClass = 'playing',
        audioObject = null,
        cache = [],
        more = false,
        query = "",
        newQuery = "",
        current = 0,
        total = 0,
        perPage = 10,
        totalPage = 4,
        limit = perPage * totalPage;

    var fetchTracks = function (trackId, callback) {
        $.ajax({
            url: 'https://api.spotify.com/v1/tracks/' + trackId,
            success: function (response) {
                callback(response);
            }
        });
    };

    var searchAlbums = function (query, page, showNow) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                limit: limit,
                offset: page * perPage,
                type: 'track'
            },
            success: function (response) {
                //console.log('requested', response.tracks.total);
                if (response.tracks.total <= 0) {
                    $("#noresult").show();
                } else {
                    Array.prototype.push.apply(cache, response.tracks.items);
                    //console.log(response.tracks.total);
                    total = response.tracks.total;
                    more = cache.length < total;
                    $('.pagination').show();
                    if (more) $("#next").removeClass('disabled');
                    if (showNow) show(0);
                }
            },
            complete: function () {
                $('#search').removeClass('loading');
            }
        });
    };

    function show(page) {
        //console.log(page, cache.length);
        if (page == 0) $("#prev").addClass('disabled');
        else $("#prev").removeClass('disabled');
        if ((page + 1) * perPage < cache.length) $("#next").removeClass('disabled');
        else $("#next").addClass('disabled');
        var items = $(".cover");
        items.hide();
        var start = page * perPage;
        var end = Math.min(start + perPage, cache.length);
        resultsPlaceholder.html(template(cache.slice(start, end)));
        $("#for").html((start + 1) + ' - ' + end +  '</br> of ' + ' ' + total);
        $(results).show();
    }

    $("#next").click(function (e) {
        show(++current);
        if (current + 1 >= (cache.length / perPage) && more) {
            searchAlbums(query, current, false);
        }
    });

    $("#prev").click(function (e) {
        show(--current);
    });

    $(".close").click(function (e) {
        $(this)
            .closest('.message')
            .transition('fade')
        ;
    });

    $(results).click(function (e) {
        var target = $(e.target);
        if (target !== null && target.hasClass('cover')) {
            if (target.hasClass(playingCssClass)) {
                audioObject.pause();
            } else {
                if (audioObject) {
                    audioObject.pause();
                }
                fetchTracks(target.attr('data-album-id'), function (data) {
                    audioObject = new Audio(data.preview_url);
                    var audio = $(audioObject);
                    audioObject.play();
                    target.addClass(playingCssClass);
                    audio.on('ended', function () {
                        target.removeClass(playingCssClass);
                    });
                    audio.on('pause', function () {
                        target.removeClass(playingCssClass);
                    });
                });
            }
        }
    });

    $.fn.form.settings.rules.checkQuery = function(){
        var artist = $('#artist').val().trim();
        var album = $('#album').val().trim();
        var song = $('#song').val().trim();
        var genre = $('#genre').val().trim();
        var yearFrom = $('#yearFrom').val().trim();
        var yearTo = $('#yearTo').val().trim();
        newQuery =
            (artist ? "artist:" + artist : "")
            + (album ? " album:" + album : "")
            + (song ? " track:" + song : "")
            + (genre ? " genre:" + genre : "")
            + (yearFrom ? " year:" + yearFrom : "")
            + (yearTo ? "-" + yearTo : "");
        return newQuery != "";
    };

    $('#search-form')
        .submit(function(e){
            e.preventDefault();
        })
        .form({
            yearFrom: {
                identifier: 'yearFrom',
                optional : true,
                rules: [
                    {
                        type: 'integer[0...' + new Date().getFullYear() + ']',
                        prompt: 'Invalid year, please enter integer up to ' + new Date().getFullYear()
                    }
                ]
            },
            yearTo: {
                identifier: 'yearTo',
                optional : true,
                rules: [
                    {
                        type: 'integer[0...' + new Date().getFullYear() + ']',
                        prompt: 'Invalid year, please enter integer up to ' + new Date().getFullYear()
                    }
                ]
            },
            all: {
                identifier: 'artist',
                rules: [
                    {
                        type: 'checkQuery',
                        prompt: 'Please enter at least 1 keyword.'
                    }
                ]
            },
        },
        {
            onSuccess: function () {
                $(".error").hide();
                if (query && query != newQuery) {
                    $('.pagination').hide();
                    $(results).hide();
                    cache = [];
                    current = 0;
                    total = 0;
                    more = false;
                }
                query = newQuery;
                //console.log(query);
                $('#search').addClass('loading');
                searchAlbums(query, 0, true);
            }
        }
    );
};