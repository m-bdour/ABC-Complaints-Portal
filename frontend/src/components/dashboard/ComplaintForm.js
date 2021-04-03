import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComplaint } from '../../actions/complaint';
import { setAlert } from '../../actions/alert';


const ComplaintForm = ({ addComplaint, setAlert }) => {
    const [formData, setFormData] = useState({
        type: "select type",
        detailes: ""
    });

    const { type, detailes } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (type !== "select type") {

            await addComplaint(formData);
            setFormData({
                type: "select type",
                detailes: ""
            });
        } else {
            setAlert('You have to select type', 'danger');
        }
        window.scrollTo(0, 0);

    }

    return (
        <section className="container center login-page" style={{ marginTop: "-3rem" }} >
            <div className="Login">

                <div className="center head text-primary">
                    {/* <img src={Logo} width='100px' alt="Logo" /> */}
                    <p>Send a complaint </p>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="Form-group">
                        <label>Type</label>
                        <select name='type' value={type} onChange={onChange} class="form-control" autoFocus>
                            <option disabled value='select type' >select type</option>
                            <option value='Account access' >Account access</option>
                            <option value='Ads' >Ads</option>
                            <option value='COVID-19 information center' >COVID-19 information center</option>
                            <option value='Event' >Event</option>
                            <option value='Group' >Group</option>
                            <option value='Job' >Job</option>
                            <option value='Privacy' >Privacy</option>
                            <option value='settings' >settings</option>
                            <option value='Videos' >Videos</option>
                            <option value='Help' >Help</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label >detailes</label>
                        <textarea name='detailes' value={detailes} onChange={onChange} class="form-control" required rows="5"></textarea>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" required value="check" class="form-check-input" />
                        <label class="form-check-label">I agree on Privacy Policy</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>

                </form>
            </div>

        </section>
    );
};

ComplaintForm.propTypes = {
    addComplaint: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
};

export default connect(null, { addComplaint, setAlert })(ComplaintForm);