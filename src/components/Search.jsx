import { BiSearch } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import styled from "styled-components";
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


//yarn add framer-motion
/*
리액트에서 사용하는 애니메이션 라이브러리
리액트의 특성상 생명주기를 기반으로 컴포넌트를 불러오는 방식이기 때문에 애니메이션이 연결될때 
보통 일반적으로 사용하는 css속성을 기반으로 컨트롤

initial : 초기값
animate : 컴포넌트가 동적인 상태를 통해서 최종적으로 변경될 속성 값
*/
export default function Search() {

    const [searchOpen, setSearchOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [clearBtn, setClearBtn] = useState(false);
    const [movieList, setMovieList] = useState([]);


    //0429추가
    const [visible, setVisible] = useState(false);
    const searchRef = useRef()
    const navigate = useNavigate();


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target) && !keyword) {
                setVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [keyword]);

    const handleChange = (e) => {
        setKeyword(e.target.value); // 텍스트 필드의 값을 업데이트
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && keyword.trim()) {
            setClearBtn(true);
            // try {
            //     const results = await getSearch(keyword);
            //     setMovieList(results);
            // } catch (error) {
            //     console.error("Error fetching search results:", error);
            //     setMovieList([]);
            // }
            const searchUrl = `/search?keyword=${keyword || ''}`;
            navigate(searchUrl, { state: { keyword } });
            setKeyword('');
        }
    };




    //검색창 오픈 이벤트
    const inputOpenEvent = () => {
        setSearchOpen((open) => !open)
    }


    //검색창 내용 삭제 이벤트
    const onClearEvent = (e) => {
        e.preventDefault();
        setClearBtn(false)
        setKeyword('');
        setMovieList([]);
    }



    return (
        <>
            <SearchForm visible={`${searchOpen}`} ref={searchRef}>
                <motion.div
                    initial={{ width: 30 }}
                    animate={{
                        width: searchOpen ? 250 : 30,
                        borderColor: `rgba(255,255,255,${searchOpen ? '0.5' : '0'})`,
                        transition: { duration: 0.5 }
                    }}>
                    <button type="button" className="search-btn" onClick={inputOpenEvent}>
                        <BiSearch />
                    </button>
                    <motion.input type="text"
                        initial={{ width: 0 }}
                        animate={{ width: searchOpen ? 200 : 0 }}
                        transition={{ duration: 0.3 }}
                        placeholder="검색어를 입력하세요"
                        value={keyword}
                        onChange={handleChange} // 키보드 입력 감지
                        onKeyDown={handleKeyDown} // 엔터 키 감지


                    />
                    {clearBtn && (
                        <button className="clear-btn" onClick={onClearEvent}>
                            <MdClose />
                        </button>
                    )}
                    {/* 초기화 버튼을 조건부로 생성 */}




                </motion.div>
            </SearchForm>


        </>
    )
}

const SearchForm = styled.form`
    display: flex;
    position: relative;
    top: 0px;
    left: 0px;
    div{
        border: solid 1px transparent;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 250px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 5px;
        
    }
    .search-btn{
        color: #fff;
        font-size: 30px;
        display: flex;
        align-items: center;
    }

    input[type='text']{
        
        padding: 5px;
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
    }

    .clear-btn{
        color: #fff;
        font-size: 20px;
        display: flex;
        align-items: center;
        margin-left: auto;
        z-index: 99;

    }


`

