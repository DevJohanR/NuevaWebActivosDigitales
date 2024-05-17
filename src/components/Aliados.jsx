import React from 'react'
import './Aliados.css'
 import img1 from '../assets/aliadosNorman/american.png'
 import img2 from '../assets/aliadosNorman/bitcomer.png'
 import img3 from '../assets/aliadosNorman/cobru.png'
 import img4 from '../assets/aliadosNorman/colors.png'
 import img5 from '../assets/aliadosNorman/cosascripto.png'
 import img6 from '../assets/aliadosNorman/eventu.png'
 import img7 from '../assets/aliadosNorman/nexdi.png'
 import img8 from '../assets/aliadosNorman/sercopp.png'
 import img9 from '../assets/aliadosNorman/vatm.png'
 import img10 from '../assets/aliadosNorman/vakano.png'



const Aliados = () => {
  return (
    <div className='AliadosContainer'>
        <div className="box"><img src={img1} alt="" /></div>
        <div className="box"><img src={img2} alt="" /></div>
        <div className="box"><img src={img3} alt="" /></div>
        <div className="box"><img src={img4} alt="" /></div>
        <div className="box"><img src={img5} alt="" /></div>
        <div className="box"><img src={img6} alt="" /></div>
        <div className="box"><img src={img7} alt="" /></div>
        <div className="box"><img src={img8} alt="" /></div>
        <div className="box"><img src={img9} alt="" /></div>
        <div className="box"><img src={img10} alt="" /></div>
    </div>
  )
}

export default Aliados