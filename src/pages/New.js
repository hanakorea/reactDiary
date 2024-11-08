import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Header from "../components/Header"
import Editor from "../components/Editor";
import { useContext } from "react";
import { DispatchContext } from "../App";

function New(){
  const navigate = useNavigate();
  const {onCreate} = useContext(DispatchContext);

  const onSubmit =(data) =>{
    const {date, content, emotionId} = data;
    onCreate(date, content, emotionId)

    navigate('/')
  }

  const goBack=()=>{
    navigate(-1)
  }
  return(
    <div>
      <Header 
        title={'새 다이어리 작성'}
        leftChild={<Button text={'< 뒤로 가기'} onClick={goBack}/>}
      />
      <Editor onSubmit={onSubmit}/>
    </div>
  )
}

export default New