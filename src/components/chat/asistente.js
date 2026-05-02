import React, { useState, useEffect } from 'react';
import '../../color/chat/asistente.css';
import robotGif from "../../assets/img/robot.gif";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiSparkles, HiXMark } from "react-icons/hi2";
import { IoSendSharp } from "react-icons/io5";

export const Asistente = () => {
    const infoAsistente = {
        nombreBot: "Botsín AI",
        globosMultiples: [
            "¡Hola! Hablemos 🤖✨",
            "¿Tienes dudas? ¡Pregúntame! 💬",
            "Hey, ¿estás ahí? Chatea conmigo 🦾",
            "¡Iniciando protocolo de asistencia! 🛰️"
        ],
        saludoInicial: "👋 ¡Hola! Soy Botsín. ¿Tienes alguna duda sobre los proyectos de Max?",
        sugerencias: [
            "🚀 Cuéntame de Max en Java",
            "🎨 Genera una imagen tech",
            "🐍 ¿Qué hace Max con Python?",
            "⚛️ Habla sobre Max en React o Angular",
            "🐹 Backend con Go",
            "📦 ¿Cómo usa Max Node.js y TS?",
            "📱 Apps creadas por Max",
            "🐘 Desarrollo web con PHP"
        ],
        placeholder: "Escríbele a Max...",
        errorCerebro: "Lo siento, tuve un pequeño error en mi núcleo.",
        etiquetaEscribiendo: "Escribiendo..."
    };

    const [mensaje, setMensaje] = useState("");
    const [estaAbierto, setEstaAbierto] = useState(false);
    const [mostrarGlobo, setMostrarGlobo] = useState(false);
    const [chatLog, setChatLog] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [indiceFrase, setIndiceFrase] = useState(0);
    const [verSugerencias, setVerSugerencias] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 1200 });
        window.addEventListener('resize', AOS.refresh);
        return () => window.removeEventListener('resize', AOS.refresh);
    }, []);

    useEffect(() => {
        if (estaAbierto) {
            setMostrarGlobo(false);
            return;
        }
        const intervalo = setInterval(() => {
            setMostrarGlobo(prev => {
                const nuevoEstado = !prev;
                if (nuevoEstado) {
                    setIndiceFrase(prevIndice =>
                        (prevIndice + 1) % infoAsistente.globosMultiples.length
                    );
                }
                return nuevoEstado;
            });
        }, 15000);
        return () => clearInterval(intervalo);
    }, [estaAbierto, infoAsistente.globosMultiples.length]);

    useEffect(() => {
        if (estaAbierto && chatLog.length === 0) {
            const saludoInicial = async () => {
                await new Promise(resolve => setTimeout(resolve, 600));
                setCargando(true);
                setTimeout(() => {
                    setChatLog([{
                        role: 'bot',
                        content: infoAsistente.saludoInicial
                    }]);
                    setCargando(false);
                }, 1200);
            };
            saludoInicial();
        }
    }, [estaAbierto, chatLog.length, infoAsistente.saludoInicial]);

    const manejarSugerencia = (texto) => {
        setVerSugerencias(false);
        enviarAlCerebro(texto);
    };

    const enviarAlCerebro = async (textoManual) => {
        const textoAEnviar = textoManual || mensaje;
        if (!textoAEnviar.trim()) return;

        setVerSugerencias(false);
        const mensajeUsuario = { role: "user", content: textoAEnviar };
        setChatLog(prev => [...prev, mensajeUsuario]);
        setMensaje("");
        setCargando(true);

        try {
            const response = await fetch("https://asistente-ia-nine.vercel.app/chat-max", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: textoAEnviar })
            });
            const data = await response.json();

            setChatLog(prev => [...prev, {
                role: "bot",
                content: data.reply,
                image: data.image
            }]);
        } catch (error) {
            console.error("Error:", error);
            setChatLog(prev => [...prev, { role: "bot", content: infoAsistente.errorCerebro }]);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="asistente-wrapper">

            {!estaAbierto && (
                <div className={`globo-saludo ${mostrarGlobo ? 'visible' : 'oculto'}`}>
                    {infoAsistente.globosMultiples[indiceFrase]}
                </div>
            )}

            <button className="boton-flotante" onClick={() => setEstaAbierto(!estaAbierto)}>
                {estaAbierto ? (
                    <span className="cerrar"><HiXMark /></span>
                ) : (
                    <img src={robotGif} alt="Asistente IA" className="gif-robot" />
                )}
            </button>

            {estaAbierto && (
                <div className="contenedor-asistente">
                    <div className="cabecera-chat">
                        <span>{infoAsistente.nombreBot}</span>
                    </div>

                    <div className="caja-chat">
                        {chatLog.map((msg, index) => (
                            <div key={index} className={`burbuja ${msg.role}`}>
                                {msg.content}
                                {msg.image && (
                                    <div className="img-container-bot">
                                        <img
                                            src={msg.image}
                                            alt="Generación IA"
                                            className="img-generada"
                                            onLoad={() => {
                                                const chat = document.querySelector('.caja-chat');
                                                chat.scrollTop = chat.scrollHeight;
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}

                        {verSugerencias && chatLog.length === 1 && !cargando && (
                            <div className="contenedor-sugerencias">
                                {infoAsistente.sugerencias.map((sug, i) => (
                                    <button
                                        key={i}
                                        className="btn-sugerencia"
                                        onClick={() => manejarSugerencia(sug)}
                                    >
                                        {sug}
                                    </button>
                                ))}
                            </div>
                        )}

                        {cargando && (
                            <div className="burbuja bot escribiendo">
                                <span>{infoAsistente.etiquetaEscribiendo}</span>
                            </div>
                        )}
                    </div>

                    <div className="entrada-chat">
                        <input
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && enviarAlCerebro()}
                            placeholder={infoAsistente.placeholder}
                        />
                        <button onClick={() => enviarAlCerebro()}>
                            <IoSendSharp className="icono-flecha" />
                            <HiSparkles className="icono-chispa-mini" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};