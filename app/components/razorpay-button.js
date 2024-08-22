'use client'
import { useEffect, useRef } from 'react';


const RazorPayButton = ({ buttonId }) => {
    const initialized = useRef(false)
    const formRef = useRef(null);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
            script.async = true;
            script.setAttribute('data-payment_button_id', buttonId)
            formRef.current.appendChild(script);
        }
    }, [buttonId]);

    return (
        <form ref={formRef}></form>
    );
};

export default RazorPayButton;