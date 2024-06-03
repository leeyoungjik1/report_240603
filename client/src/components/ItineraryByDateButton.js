import React, { useState, useEffect } from "react";
import axios from 'axios'
import moment from 'moment'
import { useParams, useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom'


function ItineraryByDateButton({dateOfStart, itineraryByDate, handelClick}){
    const diffDate = moment(itineraryByDate.date).diff(moment(dateOfStart), 'days')

    return (
        <button id={itineraryByDate._id} onClick={handelClick}>{diffDate+1}일차</button>
    )
}

export default ItineraryByDateButton