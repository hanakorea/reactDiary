import { useContext, useEffect, useState } from "react"
import { StateContext } from "../App"
import { useNavigate } from "react-router-dom";

function useDiary(id){
  const data = useContext(StateContext)
  const [diary, setDiary] = useState();
  const navigator = useNavigate();

  useEffect(()=>{
    const matchDiary = data.find((d)=>d.id == id)
    if(matchDiary)
      setDiary(matchDiary)
    else{
      alert('해당 데이터는 없습니다.')
      navigator('/')
    }
  },[id, data])

  return diary;
}

export default useDiary