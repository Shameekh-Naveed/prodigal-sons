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
import { useState } from "react"

const profileFormSchema = z.object({
	// username: z
	// 	.string()
	// 	.min(2, {
	// 		message: "Username must be at least 2 characters."
	// 	})
	// 	.max(30, {
	// 		message: "Username must not be longer than 30 characters."
	// 	}),
	firstName: z
		.string({
			required_error: "Please enter your first name."
		})
		.max(30, {
			message: "First name must not be longer than 30 characters."
		}),
	lastName: z
		.string({
			required_error: "Please enter your last name."
		})
		.max(30, {
			message: "Last name must not be longer than 30 characters."
		}),
	email: z.string({
		required_error: "Please select an email to display."
	}),
	phoneNumber: z
		.string({
			required_error: "Please enter your phone number."
		})
		.email()
	// bio: z.string().max(160).min(4),
	// urls: z
	// 	.array(
	// 		z.object({
	// 			value: z.string().url({ message: "Please enter a valid URL." })
	// 		})
	// 	)
	// 	.optional()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

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

	// const { fields, append } = useFieldArray({
	// 	name: "urls",
	// 	control: form.control
	// })

	function onSubmit(data: ProfileFormValues) {
		console.log(data)
		toast("Profile has been updated", {
			description: "Sunday, December 03, 2023 at 9:00 AM"
		})
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
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
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
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder=""
										type="email"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									This is your public display email.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone number</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Update profile</Button>
				</form>
			</Form>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="oldPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Old password</FormLabel>
								<FormControl>
									<Input
										placeholder=""
										type="password"
										{...field}
										onChange={handleOldPassword}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New password</FormLabel>
								<FormControl>
									<Input
										placeholder=""
										type="password"
										{...field}
										onChange={handleNewPassword}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
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
