import './Button.css' // import 하는거 잊지 말기

function Button({text, type, onClick}){
  const btnType =['positive', 'negative'].includes(type) ? type : 'default';

  return(
    <button className={"Button " + `Button_${btnType}`} onClick={onClick}>
      {text}
    </button>
  )
}

Button.defaultProps={
  type : 'default'
}

export default Button