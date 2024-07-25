import React from 'react';
import { FooterText, StyledFooter } from './Footer.styled';

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <FooterText>&copy; {new Date().getFullYear()} Code Greeks. All rights reserved.</FooterText>
    </StyledFooter>
  );
};

export default Footer;
