import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Textinput from '@/components/ui/Textinput';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { handleLogin } from './store'

const schema = yup
    .object({
        username: yup
            .string()
            .required('Name is required'),
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
    })
    .required();

const StartQuizForm = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const handleInputChange = (e) => {
        setValue(e.target.name, e.target.value);
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            // Save to localStorage for now
            localStorage.setItem('userData', JSON.stringify(data));
            localStorage.setItem('name',(data.username));
            const newdata = {
                isAuth: true,
                data: data,
            }
            dispatch(handleLogin(newdata))
        } catch (error) {
            console.error('Error saving user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Textinput
                name="username"
                label="Name"
                type="text"
                onChange={handleInputChange}
                register={register}
                error={errors.username}
                placeholder="Enter Your Name"
            />
            <Textinput
                name="email"
                label="Email"
                type="email"
                onChange={handleInputChange}
                register={register}
                error={errors.email}
                placeholder="Enter Your Email"
            />
            {isLoading ? (
                <Button text="Starting..." className="btn btn-dark block w-full" isLoading />
            ) : (
                <button type="submit" className="btn btn-dark block w-full">
                    Start Quiz
                </button>
            )}
        </form>
    );
};

export default StartQuizForm;