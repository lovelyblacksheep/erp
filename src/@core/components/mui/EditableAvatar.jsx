'use client'

import { useState, useRef } from 'react'
import { forwardRef } from 'react'
import MuiAvatar from '@mui/material/Avatar'
import { lighten, styled } from '@mui/material/styles'

const AvatarWrapper = styled('div')(({ size }) => ({
  position: 'relative',
  display: 'inline-flex',
  height: size || 40,
  width: size || 40,
  '&:hover .upload-icon': {
    opacity: 1,
  },
}))

const UploadIconButton = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundColor: lighten(theme.palette.grey[800], 0.5),
  color: theme.palette.common.white,
  opacity: 0,
  transition: 'opacity 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: lighten(theme.palette.grey[700], 0.5),
  },
}))

const Avatar = styled(MuiAvatar)(({ color, skin, size, theme }) => ({
  ...(color &&
    skin === 'light' && {
      backgroundColor: `var(--mui-palette-${color}-lightOpacity)`,
      color: `var(--mui-palette-${color}-main)`
    }),
  ...(color &&
    skin === 'light-static' && {
      backgroundColor: lighten(theme.palette[color].main, 0.84),
      color: `var(--mui-palette-${color}-main)`
    }),
  ...(color &&
    skin === 'filled' && {
      backgroundColor: `var(--mui-palette-${color}-main)`,
      color: `var(--mui-palette-${color}-contrastText)`
    }),
  ...(size && {
    height: size,
    width: size,
    fontSize: size / 2,
  })
}))

const EditableAvatar = forwardRef((props, ref) => {
  const { color, skin = 'filled', src, size, ...rest } = props
  const [hovered, setHovered] = useState(false)
  const fileInputRef = useRef(null)

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Handle the file upload here
      uploadAvatar(file).then(response => {
        // Handle the response (e.g., set the new avatar URL)
        console.log('Uploaded avatar:', response.url)
      })
    }
  }

  return (
    <AvatarWrapper
      size={size}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Avatar
        ref={ref}
        color={color}
        skin={skin}
        src={src || '/path/to/default/image.jpg'} // Provide the default image path
        size={size}
        {...rest}
      >
        {!src && <i className="ri-image-add-fill" style={{ fontSize: size ? size / 2 : 20 }} />}
      </Avatar>
      <UploadIconButton className='upload-icon' onClick={handleUploadClick}>
        <i className="ri-upload-line" style={{ fontSize: size ? size / 2 : 20 }} />
      </UploadIconButton>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </AvatarWrapper>
  )
})

export default EditableAvatar