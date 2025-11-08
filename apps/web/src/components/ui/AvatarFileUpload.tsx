import type { FileUploadProps } from '@/types/fileupload.types'
import { CircleUserRoundIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'
import type { FileWithPreview } from '@/hooks'

type AvatarFileUploadProps = FileUploadProps &
  ButtonHTMLAttributes<HTMLButtonElement>

export default function AvatarFileUpload({
  options,
  className,
  maxSizeMb,
  ...props
}: AvatarFileUploadProps) {
  const [
    { files, isDragging },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = options

  const previewUrl = files[0]?.preview || null

  function clearHandler() {
    removeFile(files[0]?.id)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        {/* Drop area */}
        <button
          {...props}
          type="button"
          className={cn(
            'relative flex size-26 items-center justify-center overflow-hidden rounded-full border border-dashed border-input transition-colors outline-none hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none data-[dragging=true]:bg-accent/50',
            className
          )}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          aria-label={previewUrl ? 'Change image' : 'Upload image'}
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={previewUrl}
              alt={files[0]?.file?.name || 'Uploaded image'}
              width={64}
              height={64}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-8 opacity-60" />
            </div>
          )}
        </button>
        {previewUrl && (
          <Button
            onClick={clearHandler}
            size="icon"
            type="button"
            className="absolute -top-1 -right-1 size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
            aria-label="Remove image"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>
      <p
        aria-live="polite"
        role="region"
        className="mt-2 text-xs text-muted-foreground"
      >
        PNG, JPG (max. {maxSizeMb}MB)
      </p>
    </div>
  )
}
