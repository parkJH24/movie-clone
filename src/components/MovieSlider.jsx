import { motion } from 'framer-motion'

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Scrollbar } from "swiper/modules";

//스와이퍼 css
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/scrollbar';
import styled from "styled-components";
import Button from './Button';

//react-icons
import { FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from 'react';
import { getGenre } from '../api/aixos';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './Modal';
import MovieCard from './MovieCard';





export default function MovieSlider({ movies, title, rate, type }) {

    const [genres, setGenres] = useState({})
    const { category, movieId } = useParams();
    const [hoveredId, setHoveredId] = useState(null);

    const navigate = useNavigate();

   


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

    //모달창 생성
    const clickModal = movies.find(movie => {
        return category === movie.category && `${movie.id}` === movieId;
    });


    //장르 텍스트 변환하기
    useEffect(() => {
        const fetchGenres = async () => {
            const genresData = await getGenre();
            const genreMap = genresData.reduce((acc, genre) => {
                acc[genre.id] = genre.name;
                return acc
            }, {})
            setGenres(genreMap)
        }
        fetchGenres();
    }, [])
    const getGenresNames = (genreId) => {
        return genreId.map(id => genres[id]).join(", ")
    }

    //관람등급 표시 추가
    const getRating = (adult) => {
        return adult ? '청소년불가' : '전체 관람가능'
    }
    return (
        <MovieSliderItem>
            <h2 className="movieTitle">{title}</h2>
            <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={40}
                slidesPerView={6}
                navigation

            >
                {movies.map((movie, idx) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard
                            movie={movie}
                            idx={idx}
                            rate={rate}
                            navigate={navigate}
                            type={type}
                            movieId={movieId}
                            hoveredId={hoveredId}
                            setHoveredId={setHoveredId}
                            imgVariants={imgVariants}
                            infoVariants={infoVariants}
                            getRating={getRating}
                            getGenresNames={getGenresNames}
                            
                        />
                    </SwiperSlide>
                ))}

            </Swiper>
            {clickModal && <Modal movie={clickModal} type={type} />}
        </MovieSliderItem>
    )
}

const MovieSliderItem = styled.div`
    padding: 40px 50px;
    box-sizing: border-box;

    .swiper{
        overflow: visible!important;
    }
    .movieTitle{
        font-size: 36px;
        position: relative;
        color: #fff;
        margin-bottom: 24px;
    }
    .sliderList{
        position: relative;
       
    }
    .sliderList img{
        width: 100%;
        border-radius: 5px;
        cursor: pointer;
    }
    .sliderList.rate{
        position: relative;
    }
    .sliderList.rate .rateNum{
        position: absolute;
        top: 0px;
        left: 0px;
        /* transform: translateY(-60%); */
        line-height: 200px;
        font-size: 300px;
        color: #000;
        -webkit-text-stroke: 4px gray;
        -webkit-text-fill-color: #000;
    }
    .sliderList.rate .rateNum.last{
        letter-spacing: -50px;
        left: -30px;
    }



    .sliderList.rate .sliderImg{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: flex-end;

    }
    .sliderList.rate .sliderImg img{
        object-fit: cover;
        width: 60%;
        position: relative;

    }

    .sliderInfo{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        .infoWrapper{
            display: flex;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            background: gray;
            flex-direction: column;
            gap: 6px;
            .btnsWrapper{
                display: flex;
                justify-content: space-between;
                align-items: center;
                div{
                    display: flex;
                    gap: 4px;
                }
                button{
                    width: 24px;
                    height: 24px;
                    padding: 0px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    border-radius: 50%;
                }
            }
            .infoGenres{
                color: #fff;
                font-size: 12px;
                display: flex;
                gap: 4px;
                flex-direction: column;
            }

        }
    }




`