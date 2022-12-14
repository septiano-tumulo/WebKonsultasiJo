import React,{useContext,useEffect,useState} from "react";
import Navigation from "../components/Navigation";
import '../assets/gap.css';
import '../assets/styles.css';
import LogoBitung from '../assets/logoBitung.svg';
import PemerintahKotaBitung from '../assets/pemerintahKotaBitung.jpg';
import { AuthContext } from "../context/AuthContext";
import app from '../configs/firebase'
import { getDatabase, ref ,onValue } from "firebase/database";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const split={
    display: 'flex',
    flexDirection: 'row',
}



const Dashboard = () => {
  const {user} = useContext(AuthContext)
  const [categories,setCategories] = useState([])

  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  // const getProperty = categories!== null && categories!== undefined ? Object.getOwnPropertyNames(categories?.years['2022'].months) : ''
  // console.log(getDatas);
  console.log(categories);
  const val = 0
  // for (var key in getDatas) {
  //   console.log(getDatas[key].value);
  // }
  // const datas = labels.map((item,index,arr)=>{
  //   const find = item.includes(getProperty[0].slice(0,3 - 1))
  //
  //   return find
  // })
  console.log(val);
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data:[12,13,14],
        backgroundColor: [
          "#8D2179",
          "#C9E265",
          "#E5775E",
          "#000000",
          "#E0E2E2",
          "#8F78C6",
          "#3D4C97",
          "#8D2179",
          "#C9E265",
          "#E5775E",
          "#000000",
          "#E0E2E2",
        ],
        borderWidth: 1,
      }
    ]
  }
  const getCategories = async()=>{
    const db = await getDatabase(app)
    const dbRef = await ref(db,'/categoriesDatas');
    await onValue(dbRef, (snapshot) => {
      setCategories((state) => [snapshot.val(),...state]);
    });
  }
  useEffect(()=>{
    let mounted = true
    if (mounted) {
      getCategories()
    }
    return ()=>mounted=false
  },[])

  const heading={      
      textAlign:'center',      
  }
  

    return(
      <div style={split}>
        <Navigation />
        <div className="gap">
          <div style={heading}>
            <h1>
              Selamat Datang              
            </h1>
            
            <img style={{height:600, width:1200 }} src={PemerintahKotaBitung} alt="Pemerintah Kota Bitung" />
          </div>

          {/* <h5>Selamat Datang, Admin {user.name}</h5>
          <p>statistik</p>
            <div>
              <Bar
                datasetIdKey='id'
                data={data}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Statistik Konsultasi Hukum',
                    },
                  },
                }}
              />
            </div> */}


        </div>
      </div>
    );
}

export default Dashboard;
