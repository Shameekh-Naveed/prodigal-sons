import React, { useState } from "react"

interface AvatarChangeProps {
	defaultAvatar: File
}

const AvatarChange: React.FC<AvatarChangeProps> = ({ defaultAvatar }) => {
	const [avatar, setAvatar] = useState<File>(defaultAvatar)

	const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setAvatar(e.target.files[0])
		}
	}

	return (
		<div>
			<div>
				<img src={URL.createObjectURL(avatar)} alt="Avatar" />
			</div>
			<div className="h-2 w-2 bg-black">
				<input type="file" onChange={handleChangeAvatar} />
			</div>
		</div>
	)
}

export default AvatarChange
