import React from 'react';

const styles = {
  backgroundColor: `#282c34`,
  padding: `1em 2em`,
  color: `white`,
  textDecoration: `none`,
  fontSize: `2vh`,
}

const Footer = () => {
    return (
        <div style={styles}>
            <span>© 2020 State of Hawaiʻi. All Rights Reserved. An Equal Opportunity Employer.</span>
        </div>
    );
};

export default Footer;
