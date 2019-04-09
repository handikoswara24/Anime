function searchAnime() {
    $('#anime-list').html('');
    $('.spinner-border').removeClass('d-none');
    $.ajax({
        url: 'https://api.jikan.moe/v3/search/anime',
        type: 'get',
        dataType: 'json',
        data: {
            'q': $('#search-input').val()
        },
        success: function (result) {
            let animes = result.results;
            $.each(animes, function (i, data) {
                if (i == 0) {
                    $('#anime-list').addClass('row');
                }
                $('#anime-list').append(`
                <div class="col-md-4 my-3">
                    <div class="card">
                        <img class="card-img-top" src="` + data.image_url + `" style="height: 270px;">
                        <div class="card-body">
                            <h5 class="card-title">` + data.title + `</h5>
                            <p class="card-text">` + data.type + `</p>
                            <a data-toggle="modal" data-target="#animeModal" 
                            class="see-detail text-primary" data-id="` + data.mal_id + `">See Details</a>
                        </div>
                    </div>
                </div>
                `);
            });
            $('#search-input').val('');
        }
    });
    setTimeout(function () {
        $('.spinner-border').addClass('d-none');
    }, 750);

}



$('#search-button').on('click', function () {
    searchAnime();
});

$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        searchAnime();
    }
})

$('#anime-list').on('click', '.see-detail', function () {
    $('.modal-title').html('');
    $('.modal-body').html(``);
    $.ajax({
        url: 'https://api.jikan.moe/v3/anime/' + $(this).data('id'),
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result.error == null) {
                $('.modal-title').html(result.title);
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-6">
                                <img src="` + result.image_url + `" style="height: 270px;" class="w-100">
                            </div>
                            <div class="col-6">
                                <div class="row">
                                    <div class="col-6 font-weight-bold">
                                        ` + `Score` + `
                                    </div>
                                    <div class="col-6 text-right">
                                        ` + result.score + `
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 font-weight-bold">
                                        ` + `Rank` + `
                                    </div>
                                    <div class="col-6 text-right">
                                        ` + result.rank + `
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 font-weight-bold">
                                        ` + `Episodes` + `
                                    </div>
                                    <div class="col-6 text-right">
                                        ` + result.episodes + `
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 font-weight-bold">
                                        ` + `Popularity` + `
                                    </div>
                                    <div class="col-6 text-right">
                                        ` + result.popularity + `
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 font-weight-bold">
                                        ` + `Favorites` + `
                                    </div>
                                    <div class="col-6 text-right">
                                        ` + result.favorites + `
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="synopsis text-justify mt-2">
                                <h5>Synopsis</h5>
                                ` + result.synopsis + `
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});