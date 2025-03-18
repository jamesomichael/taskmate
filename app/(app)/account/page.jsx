import React from 'react';

import { createClient } from '@/utils/supabase/server';

const AccountPage = async () => {
	const supabase = await createClient();
	const { data } = await supabase.auth.getUser();
	const user = data.user;

	const displayName = user?.user_metadata?.display_name;
	const email = user?.email;

	return (
		<div className="max-w-screen-lg m-auto">
			<div className="px-8 py-6 flex items-center gap-4 bg-slate-8000 w-full h-36">
				<div className="flex justify-center items-center bg-blue-700 h-full aspect-square rounded-full">
					<span className="text-white font-copy text-4xl">
						{displayName.charAt(0)}
					</span>
				</div>
				<div className="flex flex-col gap-1.5">
					<span className="text-black font-heading font-black text-4xl truncate">
						{displayName}
					</span>
					<span className="font-copy text-sm font-medium text-gray-800">
						{email}
					</span>
				</div>
			</div>
			<div className="px-8 flex flex-col gap-14">
				<div className="flex flex-col gap-4">
					<span className="font-copy text-2xl font-semibold">
						Profile
					</span>
					<div className="flex flex-col gap-2">
						<span className="font-copy font-bold">
							Display name
						</span>
						<div className="flex flex-col gap-2 items-start">
							<input
								type="text"
								placeholder={displayName}
								className="rounded font-copy text-sm placeholder-gray-800 px-2 py-3 h-8 w-full outline outline-[1px] outline-gray-400 bg-white"
							/>
							<button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 font-copy text-sm font-medium mt-3 text-white rounded">
								Save changes
							</button>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<span className="font-copy text-2xl font-semibold">
						Email
					</span>
					<div className="flex flex-col gap-2">
						<span className="font-copy font-bold">
							Current email
						</span>
						<span className="font-copy text-sm">
							Your current email address is&nbsp;
							<span className="font-bold">{email}</span>
						</span>
					</div>
					<div className="flex flex-col gap-2 items-start">
						<span className="text-xs font-copy font-semibold">
							New email address
						</span>
						<input
							type="email"
							placeholder="Enter new email address"
							className="rounded font-copy text-sm placeholder-gray-800 px-2 py-3 h-8 w-full outline outline-[1px] outline-gray-400 bg-gray-100"
						/>
						<button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 font-copy text-sm font-medium mt-3 text-white rounded">
							Save changes
						</button>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<span className="font-copy text-2xl font-semibold">
						Security
					</span>
					<div className="flex flex-col gap-2">
						<span className="font-copy font-bold">
							Change your password
						</span>
						<div className="flex flex-col gap-2 items-start">
							<span className="text-xs font-copy font-semibold">
								Current password
							</span>
							{/* <div className="flex flex-col gap-2 items-start"> */}
							<input
								type="email"
								placeholder="Enter current password"
								className="rounded font-copy text-sm placeholder-gray-800 px-2 py-3 h-8 w-full outline outline-[1px] outline-gray-400 bg-gray-100"
							/>
							<span className="mt-1 text-xs font-copy font-semibold">
								New password
							</span>
							<input
								type="email"
								placeholder="Enter new password"
								className="rounded font-copy text-sm placeholder-gray-800 px-2 py-3 h-8 w-full outline outline-[1px] outline-gray-400 bg-gray-100"
							/>
							<button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 font-copy text-sm font-medium mt-3 text-white rounded">
								Save changes
							</button>
							{/* </div> */}
						</div>
					</div>
				</div>
			</div>
			<pre>{JSON.stringify(user, null, 4)}</pre>
		</div>
	);
};

export default AccountPage;
