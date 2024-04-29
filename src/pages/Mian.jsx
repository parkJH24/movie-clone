import { useQuery } from "react-query";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getGenre, getMovies, getMovieGenre } from "../api/aixos";
import MainVideo from "../components/MainVideo";
import MovieSlider from "../components/MovieSlider";
import { useEffect } from "react";
//yarn add react-query

/*
react-query
state처럼 상태관리를 해주는 라이브러리
query는 데이터를 불러오는 비동기 데이터 방식에서 상태 관리를 쉽게 해주는 특징을 가지고 있다.


*/

export default function Main() {

    /*
    {
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
}
    
    
    */

    useEffect(() => {
        const genreData = async () => {
            const genreList = await getGenre();
            // console.log(genreList)
        }
        genreData()
    }, [])
    const {
        data: nowPlaying,
        isLoading: isNowPlayingLoading,
        error: nowPlayingError
    } = useQuery(['movies', 'nowPlaying'], () => getMovies('now_playing'), {
        staleTime: 50000
    })

    const {
        data: popular,
        isLoading: isPopularLoading,
        error: popularError
    } = useQuery(['movies', 'popular'], () => getMovies('popular'), {
        staleTime: 50000
    })

    //top_rated , upcoming

    const {
        data: action,
        isLoading: isActionrLoading,
        error: actionError
    } = useQuery(['movies', '28'], () => getMovieGenre('28'), {
        staleTime: 50000
    });

    const {
        data: adventure,
        isLoading: isAdventurerLoading,
        error: adventureError
    } = useQuery(['movies', '12'], () => getMovieGenre('12'), {
        staleTime: 50000
    });

    const {
        data: thriller,
        isLoading: isThrillerLoading,
        error: thrillerError
    } = useQuery(['movies', '53'], () => getMovieGenre('53'), {
        staleTime: 50000
    });
    console.log(thriller)



    if (isNowPlayingLoading) return <div>로딩중입니다..</div>
    if (nowPlayingError) return <div>오류가 발생했습니다.</div>




    // console.log(nowPlaying)
    return (
        <>
            <MainVideo />
            <MovieSlider
                movies={nowPlaying.slice(1, 11)}
                title='TOP 10 시리즈'
                rate={true}
                type='nowPlaying'
            />

            <MovieSlider
                movies={popular}
                title='현재 인기 있는 영화'
                type='popular'
            />

            <MovieSlider
                movies={action}
                title='액션 장르'
                type='action'
            />

            <MovieSlider
                movies={adventure}
                title='어드벤쳐'
                type='adventure'
            />

            <MovieSlider
                movies={thriller}
                title='스릴러'
                type='thriller'
            />

        </>
    )
}