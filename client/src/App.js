import { useState, useEffect } from "react";
import axios from 'axios'
import styles from "./App.module.css";
import './Root.css'
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  Login,
  Join,
  ItinerMain,
  ItinerCreate,
  ItinerModify,
  ItinerChangeList,
  DetailedItinerary,
  MyItinerList,
  MyDetailedItinerary,
  SharedItinerList,
  SharedDetailedItinerary,
  PopularityDestination,
  NotFound } from './pages'



const menus = [
  {
    url: '/',
    name: '여행의 시작'
  },
  {
    url: '/itinerary/create',
    name: '새로운 여행'
  },
  {
    url: '/itinerary/changelist',
    name: '여행 관리'
  },
  {
    url: '/itinerary/myitinerary',
    name: '나의 여행'
  },
  {
    url: '/itinerary/shareditinerary',
    name: '다른 사람의 여행'
  },
  {
    url: '/itinerary/popularitydestination',
    name: '인기 여행지'
  }
]


function App() {
  const navigate = useNavigate()

  const [user, setUser] = useState()

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('./')
    window.location.reload()
    alert('로그아웃 되었습니다.')
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/users/getId', {
      headers: {
          'Constent-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res) => setUser(res.data))
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className={styles.App}>
      <nav className={styles.gnb}>
        <div className={styles.mainMenu}>
          {menus.map((menu, id) => 
            <NavLink key={id} to={menu.url}>{menu.name}</NavLink>
          )}
        </div>
        <div className={styles.userMenu}>
          {user ? 
            <>
              <NavLink to='/'>내 정보</NavLink> 
              <NavLink to='/' onClick={logout}>로그아웃</NavLink> 
            </> :
            <>
              <NavLink to='/login'>로그인</NavLink>
              <NavLink to='/join'>회원가입</NavLink>
            </>
          }
        </div>
      </nav>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/join' element={<Join/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/itinerary' element={<ItinerMain/>}>
          <Route exact path='/itinerary/create' element={<ItinerCreate/>}/>
          <Route exact path='/itinerary/modify' element={<ItinerModify/>}>
            <Route exact path=':itineraryId' element={<ItinerModify/>}/>
          </Route>
          <Route exact path='/itinerary/changelist' element={<ItinerChangeList/>}/>
          <Route exact path='/itinerary/details' element={<DetailedItinerary/>}>
            <Route exact path=':itineraryId' element={<DetailedItinerary/>}/>
          </Route>
          <Route exact path='/itinerary/myitinerary' element={<MyItinerList/>}/>
          <Route exact path='/itinerary/myitinerary' element={<MyDetailedItinerary/>}>
            <Route exact path=':itineraryId' element={<MyDetailedItinerary/>}/>
          </Route>
          <Route exact path='/itinerary/shareditinerary' element={<SharedItinerList/>}/>
          <Route exact path='/itinerary/shareditinerary' element={<SharedDetailedItinerary/>}>
            <Route exact path=':itineraryId' element={<SharedDetailedItinerary/>}/>
          </Route>
          <Route exact path='/itinerary/popularitydestination' element={<PopularityDestination/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
