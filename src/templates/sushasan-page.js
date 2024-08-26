import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import CareerBannerImage from "../components/CareerPageComponents/CareerBannerImage/CareerBanner";
import SushasanPageComponent from "../components/SushasanPageComponent/SushasanPageComponent";
import upIcon from "../img/up-icon.png";
import { animateScroll as scroll } from "react-scroll";

export const SushasanTemplate = ({ content }) => {
  const [mobile, setMobile] = useState(false);
  const [showUpIcon, setShowUpIcon] = useState(false);

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
    <React.Fragment>
      <CareerBannerImage bannerContent={content} />
      <SushasanPageComponent content={content} mobile={mobile} />
      {!mobile && showUpIcon && (
        <div className={"up-icon"}>
          <img src={upIcon} onClick={scrollToTop} />
        </div>
      )}
    </React.Fragment>
  );
};

const MediaPage = ({ data }) => {
  const { markdownRemark: careerPageContent } = data;
  return (
    <Layout>
      <SushasanTemplate content={careerPageContent.frontmatter} />
    </Layout>
  );
};

export default MediaPage;
export const mediaPageQuery = graphql`
  query SushasanPageQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "sushasan-page" } }) {
      html
      frontmatter {
        title
        bannerImage {
          childImageSharp {
            fluid(maxWidth: 1440, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        logo {
          childImageSharp {
            fluid(maxWidth: 1440, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        text
        youtubeLink
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
        postCategories {
          season
        }
        postData {
          postCard {
            postName
            selectedCategory
            urlLink
            episode
            postImage {
              childImageSharp {
                fluid(maxWidth: 1024, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
