import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'jquery.ripples';

export const WaterWrapper = ({ children, className, id }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const $el = $(containerRef.current);

        const initRipples = () => {
            try {
                $el.ripples('destroy');
            } catch (e) {}
            
            try {
                $el.ripples({
                    resolution: 512,
                    dropRadius: 30,
                    perturbance: 0.04,
                    interactive: true
                });
            } catch (e) {
                console.error("Error ripples:", e);
            }
        };

        initRipples();

        // Reinicia el canvas cuando cambia el tamaño del contenido
        const observer = new ResizeObserver(() => {
            initRipples();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
            try { $el.ripples('destroy'); } catch (e) {}
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