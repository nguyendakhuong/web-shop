import './Search.scss'
const InputSearch = ({ handleChangeSearch }) => {
    return (
        <div className="input-custom__input">
            <div className="input-custom__input__icon">
                <i className={'bx bx-search'}></i>
            </div>
            <input
                type="text"
                onChange={handleChangeSearch}
                placeholder="Nhập từ khóa tìm kiếm..."
                className="input-custom__input__search"
            />
        </div>
    )
}
export default InputSearch
