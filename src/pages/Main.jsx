import instance from "../api/axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useQuery } from 'react-query';
import { getMovies, get } from "../api/axios";
import MainVideo from "../components/MainVideo";
import styled from "styled-components";
import MovieSlider from "../components/MovieSlider";
import { getMovieGenre } from "../api/aixos";

export default function Main() {
    // const { data: nowPlaying, isLoading, error } = useQuery(['movies', 'nowPlaying'], () => getMovies('now_playing'), {
    //     staleTime: 50000
    // });

    // const { data: popular, isLoading, error } = useQuery(['movies', 'popular'], () => getMovies('popular'), {
    //     staleTime: 50000
    // });
    //변수가 중복되므로 각각 고유의 변수로 활용

    const {
        data: nowPlaying,
        isLoading: isNowPlayingLoading,
        error: nowPlayingError
    } = useQuery(['movies', 'nowPlaying'], () => getMovies('now_playing'), {
        staleTime: 50000
    });
    // const { data: nowPlayingPages, isLoading: isNowPlayingLoading, error: nowPlayingError } = useQuery(
    //     ["movies", "nowPlaying"],
    //     async () => {
    //       const pages = [];
    //       for (let page = 1; page <= 5; page++) {
    //         const pageData = await getMovies("now_playing", page);
    //         pages.push(...pageData.results);
    //       }
    //       return { results: pages };
    //     },
    //     {
    //       staleTime: 50000,
    //     }
    //   );

    const {
        data: popular,
        isLoading: isPopularLoading,
        error: popularError
    } = useQuery(['movies', 'popular'], () => getMovies('popular'), {
        staleTime: 50000
    });

    // 로딩 상태 처리
    if (isNowPlayingLoading || isPopularLoading) return <div>Loading...</div>;

    // 에러 상태 처리
    if (nowPlayingError || popularError) return <div>Error loading data</div>;

    // console.log(nowPlaying); // 콘솔로 데이터 확인
    // console.log(popular);


    const {
        data: action,
        isLoading: isActionrLoading,
        error: actionError
    } = useQuery(['movies', '28'], () => getMovieGenre('28'), {
        staleTime: 50000
    });
    console.log(action)








    return (
        <Container>
            {/* 기존의 헤더와 푸터를 app.js로 이동 */}
            <MainVideo />
            <MovieSlider movies={popular.slice(1, 11)}
                title='오늘 글로벌 TOP10 시리즈'
                rate={true}
                type='popular'
            />

        </Container>

    )
}
const Container = styled.div`
    padding-top: 75px;
`