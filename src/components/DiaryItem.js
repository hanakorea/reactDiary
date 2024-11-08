import { useNavigate } from 'react-router-dom'
import { getEmotionImgById, getFormattedDate } from '../utils/util'
import Button from './Button'
import './DiaryItem.css'
import { memo } from 'react';
function DiaryItem({id, emotionId, content, date}){
  const navigator = useNavigate();
  const goDetail=()=>{
    navigator(`/diary/${id}`)
  }
  const goEdit=()=>{
    navigator(`/edit/${id}`)
  }
  return(
    <div className="DiaryItem">
      <div className={`img_section img_section_${emotionId}`} onClick={goDetail}>
        <img src={getEmotionImgById(emotionId) } />
      </div>
      <div className='info_section' onClick={goDetail}>
        <div className='date_wrapper'>
          {new Date(date).toLocaleDateString()}
        </div>
        <div className='content_wrapper'>
          {content.slice(0,20)}
        </div>
      </div>
      <div className='button_section'>
        <Button text={'수정하기'} onClick={goEdit}/>
      </div>
    </div>
  )
}

// 관련없는것 렌더링 방지
export default memo(DiaryItem)