import { useRef, useState } from "react";
import './AddProduct.scss';
import { useNavigate } from "react-router-dom";
import APP_IMAGE from "../../../../assets";
import Input from "../../../components/input/Input";
import CreatableSelect from "react-select/creatable";
import Modal from 'react-modal';
import Button from "../../../components/button/Button";
import { ParseValid } from "../../../../lib/validate/ParseValid";
import { Validate } from "../../../../lib/validate/Validate";

const options = [
    { value: "Túi", label: "Túi" },
    { value: "Áo", label: "Áo" },
    { value: "Quần", label: "Quần" },
];

const CreateProduct = () => {
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef()
    const [images, setImages] = useState([])
    const [checkBox, setCheckBox] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [product, setProduct] = useState({
        msp: '',
        name: '',
        price: '',
        originalPrice: '',
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
        originalPrice: '',
        trademark: '',
        material: '',
        sale: '',
        describe: '',
        sizeAndAmount: '',
        colorCode: ''
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

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const currentTab = tabs.find(tab => tab.id === activeTab) || {};

    const handleTabDataChange = (id, field, value) => {
        setTabs(prevTabs =>
            prevTabs.map(tab =>
                tab.id === id ? { ...tab, [field]: value } : tab
            )
        );
    };



    const handleChange = (selectedOption, actionMeta) => {
        const selectedCategories = selectedOption.map(option => option.value);
        setProduct(prevProduct => ({
            ...prevProduct,
            category: selectedCategories
        }));
    };

    const handleInputChange = (inputValue, actionMeta) => {
    };

    const HandlerInput = (e) => {
        const { name, value } = e.target;

        if (name === 'originalPrice') {
            const cleanedValue = value.replace(/\./g, '');
            const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            setProduct({ ...product, [name]: cleanedValue });
            e.target.value = formattedValue;
        } else {
            setProduct({ ...product, [name]: value });
        }
        const inputValue = value.trim();
        const valid = e.target.getAttribute('validate');
        const validObject = ParseValid(valid);

        const error = Validate(
            name,
            inputValue,
            validObject,
            product.price,
            product.priceSale,
            product.priceOld
        );

        const newListError = { ...listError, [name]: error };
        setListError(newListError);

        if (Object.values(newListError).some((i) => i)) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
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

    const fileRemove = file => {
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== file)
        )
    }

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length === 0) return;

        const maxImages = 5;
        const currentImages = currentTab.imageProduct || [];
        if (currentImages.length >= maxImages) return;

        const remainingSlots = maxImages - currentImages.length;
        const newImages = [];

        for (let i = 0; i < files.length && i < remainingSlots; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;

            const imageExists = currentImages.some(img => img.name === files[i].name);
            if (!imageExists) {
                newImages.push({
                    name: files[i].name,
                    url: URL.createObjectURL(files[i])
                });
            }
        }

        if (newImages.length > 0) {
            setTabs(prevTabs =>
                prevTabs.map(tab =>
                    tab.id === activeTab ? { ...tab, imageProduct: [...currentImages, ...newImages] } : tab
                )
            );
        }
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
    const handleColorChange = (e) => {
        const { name, value } = e.target;
        handleTabDataChange(activeTab, name, value);
        const inputValue = value.trim();
        // setColorProduct({ ...colorProduct, [name]: inputValue })
        const valid = e.target.getAttribute('validate');
        const validObject = ParseValid(valid);
        const error = Validate(
            name,
            inputValue,
            validObject,
        );

        const newListError = { ...listError, [name]: error };
        setListError(newListError);
    };
    const HandlerColorInput = (e) => {
        const { name, value } = e.target;
        const inputValue = value.trim();
        setColorProduct({ ...colorProduct, [name]: inputValue })
        const valid = e.target.getAttribute('validate');
        const validObject = ParseValid(valid);
        const error = Validate(
            name,
            inputValue,
            validObject,
        );

        const newListError = { ...listError, [name]: error };
        setListError(newListError);

        if (Object.values(newListError).some((i) => i)) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }
    const selectFile = () => {
        fileInputRef.current.click()
    }
    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true)
        e.dataTransfer.dropEffect = "copy"
    }
    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false)

    }
    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false)
        const files = e.dataTransfer.files;
        if (files.length === 0) return;
        const maxImages = 5;
        const currentImages = colorProduct.imageProduct;
        if (currentImages.length >= maxImages) return;
        const remainingSlots = maxImages - currentImages.length;
        const newImages = [];

        for (let i = 0; i < files.length && i < remainingSlots; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!currentImages.some((e) => e.name === files[i].name)) {
                newImages.push({
                    name: files[i].name,
                    url: URL.createObjectURL(files[i])
                });
            }
        }
        if (newImages.length > 0) {
            setColorProduct(prevColorProduct => ({
                ...prevColorProduct,
                imageProduct: [
                    ...prevColorProduct.imageProduct,
                    ...newImages
                ]
            }));
        }
    }
    const handleDeleteTab = (id) => {
        setTabs((prevTabs) => prevTabs.filter(tab => tab.id !== id));
        if (activeTab === id) {
            setActiveTab(null);
        }
    };

    const handleBtnCreateProduct = () => {
        console.log(product)
        console.log(colorProduct)
        console.log(tabs)
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
                                name={"msp"}
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
                                validate={'required||maxLength:20'}
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
                                value={formatNumber(product.originalPrice)}
                                errorText={listError.originalPrice}
                                type={'text'} />
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
                                    validate={'checkNumber|min:1|max:99'}
                                    name={"sale"}
                                    value={product.sale}
                                    errorText={listError.sale}
                                    type={'text'} />

                                <div className="detailedPrice">
                                    <div>
                                        Giá ban đầu :{formatter.format(product.originalPrice)}
                                    </div>
                                    <div>
                                        Giá bán sau khi giảm :  {formatter.format(Math.round(product.originalPrice * (1 - product.sale / 100)))}
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
                        <h3>
                            Màu sản phẩm
                        </h3>
                    </div>

                    <div className="tab-buttons">
                        <button onClick={handleAddTab} className="add-tab">
                            + Thêm màu
                        </button>
                        {tabs.map((tab) => (
                            <div key={tab.id} className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}>
                                <button onClick={() => handleTabClick(tab.id)} className="btn-tab">
                                    {tab.name}
                                </button>
                                <label onClick={() => handleDeleteTab(tab.id)} className="delete-tab">
                                    X
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="tab-content">
                        {tabs.map((tab) => (
                            activeTab === tab.id && (
                                <div key={tab.id} className="tab">
                                    <div className="tab-color">
                                        <h3>Tên màu : {tab.name}</h3>
                                        <div className="item">
                                            <Input
                                                label={"Mã màu"}
                                                placeholder={"#..."}
                                                onChange={handleColorChange}
                                                name={"colorCode"}
                                                required={true}
                                                validate={'required|checkCodeColor'}
                                                value={currentTab.colorCode || ''}
                                                errorText={listError.colorCode}
                                                type={'text'} />
                                            <div
                                                style={{
                                                    backgroundColor: currentTab.colorCode || 'transparent', width: '20px', height: '20px', border: '1px solid #000',
                                                }}
                                            />
                                        </div>
                                        <div className="item">
                                            <Input
                                                label={"Size và Số lượng"}
                                                placeholder={"Size:Amount ..."}
                                                onChange={handleColorChange}
                                                name={"sizeAndAmount"}
                                                required={true}
                                                validate={'required|regexSizeAndQuantity|checkRegexSize|checkSize'}
                                                value={currentTab.sizeAndAmount || ''}
                                                errorText={listError.sizeAndAmount}
                                                type={'text'} />
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="top">
                                            <p>Chọn ảnh hoặc kéo ảnh</p>
                                        </div>
                                        <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                                            {
                                                isDragging ? (
                                                    <span className="select">
                                                        Drop images here
                                                    </span>

                                                ) : (
                                                    <>
                                                        Drag & Drop image here or {" "}
                                                        <span className="select" onClick={selectFile}>
                                                            Browse
                                                        </span>
                                                    </>
                                                )
                                            }
                                            <input name="file" type="file" className="file" multiple ref={fileInputRef} onChange={handleFileChange} />

                                        </div>
                                        <div className="container">
                                            {currentTab.imageProduct && currentTab.imageProduct.map((images, index) => (
                                                <div className="image" key={index}>
                                                    <span className="delete" onClick={() => { fileRemove(index) }}>x</span>
                                                    <img src={images.url} alt={images.name} />
                                                </div>
                                            ))}
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

                    <div className="btn-confirm">
                        <Button title={"Xác nhận"} onClick={handleBtnCreateProduct} />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateProduct;
