import React from "react";

const OurMissionSection = ({data}) => {
  return (
    <>
      <div
        className={"home-top-gif"}
      >
          <video
            controls={false}
            muted
            autoplay={true}
            loop={true}
            playsInline
  webkit-playsinline="true"
            style={{
              width: "100%",
            }}
          >
            <source src={data?.baseBannerVideo?.publicURL ? (data?.baseBannerVideo?.publicURL) : data?.baseBannerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={"slider-content"}>
              <div className={`title`} >
                <div>{data?.baseBanner?.titleLines[0].text} </div>
                <div>{data?.baseBanner?.titleLines[1].text}</div>
              </div>
          </div>
      </div>
      <div className='our-mission'>
        <div className="section-heading text-center blue-text">{data?.ourMission?.title}</div>
        <div className="section-description text-center blact-text-1">{data?.ourMission?.description}</div>
      </div>
    </>
  );
};

export default OurMissionSection;