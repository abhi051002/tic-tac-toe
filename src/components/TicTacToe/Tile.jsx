import React from 'react'

const Tile = ({className,value,onClick,playerTurn}) => {
  let hoverClass=null;
  if(value==null && playerTurn!=null){
    hoverClass = `${playerTurn.toLowerCase()}-hover`
  }
  return (
    <div className={`tile ${className} ${hoverClass}`} onClick={onClick}>{value}</div>
  )
}

export default Tile