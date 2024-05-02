import AboutPagePreview from "./preview-templates/AboutPagePreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import CMS from "netlify-cms-app";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import C4GTPagePreview from "./preview-templates/C4GTPagePreview";
import ProductPagePreview from "./preview-templates/ProductPagePreview";
import TeamPagePreview from "./preview-templates/TeamPagePreview";
import cloudinary from "netlify-cms-media-library-cloudinary";
import uploadcare from "netlify-cms-media-library-uploadcare";
import ProjectPagePreview from "./preview-templates/ProjectPagePreview";
import MediaPagePreview from "./preview-templates/MediaPagePreview";
import JoinUsPreview from "./preview-templates/JoinUsPreview";
import MediaPostPreview from "./preview-templates/MediaPostPreview";
import PartnerPagePreview from "./preview-templates/PartnerPagePreview";
import CareerPagePreview from "./preview-templates/CareersPagePreview";
import TGCPagePreview from "./preview-templates/TGCPagePreview";
import SushasanPagePreview from "./preview-templates/SushasanPagePreview";
import CaseStudyPreview from "./preview-templates/CaseStudyPreview";
import KSKPreview from "./preview-templates/KSKCaseStudyPreview";
import OldCaseStudyPreview from "./preview-templates/OldCaseStudyPreview";
import HomeLegacyPreview from "./preview-templates/HomeLegacyPreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);
CMS.registerPreviewStyle(`cms.css`);
CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("homeLegacy", HomeLegacyPreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("products", ProductPagePreview);
CMS.registerPreviewTemplate("c4gt", C4GTPagePreview);
CMS.registerPreviewTemplate("tgc", TGCPagePreview);
CMS.registerPreviewTemplate("sushasan", SushasanPagePreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview);
CMS.registerPreviewTemplate("project", ProjectPagePreview);
CMS.registerPreviewTemplate("media", MediaPagePreview);
CMS.registerPreviewTemplate("team", TeamPagePreview);
CMS.registerPreviewTemplate("joinus", JoinUsPreview);
CMS.registerPreviewTemplate("mediacontent", MediaPostPreview);
CMS.registerPreviewTemplate("partner", PartnerPagePreview);
CMS.registerPreviewTemplate("careers", CareerPagePreview);
CMS.registerPreviewTemplate("casestudy", CaseStudyPreview);
CMS.registerPreviewTemplate("oldcasestudy", OldCaseStudyPreview);
CMS.registerPreviewTemplate("ksk", KSKPreview);
