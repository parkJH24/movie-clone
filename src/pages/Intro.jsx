// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import styled from 'styled-components';

// // 애니메이션을 위한 variants 정의
// const pathVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 1 } },
//     exitRect: { height: 0, opacity: 0, transition: { duration: 0.5, ease: "easeInOut" }, originY},  // 수정: originY 추가
//     exitPolygon: { scaleX: 0, opacity: 0, transition: { duration: 1, ease: "easeInOut" } }  // 수정: scaleX로 변경
// };

// // 로고를 감싸는 컨테이너 스타일링
// const LogoContainer = styled.div`
//   display: flex;
//   width: 100vw;
//   height: 100vh;
//   justify-content: center;
//   align-items: center;
//   background-color: #000;
// `;

// export default function Intro() {
//   // rectVisible 상태로 rect 요소의 렌더링을 제어
//   const [rectVisible, setRectVisible] = useState(true);
//   const [diagonalLineVisible, setDiagonalLineVisible] = useState(true);

//   // 컴포넌트 마운트 후 2초 후에 rectVisible 상태를 false로 설정
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setRectVisible(false);
//     }, 2000); // 2초 후 실행

//     const secondTimer = setTimeout(() => {
//       setDiagonalLineVisible(false);
//     }, 2500); // 첫 번째 라인이 사라진 후 0.5초 후에 대각선 라인이 사라짐

//     return () => {
//       clearTimeout(timer);
//       clearTimeout(secondTimer); // 컴포넌트 언마운트 시 타이머 해제
//     };
//   }, []);

//   return (
//     <LogoContainer>
//       <AnimatePresence>
//         <motion.svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="500"
//           height="500"
//           viewBox="-62.5 -62.5 250 250"
//           initial="hidden"
//           animate="visible"
//         >
//           <AnimatePresence>
//             {rectVisible && (
//               <motion.rect
//                 x="70"
//                 y="0"
//                 width="16"
//                 height="120"
//                 fill="#B20710"
//                 variants={pathVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exitRect"
//               />
//             )}
//           </AnimatePresence>
//           <motion.rect
//             x="20"
//             y="0"
//             width="16"
//             height="120"
//             fill="#B20710"
//             variants={pathVariants}
//             initial="hidden"
//             animate="visible"
//           />
//           <AnimatePresence>
//             {diagonalLineVisible && (
//               <motion.polygon
//                 points="86,120 70,120 19.69,0 36.56,0"
//                 fill="#E50914"
//                 variants={pathVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exitPolygon"
//               />
//             )}
//           </AnimatePresence>
//         </motion.svg>
//       </AnimatePresence>
//     </LogoContainer>
//   );
// }
