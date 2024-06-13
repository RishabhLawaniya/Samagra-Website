import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { InstagramEmbed } from "react-social-media-embed";
import { Helmet } from "react-helmet";
import upIcon from "../img/up-icon.png";
import expandIcon from "../img/expandIcon.svg";
import instaIcon from "../img/instaIcon.svg";
import crossIcon from "../img/cross-icon.svg";
import { animateScroll as scroll } from "react-scroll";

export const DeclutteredPageTemplate = ({ data }) => {
  const [mobile, setMobile] = useState(false);
  const [showUpIcon, setShowUpIcon] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [viewPost, setViewPost] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(() => true);
      } else {
        setMobile(() => false);
      }
    };
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const handleScroll = () => {
    if (window && window.scrollY > window.screen.height) {
      setShowUpIcon(true);
    } else setShowUpIcon(false);
  };

  return (
    <div>
      <Helmet>
        <link
          rel="prefetch"
          href={data?.baseBanner?.bannerImage?.childImageSharp?.fluid?.src}
        />
      </Helmet>
      <div>
        <div id="decluttered-page">
          <div className={"decluttered-top-image"}>
            <img
              alt="banner-image"
              src={
                data?.baseBanner?.bannerImage?.childImageSharp
                  ? data?.baseBanner?.bannerImage?.childImageSharp?.fluid?.src
                  : data?.baseBanner?.bannerImage
              }
              width={"100%"}
            />
            <div className={"slider-content"}>
              {data?.baseBanner?.titleLines.map((d, i) => {
                return (
                  <div className={`title`} key={i}>
                    {d.text}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="description">
            <div>
              <video
                controls={false}
                playsInline
                autoPlay
                muted
                loop={true}
                style={{
                  width: "100%",
                  aspectRatio: "1.93",
                  objectFit: "cover",
                }}
              >
                <source
                  src={
                    data?.declutteredDescription?.descriptionVideo?.publicURL
                      ? data?.declutteredDescription?.descriptionVideo
                          ?.publicURL
                      : data?.declutteredDescription?.descriptionVideo
                  }
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="description-text">
              {data?.declutteredDescription?.descriptionHeader?.map((d, i) => {
                return (
                  <div key={i}>
                    <b>{d.header}</b>
                  </div>
                );
              })}
              {data?.declutteredDescription?.descriptionText?.map((d, i) => {
                return <div key={i}>{d.text}</div>;
              })}
            </div>
          </div>
          <div className="tab-container">
            <div className="tab-sub-container">
              <div
                className="tab-item"
                style={{
                  color: selectedCategory == "All" ? "#D09C0A" : "#8E928F",
                  borderBottom: selectedCategory=="All"?"2px solid #D09C0A":"none",
                }}
                onClick={() => {
                  setSelectedCategory("All");
                }}
              >
                All
              </div>
              {data?.postCategories?.map((p, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      color:
                        selectedCategory == p.category ? "#D09C0A" : "#8E928F",
                        borderBottom: selectedCategory==p.category ?"2px solid #D09C0A":"none",
                    }}
                    className="tab-item"
                    onClick={() => {
                      setSelectedCategory(p.category ?? "");
                    }}
                  >
                    {p.category}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="post-group">
            {data?.postData?.map((p, i) => {
              if (selectedCategory === "All")
                return (
                  <div key={i} style={{ position: "relative" }}>
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
                      src={expandIcon}
                      alt="expand"
                      className="expand-icon"
                      onClick={() => {
                        setViewPost(i);
                      }}
                    />
                  </div>
                );
              else if (selectedCategory === p?.postCard?.selectedCategory)
                return (
                  <div key={i} style={{ position: "relative" }}>
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
                      src={expandIcon}
                      alt="expand"
                      className="expand-icon"
                      onClick={() => {
                        setViewPost(i);
                      }}
                    />
                  </div>
                );
              else return <></>;
            })}
          </div>
          <div className="insta-button-section">
            <div className="button-section-description">
              For the latest updates related to our work
            </div>
            <button
              className="button-style"
              onClick={() => window.open(data?.instaLink, "_blank")}
              style={{
                borderImage:
                  "linear-gradient(to right, rgba(120, 54, 250, 1) 0%, rgba(235, 0, 157, 1) 50%, rgba(255, 187, 1, 1) 100%) 1 / 1 / 0px stretch",
              }}
            >
              <img src={instaIcon} alt="insta-icon" className="insta-icon" />
              <span className="button-text">Follow us on Instagram</span>
            </button>
          </div>
          <div className="footer">
            <div className="asset-heading">{data?.assetsHeading}</div>
            <div className="asset-container">
              {data?.assets?.map((d, i) => {
                return (
                  <a href={d?.assetCard?.link} target="_blank">
                    <div
                      className={`card-wrapper-case-study ${
                        hoveredIndex === i ? "hovered" : ""
                      } `}
                      style={{
                        margin: mobile ? "50px auto" : "",
                        height: mobile ? "190px" : "250px",
                        width: mobile ? "285px" : "350px",
                      }}
                      onMouseLeave={() => setHoveredIndex(-1)}
                      onMouseEnter={() => setHoveredIndex(i)}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${d?.assetCard?.assetImage?.childImageSharp ? d?.assetCard?.assetImage?.childImageSharp?.fluid?.src : d?.assetCard?.assetImage})`,
                          height: "100%",
                          borderRadius: "10px",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                        }}
                      />
                      <div
                        style={{
                          background: "#F5F7FA",
                          borderRadius: "10px",
                          height: mobile ? "140px" : "150px",
                          width: mobile ? "220px" : "300px",
                          position: "relative",
                          top: "-80px",
                          margin: "auto",
                          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          className={"headingCaseStudy"}
                          style={{
                            minHeight: "fit-content",
                            fontSize: mobile ? "16px" : "22px",
                            lineHeight: "160%",
                            fontWeight: "600",
                            color: "#000000",
                            padding: "10px 10px",
                          }}
                        >
                          {d?.assetCard?.name}
                        </div>
                        <div
                          className={"headingCaseStudy"}
                          style={{
                            minHeight: "fit-content",
                            fontSize: mobile ? "12px" : "14px",
                            lineHeight: "160%",
                            fontWeight: "400",
                            color: "#000000",
                            padding: "0px 10px",
                          }}
                        >
                          {d?.assetCard?.description}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        {!mobile && showUpIcon && (
          <div className={"up-icon"}>
            <img src={upIcon} onClick={scrollToTop} alt="scroll" />
          </div>
        )}
        {viewPost !== -1 && (
          <div
            style={{
              position: "fixed",
              top: "0px",
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,.7)",
              zIndex: "1000",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{ width: "100%", display: "flex", justifyContent: "end" }}
            >
              <img
                src={crossIcon}
                alt="cross-icon"
                onClick={() => setViewPost(-1)}
                className="cross-icon"
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <InstagramEmbed
                url={data?.postData[viewPost]?.postCard?.urlLink}
                width={mobile ? "270" : "500"}
                height={mobile ? "350" : "760"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DeclutteredPage = ({ data }) => {
  const { markdownRemark } = data;

  return (
    <Layout>
      <DeclutteredPageTemplate data={markdownRemark.frontmatter} />
    </Layout>
  );
};

DeclutteredPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DeclutteredPage;

export const declutteredPageQuery = graphql`
  query DeclutteredPageQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "decluttered-page" } }) {
      frontmatter {
        baseBanner {
          titleLines {
            text
          }
          bannerImage {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        declutteredDescription {
          descriptionHeader {
            header
          }
          descriptionText {
            text
          }
          descriptionVideo {
            publicURL
          }
        }
        postCategories {
          category
        }
        postData {
          postCard {
            postImage {
              childImageSharp {
                fluid(maxWidth: 1024, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            selectedCategory
            urlLink
          }
        }
        instaLink
        assetsHeading
        assets {
          assetCard {
            assetImage {
              childImageSharp {
                fluid(maxWidth: 1024, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            name
            description
            link
          }
        }
      }
    }
  }
`;
