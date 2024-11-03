'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Management() {
  const [image, setImage] = useState<string | null>(null)
  const [ocrResult, setOcrResult] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUploadToServer = async () => {
    setLoading(true)
    setError(null)
    try {
      const file = await fetch(image as string).then((res) => res.blob()) // Convert image URL to blob
      const formData = new FormData()
      formData.append('image', file, 'upload.jpg') // Append the image file to form data

      const response = await axios.post(
        'https://789c-202-44-47-11.ngrok-free.app/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      setOcrResult(response.data.ocr_result) // Set OCR result from response
    } catch (error) {
      setError('Error uploading the image. Please try again.')
      console.error('Error uploading the image:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <Label>Upload an Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const files = event.target?.files
              if (files && files[0]) {
                const file = files[0]
                const reader = new FileReader()
                reader.onloadend = () => {
                  setImage(reader.result as string)
                }
                reader.readAsDataURL(file)
              }
            }}
          />
        </CardHeader>
        {image && (
          <CardContent className="flex flex-col gap-3">
            <Label>Preview</Label>
            <Image
              src={image}
              alt="Uploaded Preview"
              width={200}
              height={200}
              className="mx-auto"
            />
            <Button onClick={handleUploadToServer} disabled={loading}>
              {loading ? 'Processing...' : 'Upload and Get OCR Result'}
            </Button>
          </CardContent>
        )}
        {ocrResult && (
          <CardFooter className="flex gap-2">
            <h2>OCR Result:</h2>
            <p>{ocrResult}</p>
          </CardFooter>
        )}
        {error && (
          <CardFooter className="flex gap-2 text-red-500">
            <p>{error}</p>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
