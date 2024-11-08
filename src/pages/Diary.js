import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { getFormattedDate } from "../utils/util";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";

function Diary(){
  const {id} = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  console.log(data)
  if(!data) // 렌더링하고 useDiary렌더링하기 때문에 데이터x경우가 있음 이를 방지
    return<div>로딩중입니다..</div>
  else{
    const {date, emotionId, content} = data;
    const title = `${getFormattedDate(new Date(date))} 다이어리`  

    const goBack =()=>{
      navigate(-1)
    }
    const goEdit=()=>{
      navigate(`/edit/${id}`)
    }
    return(
      <div>
      <Header
        title={title}
        leftChild={<Button text={'<뒤로가기'} onClick={goBack}/>}
        rightChild={<Button text={'수정하기'} onClick={goEdit} />}
      />
      <Viewer content={content} emotionId={emotionId}/>
      </div>
    )
  }
}

export default Diary;