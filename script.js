$(document).ready(function () {
    const BASE_URL_TMDB = "https://api.themoviedb.org/3";
    const API_KEY = "ead7e003b5fcbf45e2ac5288652f12a4";
    const DISCOVER_MOVIE_URL = "/discover/movie";
    const IMG_URL = "https://image.tmdb.org/t/p/w500/";
    const TOP_RATED_Movie = "/movie/top_rated";
    const SEARCH_MOVIE = "/search/movie?";

    // // // function top rate movie
    function TopRatedMovies() {
        $.ajax({
            url: BASE_URL_TMDB + TOP_RATED_Movie,
            type: "get",
            dataType: "json",
            data: {
                api_key: API_KEY,
            },
            success: function (response) {
                if (response.results) {
                    let movies = response.results;
                    $.each(movies, function (i, data) {
                        const trendingMovie = IMG_URL + data.poster_path;

                        $("#top-rated-movie").append(
                            `
                            <div class="col-md-3">
                            <div class="card" >
                                <img src="${trendingMovie} " class="card-img-top img-zoom"  >
                                    <div class="card-body">
                                        <h5 class="card-title text-center"> ${data.title}</h5>
                                        <p class="card-text">Relaese :  ${data.release_date}</p>
                                        <p class="card-text">Popularity :  ${data.popularity}</p>
                                <hr>
                                </div>
                            </div>

                            `
                        );
                    });
                }
            },
        });
    }
    // // function list movie
    function list_movie() {
        $.ajax({
            type: "get",
            url: BASE_URL_TMDB + DISCOVER_MOVIE_URL,
            dataType: "json",
            data: {
                api_key: API_KEY,
            },
            success: function (response) {
                if (response.results) {
                    let movie = response.results;
                    $.each(movie, function (i, data) {
                        // url gambar
                        const posterPath = IMG_URL + data.poster_path;
                        $("#all_film").append(
                            `
                    <div class="col-md-3">
                            <div class="card" >
                                <img src="${posterPath} " class="card-img-top img-zoom"  >
                                    <div class="card-body">
                                        <h5 class="card-title text-center"> ${data.title}</h5>
                                        <p class="card-text">Relaese :  ${data.release_date}</p>
                                        <p class="card-text">Popularity :  ${data.popularity}</p>
                                <hr>
                                </div>
                            </div>

                    `
                        );
                    });
                }
            },
        });
    }

    //function pencarian film
    function search_movie() {
        $("#all_film,#top-rated-movie").html("");
        var input_search = $(".search-input").val();
        $.ajax({
            type: "get",
            url: BASE_URL_TMDB + SEARCH_MOVIE,
            dataType: "json",
            data: {
                api_key: API_KEY,
                query: input_search,
            },
            success: function (response) {
                if (response.results) {
                    let movie = response.results;
                    $.each(movie, function (i, data) {
                        // url gambar
                        const posterPath = IMG_URL + data.poster_path;
                        $("#all_film,#top-rated-movie").prepend(
                            `
                    <div class="col-md-3">
                            <div class="card " >
                                <img src="${posterPath} " class="card-img-top img-zoom"  >
                                    <div class="card-body">
                                        <h5 class="card-title  text-center"> ${data.title}</h5>
                                        <p class="card-text">Relaese :  ${data.release_date}</p>
                                        <p class="card-text">Popularity :  ${data.popularity}</p>
                                <hr>
                                </div>
                            </div>
                    `
                        );
                    });
                }
            },
            error: function (error) {
                console.log("Error searching movies:", error);
            },
        });
    }

    $(".btn-search").click(function () {
        var input = $(".search-input").val();
        if (input === "") {
            swal({
                title: "Please enter title movie!",
                text: "Try again!",
                icon: "warning",
                button: "Ok !",
            });
            list_movie();
            TopRatedMovies();
        } else {
            search_movie();
            $(".search-input").val("");
        }
    });
    list_movie();
    TopRatedMovies();
});
