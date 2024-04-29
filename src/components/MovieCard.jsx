// MovieSlide.js
import { motion } from 'framer-motion';
import Button from './Button';
import { FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { getRating, getGenresNames } from '../utils/movieHelpers';
import styled from "styled-components";
import Modal from './Modal';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function MovieCard({ movie, idx, rate, navigate, type, hoveredId, setHoveredId, imgVariants, infoVariants, getRating, getGenresNames }) {
    const rating = getRating(movie.adult);
    const genreNames = getGenresNames(movie.genre_ids);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { category, movieId } = useParams();

    const handleOpenModal = () => {
        if (isModalTrigger) {
            setIsModalOpen(true);
        }
    };

    const isModalTrigger = type === category && `${movie.id}` === movieId;

    
    return (
        <MovieItem>
        <motion.div className={`sliderList ${rate ? 'rate' : ''}`}
            whileHover='hover'
            initial='initial'
            onMouseEnter={() => setHoveredId(movie.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ position: 'relative', zIndex: hoveredId === movie.id ? 99 : 9 }}
        >
            {rate && (
                <div className={`rateNum ${idx === movie.length - 1 ? 'last' : ''}`}>
                    {idx + 1}
                </div>
            )}
            <motion.div className="sliderImg" variants={imgVariants} >
                <img src={`https://image.tmdb.org/t/p/w500/${rate ? movie.poster_path : movie.backdrop_path}`} alt={movie.title} />
            </motion.div>

            <motion.div className='sliderInfo'
                variants={infoVariants}
                onClick={() => navigate(`${type}/${movie.id}`)}
            >
                <div className='infoImg'>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.title} />
                </div>

                <div className='infoWrapper'>
                    <div className='btnsWrapper'>
                        <div>
                            <Button><FaPlay /></Button>
                            <Button><FiPlus /></Button>
                            <Button><AiOutlineLike /></Button>
                        </div>
                        <Button onClick={handleOpenModal}><IoIosArrowDown /></Button>
                    </div>
                    <div className='infoGenres'>
                        <p>{rating}</p> {/* 수정된 부분: 변수 사용 */}
                        <p>{genreNames}</p> {/* 수정된 부분: 변수 사용 */}
                    </div>
                </div>
            </motion.div>
        </motion.div>
        {isModalOpen && <Modal movie={movie} type={type} />}
        </MovieItem>
    );
}
const MovieItem = styled.div`
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