import logo from './logo.svg';
import './App.css';
import goods from './base/goods.json'
import bucket from './base/basket.json'
import React, { useEffect, useState } from "react";
import goodsyList from './base/goodsList.json'
import Preloader from './component/Preloader'


function App() {

  let bucketLength = 0

  const [goody, setGoody] = useState('')
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)
  const [isActive, setActive] = useState(false)
  const [bucketL, setBucket] = useState(0)
  const [changeBtn, setCHange] = useState('')

  const goodsList = []
  goods.forEach(e => goodsList.push(e))
  const goBucket = (e) => {
    let good = goodsList.filter(good => {
           return (good.id.includes(e.target.id))
         })
    let god = good.reduce((res, obj) => obj.id == e.target.id ? obj : res, {}); 
    setActive(false)
    setGoody(god)
    let chng = goodsyList.filter(good => {
      return (good.id.includes(e.target.id))
    })
    let chang = chng.reduce((res, obj) => obj.id == e.target.id ? obj : res, {}); 
    setCHange(chang)
   }

  useEffect(() => {
    if (goody != '') {
      bucket.push(goody) 
      console.log(goodsList)
      setBucket(bucketL + 1)
      setGoody('')
      if (changeBtn.show1 == 'show') {
        changeBtn.show1 = 'hide'
        changeBtn.show2 = 'show'
      } else {
        changeBtn.show1 = 'show'
        changeBtn.show2 = 'hide'
      }
      goodsyList = goodsyList.filter(el => { return (el.id != -1)})
      console.log(goodsyList)
      let totalPrice = bucket.map(e => {
        return (e.price)
      })
      let count = totalPrice.reduce(function(sum, cor) {
        return sum + cor
      })
      setTotal(count)
    } 
  }, [goody])



  const goPrice = (e) => {
    let price = bucket.filter(el => {
      return (el.id.includes(e.target.id))
    })
    let originalPrice = goodsyList.filter(el => {{
      return (el.id.includes(e.target.id))
    }})
    originalPrice = originalPrice.reduce((res, obj) => obj.id == e.target.id ? obj : res, {}); 
    let onlyPrice = price.map(e => {
      return (e.price)
    })
    let county = price.reduce((res, obj) => obj.id == e.target.id ? obj : res, {}); 
    county.count = county.count + 1
    county.price = originalPrice.price + county.price
    
    let pricee = total + originalPrice.price
    setTotal(pricee)
    setBucket(bucketL + 1)

    let x = goodsyList.filter(el => {return (el.id.includes(e.target.id))})
    x = x.reduce((res, obj) => obj.id == e.target.id ? obj : res, {}); 
    x.count = x.count + 1
    goodsyList = goodsyList.filter(el => el.id != -1)
  }

  const downPrice = (e) => {
    let price = bucket.filter(el => {
      return (el.id.includes(e.target.id))
    })
    let originalPrice = goodsyList.filter(el => {{
      return (el.id.includes(e.target.id))
    }})
    originalPrice = originalPrice.reduce((res, obj) => obj.id == e.target.id ? obj : res, {}); 
    let onlyPrice = price.map(e => {
      return (e.price)
    })
    let county = price.reduce((res, obj) => obj.id == e.target.id ? obj : res, {}); 
    county.count = county.count - 1
    if (county.count == 0) {
      county.count = 1
      county.price = originalPrice.price
      let pricee = total - originalPrice.price
      setTotal(pricee)
      bucket = bucket.filter (el => el.id != e.target.id)
      setBucket(bucketL - 1)
      console.log(originalPrice)
      originalPrice.show1 = 'show'
      originalPrice.show2 = 'hide'
      return;
    }
    county.price = county.price - originalPrice.price 

    let x = goodsyList.filter(el => {return (el.id.includes(e.target.id))})
    x = x.reduce((res, obj) => obj.id == e.target.id ? obj : res, {}); 
    x.count = x.count - 1
    goodsyList = goodsyList.filter(el => el.id != -1)
    
    let pricee = total - originalPrice.price
    setTotal(pricee)
    setBucket(bucketL - 1)
  }

  const showBucket = () => {
    setActive(!isActive)
  }

  return (

    <>
    <Preloader/>
    <div>
      <div className="header">
        <p>Lego Rius Shop</p>
      </div>

      <div className="container">
        {
          goodsyList.map(el => (
            <div className="good-container"> 
              <img src={el.poster}></img>
              <h1>{el.title}</h1>
              <p>{el.price}₽</p>
              <button className={el.show1} id={el.id} onClick={goBucket}>В Корзину</button>
              <button className={el.show2} id={el.id} onClick={downPrice}>Убрать х{el.count}</button>
            </div>
          ))
        }
      <div className='bucketIco' onClick={showBucket}>
        <img src='/RTUB/posters/buck.png'></img>
        <p>{bucketL}</p>
      </div>
      <div className={isActive ? "bucket" : "hide"}>
        <div className="bucket__header">
          <h1>Корзина</h1>
        </div>
        {
          bucket.map(el => (
            <div className="bucket__good"> 
              <p>{el.title}</p>
              <div className='goody__but'> 
                <button id={el.id} onClick={downPrice}>-</button>
                <p>x{el.count}</p>
                <button  id={el.id} onClick={goPrice}>+</button>
              </div>
              <p>{el.price}₽</p> 
            </div>
          ))
        }
        <div>
          <p>Общая стоимость:{total}₽</p>
        </div>
      </div>
      </div>
      <div className="header">
        <p>LEGO RIUS 2024</p>
      </div>
    </div>
    </>
    
  );
}

export default App;
