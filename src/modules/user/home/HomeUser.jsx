import 'react-slideshow-image/dist/styles.css'
import { Fade, Zoom, Slide } from 'react-slideshow-image'
import './HomeUser.scss'
import Card from '../../components/card/Card'
import APP_IMAGE from '../../../assets'
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
                        "image1": `../../../assets/image/anh1.jpg`,
                        "image2": "aaaaaaaaaaaaa",
                        "image3": "aaaaaaaaaaaaa"
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
                        "image1": "aaaaaaaaaaaaa",
                        "image2": "aaaaaaaaaaaaa",
                        "image3": "aaaaaaaaaaaaa"
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
                        "image1": "aaaaaaaaaaaaa",
                        "image2": "aaaaaaaaaaaaa",
                        "image3": "aaaaaaaaaaaaa"
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
                        "image1": "aaaaaaaaaaaaa",
                        "image2": "aaaaaaaaaaaaa",
                        "image3": "aaaaaaaaaaaaa"
                    }
                ]
            }
        ]

    }
]

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
            <div>
                {
                    JSON_TEST.map((v, i) => (
                        <div key={i}>
                            <Card product={v} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default HomeUser