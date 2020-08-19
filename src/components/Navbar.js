import React from 'react'
import {Link} from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo-colored.png'
import logoInverted from '../img/logo.png'
import HeaderDropdown from "./HeaderDropdown";

const Navbar = class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {showInverted: false, projects: []};
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.handleScroll, true);
            if (window.localStorage.getItem('domains')) {
                console.log(JSON.parse(window.localStorage.getItem('domains')));
            }
        }
    }

    toggleHamburger = () => {
        // toggle the active boolean in the state
        this.setState(
            {
                active: !this.state.active,
            },
            // after state has been updated,
            () => {
                // set the class in state for the navbar accordingly
                this.state.active
                    ? this.setState({
                        navBarActiveClass: 'is-active',
                    })
                    : this.setState({
                        navBarActiveClass: '',
                    })
            }
        )
    }
    filterUrl = (str) => {
        let result = '';
        str = str.replace(/ /g, '-').toLowerCase();
        for (let i = 0; i < str.length; i++) {
            if ('ascdfeghijklmnopqrstuvwxyz0123456789-'.indexOf(str[i]) > -1) {
                result += str[i];
            }
        }
        return result;
    };
    handleScroll = () => {
        if (this.state.showInverted && window.scrollY < 250) {
            this.setState({showInverted: false});
        }
        if (!this.state.showInverted && window.scrollY > 250) {

            this.setState({showInverted: true});
        }
    };

    render() {
        const {showInverted, projects} = this.state;

        return (
            <div className={`header-wrapper  ${showInverted ? 'inverted-fixed' : ''} `}>
                <div className={"container"}>
                    <nav className="nav-wrapper nav justify-content-between">
                        <Link to={'/'}>
                            <a className="nav-link active navbar-brand" style={{paddingTop: 0}} href="#">
                                <img className={'logo'} src={showInverted ? logo : logoInverted}/>
                            </a>
                        </Link>
                        <ul className={'nav justify-content-end'}>
                            <HeaderDropdown/>

                            <li>
                                <a className="nav-link" href="https://tech.samagragovernance.in">TECH</a>
                            </li>
                            <li>
                                <Link to={'/team'}><a className="nav-link" href="/team">TEAM</a></Link>
                            </li>
                            <li>
                                <Link to={'/partners'}><a className="nav-link" href="/partners">PARTNERS</a></Link>
                            </li>
                            <li>
                                <Link to={'/media'}><a className="nav-link" href="/media">MEDIA</a></Link>
                            </li>
                            <li>
                                <Link to={'/blog'}><a className="nav-link" href="/blog">BLOG</a></Link>
                            </li>
                            <li>
                                <Link to={'/careers'}><a className="nav-link" href="/career">CAREERS</a></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Navbar
