import { AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from 'framer-motion'
import { useQuery } from "react-query";
import { getModalDetail } from "../api/aixos";
import { MdClose } from 'react-icons/md';


export default function Modal({ movie, type }) {
    console.log(movie)
    console.log(type)
    const { movieId } = useParams();
    const navigate = useNavigate();
    console.log(movieId)
    //0429추가
    const mediaType = movie.media_type === 'tv';
    //tmdb에서 tb인지 movie인지 분류 movie만 있다면 만들 필요 없음
    const { data, isLoading, error } = useQuery(
        ['detail', mediaType],
        () => getModalDetail(movie.id, mediaType ? 'tv' : 'movie'), {
        staleTime: 50000
    }
    )
    // console.log(data)

    const movieReleaseYear = (date) => {
        return date ? new Date(data.release_date).getFullYear() : null;
    }


    return (
        <AnimatePresence>
            {movieId ? (
                <ModalContainer animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div className="modalContent"
                        layoutId={`${type + movieId}`}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="modalBg">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
                        </div>
                        <div className="content">
                            
                            <motion.button
                                className="closeBtn"
                                onClick={() => { navigate(-1) }}
                            >
                                <MdClose />
                            </motion.button>

                            <ContentInfo>
                                {/* <div className="modalImg">
                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                                </div> */}

                                <div className="infoTextWrap">
                                    <div className="info01">
                                        {data?.release_date && <span>{movieReleaseYear(movie.release_date)}</span>}
                                        {data?.runtime && <span>{data?.runtime}분</span>}
                                    </div>
                                    {data?.runtime && <p className="info02">{movie.overview}</p>}
                       

                                </div>
                                <div className="infoGenres">장르 : <p>{data?.genres.map((genre, index) => <span  key={index}>{genre.name}</span>)}</p></div>
                            </ContentInfo>

                        </div>

                    </motion.div>
                </ModalContainer>
            ) : null}
        </AnimatePresence>
    )
}

const ModalContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    background-color: rgba(0,0,0,0.7);
    z-index: 999;
    opacity : 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0px;

    .modalContent{
        position: relative;
        width: 50%;
        max-height: 100vh;
        background: gray;
        z-index: 999;
        overflow: auto;

        .content{
            padding: 24px;
            box-sizing: border-box;
        }
    }
`
const ContentInfo = styled.div`
    background: gray;
    padding: 0px 24px 24px;
    box-sizing: border-box;
    display: flex;
    gap: 30px;
    .infoTextWrap{
        display: flex;
        flex-direction: column;
        gap: 12px;
        color:#fff;
        width: 60%;
        .info01{
            display: flex;
            gap: 10px;
            font-size: 24px;
            font-weight: bold;
            color : lightgray;
        }
        .info02{
            font-size: 20px;
            line-height: 1.2;
            
        }
    }

    .infoGenres{
        color: lightgray;
        display: flex;
        gap: 10px;
        p{
            display: flex;
            gap : 4px;
            color: #fff;
        }
    }


`