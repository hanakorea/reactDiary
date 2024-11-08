import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { DispatchContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import useDiary from "../hooks/useDiary";

function Edit(){
  const {id} = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const {onUpdate, onDelete} = useContext(DispatchContext)

  const onSubmit=(data)=>{
    if(window.confirm('수정하시겠습니까?')){
      const {date, content, emotionId} = data;
      onUpdate(id, date, content, emotionId)
    }

    navigate('/')
  }

  const deleteHandler=()=>{
    if(window.confirm('정말로 삭제하시겠습니까?')){
      onDelete(id);
      navigate('/')
    }
  }
  const goBack=()=>{
    navigate(-1)
  }
   if(!data)
    return <div>로딩중...</div>
   else{
    return(
     <div>
      <Header 
        title={'다이어리 수정'}
        leftChild={<Button text={'< 뒤로 가기'} onClick={goBack}/> }
        rightChild={<Button text={'삭제하기'} type='negative' onClick={deleteHandler}/> }
      />
      <Editor onSubmit={onSubmit} initData={data}/>
     </div>
    )
  }  
}
export default Edit