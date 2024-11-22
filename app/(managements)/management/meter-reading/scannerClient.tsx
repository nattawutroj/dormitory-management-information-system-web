'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import heic2any from 'heic2any'

export default function ScannerClient() {
  const [image, setImage] = useState<string | null>(null)
  const [ocrResult, setOcrResult] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const endpoint = process.env.NEXT_PUBLIC_PYTHON_ENGINE || ''

  const convertImageToJPEG = async (file: File): Promise<string> => {
    try {
      let imageBlob: Blob = file

      if (file.type === 'image/heic' || file.type === 'image/heif') {
        const jpegBlob = await heic2any({ blob: file, toType: 'image/jpeg' })
        imageBlob = jpegBlob as Blob
      }

      const reader = new FileReader()
      reader.readAsDataURL(imageBlob)

      return await new Promise((resolve, reject) => {
        reader.onload = () => {
          const img = new window.Image()
          img.src = reader.result as string
          img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const maxHeight = 600
            const scale = maxHeight / img.height
            canvas.height = maxHeight
            canvas.width = img.width * scale

            if (ctx) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
              const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.8)
              resolve(jpegDataUrl)
            } else {
              reject(new Error('Failed to get canvas context'))
            }
          }
          img.onerror = () => reject(new Error('Failed to load image'))
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
      })
    } catch (error) {
      throw new Error(`Failed to convert HEIC image to JPEG. ${error}`)
    }
  }

  const handleUploadToServer = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(image as string)
      const blob = await response.blob()
      const formData = new FormData()
      formData.append('image', blob, 'upload.jpg')

      const serverResponse = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setOcrResult(serverResponse.data.ocr_result)
    } catch (error) {
      setError('Error uploading the image. Please try again.')
      console.error('Error uploading the image:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <Label>Upload an Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={async (event) => {
            const files = event.target?.files
            if (files && files[0]) {
              try {
                const jpegDataUrl = await convertImageToJPEG(files[0])
                setImage(jpegDataUrl)
              } catch (error) {
                console.log(error)
                setError('Error processing image. Please try another file.')
              }
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
  )
}
