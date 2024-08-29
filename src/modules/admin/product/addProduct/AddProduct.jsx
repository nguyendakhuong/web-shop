import { useState } from "react";
import './AddProduct.scss';
import { useNavigate } from "react-router-dom";
import APP_IMAGE from "../../../../assets";
import Input from "../../../components/input/Input";
import CreatableSelect from "react-select/creatable";
import Modal from 'react-modal';
import Button from "../../../components/button/Button";

const options = [
    { value: "Túi", label: "Túi" },
    { value: "Áo", label: "Áo" },
    { value: "Quần", label: "Quần" },
];

const CreateProduct = () => {
    const navigate = useNavigate();
    const [originalPrice, setOriginalPrice] = useState("");
    const [checkBox, setCheckBox] = useState(false);
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
        trademark: '',
        category: [],
        material: '',
        sale: '',
        describe: '',
        originalPrice: '',
        productSizeColor: []
    });
    const [colorProduct, setColorProduct] = useState({
        colorCode: "",
        sizeAndAmount: [],
        imageProduct: []
    })


    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTabName, setNewTabName] = useState('');

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
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleCheckBox = () => {
        setCheckBox(!checkBox);
    };

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

    const handleCreateTab = () => {
        if (newTabName.trim() !== '') {
            const newTab = {
                id: tabs.length + 1, // Tạo ID cho tab mới
                name: newTabName,
                fields: {
                    color: '',
                    size: '',
                }
            };
            setTabs([...tabs, newTab]);
            setActiveTab(newTab.id);
            setNewTabName('');
            setIsModalOpen(false);
        }

    };

    const handleAddTab = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const HandlerColorInput = () => {

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
                            Màu sản phẩm
                        </div>
                    </div>

                    <div className="tab-buttons">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={activeTab === tab.id ? 'active' : ''}
                            >
                                {tab.name}
                            </button>
                        ))}
                        <button onClick={handleAddTab} className="add-tab">
                            + Thêm màu
                        </button>
                    </div>
                    <div className="tab-content">
                        {tabs.map((tab) => (
                            activeTab === tab.id && (
                                <div key={tab.id}>
                                    <h3>Tên màu : {tab.name}</h3>
                                    <div>
                                        <div>
                                            <Input
                                                label={"Mã màu"}
                                                placeholder={"#..."}
                                                onChange={HandlerColorInput}
                                                name={"colorCode"}
                                                required={true}
                                                validate={'required'}
                                                value={colorProduct.colorCode}
                                                errorText={listError.colorCode}
                                                type={'text'} />
                                        </div>
                                        <div>
                                            <Input
                                                label={"Size và Số lượng"}
                                                placeholder={"Size:Amount ..."}
                                                onChange={HandlerColorInput}
                                                name={"sizeAndAmount"}
                                                required={true}
                                                validate={'required'}
                                                value={colorProduct.sizeAndAmount}
                                                errorText={listError.sizeAndAmount}
                                                type={'text'} />
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="Thêm màu"
                    >
                        <div className="modal-color">
                            <h2>Thêm màu mới !</h2>
                            <div>
                                <Input
                                    label={"Tên màu"}
                                    type="text"
                                    value={newTabName}
                                    onChange={(e) => setNewTabName(e.target.value)}
                                />
                            </div>
                            <Button onClick={handleCreateTab} title={"Save"} />
                            <Button onClick={handleCloseModal} title={"Cancel"} />
                        </div>
                    </Modal>

                </form>
            </div>
        </div>
    )
}

export default CreateProduct;
