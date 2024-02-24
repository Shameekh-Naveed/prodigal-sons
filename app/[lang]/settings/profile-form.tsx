"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"

const profileFormSchema = z.object({
	firstName: z
		.string({
			required_error: "Please enter your first name."
		})
		.max(30, {
			message: "First name must not be longer than 30 characters."
		})
		.optional(),
	lastName: z
		.string({
			required_error: "Please enter your last name."
		})
		.max(30, {
			message: "Last name must not be longer than 30 characters."
		})
		.optional(),
	email: z
		.string({
			required_error: "Please select an email to display."
		})
		.optional(),
	phoneNumber: z
		.string({
			required_error: "Please enter your phone number."
		})
		.optional()
	// profilePicture: z.string().email()
})

const passwordFormSchema = z.object({
	oldPassword: z
		.string({
			required_error: "Please enter your old password."
		})
		.min(8, {
			message: "Password must be at least 8 characters."
		}),
	newPassword: z
		.string({
			required_error: "Please enter your new password."
		})
		.min(8, {
			message: "Password must be at least 8 characters."
		}),
	confirmNewPassword: z
		.string({
			required_error: "Please enter your new password."
		})
		.min(8, {
			message: "Password must be at least 8 characters."
		})
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

// This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
// 	bio: "",
// 	urls: [
// 		{ value: "https://shadcn.com" },
// 		{ value: "http://twitter.com/shadcn" }
// 	]
// }

export function ProfileForm() {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		// defaultValues,
		mode: "onChange"
	})

	const passwordForm = useForm<PasswordFormValues>({
		resolver: zodResolver(passwordFormSchema),
		mode: "onChange"
	})

	useEffect(() => {
		fetchUserInfo()
	}, [])

	const fetchUserInfo = async () => {
		try {
			const res = await fetch("/api/user")
			const data = await res.json()
			console.log({ data })
			if (!res.ok) {
				toast.error(data.error)
			} else {
				const userData = data.data.user
				form.reset(userData)
			}
		} catch (err) {
			console.error({ err })
			toast.error("An error occurred while fetching user info")
		}
	}

	function submitProfile(data: ProfileFormValues) {
		console.log({ data })
	}

	function submitPassword(data: PasswordFormValues) {
		console.log("subPass", { data })
	}

	const [editModes, setEditModes] = useState({
		email: false,
		firstName: false,
		lastName: false,
		phoneNumber: false,
		oldPassword: true,
		newPassword: true,
		confirmNewPassword: true
	})

	const handleDoubleClick = (fieldName: string) => {
		setEditModes(prevModes => ({
			...prevModes,
			[fieldName]: true
		}))
	}

	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")

	const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOldPassword(e.target.value)
	}

	const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value)
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitProfile)}
					className="space-y-8"
				>
					{/* <FormField
						control={form.control}
						name="profilePicture"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className="flex items-center space-x-2 relative">
										<img
											src={field.value}
											className="w-32 h-32 rounded-full border border-primary"
										/>
										<label className="w-8 h-8 rounded-full bg-primary absolute left-24 top-12">
											<input
												className="hidden"
												type="file"
											/>
										</label>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
					<FormFieldCustom
						form={form}
						editModes={editModes}
						handleDoubleClick={handleDoubleClick}
						name="email"
						description="This is your public email"
					/>

					<FormFieldCustom
						form={form}
						editModes={editModes}
						handleDoubleClick={handleDoubleClick}
						name="firstName"
						description="First Name"
					/>

					<FormFieldCustom
						form={form}
						editModes={editModes}
						handleDoubleClick={handleDoubleClick}
						// handleBlur={handleBlur}
						name="lastName"
						description="Last Name"
					/>

					<FormFieldCustom
						form={form}
						editModes={editModes}
						handleDoubleClick={handleDoubleClick}
						name="phoneNumber"
						description="Phone Number"
					/>

					<Button type="submit">Update profile</Button>
				</form>
			</Form>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={passwordForm.handleSubmit(submitPassword)}
					className="space-y-8"
				>
					{/* <FormField
						control={passwordForm.control}
						name="oldPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Old Password</FormLabel>
								<FormControl>
									<Input
										placeholder=""
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}

					<FormFieldCustom
						form={passwordForm}
						editModes={editModes}
						handleDoubleClick={handleDoubleClick}
						name="oldPassword"
						description="Existing Password"
					/>

					<FormFieldCustom
						form={passwordForm}
						editModes={editModes}
						handleDoubleClick={handleDoubleClick}
						name="newPassword"
						description="New Password"
					/>

					<FormFieldCustom
						form={passwordForm}
						editModes={editModes}
						handleDoubleClick={handleDoubleClick}
						name="confirmNewPassword"
						description="Confirm New Password"
					/>

					<Button
						className=" bg-red-500 text-primary hover:border hover:border-red-500 hover:bg-secondary hover:text-red-500"
						type="submit"
					>
						Update password
					</Button>
				</form>
			</Form>
		</>
	)
}

const FormFieldCustom = ({
	form,
	editModes,
	handleDoubleClick,
	// handleBlur,
	name,
	description
}: any) => (
	<FormField
		control={form.control}
		name={name}
		render={({ field }) => (
			<FormItem onDoubleClick={() => handleDoubleClick(name)}>
				<FormLabel>{description}</FormLabel>
				{editModes[name] ? (
					<Input
						placeholder=""
						type={name}
						{...field}
						// onBlur={() => handleBlur(name)}
					/>
				) : (
					<div onDoubleClick={() => handleDoubleClick({ name })}>
						{field.value}
					</div>
				)}
				{/* <FormDescription>{description}</FormDescription> */}
				<FormMessage />
			</FormItem>
		)}
	/>
)
