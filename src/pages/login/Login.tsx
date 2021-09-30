import React, {useEffect, useState} from 'react';

import {RouteComponentProps} from 'react-router-dom'
import Service from 'service'

const SignInPage = ({history}: RouteComponentProps) => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            history.push('/todo')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        const { userId, password } = form
        e.preventDefault()
        const resp = await Service.signIn(userId, password)

        localStorage.setItem('token', resp)
        history.push('/todo')
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="Login__page">
            <div>
                <div className="Login__title">Akaru Task App</div>
                    <form onSubmit={signIn}>
                        <div>
                            <label className="Login__label" htmlFor="user_id">
                                User ID
                            </label>
                            <input
                                className="Login__input"
                                id="user_id"
                                name="userId"
                                value={form.userId}
                                onChange={onChangeField}
                            />
                            <br/>
                            <label className="Login__label" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="Login__input"
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={onChangeField}
                            />
                        </div>
                        <button className="btn btn--outline" type="submit">
                            Sign in
                        </button>
                    </form>
            </div>
        </div>
    );
};

export default SignInPage;