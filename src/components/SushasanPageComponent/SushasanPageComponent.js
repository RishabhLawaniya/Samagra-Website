import React, { useEffect, useState } from "react";
import "../../styles/index.scss";
import youtubeIcon from "../../img/youtubeIcon.png";
import youtubeIcon2 from "../../img/youtube2.png";
import externalLink from "../../img/external-link-icon.png";
import crossIcon from "../../img/cross-icon.svg";
import AssetsFooter from "../AssetsFooter";

const SushasanPageComponent = ({ content, mobile }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [selectedSeason, setSelectedSeason] = useState("1");
  const [showAll, setShowAll] = useState(false);
  const [viewPost, setViewPost] = useState("");
  const [selectedSeasonData, setSelectedSeasonData] = useState(
    content?.postData
  );
  useEffect(() => {
    if (mobile) {
      setSelectedSeasonData(() => {
        let postdata = content?.postData
          ?.filter((d, i) => {
            if (selectedSeason === d?.postCard?.selectedCategory) return d;
          })
          .slice(0, 5);
        return postdata;
      });
    } else {
      setSelectedSeasonData(() => {
        let postdata = content?.postData?.filter((d, i) => {
          if (selectedSeason === d?.postCard?.selectedCategory) return d;
        });
        return postdata;
      });
    }
  }, [selectedSeason, mobile]);

  return (
    <div id="sushasan-page">
      <div>
        <div className="sushasan-logo">
          <img
            src={
              !!content.logo.childImageSharp
                ? content.logo.childImageSharp.fluid.src
                : content.logo
            }
            className="logo"
            alt="Sushasan Logo"
          />
        </div>
        <div className="sushasan-header">
          <iframe
            style={{ borderRadius: "8px", flex: "1" }}
            src="https://www.youtube.com/embed/evr-R7iC1VM/"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p className="sushasan-header-text">
            <div dangerouslySetInnerHTML={{ __html: content?.text }} />
          </p>
        </div>
        <div className="tab-container">
          <div className="tab-sub-container">
            {content?.postCategories?.map((p, i) => {
              return (
                <div
                  key={i}
                  style={{
                    color: selectedSeason == p.season ? "#1646A1" : "#8E928F",
                    borderBottom:
                      selectedSeason == p.season ? "2px solid #1646A1" : "none",
                  }}
                  className="tab-item"
                  onClick={() => {
                    setSelectedSeason(p.season ?? "");
                    setShowAll(false);
                  }}
                >
                  {`Sushasan Season ${p.season}`}
                </div>
              );
            })}
          </div>
        </div>
        <div className="categories-data">
          {selectedSeasonData?.map((p, i) => {
            return (
              <div key={i} className="category-card">
                <div
                  key={i}
                  style={{ position: "relative", cursor: "pointer" }}
                  onClick={() => {
                    setViewPost(p.postCard.urlLink);
                  }}
                >
                  <img
                    src={
                      p?.postCard?.postImage?.childImageSharp
                        ? p?.postCard?.postImage?.childImageSharp?.fluid?.src
                        : p?.postCard?.postImage
                    }
                    alt="postImg"
                    className="postcard"
                  />
                  <img
                    src={youtubeIcon2}
                    alt="youtube-icon"
                    className="youtube-icon"
                  />
                </div>
                <div className="card-content">
                  <div className="sushasan-chip">{`S${p?.postCard?.selectedCategory} E${p?.postCard?.episode}`}</div>
                  <div className="card-name">{p?.postCard?.postName}</div>
                </div>
              </div>
            );
          })}
        </div>
        {mobile && !showAll && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1.5rem 0",
            }}
          >
            <button
              style={{
                padding: "12px 24px",
                color: "#000000",
                borderRadius: "5px",
                border: "1px solid #000000",
                background: "none",
              }}
              onClick={() => {
                setSelectedSeasonData(() => {
                  let postdata = content?.postData?.filter((d, i) => {
                    if (selectedSeason === d?.postCard?.selectedCategory)
                      return d;
                  });
                  return postdata;
                });
                setShowAll(true);
              }}
            >
              {"View all"}
            </button>
          </div>
        )}
        <div className="youtube-button-section">
          <div className="button-section-description">
            For the latest updates related to our work
          </div>
          <button
            className="button-style"
            onClick={() => window.open(content?.youtubeLink, "_blank")}
          >
            <img
              src={youtubeIcon}
              alt="youtube-icon"
              className="youtube-icon-button"
            />
            <span className="button-text">Follow us on Youtube</span>
          </button>
        </div>

        <AssetsFooter
          data={content?.assets}
          assetsHeading={content?.assetsHeading}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          mobile={mobile}
        />
        <div className="partner-with-us partner-box">
          <p className="partner-with-us-main-text">Partner with us today!</p>
          <p className="partner-text">
            Write to us at:{" "}
            <a
              href="mailto:outreach@samagragovernance.in"
              className="partner-with-us-anchor-text"
            >
              outreach@samagragovernance.in
            </a>
          </p>
        </div>
      </div>
      {viewPost && (
        <div className="view-post">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <div
              className="external-link-button"
              onClick={() => window.open(content?.youtubeLink, "_blank")}
            >
              <div>Open in Youtube</div>
              <img
                src={externalLink}
                alt="link-icon"
                className="external-link"
              />
            </div>
            <img
              src={crossIcon}
              alt="cross-icon"
              onClick={() => setViewPost("")}
              className="cross-icon"
            />
          </div>
          <div className="video-view">
            <iframe
              src={viewPost}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "40vw" }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default SushasanPageComponent;
