import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'jquery.ripples';

export const WaterWrapper = ({ children, className, id }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        const $el = $(containerRef.current);

        try {
            $el.ripples({
                resolution: 512,
                dropRadius: 30,
                perturbance: 0.04,
                interactive: true
            });
        } catch (e) {
            console.error("Error al mojar este componente, mi rey:", e);
        }

        return () => {
            if (typeof $el.ripples === 'function') {
                $el.ripples('destroy');
            }
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className={className} 
            id={id} 
            style={{ width: '100%', height: '100%', position: 'relative' }}
        >
            {children}
        </div>
    );
};