import './checkout-steps.scss';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function CheckoutSteps({activeStep}) {

    const steps = [
        {
            label: "Shipping Details",
            icon: <LocalShippingOutlinedIcon/>
        },
        {
            label: "Confirm Order",
            icon: <LibraryAddCheckOutlinedIcon/>
        },
        {
            label: "Payment",
            icon: <AccountBalanceOutlinedIcon/>
        },
    ]

  return (
    <div className="checkoutSteps">
        <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((item, index) => (
                <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
                    <StepLabel icon={item.icon} className={activeStep === index ? "checkoutSteps__active" : "checkoutSteps__notActive"}>{item.label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </div>
  )
}

export default CheckoutSteps