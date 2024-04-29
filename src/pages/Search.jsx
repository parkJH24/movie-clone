import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Modal from "../components/Modal";
import styled from "styled-components";
import { getRating, getGenresNames } from '../utils/movieHelpers';
import { useQuery } from "react-query";
import instance from "../api/aixos";
import { getGenre } from "../api/aixos";

export default function Search() {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movieList, setMovieList] = useState([]);
    const [genres, setGenres] = useState({});
    const [hoveredId, setHoveredId] = useState(null);
    const [genresLoaded, setGenresLoaded] = useState(false);

    const location = useLocation();
    const keyword = location.state.keyword;
    const { isLoading, error, data } = useQuery(['search', keyword], () => instance.getSearch(keyword));
    const ClickedMovie = data?.find((search) => `${search.id}` === movieId);

    // useEffect(() => {
    //     async function fetchGenres() {
    //         try {
    //             const genresData = await instance.getGenre();
    //             const genreMap = genresData.reduce((acc, genre) => {
    //                 acc[genre.id] = genre.name;
    //                 return acc;
    //             }, {});
    //             setGenres(genreMap);
    //             setGenresLoaded(true);  // 로딩 완료 상태 업데이트
    //         } catch (error) {
    //             console.error('Failed to fetch genres:', error);
    //         }
    //     }
    //     fetchGenres();
    // }, []);

    const imgVariants = {
        initial: {
            scale: 1,
            zIndex: 1,
        },
        hover: {
            scale: 1.2,
            zIndex: 99,
            transition: {
                duration: 0.5
            }
        }
    }

    const infoVariants = {
        initial: {
            opacity: 0,
            scale: 1,
            zIndex: 1,
        },
        hover: {
            opacity: 1,
            scale: 1.5,
            zIndex: 99,
            transition: {
                duration: 0.3
            }
        }
    }

    return (
        <>
            
            {(!data || data.length === 0) && <div>검색결과가 없습니다.</div>}
            {data && (
                <ResultContainer className='on'>
                    <div className='searchMovie'>
                        <h3>{keyword}로 검색한 결과입니다.</h3>
                        <div className='listContainer'>
                            {data.map((movie, idx) => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    idx={idx}
                                    rate={movie.rate} // 이 값들은 실제 영화 데이터의 속성에 맞게 조정해야 함
                                    navigate={navigate} // navigate 함수는 예를 들어 React Router의 useNavigate() 훅에서 가져올 수 있음
                                    type={movie.type} // 이 값은 영화 데이터나 상태에서 정의되어야 함
                                    movieId={movie.id}
                                    hoveredId={hoveredId}
                                    setHoveredId={setHoveredId}
                                    imgVariants={imgVariants} // 이 값은 정의되어야 함
                                    infoVariants={infoVariants} // 이 값도 정의되어야 함
                                    getRating={getRating}
                                    getGenresNames={getGenresNames}
                                    onClick={() => navigate(`${movie.id}`, { state: { keyword } })}
                                    layoutId={`${'search' + movie.id}`}
                                />
                            ))}
                        </div>
                    </div>
                    {ClickedMovie && <Modal movie={ClickedMovie} type='search' />}
                </ResultContainer>
            )}
        </>
    );
}

const ResultContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 10;
    padding: 100px;
    overflow: auto;
    display: none;
    &.on {
        display: block;
    }
    .searchMovie {
        width: 100%;
        position: relative;
        h3 {
            color: #fff;
            font-weight: bold;
            font-size: 40px;
            text-align: center;
            margin-bottom: 24px;
        }
        .listContainer {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
        }
    }
`;
