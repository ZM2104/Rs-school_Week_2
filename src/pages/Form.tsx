import React, { useState } from 'react';
import './Form.css';
import Navbar from '../compenents/Navbar';

interface FormData {
  name: string;
  surname: string;
  zipCode: string;
  birthday: string;
  deliveryDate: string;
  country: string;
  state: string;
  consent: boolean;
  presents: string[];
  gender: string;
  notifications: boolean;
  picture: string | null;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    zipCode: '',
    birthday: '',
    deliveryDate: '',
    country: '',
    state: '',
    consent: false,
    presents: [],
    gender: '',
    notifications: false,
    picture: null,
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
  };

  const handlePresentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      const presents = [...prevFormData.presents];
      if (checked) {
        presents.push(value);
      } else {
        const index = presents.indexOf(value);
        presents.splice(index, 1);
      }
      return { ...prevFormData, presents };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          picture: reader.result as string,
        }));
      };
    }
  };
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      notifications: value === 'yes',
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (!/^[A-Z]/.test(formData.name)) {
      errors.name = 'Name must start with an uppercase letter';
    }
    if (!formData.surname) {
      errors.surname = 'Surname is required';
    } else if (!/^[A-Z]/.test(formData.surname)) {
      errors.surname = 'Surname must start with an uppercase letter';
    }
    if (!formData.birthday) {
      errors.birthday = 'Birthday is required';
    }
    if (!formData.deliveryDate) {
      errors.deliveryDate = 'Delivery date is required';
    }
    if (!formData.country) {
      errors.country = 'Country is required';
    }
    if (!formData.state) {
      errors.state = 'State is required';
    }
    if (!formData.consent) {
      errors.consent = 'Consent is required';
    }
    if (!formData.gender) {
      errors.gender = 'Gender is required';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="App">
        <h1>Form</h1>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && (
              <span className="error">{formErrors.name}</span>
            )}
          </div>

          <div>
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
            />
            {formErrors.surname && (
              <span className="error">{formErrors.surname}</span>
            )}
          </div>

          <div>
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Birthday</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
            />
            {formErrors.birthday && (
              <span className="error">{formErrors.birthday}</span>
            )}
          </div>

          <div>
            <label>Delivery Date</label>
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleInputChange}
            />
            {formErrors.deliveryDate && (
              <span className="error">{formErrors.deliveryDate}</span>
            )}
          </div>

          <div>
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option value="">Please select</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
            </select>
            {formErrors.country && (
              <span className="error">{formErrors.country}</span>
            )}
          </div>
          <div>
            <label>State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            >
              <option value="">Please select</option>
              <option value="New York">New York</option>
              <option value="California">California</option>
              <option value="Texas">Texas</option>
            </select>
            {formErrors.state && (
              <span className="error">{formErrors.state}</span>
            )}
          </div>

          <div>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleCheckboxChange}
            />
            <label> Consent</label>
            {formErrors.consent && (
              <span className="error">{formErrors.consent}</span>
            )}
          </div>

          <div>
            <input
              type="checkbox"
              name="presents"
              value="candy"
              checked={formData.presents.includes('candy')}
              onChange={handlePresentChange}
            />
            <label>Candy</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="presents"
              value="flowers"
              checked={formData.presents.includes('flowers')}
              onChange={handlePresentChange}
            />
            <label>Flowers</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="presents"
              value="teddy"
              checked={formData.presents.includes('teddy')}
              onChange={handlePresentChange}
            />{' '}
            <label>Teddy</label>
          </div>

          <div>
            <legend>Gender</legend>
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
              <label> Male</label>
            </div>

            <div>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              <label> Female</label>

              {formErrors.gender && (
                <span className="error">{formErrors.gender}</span>
              )}
            </div>
          </div>

          <div>
            <legend>Receive Notifications</legend>
            <div>
              {' '}
              <input
                type="radio"
                name="notifications"
                value="yes"
                checked={formData.notifications}
                onChange={handleNotificationChange}
              />
              <label> Yes</label>
            </div>

            <div>
              <input
                type="radio"
                name="notifications"
                value="no"
                checked={!formData.notifications}
                onChange={handleNotificationChange}
              />
              <label> No</label>
            </div>
          </div>

          <div>
            <label>Profile Picture</label>
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formErrors.picture && (
              <span className="error">{formErrors.picture}</span>
            )}
          </div>

          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
