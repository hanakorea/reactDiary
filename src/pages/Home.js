import { useContext, useEffect, useState } from "react"
import Button from "../components/Button"
import Editor from "../components/Editor"
import Header from "../components/Header"
import { StateContext } from "../App";
import { getMonthRangeByDate } from "../utils/util";
import DiaryList from "../components/DiaryList";

function Home(){
  const data = useContext(StateContext); // 저장된 정보를 main에서 볼수있게 처리
  const [filterData, setFilterData] = useState([]); // 달마다 들어있는 정보

  const [pivotDate, setPivotDate] = useState(new Date());
  const headerTitle = `${pivotDate.getFullYear()}년${pivotDate.getMonth()+1}월`

  useEffect(()=>{
    if(data.length>=1){
      const{beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
      setFilterData(
        data.filter((d)=>beginTimeStamp<=d.date && d.date<endTimeStamp)
      )
    }else{
      setFilterData([]) // 다 지워졌을 때 비워져야함
    }
  },[pivotDate, data]) // data->글 추가 되었을때 변경


  const onDecreaseMonth =()=>{
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1))
  }

  const onIncreaseMonth =()=>{
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1))
  }

  return(
    <div>
      <Header 
      title={headerTitle}
      leftChild={<Button text={'<'} onClick={onDecreaseMonth}/>}
      rightChild={<Button text={'>'} onClick={onIncreaseMonth}/>}
      />
      <DiaryList data={filterData} />
    </div>
  )
}

export default Home