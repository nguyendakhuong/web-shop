import { useRef, useState } from "react"
import "./ChooseFile.scss"

const ChooseFile = ({
    selectedFiles,
    handleFileChange,
    fileRemove,
    title,

}) => {
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef()

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
        const files = e.dataTransfer.files
    }
    return (
        <div className="card">
            <div className="top">
                <p>{title}</p>
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
                            <span className="select">
                                Browse
                            </span>
                        </>
                    )
                }
                <input name="file" type="file" className="file" multiple ref={fileInputRef} onChange={handleFileChange} />

            </div>
            <div className="container">
                {selectedFiles.map((images, index) => (
                    <div className="image" key={index}>
                        <span className="delete" onClick={(index) => { fileRemove(index) }}>x</span>
                        <img src={images.url} alt={images.name} />
                    </div>
                ))}
            </div>
            <button>
                Upload
            </button>
        </div>
    )
}
export default ChooseFile