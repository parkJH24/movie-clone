import styled from "styled-components";
import { motion } from 'framer-motion'
import Button from './Button';
import { FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from 'react';
import { getGenre } from '../api/aixos';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from "./Modal";

export default function OverView({ show, movie, onClose }) {
  
  const [genres, setGenres] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 추가
  // console.log(movie)
  // if (!movie) return null; // 영화 데이터가 없다면 아무 것도 렌더링하지 않

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

  const variants = {
    visible: {
      opacity: 1,
      width: "150%"  // 활성화될 때 width 150%로 설정
    },
    hidden: {
      opacity: 0,
      width: "100%"  // 비활성화 상태에서의 초기 width
    },
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <OverViewWrapper
      show={show}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={variants}
      transition={{ type: "tween", duration: 0.3, delay : 0.5 }}
      onMouseLeave={onClose} // Add onMouseLeave here
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
          <Button onClick={handleModalOpen}><IoIosArrowDown /></Button> {/* 모달 열기 */}
        </div>

        <div className='infoGenres'>
          <p>{getRating(movie.adult)}</p>
          <p>{getGenresNames(movie.genre_ids)}</p>
        </div>
      </div>
      {isModalOpen && <Modal movie={movie} />}

    </OverViewWrapper>
    

  )
}

const OverViewWrapper = styled(motion.div)`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

    z-index: 99;
    width: 150%;
    color: white;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: ${props => (props.show ? 1 : 0)};
    box-sizing: -5px -5px 2px 2px gray;
    
    transition: opacity 0.3s ease-in-out;
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
 
`


/*
<motion.div className='sliderInfo'
                                variants={infoVariants}
                                onClick={() => navigate(`${type}/${movie.id}`)}
                                layoutId={`${type + movieId}`}

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
                                        <Button><IoIosArrowDown /></Button>
                                    </div>

                                    <div className='infoGenres'>
                                        <p>{getRating(movie.adult)}</p>
                                        <p>{getGenresNames(movie.genre_ids)}</p>
                                    </div>
                                </div>
                            </motion.div>


*/
