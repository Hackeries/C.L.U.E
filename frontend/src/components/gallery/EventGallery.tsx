import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Loader2, Image as ImageIcon, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { uploadFile, getPublicUrl, deleteFile } from '../../lib/supabase'
import { toast } from 'sonner'
import type { EventGallery } from '../../types'

interface EventGalleryProps {
  eventId: number
  eventName: string
  isAdmin?: boolean
}

export const EventGallery = ({ eventId, eventName, isAdmin = false }: EventGalleryProps) => {
  const [images, setImages] = useState<EventGallery[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  useEffect(() => {
    fetchGallery()
  }, [eventId])

  const fetchGallery = async () => {
    try {
      // In a real scenario, this would fetch from your API
      // For now, we'll simulate with Supabase Storage list
      setLoading(false)
    } catch (error) {
      console.error('Error fetching gallery:', error)
      toast.error('Failed to load gallery')
      setLoading(false)
    }
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const uploadPromises = Array.from(files).map(async (file) => {
      const fileExt = file.name.split('.').pop()
      const fileName = `${eventId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      const { data, error } = await uploadFile('event-gallery', fileName, file)

      if (error) {
        toast.error(`Failed to upload ${file.name}`)
        return null
      }

      const publicUrl = getPublicUrl('event-gallery', fileName)
      return {
        event_id: eventId,
        image_url: publicUrl,
        uploaded_at: new Date().toISOString(),
      }
    })

    try {
      const uploadedImages = (await Promise.all(uploadPromises)).filter(Boolean) as EventGallery[]
      setImages([...images, ...uploadedImages])
      toast.success(`Successfully uploaded ${uploadedImages.length} image(s)`)
      setUploadDialogOpen(false)
    } catch (error) {
      console.error('Error uploading images:', error)
      toast.error('Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (image: EventGallery) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      // Extract path from URL
      const path = image.image_url.split('/').slice(-2).join('/')
      await deleteFile('event-gallery', path)
      
      setImages(images.filter(img => img.id !== image.id))
      toast.success('Image deleted successfully')
    } catch (error) {
      console.error('Error deleting image:', error)
      toast.error('Failed to delete image')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Event Gallery</CardTitle>
            <CardDescription>{eventName} - Photo Collection</CardDescription>
          </div>
          {isAdmin && (
            <Button onClick={() => setUploadDialogOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Images
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No images uploaded yet</p>
            {isAdmin && (
              <Button variant="outline" className="mt-4" onClick={() => setUploadDialogOpen(true)}>
                Upload First Image
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={image.id || index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative group aspect-square rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(image.image_url)}
                >
                  <img
                    src={image.image_url}
                    alt={image.caption || 'Event photo'}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(image)
                      }}
                      className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Image Preview Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Image Preview</DialogTitle>
            </DialogHeader>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Full size preview"
                className="w-full h-auto rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Upload Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Images</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="images">Select Images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="mt-2"
                />
              </div>
              {uploading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2">Uploading...</span>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
