/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Grid, Box, Heading, Text } from "theme-ui";
import SectionHeader from "components/section-header";

import PatternBG from "assets/patternBG.png";
import ArrowOdd from "assets/arrowOdd.png";
import ArrowEven from "assets/arrowEven.png";



export default function WorkFlow() {

  return (
    <section sx={styles.workflow} id="demo">
      <Container>
        <SectionHeader
          slogan="Demo"
          title="Let’s see how the App it works"
          isWhite={true}
        />

        <div
          style={{
            overflow: "hidden",
            paddingBottom: "50%",
            position: "relative",
            height: "0",
            textAlign: 'center',
            marginLeft:"190px"
          }}
        >
          <iframe
            width="853"
            height="480"
            frameBorder="0"
          
            styles={{
              left: "0",
              top: "0",
              height: "100%",
              width: "100%",
              position: "absolute",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            src="https://www.youtube.com/embed/YqdDn3kraKw"
          ></iframe>
        </div>

        <SectionHeader
          slogan="Demo"
          title="Let’s see how the Website uses Auth0 and OpenScreen"
          isWhite={true}
        />

<div
          style={{
            overflow: "hidden",
            paddingBottom: "50%",
            position: "relative",
            height: "0",
            textAlign: 'center',
            marginLeft:"190px"
          }}
        >
          <iframe
            width="853"
            height="480"
            frameBorder="0"
          
            styles={{
              left: "0",
              top: "0",
              height: "100%",
              width: "100%",
              position: "absolute",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            src="https://www.youtube.com/embed/NbMB8k6uYd0"
          ></iframe>
        </div>

      </Container>
    </section>
  );
}

const styles = {
  workflow: {
    backgroundColor: "primary",
    backgroundImage: `url(${PatternBG})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    py: [8, null, 9, null, null, 5],
  },
};
