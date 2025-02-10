'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import { MdMarkEmailRead } from 'react-icons/md';
import { PiWarningDiamondFill } from 'react-icons/pi';

const copy = {
	heading: {
		login: 'Log in to continue',
		signup: 'Sign up to continue',
	},
	cta: {
		login: 'Continue',
		signup: 'Sign up',
	},
};

const AccountForm = ({ type = 'login', formAction }) => {
	const [email, setEmail] = useState('test@test.com');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const response = await formAction(formData);
		if (response.error) {
			console.error(response.error.message);
			setError(response.error.message);
		} else {
			setEmail(response.email);
			setSuccess(true);
		}
	};

	return (
		<div className="h-full flex flex-col gap-6 justify-center items-center">
			{success && type === 'signup' ? (
				<div className="flex flex-col justify-center items-center gap-3">
					<MdMarkEmailRead className="text-blue-600 text-[5.5rem]" />
					<h1 className="font-heading font-bold text-2xl">
						Verify your email address
					</h1>
					<span className="font-copy text-sm">
						A verification link has been sent to&nbsp;
						<span className="font-bold">{email}</span>.
					</span>
					<span className="font-copy text-sm">
						Please click on the link to complete the verification
						process.
					</span>
				</div>
			) : (
				<>
					<span className="font-heading font-black text-blue-600 text-3xl">
						task<span className="font-light text-black">mate</span>
					</span>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4 justify-center items-center w-96"
					>
						<span className="font-copy font-semibold text-neutral-900">
							{copy.heading[type]}
						</span>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="Enter your email"
							required
							className={`${
								error
									? 'outline-red-700'
									: 'outline-neutral-400'
							} outline-2 outline rounded p-2 w-full focus:outline-blue-600`}
						/>
						<input
							id="password"
							name="password"
							type="password"
							minLength={6}
							placeholder="Enter password"
							required
							className={`${
								error
									? 'outline-red-700'
									: 'outline-neutral-400'
							} outline-2 outline rounded p-2 w-full focus:outline-blue-600`}
						/>
						{error && (
							<div className="flex w-full font-copy text-sm text-red-700 justify-start items-center gap-1.5">
								<PiWarningDiamondFill className="text-lg" />
								<span className="text-red-700">{error}</span>
							</div>
						)}
						<button
							type="submit"
							className="mt-2 w-full bg-blue-600 h-11 rounded text-white font-copy font-semibold text-sm hover:bg-blue-700"
						>
							{copy.cta[type]}
						</button>
					</form>
					<Link
						href={type === 'login' ? '/signup' : '/login'}
						className="text-blue-700 hover:underline"
					>
						{type === 'login'
							? 'Create an account'
							: 'Already have an account? Log in'}
					</Link>
				</>
			)}
		</div>
	);
};

export default AccountForm;
