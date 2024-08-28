'use client';

import React, { useEffect, useRef } from 'react';

interface RazorPayButtonProps {
    buttonId: string;
}

const RazorPayButton: React.FC<RazorPayButtonProps> = ({ buttonId }) => {
    const initialized = useRef(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
            script.async = true;
            script.setAttribute('data-payment_button_id', buttonId);

            if (formRef.current) {
                formRef.current.appendChild(script);
            }
        }
    }, [buttonId]);

    return <form ref={formRef}></form>;
};

export default RazorPayButton;
