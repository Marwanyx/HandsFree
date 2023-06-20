/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import { Link } from 'components/link';
import { FaPlayCircle } from 'react-icons/fa';
import BannerBG from 'assets/bannerBg.png';
import BannerThumb from 'assets/banner-thumb.png';

// auth0-react
import { useAuth0 } from "@auth0/auth0-react";

// import popup component
import VerifyDownload from '../components/VerifyDownload/VerifyDownload';

import client1 from 'assets/sponsor/opencv.svg';
import client2 from 'assets/sponsor/mediapipe.svg';

const data = [
  {
    id: 1,
    path: '#',
    image: client1,
    title: 'OpenCV',
  },
  {
    id: 2,
    path: '#',
    image: client2,
    title: 'MediaPipe',
  },
];

export default function Banner() {
  const [videoOpen, setVideoOpen] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setVideoOpen(true);
  };

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <section sx={styles.banner} id="home">
      <Container sx={styles.banner.container}>
        <Box sx={styles.banner.contentBox}>
          <Heading as="h1" variant="heroPrimary">
            The ultimate touch-free browsing experience
          </Heading>
          <Text as="p" variant="heroSecondary">
            <b>HandsFree</b> is an AI-based program created to help 
            you navigate your computer with <b>no physical touch at all!</b> 
          </Text>
          <Flex>
          
          {!isAuthenticated && (
            <Button variant="whiteButton" aria-label="Get Started" onClick={() => loginWithRedirect()}>
              Log In To Download!
            </Button>
          )}

          {isAuthenticated && (
            <Button variant="whiteButton" aria-label="Get Started" href="#">
              <VerifyDownload />            
            </Button>            
          )}
            <>
              <ModalVideo
                channel="youtube"
                isOpen={videoOpen}
                videoId="O-DrJh--LsQ"
                onClose={() => setVideoOpen(false)}
              />
              <Button
                variant="textButton"
                aria-label="Watch Video"
                onClick={handleClick}
              >
                <FaPlayCircle /> Watch Demo
              </Button>
            </>
          </Flex>
          <Flex sx={styles.sponsorBox}>
            <Text sx={styles.sponsorTitle}>Powered by:</Text>
            <Box sx={styles.sponsorBox.sponsor}>
              
              <Link path={data[0].path}>
                <Image src={data[0].image} alt={data[0].title} height="100" width="30"/>
              </Link>
        
              <Link path={data[1].path}>
                <Image src={data[1].image} alt={data[1].title} height="100" width="100"/>
              </Link>
              
            </Box>
          </Flex>
        </Box>

        <Box sx={styles.banner.imageBox}>
          <Image src={BannerThumb} alt="banner" style={{MarginRight:"128px !important", MaxWidth:"40% !important"}} />
        </Box>
      </Container>
    </section>
  );
}

const styles = {
  banner: {
    overflow: ['hidden', 'initial', null, 'hidden'],
    backgroundImage: `url(${BannerBG})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: 'top left',
    backgroundSize: 'cover',
    borderBottomRightRadius: [100, 150, null, null, null, 250],
    pt: ['150px', null, null, null, null, null, '140px', '130px'],
    pb: ['100px', null, null, '110px', null, 10, '150px'],
    backgroundColor: 'primary',
    container: {
      display: 'flex',
    },
    contentBox: {
      width: ['100%', null, '85%', '55%', '50%', '55%'],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      flexShrink: 0,
      pt: [0, null, null, null, null, null, 5, 7],
    },
    imageBox: {
      display: ['none', null, null, 'block'],
      justifyContent: 'center',
      ml: [0, null, null,  null,  null,  null, '195px', '246px'],
      mr: [0, null, null,  null,  null,  null, '-220px', '-200px'],
      mt: [0, null, null,  null,  null,  null, 7, 0],
      mb: [0, null, null, null, '-45px', '-70px', null, '-115px'],
      overflow: 'hidden',
      textAlign: 'right',
      width: '33%',
    },
  },
  sponsorTitle: {
    color: 'white',
    fontSize: [1, 2],
    opacity: 0.6,
    pr: 20,
    flexShrink: 0,
    pb: [2, null, 0],
  },
  sponsorBox: {
    pt: ['35px', null, null, null, null, '45px'],
    flexDirection: ['column', null, 'row'],
    sponsor: {
      display: 'flex',
      alignItems: 'center',
      '> a': {
        mr: [5, null, null, 4, 6],
        display: 'flex',
        '&:last-of-type': {
          mr: 0,
        },
      },
    },
  },
};
