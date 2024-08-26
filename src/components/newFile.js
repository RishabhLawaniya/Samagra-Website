import React from "react";

return (
  <div className="footer">
    <div className="asset-heading">{assetsHeading}</div>
    <div className="asset-container">
      {data?.map((d, i) => {
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
                  backgroundImage: `url(${
                    d?.assetCard?.assetImage?.childImageSharp
                      ? d?.assetCard?.assetImage?.childImageSharp?.fluid?.src
                      : d?.assetCard?.assetImage
                  })`,
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
);
