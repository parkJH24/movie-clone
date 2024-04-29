import styled from "styled-components"


export default function Button({ accent, children, onclick, circle }) {
    return (
        <Btn accent={accent} onclick={onclick} circle={circle}>
            {children}
        </Btn>
    )
}

const Btn = styled.button`
    background-color: ${(props) => props.accent ? `rgba(255,255,255,0.8)` : `rgba(110,110,110,0.8)`};
    color : ${(props) => props.accent ? '#000' : '#fff'};
    padding : 10px 20px;
    display : flex;
    align-items:center;
    border-radius: ${(props)=>props.circle? `50%` : `4px`};
    font-size : 20px;
    font-weight : 500;

    &:hover{
        background-color :${(props)=>props.accent ?`rgba(255,255,255,0.9)` : `rgba(110,110,110,0.9)` }
    }
`