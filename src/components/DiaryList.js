import { useEffect, useState } from "react"
import Button from "./Button"
import "./DiaryList.css"
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

// static date들 
const sortOptionList =[
  {value :'latest', name:'최신순'},
  {value : 'oldest', name :'오래된 순'}
]

function DiaryList({data}){
  // 렌더링 해야하는 data만 넣어주기
  const [sortType, setSortType] = useState('latest');
  const [sortedData, setSortedData] = useState([]);
  const negative = useNavigate();

  useEffect(()=>{
    // 정렬 기준을 만들어 정렬하는 함수
    const compare =(a,b)=>{
      if(sortType == 'latest'){
        return Number(b.date) - Number(a.date); // 날짜기준으로 내림차순
      }else{
        return Number(a.date) - Number(b.date)
      }
    }
    const copyList=[...data]
    copyList.sort(compare)
    setSortedData(copyList);
  },[data, sortType])



  const changeSortTypeHandler = (e) =>{
    setSortType(e.target.value);
  }
  const clickNewHandler=()=>{
    negative('/new')
  }

  return(
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <select value={sortType} onChange={changeSortTypeHandler}>
            {sortOptionList.map((data, i)=>{
              return(
                <option value={data.value} key={i}>
                  {data.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className="right_col">
          <Button text={'새 다이어리 작성'} type={'positive'} onClick={clickNewHandler}/>
        </div>
      </div>
      <div className="list_wrapper">
        {
          sortedData.map((data)=>{
            return(
              <DiaryItem key={data.id} {...data}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default DiaryList