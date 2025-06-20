import { useDropzone } from 'react-dropzone'
import { useState } from 'react'
import axios from 'axios'

interface FileUploadModalProps {
  onClose: () => void
  onFileUploaded: (imageUrl: string) => void // Callback to notify parent component
}

export const FileUploadModal = ({ onClose, onFileUploaded }: FileUploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0])
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.jpg, .jpeg, .png, .gif, .mp4', // Accepted file types
  })

  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true)

      const formData = new FormData()
      formData.append('file', selectedFile)

      try {
        const response = await axios.post('http://localhost:3000/messages/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        // Send the image URL to the parent component
        onFileUploaded(response.data.imageUrl)

        // Close the modal after uploading
        onClose()
      } catch (error) {
        console.error('Error uploading file:', error)
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div className="bg-white p-4 rounded-md shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-4">
          <h2 className="text-xl">Upload File</h2>
        </div>

        <div {...getRootProps()} className="border-2 border-dashed p-4 text-center cursor-pointer">
          <input {...getInputProps()} />
          {selectedFile ? (
            <div>
              <p>Selected file: {selectedFile.name}</p>
            </div>
          ) : (
            <p>Drag and drop a file here, or click to select</p>
          )}
        </div>

        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  )
}
