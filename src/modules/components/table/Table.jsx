import ReactPaginate from 'react-paginate'
import './Table.scss'

import { useState } from 'react'

import Button from '../button/Button'
import InputSearch from '../search/Search'
import APP_IMAGE from '../../../assets'

const HeaderTable = ({
    handleCheck,
    isCheckAll,
    listItem,
    handleSearch,
    labelHeader,
    handleAdd,
    handleRemoveClick
}) => {
    const [search, setSearch] = useState('')

    return (
        <div className="containerHeaderTable">
            <div className="containerHeaderTable-header">
                <div>
                    <h1>{labelHeader}</h1>
                </div>
                <div className="containerHeaderTable-header__search">
                    <InputSearch
                        handleChangeSearch={e => {
                            setSearch(e.target.value)
                        }}
                    />
                    <Button
                        onClick={() => {
                            handleSearch(search, 'wordSearch')
                        }}
                        title={'Tìm kiếm'}
                    />
                    <img
                        onClick={handleAdd}
                        className="add_header"
                        src={APP_IMAGE.addIcon}
                        alt=""
                    />
                </div>
            </div>

            <div className="containerHeaderTable-rowHeaderTable">
                {handleCheck && (
                    <input
                        className="containerHeaderTable-rowHeaderTable__checkbox"
                        onChange={e => {
                            handleCheck(e, e.target.checked ? 'ALL' : 'NONE')
                        }}
                        type="checkbox"
                        checked={isCheckAll}
                    />
                )}
                {listItem
                    ? listItem.map((item, index) => (
                        <div
                            style={{
                                flex: item.space,
                            }}
                            key={index}>
                            <h1 className="containerHeaderTable-rowHeaderTable__name"
                                onClick={item.name === "remove" ? handleRemoveClick : undefined}
                                style={{ cursor: item.name === "remove" ? 'pointer' : 'default' }} >
                                {item.label}
                            </h1>
                        </div>
                    ))
                    : null}
            </div>
        </div>
    )
}
const BodyTable = ({
    HandleButton,
    dataItem,
    listItem,
    handleCheck,
    listChecked = [],
    onClick,
    handleChooseRow,
}) => {

    const [selectedColors, setSelectedColors] = useState({});
    const [currentImages, setCurrentImages] = useState({});
    const [currentSizeAndAmounts, setCurrentSizeAndAmount] = useState([]);

    const handleColorChange = (itemId, color) => {

        setSelectedColors(prevColors => ({
            ...prevColors,
            [itemId]: color
        }));
        setCurrentImages(prevImages => ({
            ...prevImages,
            [itemId]: color.image[0].image1
        }));
        setCurrentSizeAndAmount(prevSizeAndAmount => ({
            ...prevSizeAndAmount,
            [itemId]: color.size
        }))
    };


    return (
        <>
            {dataItem
                ? dataItem.map((item, index) => {
                    const _idCheckbox = listChecked.includes(item.id);
                    const selectedColor = selectedColors[item.id] || item.productSizeColor[0];
                    const currentImage = currentImages[item.id] || selectedColor.image[0].image1;
                    const currentSizeAndAmount = currentSizeAndAmounts[item.id] || selectedColor.sizeAndQuantity;

                    return (
                        <div
                            onClick={() => handleChooseRow(item.id)}
                            key={index}
                            className={`rowBodyTable ${_idCheckbox && 'active'}`}>
                            <div
                                onClick={() => {
                                    onClick(item)
                                }}
                                key={index}></div>
                            {handleCheck && (
                                <input
                                    checked={_idCheckbox}
                                    className="rowBodyTable__checkbox"
                                    onClick={e => e.stopPropagation()}
                                    onChange={e => {
                                        e.stopPropagation()
                                        handleCheck(
                                            e,
                                            e.target.checked ? 'ITEM_CHECK' : 'ITEM_UNCHECK',
                                            item
                                        )
                                    }}
                                    type="checkbox"
                                />
                            )}
                            {listItem
                                ? listItem.map((key, index) => {
                                    let render = () => {
                                        if (key.name === 'remove') {
                                            return (
                                                <img
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        HandleButton(item)
                                                    }}
                                                    className={'icon_action'}
                                                    src={APP_IMAGE.banIcon} alt=''></img>
                                            )
                                        }

                                        if (key.name === 'status') {
                                            return item[key.name] !== 'lock' ? (
                                                <Button
                                                    className={"btnActivity"}
                                                    title={"Đang hoạt động"}
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        key.onClick(item)
                                                    }} />
                                            ) : (
                                                <Button
                                                    className={"btnUnActivity"}
                                                    title={"Không hoạt động"}
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        key.onClick(item)
                                                    }} />
                                            )
                                        }
                                        const value = item[key.name]
                                        if (Array.isArray(value)) {
                                            return (
                                                <ul className="ul_child">
                                                    {value.map((v, i) => (
                                                        <li key={i}>
                                                            {key.children
                                                                .map(cr => {
                                                                    return cr.label + ': ' + v[cr.name]
                                                                })
                                                                .join('  -----  ')}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                        }
                                        if (key.name === "image") {
                                            return (
                                                <div className='imageTable'>
                                                    <img src={currentImage} alt=''></img>
                                                </div>
                                            )
                                        }
                                        if (key.name === "color") {
                                            return (
                                                <div className='color-option'>
                                                    {item.productSizeColor.map((colorOption, index) => (
                                                        <button
                                                            key={index}
                                                            className={`color-button ${selectedColor.color === colorOption.color ? 'active' : ''}`}
                                                            style={{ backgroundColor: colorOption.color }}
                                                            onClick={() => handleColorChange(item.id, colorOption)}
                                                        >
                                                        </button>
                                                    ))}
                                                </div>
                                            )
                                        }
                                        if (key.name === "sizeAndAmount") {
                                            return (
                                                <div className='sizeAndAmount'>
                                                    {currentSizeAndAmount.map((sizeObj, i) => {
                                                        const [size, amount] = Object.entries(sizeObj)[0];
                                                        return (
                                                            <div key={i}>
                                                                Size {size}: {amount}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )
                                        }

                                        return value
                                    }
                                    return (
                                        <h5
                                            key={index}
                                            style={{
                                                flex: key.space,
                                                margin: 0,
                                                fontWeight: 400,
                                                color: '#4e4d4f',
                                            }}>
                                            {render()}
                                        </h5>
                                    )
                                })
                                : null}
                        </div>
                    )
                })
                : null}
        </>
    )
}
const FooterTable = ({
    pageCount,
    itemPerPage,
    pageIndex,
    handlePageClick = () => { },
    handleSetItemPerPage = () => { },
}) => {
    return (
        <div className="componentPagination">
            <div className="componentPagination__select">
                <select
                    value={itemPerPage}
                    onChange={handleSetItemPerPage}
                    className="componentPagination-select">
                    <option className="componentPagination-select__item" value={5}>
                        5
                    </option>
                    <option className="componentPagination-select__item" value={10}>
                        10
                    </option>
                    <option className="componentPagination-select__item" value={20}>
                        20
                    </option>
                </select>
            </div>
            <div className="componentPagination__pagination">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="pagination_active"
                // initialPage={pageIndex}
                />
            </div>
        </div>
    )
}
const Table = ({
    itemPerPage,
    listItem,
    dataItem,
    lengthArr,
    handleCheck,
    HandleButton,
    isCheckAll,
    listChecked = [],
    handlePageClick = () => { },
    pageCount,
    pageIndex,
    handleSetItemPerPage = () => { },
    handleSearch = () => { },
    handleChooseRow = () => { },
    labelHeader,
    handleAdd,
    handleRemoveClick
}) => {
    return (
        <div className="table">
            <div className="table-scrollView">
                <HeaderTable
                    handleCheck={handleCheck}
                    listItem={listItem}
                    lengthArr={lengthArr}
                    isCheckAll={isCheckAll}
                    handleSearch={handleSearch}
                    labelHeader={labelHeader}
                    handleAdd={handleAdd}
                    handleRemoveClick={handleRemoveClick}
                />
                <div className="table-scrollView__BodyTable">
                    <BodyTable
                        listItem={listItem}
                        dataItem={dataItem}
                        handleCheck={handleCheck}
                        listChecked={listChecked}
                        HandleButton={HandleButton}
                        handleChooseRow={handleChooseRow}
                    />
                </div>
            </div>
            <div className="table-FooterTable">
                <FooterTable
                    itemPerPage={itemPerPage}
                    handlePageClick={handlePageClick}
                    pageCount={pageCount}
                    pageIndex={pageIndex}
                    handleSetItemPerPage={handleSetItemPerPage}
                />
            </div>
        </div>
    )
}
export default Table
