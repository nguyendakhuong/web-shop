import { useRef, useState } from "react";
import './AddProduct.scss'
import { useNavigate } from "react-router-dom";
import APP_IMAGE from "../../../../assets";
import Input from "../../../components/input/Input";
import CreatableSelect from "react-select/creatable";

const options = [
    { value: "Túi", label: "Túi" },
    { value: "Áo", label: "Áo" },
    { value: "Quần", label: "Quần" },
];

const CreateProduct = () => {

    const navigate = useNavigate()
    const [originalPrice, setOriginalPrice] = useState("")
    const [checkBox, setCheckBox] = useState(false)
    const [product, setProduct] = useState({
        msp: '',
        name: '',
        price: '',
        priceOld: '',
        trademark: '',
        category: [],
        material: '',
        sale: '',
        describe: '',
        status: 'activity',
        productSizeColor: []
    });
    const [listError, setListError] = useState({
        msp: '',
        name: '',
        price: '',
        priceOld: '',
        trademark: '', // nhãn hiệu
        category: [],
        material: '', //vật liệu
        sale: '',
        describe: '',
        originalPrice: '',
        productSizeColor: []
    });

    const handleChange = (selectedOption, actionMeta) => {
        const selectedCategories = selectedOption.map(option => option.value);
        setProduct(prevProduct => ({
            ...prevProduct,
            category: selectedCategories
        }));
    };
    const handleInputChange = (inputValue, actionMeta) => {
    };

    const HandlerInput = () => {

    }
    const handleBack = () => {
        navigate(-1);
    }
    const handleCheckBox = () => {
        setCheckBox(!checkBox);
    }
    return (
        <div>
            <div className="header-createProduct">
                <img onClick={handleBack} src={APP_IMAGE.iconBack} alt="" />
                <h2>Tạo mới sản phẩm</h2>
            </div>
            <div className='purple-line'></div>
            <div className="form-createProduct">
                <form onSubmit={(e) => e.preventDefault()} encType='multipart/form-data'>
                    <div className="nameProduct">
                        <div className="item">
                            <Input
                                label={"Mã sản phẩm"}
                                placeholder={"Mã ..."}
                                onChange={HandlerInput}
                                name={"email"}
                                required={true}
                                validate={'required'}
                                value={product.msp}
                                errorText={listError.msp}
                                type={'text'} />
                        </div>
                        <div className="item">
                            <Input
                                label={"Tên sản phẩm"}
                                placeholder={"Tên ..."}
                                onChange={HandlerInput}
                                name={"name"}
                                required={true}
                                validate={'required|maxlength:20'}
                                value={product.name}
                                errorText={listError.name}
                                type={'text'} />
                        </div>
                        <div className="itemCategory">
                            <label>Thể loại</label><span>*</span>
                            <CreatableSelect
                                options={options}
                                onChange={handleChange}
                                onInputChange={handleInputChange}
                                isMulti
                            />
                        </div>
                    </div>

                    <div className="priceProduct">
                        <div className="item1">
                            <Input
                                label={"Giá ban đầu"}
                                placeholder={"Giá ..."}
                                onChange={HandlerInput}
                                name={"originalPrice"}
                                required={true}
                                validate={'required'}
                                value={originalPrice}
                                errorText={listError.originalPrice}
                                type={'number'} />
                            <div className="checkbox">
                                <input type="checkbox" onChange={handleCheckBox} />
                                <label>Áp dụng giảm giá</label>
                            </div>
                        </div>

                        {checkBox && (
                            <div className="item2">
                                <Input
                                    label={"Phần trăm giảm giá"}
                                    placeholder={"Số ..."}
                                    onChange={HandlerInput}
                                    name={"sale"}
                                    value={product.sale}
                                    errorText={listError.sale}
                                    type={'number'} />

                                <div className="detailedPrice">
                                    <div>
                                        Giá ban đầu : {originalPrice}
                                    </div>
                                    <div>
                                        Giá bán sau khi giảm : {originalPrice * product.sale / 100}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="infoProduct">
                        <div className="item">
                            <Input
                                label={"Thương hiệu"}
                                placeholder={"Nhập ..."}
                                onChange={HandlerInput}
                                name={"trademark"}
                                required={true}
                                validate={'required'}
                                value={product.trademark}
                                errorText={listError.trademark}
                                type={'text'} />
                        </div>
                        <div className="item">
                            <Input
                                label={"Vật liệu"}
                                placeholder={"Nhập ..."}
                                onChange={HandlerInput}
                                name={"material"}
                                required={true}
                                validate={'required'}
                                value={product.material}
                                errorText={listError.material}
                                type={'text'} />
                        </div>
                    </div>

                    <div className="colorProduct">
                        <div>

                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default CreateProduct