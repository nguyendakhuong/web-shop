import { useState } from 'react';
import APP_IMAGE from '../../../assets'
import './Card.scss'



const Card = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState(product.productSizeColor[0]);
    const [currentImage, setCurrentImage] = useState(selectedColor.image[0].image1);

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setCurrentImage(color.image[0].image1);
    };
    return (
        <div className="card-container">
            <div className="image-container">
                <img src={currentImage} alt='main' className='main-image' />
                <img src={APP_IMAGE.favorite} alt='' className='image-button' />
                <div className="discount-hexagon">
                    <span>{product.sale}%</span>
                </div>
                <div className="button-group">
                    <button className="button">Buy Now</button>
                    <button className="button">Add to Cart</button>
                </div>
            </div>
            <label>{product.name}</label>
            <div className='price-container'>
                <div>Giá bán: {product.price}</div>
                {product.priceOld && <div>Giá gốc: {product.priceOld}</div>}
            </div>
            <div className='color-options'>
                {product.productSizeColor.map((colorOption, index) => (
                    <button
                        key={index}
                        className={`color-button ${selectedColor.color === colorOption.color ? 'active' : ''}`}
                        style={{ backgroundColor: colorOption.color }}
                        onClick={() => handleColorChange(colorOption)}
                    >
                        {colorOption.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default Card