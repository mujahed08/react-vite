import React, { useEffect } from "react";
import {Col, Row, Container} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signup, signupFailed as registerFailed } from "../redux/reducer/signup";
import Root from "../component/root";

export default () => {
    let dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const onSubmit = data => {
        dispatch(signup(data))
    }
    
    useEffect(()=> {
        dispatch(registerFailed(false))
        setValue('password', '123456')
    }, [])

    const { signupFailed } = useSelector(state => state.signup)
    
    return <Container fluid={true}>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item" aria-current="page"><Link to="/login">Login</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Sign up</li>
            </ol>
        </nav>
        <Col>
            <div className="mx-4 p-4 col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 border">
                <h3>Register User</h3>
                <Row>
                    <form onSubmit={handleSubmit(onSubmit)} className="needs-validation g-2 row" noValidate>
                        <div className="form-floating">
                            <input {...register("name", { required: true, maxLength: 50 })} type="text" className="form-control" id="nameText" placeholder="placeholder" />
                            <label htmlFor="nameText" className="form-label">Full Name</label>
                            <div className="text-danger">{errors.name?.type === 'required' && "Name is required"}</div>
                        </div>
                        <div className="form-floating">
                            <input {...register("email", { required: true, maxLength: 50 })} type="email" className="form-control" id="emailEmail" placeholder="placeholder" />
                            <label htmlFor="emailEmail" className="form-label">Email</label>
                            <div className="text-danger">{errors.email?.type === 'required' && "Email is required"}</div>
                        </div>
                        <div className="form-floating">
                            <input {...register("username", { required: true, maxLength: 10 })}  type="text" className="form-control" id="usernameText" placeholder="placeholder" />
                            <label htmlFor="usernameText" className="form-label">Username</label>
                            <div className="text-danger">{errors.username?.type === 'required' && "Username is required"}</div>
                        </div>
                        <div className="form-floating">
                            <input {...register("password", { required: true, maxLength: 20 })} type="password" className="form-control" id="passwordPassword" placeholder="placeholder" />
                            <label htmlFor="passwordPassword" className="form-label">Password</label>
                            <div className="text-danger">{errors.password?.type === 'required' && "Password is required"}</div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="rolesSelect" className="form-label">Roles</label>
                            <select {...register("roles", { required: true, maxLength: 20 })} multiple="multiple" id="rolesSelect" className="form-select">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="super">Super Admin</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                <label className="form-check-label" htmlFor="gridCheck">
                                Check me out
                                </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary w-100">Sign up</button>
                        </div>
                        {signupFailed && <div className="col -12 mx-1 alert alert-danger" role="alert">
                            Username is already taken.
                        </div>}
                    </form>
                </Row>
            </div>            
        </Col>
        <Root />
    </Container>
}