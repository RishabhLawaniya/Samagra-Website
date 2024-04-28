import React, { useEffect, useState } from "react";
import OurWorkCard from "./OurWorkCard";

function OurWorkSection({workContent, isMobile}) {
  const [gridFlow, setGridFlow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setGridFlow(true);
      } else {
        setGridFlow(false);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <>
      <div
        style={{
          backgroundColor: "#F2E5CA",
          padding: "9vh 2.5vh",
        }}
      ><div style={{display:"flex",flexDirection:"column",gap:"20px"}}><div className="section-heading">Our Work</div>
      <div className="section-description">{workContent?.ourWorkDescription}</div></div>
        
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: gridFlow ? "1fr":"1fr 1fr",
        justifyItems:"center", marginTop:"8vh"
        }}>
            <OurWorkCard
            marginTop={"0px"}
            marginBottom={"20px"}
              data={workContent?.ourWork[0]}
                isMobile={isMobile}
            />
            <OurWorkCard
               marginTop={gridFlow?"0px":"14vh"}
               marginBottom={"20px"}
              data={workContent?.ourWork[1]}
              isMobile={isMobile}
            />
            <OurWorkCard
             marginTop={"2vh"}
             marginBottom={"20px"}
              data={workContent?.ourWork[2]}
              isMobile={isMobile}
            />
            <OurWorkCard
               marginTop={gridFlow?"0px":"14vh"}
               marginBottom={"20px"}
              data={workContent?.ourWork[3]}
              isMobile={isMobile}
            />
        </div>
      </div>
    </>
  );
}

export default OurWorkSection;
