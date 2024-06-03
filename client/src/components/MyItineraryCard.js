import React, { useState, useEffect } from "react";
import axios from 'axios'
import moment from 'moment'
import { useParams, useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom'
import styles from './MyItineraryCard.module.css'

function MyItineraryCard({itinerary, handleClick}){
    const navigate = useNavigate()

    // console.log(itinerary)
    const [totalcost, setTotalcost] = useState(0)

    // 해당 일정 이미지 불러오기
    let imgSrc = ''
    if(itinerary.length !== 0){
        const imgSrcSearched1 = itinerary.itineraryByDateIds.map(itineraryByDateId => {
            // console.log(itineraryByDateId)
            return (
                itineraryByDateId.destinationIds.map(destinationId => {
                    // console.log(destinationId)
                    return destinationId.destinationInfo.photoUrl
                })
            )
        })
        const imgSrcSearched2 = imgSrcSearched1.find(res => {
            return res.length !== 0 && res[0] !== ''
        })
        if(imgSrcSearched2){
            imgSrc = imgSrcSearched2.find(res => {
                return res
            })
        }else{
            imgSrc = "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    }

    const changePage = (e) => {
        // console.dir(e.target.id)
        if(e.target.tagName !== 'BUTTON'){
            if(e.target.id){
                navigate(`/itinerary/myitinerary/${e.target.id}`)
            }
        }
    }

    // 일정 총 예상 비용 불러오기
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/itinerarys/totalcost/${itinerary._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            // console.log(res)
            setTotalcost(res.data.totalcost)
        })
    }, [])

    // D-day 설정
    const diffDate = moment().startOf('day').diff(moment(itinerary.dateOfStart), 'days')

    const {open, status, title, city, dateOfStart, dateOfEnd, description, _id} = itinerary
    return (
        <div className={styles.container} onClick={changePage}>
            <div className={styles.top}>
                <div>{open}</div>
                <button onClick={handleClick} id={_id}>{status}</button>
            </div>
            <div className={styles.details} id={_id}>
                <img src={imgSrc} alt={title} id={_id}></img>
                <div className={styles.infomation}>
                    <div className={styles.infoTop}>
                        <div>
                            <div>D{diffDate === 0 ? '-day' : diffDate > 0 ? '+' + diffDate : diffDate}</div>
                            <div>{title}</div>
                        </div>
                        <button>공유하기 아이콘</button>
                    </div>
                    <div className={styles.infoMain}>
                        <div>{city}</div>
                        <div>{moment(dateOfStart).format('YYYY-MM-DD')} ~ {moment(dateOfEnd).format('YYYY-MM-DD')}</div>
                        <div>예상 비용: {Number(totalcost).toLocaleString()}원</div>
                        <div>{description}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyItineraryCard