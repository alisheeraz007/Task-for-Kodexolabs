import { useEffect, useState } from 'react';
import './PropertiesListings.scss'
import HeartFill from '../../assets/heart-fill.svg'
import HeartStroke from '../../assets/heart-stroke.svg'

function PropertiesListings() {

    let [data, setData] = useState([])
    let [localIds, setLocalIds] = useState([])

    useEffect(() => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://api.simplyrets.com/properties',
            headers: {
                'Authorization': 'Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz'
            }
        };

        axios(config)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        let d = localStorage.getItem("localIds") ? JSON.parse(localStorage.getItem("localIds")) : []
        setLocalIds(d)
    }, [])

    const setToLocal = (a) => {
        let d = [...localIds]
        d.push(a.mlsId)
        setLocalIds(d)
        localStorage.setItem("localIds",JSON.stringify(d))
    }

    const removeFromLocal=(a)=>{
        let d = [...localIds]
        d.splice(d.indexOf(a.mlsId),1)
        setLocalIds(d)
        localStorage.setItem("localIds",JSON.stringify(d))
    }

    return (
        <div className='listingMain'>
            <div className='header'>
                <div className='container'>
                    <h1>Property Listings</h1>
                </div>
            </div>

            <div className='listingDiv container'>

                {data.map((a, i) => {
                    return (
                        <div key={i} className='list'>
                            <div className='imageDiv' style={{ backgroundImage: `url('${a.photos[0]}')` }}>
                                {localIds.filter((b) => b === a.mlsId)[0] ?
                                    <img src={HeartFill} onClick={() => removeFromLocal(a)} />
                                    :
                                    <img src={HeartStroke} onClick={() => setToLocal(a)} />
                                }
                            </div>
                            <h4>{a.property.bedrooms} BR | {(a.property.bathsHalf / 2) + a.property.bathsFull} Bath | {a.property.area} Sq Ft</h4>
                            <h3>${a.listPrice.toLocaleString()}</h3>
                            <p>{a.address.full}</p>
                            <span>Listed: {new Date(a.listDate).getDay()}/{new Date(a.listDate).getMonth() + 1}/{new Date(a.listDate).getFullYear()}</span>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default PropertiesListings;
