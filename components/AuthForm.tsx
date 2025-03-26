'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import Image from 'next/image';

import {Button} from '@/components/ui/button';
import FormField from '@/components/FormField';
import {Form} from '@/components/ui/form';
import Link from 'next/link';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';

const authFormSchema = (type: FormType) => {
	return z.object({
		name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
		email: z.string().email(),
		password: z.string().min(3),
	});
};

const AuthForm = ({type}: {type: FormType}) => {
	const router = useRouter();
	const formSchema = authFormSchema(type);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			if (type === 'sign-up') {
				toast.success('Account created succesfully');
				router.push('/sign-in');
			} else {
				toast.success('Sign in succesfully');
				router.push('/');
			}
		} catch (error) {
			console.error(error);
			toast.error(`An error occurred. Please try again. ${error}`);
		}
	}

	const isSignIn = type === 'sign-in';

	return (
		<div className="card-border lg:min-w-[566px]">
			<div className="flex flex-col gap-6 card py-14 px-10">
				<div className="flex flex-row gap-2 justify-center">
					<Image src="/logo.svg" alt="logo" width={38} height={32} />
					<h2 className="text-primary-100">jamamam</h2>
				</div>
				<h3>Practice job interviews with AI</h3>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form ">
						{!isSignIn && (
							<FormField
								control={form.control}
								name="name"
								label="Name"
								placeholder="Your name"
							/>
						)}
						<FormField
							control={form.control}
							name="email"
							label="Email"
							placeholder="Your email"
							type="email"
						/>
						<FormField
							control={form.control}
							name="password"
							label="Password"
							placeholder="Enter your password"
							type="password"
						/>
						<Button className="btn" type="submit">
							{isSignIn ? 'Sign in' : 'Create an Account'}
						</Button>
					</form>
				</Form>
				<div className="flex w-full align-center justify-center">
					<p className="text-center">
						{isSignIn ? 'No Account yet?' : ' Have an account already?'}
					</p>
					<Link
						href={!isSignIn ? '/sign-in' : '/sign-up'}
						className="font-bold text-user-primary ml-1">
						{!isSignIn ? 'Sign in' : 'Sign up'}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
