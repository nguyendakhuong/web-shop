import 'react-slideshow-image/dist/styles.css'
import { Fade, Zoom, Slide } from 'react-slideshow-image'
import './HomeUser.scss'
const slidesImage = [
    {
        url: "https://file.hstatic.net/200000584505/file/web-pc__1_.jpg"
    },
    {
        url: "https://file.hstatic.net/200000584505/file/web-pc-trang-chu.jpg"
    },
    {
        url: "https://file.hstatic.net/200000584505/file/banner-pc.jpg"
    },
]
const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '800px',
    backgroundSize: 'cover'
}

const HomeUser = () => {
    return (
        <div>
            <div className='slide-container'>
                <Fade>
                    {slidesImage.map((v, i) => (
                        <div key={i}>
                            <div style={{ ...divStyle, backgroundImage: `url(${v.url})` }}>

                            </div>
                        </div>
                    ))}
                </Fade>
            </div>
            <div className='textSale'>
                <h2>END OF SEASON SALE</h2>
                <div className='hr' />
                <label>SALE UP TO 70%</label>
            </div>
        </div>
    )
}
export default HomeUser