'use client'
import { useEffect, useRef } from 'react';


const RazorPayButton = ({ buttonId }) => {
    const initialized = useRef(false)

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
            script.async = true;
            script.setAttribute('data-payment_button_id', buttonId)
            document.getElementById(`btn-${buttonId}`).appendChild(script);
        }
    }, []);

    return (
        <form id={`btn-${buttonId}`}></form>
    );
};

export default RazorPayButton;