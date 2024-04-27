import React from "react";
import {Element, scroller} from "react-scroll/modules";
// import {PrimaryButton} from "../../../../PrimaryButton/PrimaryButton";
const service = {};
export class HomeTopSliderBannerThird extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSlider: false,
            selectedTextIndex: 0,
            texts: [
                'Learn how we are redefining the government-citizen interaction in Haryana',
                '86% of government-to-citizen services In Haryana are delivered within stipulated timelines',
                'More than 1.8 lakh respondents have rated the service delivery mechanism in the state 4.3 on 5'
            ]
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps && nextProps['bannerActive'] && !this.state.slideTitleVisible) {
            setTimeout(() => {
                this.setState({slideTitleVisible: true});
                this.startScrollAnimation();
                setTimeout(() => {
                    this.setState({showSlider: true, scrollTo: 0});

                }, 3000);
            }, 1000);
        } else if (nextProps && !nextProps['bannerActive']) {
            this.setState({slideTitleVisible: false, selectedTextIndex: 0, scrollTo: 0, showSlider: false});
            scroller.scrollTo('slide2-1', {
                duration: 1000,
                delay: 0,
                smooth: 'easeInOutQuart',
                containerId: 'slider-container-3',
            });
        }
    }

    scrollTo() {
        let scrollTo = 0;
        const {texts} = this.state;
        if (this.state.scrollTo === 3) {
            // scrollTo = 1;
        } else {
            scrollTo = this.state.scrollTo + 1;
        }
        if (texts[scrollTo - 1]) {
            this.setState({selectedTextIndex: scrollTo - 1})
        } else {
            this.setState({selectedTextIndex: 0})
        }
        this.setState({scrollTo}, () => {
            scroller.scrollTo('slide1-' + scrollTo, {
                duration: 1000,
                delay: 0,
                smooth: 'easeInOutQuart',
                containerId: 'slider-container-3',
            });
        });
    }

    startScrollAnimation = () => {
        let {scrollTo, selectedTextIndex, texts} = this.state;
        if (scrollTo === 3)
            return;
        setTimeout(() => {
            this.scrollTo();
            this.startScrollAnimation();
        }, 4000);
    };


    render() {
        const {bannerActive, banner} = this.props;
        const {showSlider, texts, selectedTextIndex, slideTitleVisible, scrollTo} = this.state;
        return (
            <div id={'home-top-slider-banner-one'} className={`${bannerActive ? 'active' : ''} `}>
                <div className="translucent-dark-overlay-banner"
                     style={{backgroundImage: `url(${service.baseUrl + banner.slides[0].imageUrl})`}}>
                    <div className="translucent-dark-overlay"/>
                    <div className={'container'}>
                        <div className={'slider-content'}>
                            <div className={'left-text-section'}>
                                <div className={`title ${slideTitleVisible ? 'visible' : ''}`}>
                                    {
                                        this.props.baseBanner && this.props.baseBanner.titleLines ?
                                            this.props.banner.titleLines.map((line) => {
                                                return <div>
                                                    {line}
                                                </div>
                                            }) : <span/>
                                    }
                                </div>
                                <div className={`slider-wrapper ${showSlider ? 'visible' : ''}`}>
                                    <div className="slider">
                                        <div className="animated-section-wrapper">
                                            <div className={`animated-section ${scrollTo === 2 ? 'sliding-out' : ''}`}>
                                                <div className="inner-text">
                                                    {this.props.baseBanner && this.props.baseBanner.titleLines ?
                                                        this.props.banner.titleLines.map((line) => {
                                                            return <div>
                                                                {line}
                                                            </div>
                                                        }) : <span/>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`slider-inner-wrapper ${showSlider ? 'added-padding' : ''}`}
                                             id='slider-container-3'>
                                            <div className="scrolling-section"/>
                                            <Element className="slider-content" name='slide2-1'
                                                     style={{
                                                         backgroundImage: `url(${service.baseUrl + banner.slides[0].imageUrl})`,
                                                         backgroundRepeat: 'no-repeat',
                                                         backgroundSize: 'cover'
                                                     }}/>
                                            <Element className="slider-content" name='slide2-2'
                                                     style={{
                                                         backgroundImage: `url(${service.baseUrl + banner.slides[1].imageUrl})`,
                                                         backgroundRepeat: 'no-repeat',
                                                         backgroundSize: 'cover'
                                                     }}/>
                                            <Element className="slider-content" name='slide2-3'
                                                     style={{
                                                         backgroundImage: `url(${service.baseUrl + banner.slides[2].imageUrl})`,
                                                         backgroundRepeat: 'no-repeat',
                                                         backgroundSize: 'cover'
                                                     }}/>
                                        </div>
                                    </div>
                                    <div className="slider-overlay"/>
                                    <div className={'content-section'}>

                                        <div
                                            className={`content-text`}>
                                            {this.props.banner.slides.map((slide, index) => {
                                                return <div
                                                    key={index}
                                                    className={`inner-content-text  ${selectedTextIndex === index ? 'visible' : 'hidden'}`}>
                                                    {
                                                        slide.title
                                                    }
                                                </div>
                                            })
                                            }
                                        </div>


                                        <div className="button-section">
                                            {/*<PrimaryButton text={'EXPLORE MORE'} click={() => {*/}
                                            {/*    window.location.href = this.props.banner.projectLink;*/}
                                            {/*}}/>*/}
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className={'right-image-section'}>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
