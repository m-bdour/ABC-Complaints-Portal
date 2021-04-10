import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getComplaints, deleteComplaint, updateComplaint } from '../../actions/complaint';


const AdminDashboard = ({ getComplaints, complaint: { complaints }, deleteComplaint, updateComplaint }) => {


    const [edit, setedit] = useState('');
    const [formData, setFormData] = useState({
        notes: "",
        status: ""
    });

    useEffect(() => {
        getComplaints();
    }, [getComplaints, edit]);
    const { notes, status } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        window.scrollTo(0, 0);
        const id = edit;
        await updateComplaint(id, formData);
        setFormData({
            notes: "",
            status: ""
        });
        setedit("");
    }


    return (

        <Fragment>
            {complaints.map((complaint) => (

                edit === complaint._id ?
                    <div className="card mb-3">
                        <h5 className="card-header">type: {complaint.type}</h5>
                        <div className="card-body">
                            <h5 className="card-title">Details</h5>
                            <p className="card-text">{complaint.type} </p>
                            <form onSubmit={onSubmit}>
                                <Fragment>
                                    <hr />
                                    <h5 className="card-title">Notes</h5>
                                    <textarea name='notes' value={notes} onChange={onChange} class="form-control" rows="5"></textarea>
                                </Fragment>

                                <hr />
                                <div style={{ display: 'flex', alignItems: "center" }}>

                                    <h5 className='card-title float-left text-success mr-3'  >status:</h5>
                                    <select name='status' value={status} onChange={onChange} class="form-control w-50 mb-2" autoFocus>
                                        <option value='pending' >pending</option>
                                        <option value='resolved' >resolved</option>
                                        <option value='dismissed' >dismissed</option>
                                    </select>
                                </div>
                                <button onClick={() => setedit("")} className="btn btn-warning text-dark float-right">Cancel</button>
                                <button type="submit" class="btn btn-primary float-right mr-3">Done</button>
                            </form>
                        </div>
                    </div>
                    :
                    <div className="card mb-3">
                        <h5 className="card-header">type: {complaint.type} </h5>
                        <div className="card-body">
                            <h5 className="card-title">Details</h5>
                            <p className="card-text">{complaint.detailes} </p>
                            {complaint.notes &&
                                <Fragment>
                                    <hr />
                                    <h5 className="card-title">Notes</h5>
                                    <p className="card-text">{complaint.notes}</p>
                                </Fragment>
                            }
                            <hr />
                            <h5 className='card-title float-left text-success'>status: {complaint.status} </h5>
                            <button onClick={async () => {
                                await deleteComplaint(complaint._id);
                                window.scrollTo(0, 0);
                            }} className="btn btn-danger float-right">Delete</button>
                            <button onClick={() => setedit(complaint._id)} className="btn btn-info float-right  mr-3">edit</button>

                        </div>
                    </div>
            ))}
        </Fragment>
    );
};

AdminDashboard.propTypes = {
    getComplaints: PropTypes.func.isRequired,
    deleteComplaint: PropTypes.func.isRequired,
    updateComplaint: PropTypes.func.isRequired,
    complaint: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    complaint: state.complaint
});


export default connect(mapStateToProps, { getComplaints, deleteComplaint, updateComplaint })(AdminDashboard);