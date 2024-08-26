import APP_IMAGE from "../../../assets"
import "./CardNews.scss"
const CardNews = () => {
    return (
        <div class="card">
            <div class="card-image">
                <img src={APP_IMAGE.accessory} alt="" />
            </div>
            <div class="card-content">
                <h3>MUA THẢ GA - GIẢM THẢ PHANH</h3>
                <p class="date">19/08/2024</p>
                <p>Outfit mới rộn ràng đón lễ, thỏa sức mua sắm với combo giảm giá cực chất. Chọn ngay outfit xinh xắn để tỏa sáng suốt ngày dài!</p>
            </div>
        </div>
    )
}
export default CardNews