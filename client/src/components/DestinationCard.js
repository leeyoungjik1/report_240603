import React, { useState, useEffect } from "react";
import moment from 'moment'
import styles from './DestinationCard.module.css'
import ModDestinationCard from "./ModDestinationCard";

function DestinationCard({title, address, category, timeOfStart, timeOfEnd, description, cost, isDone, imgSrc, modDestinationCards, destinationId, changeSubmit, handleClick, children}){
    const findDestinationId = modDestinationCards.find(modDestinationCard => modDestinationCard === destinationId)

    return (
        <div className={styles.destinationCardContainer}>
            <div>{isDone ? "완료" : "예정"}</div>
            <div className={styles.destinationCardMain}>
                <img src={imgSrc}></img>
                <div>
                    <div>{category}</div>
                    <div>
                        {moment(timeOfStart).format('HH:mm')} ~ {moment(timeOfEnd).format('HH:mm')}
                    </div>
                    <div>{title}</div>
                    <div>{address}</div>
                    <div>{description}</div>
                    <div>예상 금액: {cost}원</div>
                </div>
            </div>
            <div className={styles.destinationCardBtns} onClick={handleClick}>
                {children}
            </div>
            <ModDestinationCard 
                destinationId={destinationId}
                changeSubmit={changeSubmit}
                isShow={findDestinationId ? true : false}
            />
        </div>
    )
}

export default DestinationCard