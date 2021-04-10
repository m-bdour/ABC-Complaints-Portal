import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import api from '../../utils/api';
import { setAlert } from '../../actions/alert';



const AdminDashboard = ({ setAlert }) => {

    const [edit, setedit] = useState('');
    const [DeleteID, setDeleteID] = useState('');
    const [formData, setFormData] = useState({ role: "user", confirmEmail: "", userComplaints: "keep" });
    const [Accounts, setAccounts] = useState([]);

    const { role, confirmEmail, userComplaints } = formData;


    const getaccounts = async () => {
        try {
            const res = await api.get('/admin');
            setAccounts(res.data);

        } catch (err) {
            setAlert(err.response.statusText, 'danger');
        }
    };
    const deleteAccount = async (id) => {
        try {
            window.scrollTo(0, 0);
            await api.delete(`/admin/${id}/${userComplaints}`);
            setAlert(` account has been deleted successfully`, 'success');

            getaccounts(
                Accounts.filter((account) => account._id !== id)
            );

        } catch (err) {
            setAlert(err.response.statusText, 'danger');
        }
    };
    const updaterole = async (id, role) => {
        try {
            window.scrollTo(0, 0);
            const res = await api.put(`/admin/${role}/${id}`);
            getaccounts(
                Accounts.map((account) =>
                    account._id === id ? account.role = role : account
                ),
            );
            setAlert(` ${res.data.name}'s role updated to "${res.data.role}"`, 'success');

        } catch (err) {
            setAlert(err.response.statusText, 'danger');
        }
    };


    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        window.scrollTo(0, 0);
        setedit("");
        const id = edit;
        await updaterole(id, role);
        setFormData({
            role: "user",
        });
    }

    useEffect(() => {
        getaccounts();
    }, []);
    return (
        <Fragment>
            {Accounts.map((account) => (

                edit === account._id ?
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">name: <span className='text-dark' >{account.name}</span> </h5>
                            <h5 className="card-title">email: <span className='text-dark' >{account.email}</span> </h5>
                            <hr />

                            <form onSubmit={onSubmit}>
                                <div style={{ display: 'flex', alignItems: "center" }}>

                                    <h5 className='card-title float-left text-success mr-3'  >role:</h5>
                                    <select name='role' value={role} onChange={onChange} class="form-control w-50 mb-2" autoFocus>
                                        <option value='user' >user</option>
                                        <option value='admin' >admin</option>
                                        <option value='superAdmin' >superAdmin</option>
                                    </select>
                                </div>
                                <button onClick={() => setedit("")} className="btn btn-info float-right">Cancel</button>
                                <button type="submit" class="btn btn-primary float-right mr-3">Submit</button>
                            </form>
                        </div>
                    </div>

                    :

                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">name: <span className='text-dark'>{account.name}</span> </h5>
                            <h5 className="card-title">email: <span className='text-dark'> {account.email}</span> </h5>
                            <h5 className="card-title">role: <span className='text-dark'> {account.role} </span></h5>
                            <hr />
                            {DeleteID === account._id ?
                                <Fragment>
                                    <p className="card-text text-dark mb-1">Enter the user email for confirmation</p>
                                    <input type="text" name="confirmEmail" value={confirmEmail} onChange={onChange} class="form-control mb-4" />
                                    <h5 className='card-title float-left text-success mr-3' style={{ display: "inline" }}   >about its Complaint:</h5>
                                    <select name='userComplaints' value={userComplaints} onChange={onChange} class="form-control col-5 mb-2" autoFocus>
                                        <option value='delete' >delete it's complaint</option>
                                        <option value='keep' >keep it's complaint</option>
                                    </select>

                                    <button onClick={() => { deleteAccount(account._id); }} className="btn btn-danger float-right mr-3" disabled={confirmEmail !== account.email} >delete</button>
                                    <button onClick={() => setDeleteID("")} className="btn btn-info float-right mr-3">Cancel</button>

                                </Fragment>
                                :
                                <Fragment>
                                    <button onClick={() => { setDeleteID(account._id); }} className="btn btn-danger float-right  mr-3">delete</button>
                                    <button onClick={() => setedit(account._id)} className="btn btn-info float-right  mr-3">edit</button>
                                </Fragment>

                            }
                        </div>
                    </div>

            ))}
        </Fragment>
    );
};

AdminDashboard.propTypes = {
    setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    setAlert: state.setAlert
});



export default connect(mapStateToProps, { setAlert })(AdminDashboard);