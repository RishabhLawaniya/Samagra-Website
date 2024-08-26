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
import rightArrow from "../img/right-arrow-icon.svg";
import { animateScroll as scroll } from "react-scroll";
import AssetsFooter from "../components/AssetsFooter";

export const DeclutteredPageTemplate = ({ data }) => {
  const [mobile, setMobile] = useState(false);
  const [showUpIcon, setShowUpIcon] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [viewPost, setViewPost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryData, setSelectedCategoryData] = useState(
    data?.postData
  );

  const [currPage, setCurrPage] = useState(1);
  const [numberOfItem, setNumberOfItem] = useState(8);

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

  useEffect(() => {
    setSelectedCategoryData(() => {
      let postdata = data?.postData?.filter((d, i) => {
        if (selectedCategory === "All") return d;
        else if (selectedCategory === d?.postCard?.selectedCategory) return d;
      });
      return postdata;
    });
  }, [selectedCategory]);

  console.log(selectedCategoryData, "jkjkjkj");

  const indexOfLastRecord = currPage * numberOfItem;
  const indexOfFirstRecord = indexOfLastRecord - numberOfItem;
  const currentRecords = selectedCategoryData?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(selectedCategoryData?.length / numberOfItem);
  const goToNextPage = () => {
    if (currPage !== nPages) setCurrPage(currPage + 1);
  };
  const goToPrevPage = () => {
    if (currPage !== 1) setCurrPage(currPage - 1);
  };

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
          <div className={"base-banner-image"}>
            <img
              alt="banner-image"
              src={
                data?.baseBanner?.bannerImage?.childImageSharp
                  ? data?.baseBanner?.bannerImage?.childImageSharp?.fluid?.src
                  : data?.baseBanner?.bannerImage
              }
              width={"100%"}
              className="banner-image"
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
              <iframe
                style={{
                  width: "100%",
                  aspectRatio: "1.78",
                  objectFit: "cover",
                }}
                src={data?.declutteredDescription?.descriptionVideo}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
                allowFullScreen
              ></iframe>
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
                  borderBottom:
                    selectedCategory == "All" ? "2px solid #D09C0A" : "none",
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
                      borderBottom:
                        selectedCategory == p.category
                          ? "2px solid #D09C0A"
                          : "none",
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
            {currentRecords?.map((p, i) => {
              return (
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
                  <img src={expandIcon} alt="expand" className="expand-icon" />
                </div>
              );
            })}
          </div>
          <div className="pagination">
            <div onClick={goToPrevPage} className="pagination-button">
              <img
                src={rightArrow}
                alt="arrow-icon"
                className="arrow-icon"
                style={{ transform: "rotate(180deg)" }}
              />
              <a className="pagination-text anchor-color">Previous</a>
            </div>
            <div className="pagination-text" style={{ color: "#D09C0A" }}>
              {currPage + "/" + nPages}
            </div>
            <div onClick={goToNextPage} className="pagination-button">
              <a className="pagination-text anchor-color">Next</a>
              <img src={rightArrow} alt="arrow-icon" className="arrow-icon" />
            </div>
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
          <AssetsFooter
            data={data?.assets}
            assetsHeading={data?.assetsHeading}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            mobile={mobile}
          />
        </div>
        {!mobile && showUpIcon && (
          <div className={"up-icon"}>
            <img src={upIcon} onClick={scrollToTop} alt="scroll" />
          </div>
        )}
        {viewPost && (
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
                onClick={() => setViewPost("")}
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
                url={viewPost}
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
          descriptionVideo
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
