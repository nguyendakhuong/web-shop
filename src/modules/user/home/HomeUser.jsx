import 'react-slideshow-image/dist/styles.css'
import { Fade, Zoom, Slide } from 'react-slideshow-image'
import './HomeUser.scss'
import Card from '../../components/card/Card'
import APP_IMAGE from '../../../assets'
import CardNews from '../../components/cardNew/CardNews'

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
    height: '700px',
    backgroundSize: 'cover'
}

const JSON_TEST = [
    {
        "id": 1,
        "name": "Product1",
        "price": 111,
        "priceOld": 222, // có thể null
        "trademark": "Việt nam",
        "categori": "Ao thun",
        "material": "Len",
        "sale": 40,
        "productSizeColor": [
            {
                "name": "Den",
                "color": "#000",
                "sizeAndQuantity": [
                    { "M": 20 },
                    { "L": 30 }
                ],
                "image": [
                    {
                        "image1": `${APP_IMAGE.image1}`,
                        "image2": `${APP_IMAGE.image2}`,
                        "image3": `${APP_IMAGE.image3}`,
                        "image4": `${APP_IMAGE.image4}`,
                        "image5": `${APP_IMAGE.image5}`
                    }
                ]
            },
            {
                "name": "Trang",
                "color": "#fff",
                "size": [
                    { "S": 20 },
                    { "M": 30 }
                ],
                "image": [
                    {
                        "image1": `${APP_IMAGE.image5}`,
                        "image2": `${APP_IMAGE.image4}`,
                        "image3": `${APP_IMAGE.image3}`,
                        "image4": `${APP_IMAGE.image2}`,
                        "image5": `${APP_IMAGE.image1}`
                    }
                ]
            }
        ]

    }, {
        "id": 2,
        "name": "Product2",
        "price": 111,
        "priceOld": "", // có thể null
        "trademark": "Việt nam",
        "categori": "Ao thun",
        "sale": "30",
        "material": "Len",
        "productSizeColor": [
            {
                "name": "Den",
                "color": "#000",
                "sizeAndQuantity": [
                    { "M": 20 },
                    { "L": 30 }
                ],
                "image": [
                    {
                        "image1": `${APP_IMAGE.image3}`,
                        "image2": `${APP_IMAGE.image2}`,
                        "image3": `${APP_IMAGE.image3}`
                    }
                ]
            },
            {
                "name": "Trang",
                "color": "#fff",
                "size": [
                    { "S": 20 },
                    { "M": 30 }
                ],
                "image": [
                    {
                        "image1": `${APP_IMAGE.image4}`,
                        "image2": `${APP_IMAGE.image5}`,
                        "image3": `${APP_IMAGE.image3}`
                    }
                ]
            }
        ]

    }
]

const HomeUser = () => {
    return (
        <div className='container'>
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
            <div className='body-container'>
                <div className='textSale'>
                    <h2>END OF SEASON SALE</h2>
                    <div className='hr' />
                    <label>SALE UP TO 70%</label>
                </div>
                <div className='cardProduct'>
                    {
                        JSON_TEST.map((v, i) => (
                            <div key={i} >
                                <Card product={v} />
                            </div>
                        ))
                    }
                </div>
                <div className='textSale'>
                    <h2>Sản phẩm mới</h2>
                    <div className='hr' />
                    <label>Top trending</label>
                </div>
                <div className='cardProduct'>
                    {
                        JSON_TEST.map((v, i) => (
                            <div key={i} >
                                <Card product={v} />
                            </div>
                        ))
                    }
                </div>
                <div className='textSale'>
                    <h2>Sản phẩm bán chạy</h2>
                    <button>
                        BESt SELLER
                    </button>
                </div>
                <div className='cardProduct'>
                    {
                        JSON_TEST.map((v, i) => (
                            <div key={i} >
                                <Card product={v} />
                            </div>
                        ))
                    }
                </div>

                <div className='imageNoti'>
                    <div className='item'>
                        <div className='image-container'>
                            <img src={APP_IMAGE.clothes} alt='' />
                            <div className='overlay-text'>Quần áo</div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='image-container'>
                            <img src={APP_IMAGE.accessory} alt='' />
                            <div className='overlay-text'>Phụ kiện</div>
                        </div>
                    </div>
                </div>

                <div className='textSale'>
                    <h2>Tin tức mới</h2>
                    <div className='hr' />
                </div>
                <div>
                    <CardNews />
                </div>
            </div>

        </div>
    )
}
export default HomeUser