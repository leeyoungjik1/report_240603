import React from 'react'
import moment from 'moment'
import styles from './ItineraryCardDetails.module.css'

function ItineraryCardDetails({city, dateOfEnd, dateOfStart, description, title, status, open, imgSrc, handleClick, children}){
    return (
        <div className={styles.itineraryCardBox}>
            <div className={styles.itineraryCardState}>
                <div>{open}</div>
                <div>{status}</div>
            </div>
            <div className={styles.itineraryCardMain}>
                <div className={styles.itineraryCardDetails}>
                    <img src={imgSrc}></img>
                    <div>
                        <div className={styles.itineraryCardDetailsTitle}>
                            <div>{title}</div>
                            <div>{city}</div>
                        </div>
                        <div>
                            {moment(dateOfStart).format('YYYY-MM-DD')} ~ {moment(dateOfEnd).format('YYYY-MM-DD')}
                        </div>
                        {description &&
                            <div>내용: {description}</div>
                        }
                    </div>
                </div>
                <div className={styles.itineraryCardBtns} onClick={handleClick}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ItineraryCardDetails