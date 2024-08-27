import { useContext, useState } from "react"
import Table from "../../components/table/Table"
import TableComponent from "../../components/table/Table"
import UserContext from "../../../lib/context/use.context"
import { KEY_CONTEXT_USER } from "../../../lib/context/use.reducer"
import APP_IMAGE from "../../../assets"

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
        "status": "activity",
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
        "status": "lock",
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


const ProductAdmin = () => {

    const [products, setProducts] = useState(JSON_TEST)
    const [userCtx, dispatch] = useContext(UserContext)
    const [count, setCount] = useState(0)
    const [listChecked, setListChecked] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(10)
    const [filter, setFilter] = useState({})

    const listItem = [
        { name: '', space: 2, label: '' },
        { name: 'image', space: 4, label: 'Hình ảnh' },
        { name: 'name', space: 8, label: 'Tên' },
        { name: 'price', space: 3, label: 'Giá tiền' },
        { name: 'priceOld', space: 3, label: 'Giá ban đầu' },
        { name: 'color', space: 4, label: 'Màu' },
        { name: 'sizeAndAmount', space: 5, label: 'Size - Số lượng' },
        {
            name: 'status', space: 6, label: 'Trạng thái',
            onClick: item => {
                console.log("check hoạt động", item)
            }
        },
        { name: 'remove', space: 4, label: 'Xóa', },
    ]

    const handleCheck = (e, type, item) => {
        e.stopPropagation()
        let listId = []
        if (type === 'ALL') {
            listId = products.map(user => user.id)
        }
        if (type === 'NONE') {
            listId = []
        }
        if (type === 'ITEM_CHECK') {
            const newList = [...listChecked, item.id]
            listId = newList
        }
        if (type === 'ITEM_UNCHECK') {
            const newList = [...listChecked].filter(id => id !== item.id)
            listId = newList
        }
        return setListChecked(listId)
    }

    const HandleButton = (user) => {
        console.log(user)
    }

    const handlePageClick = selectedPage => {
        let _idPage = selectedPage.selected + 1
        setCurrentPage(_idPage)
    }
    const handleSetItemPerPage = e => {
        setItemPerPage(e.target.value)
    }
    const handleSearch = (value, type) => {
        const newFilter = { ...filter, ['name_' + type]: value }
        if (!value) {
            delete newFilter['name_' + type]
        }
        setFilter(newFilter)
    }
    const handleRemoveItem = () => {

        // console.log("vàp", listChecked)
    }
    return (
        <div>
            ProductAdmin\
            <Table
                labelHeader="Danh sách sản phẩm"
                listItem={listItem}
                dataItem={products}
                lengthArr={products.length}
                handleCheck={handleCheck}
                listChecked={listChecked}
                isCheckAll={products.length === listChecked.length}
                HandleButton={HandleButton}
                handlePageClick={handlePageClick}
                pageCount={count / itemPerPage + 1}
                pageIndex={currentPage}
                handleSetItemPerPage={handleSetItemPerPage}
                handleSearch={handleSearch}
                handleRemoveClick={handleRemoveItem}

            />
        </div>
    )
}
export default ProductAdmin