import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import { act, createContext, useEffect, useReducer, useRef, useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';

export const StateContext = createContext(); //useReducer를 자식컴포넌트들이 사용할수있도록, state보낼 용도
export const DispatchContext = createContext(); // 함수들 보낼 용도

// 임시 data
const mokData=[
  {
    id:'m1',
    date : new Date().getTime(),
    content : 'tmpdata1',
    emotionId :1
  }, 
  {
    id:'m2',
    date : new Date().getTime() +2,
    content : 'tmpdata2',
    emotionId :4
  },
  {
    id:'m3',
    date : new Date().getTime()+3,
    content : 'tmpdata3',
    emotionId :3
  }
]



function reducer(state, action){

  switch(action.type){
    case 'CREATE':
      return [action.data,...state]
    case 'UPDATE':
      return state.map((data)=>data.id == action.data.id ? {...action.data}:data)
    case 'DELETE':
      return state.filter((data)=>data.id != action.targetId)  // index 찾을때 findIndex
      // filter는 조건에 만족하는 애들만 return 
    case 'INIT':
      return action.data  
    default:
      return state;  
  }
}
function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0); // 게시글 번호 저장용, 해당 컴포넌트가 재렌더링 되도 값 변경x
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터다 받아오기전까지 로딩중으로 보이게

  useEffect(()=>{
    dispatch({
      type:'INIT',
      data:mokData
    })
    setIsDataLoaded(true);// 데이터 로딩 끝나고 보여주기
  },[])

  const onCreate= (date, content, emotionId)=>{
    dispatch({
      type:'CREATE',
      data:{
        id:idRef.current,
        date:new Date(date).getTime(),
        content,
        emotionId
      }
    })
    idRef.current+=1;
  }

  const onUpdate =(targetId, date, content, emotionId) =>{
    dispatch({
      type:'UPDATE',
      data:{
        id:targetId,
        date:new Date(date).getTime(),
        content,
        emotionId
      }
    })
  }

  const onDelete=(targetId)=>{
    dispatch({
      type:'DELETE',
      targetId
    })
  }

  if(!isDataLoaded)
    return<div>로딩중입니다.</div>

  return (
    <div className="App">
      <StateContext.Provider value={data}>
        <DispatchContext.Provider value={{onCreate, onUpdate, onDelete}} >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />}/>
            <Route path='/diary/:id' element={<Diary />}/>
            <Route path='/edit/:id' element={<Edit />} />
          </Routes>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
