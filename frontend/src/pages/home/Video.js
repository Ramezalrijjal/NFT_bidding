import React from 'react';

const Vedio = () => {
    return (
        <div className="vedio-area rn-section-gapTop">
            <div className="container">
                <div className="row mb--40">
                    <div className="title-area text-center">
                        <h3 className="title mb--15">Meet with Nuron </h3>
                        <p className="subtitle">An NFT is a digital asset that represents real-world objects like art, music,
                            in-game items and videos. They are bought and sold online.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 position-relative">
                        <a id="play-video" className="video-play-button btn-large with-animation" href="https://www.youtube.com/watch?v=H3TABd_nBJU">
                            <span></span>
                        </a>
                        <div className="vedio-wrapper">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ1srwOEkxHVt-eRbx4f1dpArQ6G9xWRgnvw&usqp=CAU" alt="" />
                        </div>
                        <div id="video-overlay" className="video-overlay">
                            <a className="video-overlay-close">×</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vedio;
