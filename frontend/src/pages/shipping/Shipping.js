import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../redux/actions/cartAction';
import './shipping.scss';
import { Country, State } from "country-state-city";
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import TransferWithinAStationOutlinedIcon from '@mui/icons-material/TransferWithinAStationOutlined';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { useState } from 'react';
import CheckoutSteps from '../../component/checkout-steps/CheckoutSteps';
import { useNavigate } from "react-router-dom";

function Shipping() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address)
  const [country, setCountry] = useState(shippingInfo.country)
  const [state, setState] = useState(shippingInfo.state)
  const [city, setCity] = useState(shippingInfo.city)
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

  const handleShippingForm = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({address, city, pinCode, phoneNo, country, state}));
    navigate('/order/confirm')
  }

  return (
    <div className="shipping">
      <CheckoutSteps activeStep={0}/>
      <div className="wrapper">
        <div className="wrapper__title">
          <div className="wrapper__title__heading txt-center">Shipping Details</div>
        </div>
        <div className="wrapper__form">
          <form onSubmit={handleShippingForm} className="wrapper__form__container">
            <div className="wrapper__form__container__input shipping-input">
              <CottageOutlinedIcon className="shipping-input__icon" />
              <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Address" />
            </div>
            <div className="wrapper__form__container__input shipping-input">
              <LocationCityOutlinedIcon className="shipping-input__icon" />
              <input type="text" value={city} onChange={(e) => { setCity(e.target.value) }} placeholder="City" />
            </div>
            <div className="wrapper__form__container__input shipping-input">
              <PinDropOutlinedIcon className="shipping-input__icon" />
              <input type="text" value={pinCode} onChange={(e) => { setPinCode(e.target.value) }} placeholder="Pin Code" />
            </div>
            <div className="wrapper__form__container__input shipping-input">
              <PhoneOutlinedIcon className="shipping-input__icon" />
              <input type="number" value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} minLength={10} placeholder="Phone No." />
            </div>
            <div className="wrapper__form__container__input shipping-input">
              <PublicOutlinedIcon className="shipping-input__icon" />
              <select value={country} onChange={(e) => setCountry(e.target.value)} required>
                <option value="">Country</option>
                {
                  Country && Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                  ))
                }
              </select>
            </div>
            {
              country && (
                <div className="wrapper__form__container__input shipping-input">
                  <TransferWithinAStationOutlinedIcon className="shipping-input__icon" />
                  <select value={state} onChange={(e) => setState(e.target.value)} required>
                    <option value="">State</option>
                    {
                      State && State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                      ))
                    }
                  </select>
                </div>
              )
            }
            <div className="wrapper__form__container__btn">
              <button className="wrapper__form__container__btn__button" disabled={state ? false : true}>
                Continue <EastRoundedIcon className="wrapper__form__container__btn__button__icon" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Shipping