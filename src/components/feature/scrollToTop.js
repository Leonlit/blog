import React from "react";

class ScrollToTop extends React.Component {
    state = { isHide: false };
  
    hideBar = () => {
       const { isHide } = this.state
  
       window.scrollY > 100 ?
       !isHide && this.setState({ isHide: true })
       :
       isHide && this.setState({ isHide: false });
    }
  
    componentDidMount(){
        window.addEventListener('scroll', this.hideBar);
    }
  
    componentWillUnmount(){
        window.removeEventListener('scroll', this.hideBar);
    }
  
    render(){
        const classHide = this.state.isHide ? '' : 'hide';
        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return (
            <div id="scrollToTop" class={classHide} onClick={scrollToTop}>
                <div class="arrow-up"></div>
            </div>
        );
    }
}


export default ScrollToTop