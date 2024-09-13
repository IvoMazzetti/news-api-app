import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';

export default function Login({status, canResetPassword}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side with form */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-white shadow-md px-6 py-4">
                <Head title="Log in"/>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <div className="flex  flex-col my-10">
                    <h1 className="mb-2 text-[2rem] font-bold">Log in to your Account</h1>
                    <p className="text-md text-gray-400">Welcome back! Please enter your details.</p>
                </div>

                <form onSubmit={submit} className="w-full max-w-md">
                    <div>
                        <InputLabel htmlFor="email" value="Email"/>
                        <div className="relative">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2"/>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password"/>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2"/>
                    </div>

                    <div className="flex flex-row justify-between mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600">Remember me</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-blue-500 font-bold hover:text-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div className="mt-10">
                        <PrimaryButton
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>

                    <div className="mt-12 flex justify-center items-center space-x-2">
                        <p className="text-gray-600">Don't have an account?</p>
                        <Link
                            href={route('register')}
                            className="text-blue-500 font-bold hover:text-blue-700"
                        >
                            Create an account
                        </Link>
                    </div>

                </form>
            </div>

            <div className="w-1/2 bg-blue-700 relative flex justify-center items-center">
                <div className="relative flex justify-center items-center w-1/2 h-1/2">
                    <div className="w-[40rem] h-[40rem] bg-blue-600 rounded-full border border-white"></div>
                    <div className="absolute w-[30rem] h-[32rem] bg-blue-500 rounded-full border border-white"></div>
                </div>
            </div>

        </div>

    );
}
