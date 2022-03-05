import React, { Fragment, useState, useEffect } from 'react'

import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'

const NewPassword = ({ match }) => {
  
    const params = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Password updated successfully')
            navigate('/login')
        }

    }, [dispatch, alert, error, success])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(params.token, formData))
    }

    return (
        <Fragment>

            <MetaData title={'New Password Reset'} />
            <div class="container">        
                    <div class="mainheading">
		               <h1 class="sitetitle">Science-101</h1>
		               <p class="lead">
                     Science for technology , innovation and people.
		               </p>                   
	                </div> 
                    <section class="featured-posts">  
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                <div class="section-title">
		        <h2><span>Free</span></h2>
	            </div>
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Set Password
                        </button>

                    </form>
                </div>
            </div>
            </section>
            </div>
        </Fragment>
    )
}

export default NewPassword