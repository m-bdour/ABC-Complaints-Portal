import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getComplaint, deleteComplaint } from '../../actions/complaint';

// Components
import ComplaintForm from './ComplaintForm';

const UserComplaint = ({ getComplaint, complaint: { complaints }, deleteComplaint }) => {

    useEffect(() => {
        getComplaint();
    }, [getComplaint]);

    return (

        <Fragment>
            {complaints.map((complaint) => (

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
                    </div>
                </div>
            ))}
            <ComplaintForm />
        </Fragment>
    );
};

UserComplaint.propTypes = {
    getComplaint: PropTypes.func.isRequired,
    deleteComplaint: PropTypes.func.isRequired,
    complaint: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    complaint: state.complaint
});


export default connect(mapStateToProps, { getComplaint, deleteComplaint })(UserComplaint);