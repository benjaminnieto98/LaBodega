import React from 'react'
import video from '../../assets/LaBodegaVideo.mp4'
import './styles.css'


const Hero = () => {
    return (
        <div className="heroSection">
            <video className="heroVideo" autoPlay muted loop>
                <source src={video} type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
            </video>
        </div>
    )
}

export default Hero